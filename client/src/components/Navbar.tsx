"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
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
    { href: "#sobre", label: t.navbar.about },
    { href: "#depoimentos", label: t.navbar.testimonials },
    { href: "#time", label: t.navbar.team },
    { href: "#servicos", label: t.navbar.services },
    { href: "#faq", label: t.navbar.faq },
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
        <div className="hidden lg:grid grid-cols-[200px_1fr_200px] gap-4 items-center max-w-[1440px] mx-auto w-full">
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

          <div className="justify-self-end flex items-center gap-6">
            <LangToggle language={language} setLanguage={setLanguage} />
            <CtaButton href={t.links.mentee} label={t.navbar.cta} />
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex lg:hidden items-center justify-between w-full">
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
              className="fixed inset-0 z-[998] bg-black/30 lg:hidden"
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
              className={`fixed inset-x-0 z-[999] overflow-hidden bg-white/95 shadow-lg lg:hidden top-[72px]`}
            >
              <nav className="flex flex-col px-[5vw] py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="py-4 text-lg font-medium text-black border-b border-black/5 hover:text-momento-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="flex justify-center pt-6 pb-4">
                  <LangToggle
                    language={language}
                    setLanguage={(l) => {
                      setLanguage(l);
                      closeMenu();
                    }}
                  />
                </div>

                <CtaButton
                  href={t.links.mentee}
                  label={t.navbar.cta}
                  fullWidth
                  onClick={closeMenu}
                />
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

function CtaButton({
  href,
  label,
  fullWidth = false,
  onClick,
}: {
  href: string;
  label: string;
  fullWidth?: boolean;
  onClick?: () => void;
}) {
  const base = `inline-flex justify-center border rounded-full px-6 py-3 text-sm font-medium whitespace-nowrap min-w-[140px] ${
    fullWidth ? "w-full" : ""
  }`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`${base} bg-momento-brand text-white border-momento-brand transition-all duration-300 hover:bg-transparent hover:text-momento-brand`}
    >
      {label}
    </Link>
  );
}
