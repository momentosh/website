"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { PLATAFORMA } from "@/urls";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const homePrefix = pathname === "/" ? "" : "/";

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1280) setIsMenuOpen(false);
    };

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: `${homePrefix}#sobre`, label: t.navbar.about },
    { href: `${homePrefix}#depoimentos`, label: t.navbar.testimonials },
    { href: `${homePrefix}#time`, label: t.navbar.team },
    { href: `${homePrefix}#servicos`, label: t.navbar.services },
    { href: `${homePrefix}#faq`, label: t.navbar.faq },
  ];
  const mobileManualLinks = [
    { href: "/manual-mentoria", label: t.footer.manualMentee },
    { href: "/manual-mentor", label: t.footer.manualMentor },
  ];
  const mobileNavLinks = [
    ...navLinks.filter((link) => link.href !== `${homePrefix}#faq`),
    ...mobileManualLinks,
    { href: `${homePrefix}#faq`, label: t.navbar.faq },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* Navbar */}
      <motion.header
        initial={{ backgroundColor: "rgba(255,255,255,0)", borderBottomColor: "rgba(255,255,255,0)" }}
        animate={{
          backgroundColor: isScrolled || isMenuOpen ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0)",
          backdropFilter: isScrolled || isMenuOpen ? "blur(12px)" : "blur(0px)",
          borderBottomColor: isScrolled ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0)",
        }}
        style={{ WebkitBackdropFilter: isScrolled || isMenuOpen ? "blur(12px)" : "blur(0px)" }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-x-0 h-[72px] z-[1000] px-[5vw] flex items-center border-b border-transparent transition-all duration-300 top-0`}
      >
        {/* Desktop layout */}
        {/* A trilha da direita era 200px fixos, o que bastava para o seletor de
            idioma sozinho. Com o "Entrar" ao lado ela passou a apertar, e em
            inglês ("Sign in") o botão quebrava em duas linhas. `minmax` mantém a
            largura mínima que centralizava a navegação e deixa crescer — `auto`
            puro deixaria a trilha encolher e tiraria a navegação do centro. */}
        <div className="hidden xl:grid grid-cols-[200px_1fr_minmax(200px,auto)] gap-4 items-center max-w-[1440px] mx-auto w-full">
          <Image src="/assets/logo-fig.png" alt="Momento" width={64} height={64} className="h-16 w-auto" />

          <nav className="flex justify-center gap-12 text-base font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-momento-dark transition-colors duration-300 hover:text-momento-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="justify-self-end flex items-center gap-4">
            <LangToggle language={language} setLanguage={setLanguage} />
            {/*
              Fora do `navLinks`: aqueles são âncoras desta página, este sai do
              site para a plataforma. `<a>` e não `<Link>` pelo mesmo motivo —
              outro domínio, outro app, nada para o roteador pré-buscar.

              Último da barra, depois do seletor de idioma: ação de conta mora no
              canto, é ali que quem já tem conta procura.

              `text-sm` e `px-5`, não o `text-base px-6` dos outros botões do
              site. Dá 82x43px contra os 54px do CTA do hero, e a barra é fixa —
              no tamanho cheio esse pill acompanhava a rolagem e virava o
              elemento mais pesado de toda seção, empatando com a primária da
              tela. Sólido mesmo assim: em contorno ele e o seletor viram dois
              pills iguais lado a lado e o seletor é que parece o botão.
            */}
            <a
              href={PLATAFORMA}
              className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium bg-momento-brand text-white border border-momento-brand transition-all duration-300 hover:bg-transparent hover:text-momento-brand"
            >
              {t.navbar.enter}
            </a>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex xl:hidden items-center justify-between w-full">
          <Image src="/assets/logo-fig.png" alt="Momento" width={64} height={64} className="h-12 w-auto" />

          <button
            type="button"
            aria-label={isMenuOpen ? t.navbar.closeMenu : t.navbar.openMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((v) => !v)}
            className="relative h-10 w-10 flex items-center justify-center rounded-full text-momento-dark transition-colors duration-300"
          >
            <span className="sr-only">{isMenuOpen ? t.navbar.closeMenu : t.navbar.openMenu}</span>
            <motion.span
              animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 0 : -6 }}
              transition={{ duration: 0.2 }}
              className="absolute h-0.5 w-6 bg-current"
            />
            <motion.span
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="absolute h-0.5 w-6 bg-current"
            />
            <motion.span
              animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? 0 : 6 }}
              transition={{ duration: 0.2 }}
              className="absolute h-0.5 w-6 bg-current"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="fixed inset-0 z-[998] bg-black/30 xl:hidden"
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ WebkitBackdropFilter: "blur(12px)", backdropFilter: "blur(12px)" }}
              className={`fixed inset-x-0 z-[999] overflow-hidden bg-white/95 shadow-lg xl:hidden top-[72px]`}
            >
              <nav className="flex max-h-[calc(100dvh-72px)] flex-col overflow-y-auto px-[5vw] py-4">
                {mobileNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="py-4 text-lg font-medium text-black border-b border-black/5 hover:text-momento-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}

                <a
                  href={PLATAFORMA}
                  onClick={closeMenu}
                  className="mt-6 inline-flex items-center justify-center rounded-full px-6 py-3 text-lg font-medium bg-momento-brand text-white border border-momento-brand transition-all duration-300"
                >
                  {t.navbar.enter}
                </a>

                <div className="flex justify-center pt-6 pb-4">
                  <LangToggle
                    language={language}
                    setLanguage={(l) => {
                      setLanguage(l);
                      closeMenu();
                    }}
                  />
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function LangToggle({
  language,
  setLanguage,
}: {
  language: "pt" | "en";
  setLanguage: (l: "pt" | "en") => void;
}) {
  return (
    <div className="flex items-center rounded-full p-1 border border-momento-dark/20 transition-colors duration-300">
      {(["pt", "en"] as const).map((lang) => {
        const active = language === lang;
        return (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`relative px-3 py-1 text-xs font-medium rounded-full transition-colors duration-300 ${
              active ? "text-white" : "text-momento-dark hover:text-momento-accent"
            }`}
          >
            {active && (
              <motion.div
                layoutId="active-lang"
                className="absolute inset-0 rounded-full bg-momento-brand"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{lang.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
}
