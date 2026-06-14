"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";

const AUTO_INTERVAL = 6000;

export default function CTA() {
  const { t } = useLanguage();
  const events = t.events.items;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % events.length);
  }, [events.length]);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + events.length) % events.length);
  }, [events.length]);

  useEffect(() => {
    if (paused || events.length <= 1) return;
    const timer = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next, events.length]);

  const event = events[active];

  return (
    <section className="px-[5vw] pt-20 pb-24">
      <div className="max-w-[1440px] mx-auto">
        <p className="text-base text-neutral-500 font-medium tracking-wide uppercase mb-6">
          {t.events.badge}
        </p>
        <h2 className="font-display font-medium text-[clamp(44px,7vw,84px)] leading-[0.95] tracking-[-0.04em] mb-6">
          {t.events.title}
        </h2>
        <p className="text-xl text-neutral-500 max-w-lg mb-16">
          {t.events.subtitle}
        </p>

        <div
          className="bg-momento-dark text-white rounded-[24px] overflow-hidden grid lg:grid-cols-[2fr_1fr] relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="p-6 md:p-10 lg:p-[80px] flex flex-col justify-center"
            >
              <div className="inline-block self-start px-4 py-2 bg-white/10 rounded-full mb-4">
                <span className="text-white font-bold text-sm">{event.date}</span>
              </div>
              <h3 className="font-display text-3xl font-medium mb-3">{event.title}</h3>
              <p className="text-lg text-white/70 mb-8">{event.description}</p>
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block self-start bg-white text-black border border-white rounded-full px-6 py-3 text-base font-medium hover:bg-transparent hover:text-white transition-all shadow-sm hover:-translate-y-1"
              >
                {event.linkText}
              </a>
            </motion.div>
          </AnimatePresence>

          <div className="w-full bg-momento-deep min-h-[300px] md:min-h-[400px] h-full relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={event.thumbnail}
                  alt={event.title}
                  fill
                  className="object-cover opacity-80"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          {events.length > 1 && (
            <div className="absolute bottom-6 right-6 flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Previous event"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Next event"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Dots */}
        {events.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {events.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${i === active ? "bg-momento-dark scale-110" : "bg-black/15 hover:bg-black/30"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
