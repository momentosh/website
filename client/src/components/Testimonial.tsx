"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Testimonial() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  
  const items = t.testimonials.items;
  const item = items[active];

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused, items.length]);

  const next = () => setActive((prev) => (prev + 1) % items.length);
  const prev = () => setActive((prev) => (prev - 1 + items.length) % items.length);

  return (
    <section className="flex flex-col justify-start px-[5vw] pt-24 pb-12 lg:pt-28 lg:pb-16" id="depoimentos">
      <div className="max-w-[1024px] mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-base mb-6 text-neutral-600 font-medium tracking-wide uppercase"
        >
          {t.testimonials.badge}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center font-display font-medium text-[42px] md:text-[60px] lg:text-[80px] leading-[0.95] tracking-[-0.04em] mb-12 md:mb-16"
        >
          {t.testimonials.title1}<br/>{t.testimonials.title2}
        </motion.h2>

        <motion.article
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative bg-white rounded-[24px] py-8 px-6 md:py-12 md:px-12 lg:px-24 shadow-sm border border-black/5 flex flex-col md:flex-row gap-8 items-center md:h-[480px]"
        >
        <button onClick={prev} className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border border-black/10 bg-white hover:bg-black/5 transition-colors z-10" aria-label="Anterior">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button onClick={next} className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border border-black/10 bg-white hover:bg-black/5 transition-colors z-10" aria-label="Próximo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
          <div className="w-full md:w-[320px] h-[280px] md:h-[400px] relative rounded-2xl overflow-hidden shadow-inner shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-momento-accent font-display text-6xl leading-[0.5] mb-4 block">&ldquo;</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-display text-[18px] md:text-[22px] lg:text-[26px] font-medium leading-[1.25] tracking-[-0.02em] text-black mb-6">
                  {item.quote}
                </h3>
                <div>
                  <p className="font-display text-xl text-black">{item.name}</p>
                  <p className="text-momento-dark font-medium mt-1">{item.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center mt-6">
              <div className="flex gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`w-3 h-3 rounded-full transition-all ${i === active ? "bg-momento-dark scale-110" : "bg-black/15 hover:bg-black/30"}`}
                    aria-label={`Ir para depoimento ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.article>
        <div className="md:hidden flex justify-center gap-2 mt-4">
          <button onClick={prev} className="w-10 h-10 flex items-center justify-center rounded-full border border-black/10 bg-white hover:bg-black/5 transition-colors" aria-label="Anterior">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button onClick={next} className="w-10 h-10 flex items-center justify-center rounded-full border border-black/10 bg-white hover:bg-black/5 transition-colors" aria-label="Próximo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
