"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
  const { t } = useLanguage();

  const cardsWithDelay = t.services.cards.map((card, index) => ({
    ...card,
    delay: 0.1 * (index + 1)
  }));

  // Inclinação base de cada card (estilo trilha): meio torto, endireita no hover
  const rotations = [-2.5, 1.8, -1.6];

  return (
    <section className="px-[5vw] py-20 lg:py-28" id="servicos">
      <div className="max-w-[1440px] mx-auto w-full bg-momento-deep text-white rounded-[32px] px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-base mb-6 text-momento-accent font-medium uppercase tracking-wide"
        >
          {t.services.badge}
        </motion.p>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center font-display font-medium text-[42px] md:text-[60px] lg:text-[80px] leading-[0.95] tracking-[-0.04em] mb-16 md:mb-24 lg:mb-32"
        >
          {t.services.title1}<br/>{t.services.title2}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cardsWithDelay.map((card, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 30, rotate: rotations[idx % rotations.length] }}
              whileInView={{ opacity: 1, y: 0, rotate: rotations[idx % rotations.length] }}
              whileHover={{
                rotate: 0,
                y: -8,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group flex flex-col rounded-[24px] bg-white/[0.04] border border-white/10 p-8 lg:p-9 transition-[background-color,border-color,box-shadow] duration-300 hover:bg-white/[0.07] hover:border-momento-accent hover:shadow-[0_24px_50px_-20px_rgba(168,127,212,0.45)]"
            >
              <h3 className="font-display text-[26px] md:text-[30px] lg:text-[34px] font-medium leading-[1.05] tracking-[-0.02em] text-white">
                {card.title}
              </h3>
              <p className="text-[15px] md:text-base leading-relaxed text-white/70 mt-3">
                {card.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
