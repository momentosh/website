"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";

export default function Tweaks() {
  const { registrationOpen, setRegistrationOpen } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 right-0 bg-white rounded-2xl shadow-2xl border border-black/10 p-5 w-64"
          >
            <p className="font-display text-sm font-semibold text-black mb-4 tracking-wide">Tweaks</p>

            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Inscrições</span>
              <button
                onClick={() => setRegistrationOpen(!registrationOpen)}
                className={`relative w-12 h-7 rounded-full transition-colors ${registrationOpen ? "bg-green-500" : "bg-neutral-300"}`}
              >
                <motion.div
                  animate={{ x: registrationOpen ? 20 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-[3px] w-[22px] h-[22px] bg-white rounded-full shadow"
                />
              </button>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              {registrationOpen ? "Abertas" : "Fechadas"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 bg-momento-dark text-white rounded-full shadow-lg flex items-center justify-center hover:bg-momento-mid transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </button>
    </div>
  );
}
