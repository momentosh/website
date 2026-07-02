"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";

const FORM_MOMENTINHO = "https://forms.gle/TxCvn7Brv8v8ftr48";
const FORM_MOMENTO = "https://forms.gle/jAaP1fdB27upxf1h9";

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-300 group-hover:translate-x-1"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Apply() {
  const { t } = useLanguage();

  const tracks = [
    {
      ...t.apply.tracks.momentinho,
      href: FORM_MOMENTINHO,
      gradient: "from-momento-mid via-momento-brand to-momento-accent",
      glow: "bg-momento-light/30",
    },
    {
      ...t.apply.tracks.momento,
      href: FORM_MOMENTO,
      gradient: "from-momento-dark via-momento-mid to-momento-brand",
      glow: "bg-momento-accent/40",
    },
  ];

  return (
    <section id="inscricoes" className="scroll-mt-24 px-[5vw] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-[clamp(36px,6vw,64px)] font-medium leading-[0.95] tracking-[-0.03em] text-momento-deep">
            {t.apply.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-balance text-momento-deep/70 md:text-xl">
            {t.apply.description}
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          {tracks.map((track, i) => (
            <motion.div
              key={track.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.12 }}
              className={`group relative flex h-full flex-col overflow-hidden rounded-[24px] bg-gradient-to-br ${track.gradient} p-8 text-white md:p-10`}
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full ${track.glow} blur-[100px]`}
              />

              <div className="relative flex h-full flex-col">
                <h3 className="font-display text-[clamp(28px,4vw,40px)] font-medium leading-[1.0] tracking-[-0.02em]">
                  {track.name}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-white/85 md:text-lg">
                  {track.description}
                </p>

                <div className="mt-auto pt-8">
                  <Link
                    href={track.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-medium text-momento-dark transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    {track.btn}
                    <ArrowIcon />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-momento-deep/55">{t.apply.note}</p>
      </div>
    </section>
  );
}
