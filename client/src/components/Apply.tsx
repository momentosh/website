"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";

export default function Apply() {
  const { t } = useLanguage();

  return (
    <section id="inscricoes" className="scroll-mt-24 px-[5vw] py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-momento-brand via-momento-mid to-momento-dark px-8 py-16 text-center text-white md:px-16 md:py-20"
        >
          <div aria-hidden className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-momento-accent/40 blur-[100px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-momento-light/30 blur-[100px]" />

          <div className="relative">
            <h2 className="mt-6 font-display text-[clamp(36px,6vw,72px)] font-medium leading-[0.95] tracking-[-0.03em]">
              {t.apply.title}
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-balance text-white/75 md:text-xl">
              {t.apply.description}
            </p>

            <Link
              href="https://forms.gle/fT6ps57CYxyfbLw37"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-medium text-momento-dark transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {t.apply.btn}
            </Link>

            <p className="mt-5 text-sm text-white/55">{t.apply.note}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
