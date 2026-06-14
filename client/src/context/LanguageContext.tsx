"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { pt, en, Dictionary } from "@/i18n/dictionaries";

type Language = "pt" | "en";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  registrationOpen: boolean;
  setRegistrationOpen: (open: boolean) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // SSR-safe hydration: server renders default, client syncs from localStorage/navigator on mount.
    /* eslint-disable react-hooks/set-state-in-effect */
    const savedLang = localStorage.getItem("momento-lang") as Language;
    if (savedLang && (savedLang === "pt" || savedLang === "en")) {
      setLanguage(savedLang);
    } else {
      const browserLang = navigator.language.startsWith("en") ? "en" : "pt";
      setLanguage(browserLang);
    }

    const savedReg = localStorage.getItem("momento-registration");
    if (savedReg !== null) {
      setRegistrationOpen(savedReg === "true");
    }

    setMounted(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("momento-lang", lang);
  };

  const handleSetRegistrationOpen = (open: boolean) => {
    setRegistrationOpen(open);
    localStorage.setItem("momento-registration", String(open));
  };

  const t = language === "en" ? en : pt;

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: "pt", setLanguage: handleSetLanguage, registrationOpen: false, setRegistrationOpen: handleSetRegistrationOpen, t: pt }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, registrationOpen, setRegistrationOpen: handleSetRegistrationOpen, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage deve ser usado dentro de um LanguageProvider");
  }
  return context;
}
