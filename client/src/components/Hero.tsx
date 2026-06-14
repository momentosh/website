"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";

// Manchas da aurora (nas bordas, atrás do título). Cores da paleta roxa;
// durações longas e diferentes = movimento orgânico, nunca sincronizado.
const BLOBS = [
  {
    className: "left-[-6%] top-[6%] h-[46vh] w-[46vh] bg-momento-accent/60 blur-[100px]",
    animate: {
      x: [0, 60, -20, 0],
      y: [0, 150, 60, 0],
      scale: [1, 1.18, 1.08, 1],
      opacity: [0.55, 0.85, 0.6, 0.55],
    },
    duration: 17,
    delay: 0.8,
  },
  {
    className: "right-[-6%] bottom-[6%] h-[48vh] w-[48vh] bg-momento-brand/55 blur-[100px]",
    animate: {
      x: [0, -60, 20, 0],
      y: [0, -150, -60, 0],
      scale: [1, 1.12, 1.22, 1],
      opacity: [0.5, 0.8, 0.55, 0.5],
    },
    duration: 19,
    delay: 0.4,
  },
  {
    className: "left-[-4%] bottom-[8%] h-[40vh] w-[40vh] bg-momento-light/80 blur-[110px]",
    animate: {
      x: [0, 50, -25, 0],
      y: [0, -130, 40, 0],
      scale: [1, 1.14, 1.06, 1],
      opacity: [0.6, 0.88, 0.7, 0.6],
    },
    duration: 14,
    delay: 0,
  },
  {
    className: "right-[2%] top-[12%] h-[34vh] w-[34vh] bg-momento-mid/40 blur-[90px]",
    animate: {
      x: [0, -45, 30, 0],
      y: [0, 140, -50, 0],
      scale: [1, 1.25, 1.1, 1],
      opacity: [0.4, 0.65, 0.45, 0.4],
    },
    duration: 22,
    delay: 1.6,
  },
];

export default function Hero() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax na saída da hero: a aurora e o título "ficam para trás"
  // (mais lentos) enquanto a próxima seção sobe por cima ao rolar.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const auroraY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const auroraOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const titleOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);

  // "encontre seu" + "mentor" -> ["encontre", "seu", "mentor"] (one word per line)
  const leadWords = t.hero.title1.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh text-momento-dark flex items-center justify-center overflow-hidden"
    >
      {/* Aurora roxa que respira atrás do título (decorativa) + parallax na saída */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={reduceMotion ? undefined : { y: auroraY, opacity: auroraOpacity }}
      >
        {BLOBS.map((blob, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${blob.className}`}
            animate={reduceMotion ? undefined : blob.animate}
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: blob.duration,
                    delay: blob.delay,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }
            }
          />
        ))}
      </motion.div>

      <motion.div
        className="relative"
        style={reduceMotion ? undefined : { y: titleY, opacity: titleOpacity }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="px-[5vw] text-center font-display font-medium lowercase text-[clamp(64px,13vw,180px)] leading-[0.82] tracking-[-0.045em] text-momento-brand"
        >
          {leadWords.map((word) => (
            <span key={word} className="block">
              {word}
            </span>
          ))}
          <span className="block">{t.hero.title2}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#time"
            className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-medium bg-momento-brand text-white border border-momento-brand transition-all duration-300 hover:bg-transparent hover:text-momento-brand"
          >
            {t.hero.btnPrimary}
          </a>
          <a
            href="#sobre"
            className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-medium text-momento-dark border border-momento-dark/20 transition-all duration-300 hover:border-momento-brand hover:text-momento-brand"
          >
            {t.hero.btnSecondary}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
