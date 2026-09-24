"use client";

import Image from "next/image";
import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import createGlobe, { type Arc, type Globe } from "cobe";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Universities.module.css";

type LatLng = [number, number];

const cities = {
  "joao-pessoa": [-7.12, -34.86],
  "campina-grande": [-7.23, -35.88],
  recife: [-8.05, -34.9],
  salvador: [-12.97, -38.51],
  goiania: [-16.68, -49.25],
  "sao-paulo": [-23.55, -46.63],
  campinas: [-22.9, -47.06],
} satisfies Record<string, LatLng>;

type CityId = keyof typeof cities;

// Cidades vizinhas ficam a poucos pixels umas das outras no globo, então os
// rótulos clicáveis são por estado, cada um deslocado do ponto por uma linha
// guia para que não se sobreponham.
const regions: {
  id: string;
  name: string;
  anchor: CityId;
  cities: CityId[];
  offset: [number, number];
}[] = [
  { id: "pb", name: "Paraíba", anchor: "joao-pessoa", cities: ["joao-pessoa", "campina-grande"], offset: [34, -38] },
  { id: "pe", name: "Pernambuco", anchor: "recife", cities: ["recife"], offset: [78, 12] },
  { id: "ba", name: "Bahia", anchor: "salvador", cities: ["salvador"], offset: [40, 30] },
  { id: "go", name: "Goiás", anchor: "goiania", cities: ["goiania"], offset: [-46, -26] },
  { id: "sp", name: "São Paulo", anchor: "sao-paulo", cities: ["sao-paulo", "campinas"], offset: [-40, 34] },
];

const origin = cities["joao-pessoa"];

const arcs: Arc[] = Object.entries(cities)
  .filter(([id]) => id !== "joao-pessoa")
  .map(([, location]) => ({ from: [...origin], to: [...location] }));

const GLOBE_SCALE = 1;
// Raio do globo desenhado pelo cobe (0.8) somado à elevação padrão dos pontos.
const MARKER_RADIUS = 0.85;
const THETA_LIMIT = 0.9;
const IDLE_RETURN_MS = 3000;

// Rotação (phi, theta) que coloca uma coordenada no centro do globo.
function focusOn([lat, lng]: LatLng): [number, number] {
  return [Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180];
}

const home = focusOn([-14, -43]);

// A lista de universidades cresce a partir do rótulo, para longe do ponto:
// para cima quando o rótulo está acima dele, para baixo quando está abaixo.
function listGrowsUp(offset: [number, number]) {
  return offset[1] < 0;
}

// Com uma região aberta, o ponto sai do centro para o lado oposto ao da lista,
// deixando espaço para ela.
function selectedView([lat, lng]: LatLng, offset: [number, number]): [number, number] {
  return focusOn([lat + (listGrowsUp(offset) ? 8 : -8), lng]);
}

// Mesma projeção que o cobe usa para desenhar os pontos, para os rótulos em
// HTML acompanharem o globo.
function project([lat, lng]: LatLng, phi: number, theta: number) {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180 - Math.PI;
  const cosLat = Math.cos(latRad);
  const x = -cosLat * Math.cos(lngRad) * MARKER_RADIUS;
  const y = Math.sin(latRad) * MARKER_RADIUS;
  const z = cosLat * Math.sin(lngRad) * MARKER_RADIUS;

  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);

  const screenX = cosPhi * x + sinPhi * z;
  const screenY = sinPhi * sinTheta * x + cosTheta * y - cosPhi * sinTheta * z;
  const depth = -sinPhi * cosTheta * x + sinTheta * y + cosPhi * cosTheta * z;

  return {
    x: (screenX * GLOBE_SCALE + 1) / 2,
    y: (-screenY * GLOBE_SCALE + 1) / 2,
    visible: depth >= 0,
  };
}

// Diferença angular pelo caminho mais curto, em (-π, π].
function angleDelta(from: number, to: number) {
  const delta = (to - from) % (Math.PI * 2);
  if (delta > Math.PI) return delta - Math.PI * 2;
  if (delta <= -Math.PI) return delta + Math.PI * 2;
  return delta;
}

type University = { name: string; city: string; url: string };

function UniversityGlobe({
  universities,
  onUnavailable,
}: {
  universities: readonly University[];
  onUnavailable: () => void;
}) {
  const { t } = useLanguage();
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const pinRefs = useRef<(HTMLDivElement | null)[]>([]);
  const selectedRef = useRef<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const selectedRegion = regions.find((region) => region.id === selected);
  const selectedUniversities = selectedRegion
    ? universities.filter((university) =>
        (selectedRegion.cities as string[]).includes(university.city),
      )
    : [];

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  useEffect(() => {
    const stage = stageRef.current;
    const host = canvasHostRef.current;
    if (!stage || !host) return;

    // O canvas é criado aqui, e não no JSX, porque o cobe o envolve numa div
    // própria: se o React fosse dono dele, removê-lo quebraria.
    const canvas = document.createElement("canvas");
    canvas.className = styles.canvas;
    host.append(canvas);

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    let [phi, theta] = home;
    let velocity = 0;
    let pointer: { id: number; x: number; y: number } | null = null;
    let pressStart = { x: 0, y: 0 };
    let lastInteraction = -Infinity;
    let frameId = 0;
    let running = false;
    let globe: Globe;

    try {
      const size = canvas.clientWidth;
      globe = createGlobe(canvas, {
        devicePixelRatio: pixelRatio,
        width: size * pixelRatio,
        height: size * pixelRatio,
        phi,
        theta,
        dark: 0,
        diffuse: 1.3,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [1, 1, 1],
        markerColor: [0.41, 0.24, 0.68],
        glowColor: [1, 1, 1],
        scale: GLOBE_SCALE,
        // Os pontos são o chapéu do Momento, desenhado em HTML por cima do globo.
        markers: [],
        arcs,
        arcColor: [0.66, 0.5, 0.83],
        arcWidth: 0.7,
        arcHeight: 0.3,
      });
    } catch {
      host.replaceChildren();
      onUnavailable();
      return;
    }

    const placePins = () => {
      const size = canvas.clientWidth;
      regions.forEach((region, index) => {
        const pin = pinRefs.current[index];
        if (!pin) return;
        const point = project(cities[region.anchor], phi, theta);
        pin.style.transform = `translate(${point.x * size}px, ${point.y * size}px)`;
        pin.dataset.visible = String(point.visible);
      });
    };

    const render = (time: number) => {
      const reduceMotion = motionPreference.matches;

      if (!pointer) {
        phi += velocity;
        velocity *= 0.92;
        if (Math.abs(velocity) < 0.0002) velocity = 0;

        const region = regions.find((item) => item.id === selectedRef.current);
        const idle = time - lastInteraction > IDLE_RETURN_MS;
        const target = region
          ? selectedView(cities[region.anchor], region.offset)
          : idle
            ? [
                home[0] + (reduceMotion ? 0 : Math.sin(time * 0.00017) * 0.16),
                home[1] + (reduceMotion ? 0 : Math.sin(time * 0.00011) * 0.025),
              ]
            : null;

        if (target && velocity === 0) {
          const ease = reduceMotion ? 1 : 0.06;
          phi += angleDelta(phi, target[0]) * ease;
          theta += (target[1] - theta) * ease;
        }
      }

      globe.update({ phi, theta });
      placePins();
      frameId = requestAnimationFrame(render);
    };

    const start = () => {
      if (running) return;
      running = true;
      frameId = requestAnimationFrame(render);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
      pressStart = { x: event.clientX, y: event.clientY };
      velocity = 0;
      canvas.setPointerCapture(event.pointerId);
      canvas.dataset.dragging = "true";
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!pointer || pointer.id !== event.pointerId) return;
      const size = canvas.clientWidth || 1;
      const deltaPhi = ((event.clientX - pointer.x) / size) * Math.PI;
      const deltaTheta = ((event.clientY - pointer.y) / size) * Math.PI;
      phi += deltaPhi;
      theta = Math.max(-THETA_LIMIT, Math.min(THETA_LIMIT, theta + deltaTheta));
      velocity = deltaPhi;
      pointer = { ...pointer, x: event.clientX, y: event.clientY };
      lastInteraction = performance.now();
      // Arrastar solta o foco da região selecionada, como no mapa do Trilha.
      if (selectedRef.current) setSelected(null);
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!pointer || pointer.id !== event.pointerId) return;
      pointer = null;
      lastInteraction = performance.now();
      delete canvas.dataset.dragging;
      // Um clique no globo, sem arrastar, fecha a região aberta.
      const moved = Math.hypot(event.clientX - pressStart.x, event.clientY - pressStart.y);
      if (event.type === "pointerup" && moved < 4 && selectedRef.current) setSelected(null);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    const resizeObserver = new ResizeObserver(() => {
      const size = canvas.clientWidth;
      globe.update({ width: size * pixelRatio, height: size * pixelRatio });
      placePins();
    });
    resizeObserver.observe(canvas);

    // Só anima enquanto a seção está na tela.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    intersectionObserver.observe(stage);

    placePins();

    return () => {
      stop();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      globe.destroy();
      host.replaceChildren();
    };
  }, [onUnavailable]);

  return (
    <div className={styles.globeArea}>
      <div ref={stageRef} className={styles.stage}>
        <svg className={styles.orbit} viewBox="0 0 500 500" aria-hidden="true">
          <defs>
            <path
              id="momento-orbit"
              d="M250,250 m-232,0 a232,232 0 1,1 464,0 a232,232 0 1,1 -464,0"
            />
          </defs>
          <g className={styles.orbitRotation}>
            <text>
              <textPath href="#momento-orbit" textLength="1450" lengthAdjust="spacing">
                {t.universities.orbit}
              </textPath>
            </text>
          </g>
        </svg>

        <div
          ref={canvasHostRef}
          className={styles.canvasHost}
          role="img"
          aria-label={t.universities.globeDescription}
        />

        <div className={styles.pins} data-has-selection={Boolean(selected)}>
          {regions.map((region, index) => {
            const [dx, dy] = region.offset;
            const isSelected = region.id === selected;
            return (
              <div
                key={region.id}
                ref={(node) => {
                  pinRefs.current[index] = node;
                }}
                className={styles.pin}
                data-visible="false"
                data-selected={isSelected}
              >
                <span
                  className={styles.pinLeader}
                  style={{
                    // Arredondado para o HTML do servidor e o do cliente baterem.
                    width: `${Math.hypot(dx, dy).toFixed(2)}px`,
                    transform: `rotate(${Math.atan2(dy, dx).toFixed(4)}rad)`,
                  }}
                />
                <Image
                  src="/assets/logo-fig.png"
                  alt=""
                  width={48}
                  height={48}
                  className={styles.pinHat}
                />
                <div
                  className={styles.pinGroup}
                  data-grow={listGrowsUp(region.offset) ? "up" : "down"}
                  style={{ left: dx, top: dy }}
                >
                  <button
                    type="button"
                    className={styles.pinLabel}
                    aria-pressed={isSelected}
                    aria-label={`${t.universities.regionAria} ${region.name}`}
                    onClick={() => setSelected(isSelected ? null : region.id)}
                  >
                    {region.name}
                  </button>
                  {isSelected && (
                    <ul className={styles.pinList}>
                      {selectedUniversities.map((university, order) => (
                        <li key={university.name} style={{ "--i": order } as CSSProperties}>
                          <a href={university.url} target="_blank" rel="noopener noreferrer">
                            {university.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <span className={styles.hint}>{t.universities.hint}</span>
      </div>

    </div>
  );
}

export default function Universities() {
  const { t } = useLanguage();
  const [globeUnavailable, setGlobeUnavailable] = useState(false);
  const handleGlobeUnavailable = useCallback(() => setGlobeUnavailable(true), []);
  const universities = t.universities.items;
  const regionCount = regions.length;

  return (
    <section id="universidades" className="bg-white px-[5vw] py-20 md:py-28">
      <div className={styles.layout}>
        <div className={styles.copy}>
          <span className="text-momento-accent font-bold mb-6 text-base uppercase tracking-wider">
            {t.universities.badge}
          </span>
          <h3 className={styles.heading}>{t.universities.title}</h3>
          <p className={styles.description}>{t.universities.description}</p>
          <dl className={styles.stats}>
            <div>
              <dt>{t.universities.universitiesLabel}</dt>
              <dd>{universities.length}</dd>
            </div>
            <div>
              <dt>{t.universities.regionsLabel}</dt>
              <dd>{regionCount}</dd>
            </div>
          </dl>
        </div>

        {globeUnavailable ? (
          <ul className={styles.fallback}>
            {universities.map((university) => (
              <li key={university.name}>
                <a href={university.url} target="_blank" rel="noopener noreferrer">
                  {university.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <UniversityGlobe
            universities={universities}
            onUnavailable={handleGlobeUnavailable}
          />
        )}
      </div>
    </section>
  );
}
