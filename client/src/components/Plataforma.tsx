"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";
import { PLATAFORMA } from "@/urls";

/**
 * A seção sobre o app, e não sobre o programa.
 *
 * `Services` fala do que o Momento oferece a quem participa — mentorias,
 * eventos, comunidade. Esta fala da ferramenta, e existe por um motivo concreto:
 * a verificação do cliente OAuth compara o que a home page descreve com os
 * escopos que o app pede. Enquanto esta página não mencionasse a agenda, o
 * `calendar.events` não tinha de onde se justificar.
 *
 * O terceiro card é esse justificação, e por isso ele desce ao detalhe de dizer
 * o que o escopo permite e o que não permite. Mexer nele é mexer na verificação.
 */
export default function Plataforma() {
  const { t } = useLanguage();

  return (
    <section className="px-[5vw] py-20 lg:py-28" id="plataforma">
      <div className="max-w-[1200px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-base mb-4 text-momento-accent font-medium uppercase tracking-wide"
        >
          {t.plataforma.badge}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display font-medium text-[32px] md:text-[42px] lg:text-[52px] leading-[1.05] tracking-[-0.03em] text-black mb-4"
        >
          {t.plataforma.title}
        </motion.h2>

        <p className="text-[17px] leading-relaxed text-neutral-600 max-w-[60ch] mb-12">
          {t.plataforma.intro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.plataforma.cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (idx + 1) }}
              className="bg-white rounded-[24px] border border-black/[0.08] p-8"
            >
              <h3 className="font-display font-medium text-[20px] text-black mb-3">
                {card.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-neutral-600">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <a
          href={PLATAFORMA}
          className="mt-12 inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-medium bg-momento-brand text-white border border-momento-brand transition-all duration-300 hover:bg-transparent hover:text-momento-brand"
        >
          {t.plataforma.cta}
        </a>
      </div>
    </section>
  );
}
