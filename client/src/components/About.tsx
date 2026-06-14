"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseInt(match[2], 10) : 0;
  const suffix = match?.[3] ?? "";
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${prefix}${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, { duration: 1.8, ease: "easeOut" });
    return controls.stop;
  }, [inView, count, target]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
    </span>
  );
}

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-20 md:py-28 lg:py-[128px] px-[5vw]" id="sobre">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-16">
        
        {/* Bloco 1: Texto + Imagem */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Coluna Esquerda: Textos */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center py-10 lg:pr-10"
          >
            <span className="text-momento-accent font-bold mb-6 text-base uppercase tracking-wider">
              {t.about.badge}
            </span>
            <h2 className="font-display font-medium text-[40px] md:text-[52px] lg:text-[64px] leading-[1.02] tracking-[-0.035em] text-black mb-6">
              {t.about.title1}
            </h2>
            <div className="flex flex-col gap-6 text-[17px] text-neutral-800 leading-relaxed max-w-[95%]">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>
          </motion.article>

          {/* Coluna Direita: Imagem Gigante */}
          <motion.article 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="min-h-[300px] lg:min-h-[400px] rounded-[32px] overflow-hidden relative"
          >
            <Image 
              src="/assets/hero-fig.png" 
              alt="Momento Mentorship" 
              fill 
              className="object-cover" 
            />
          </motion.article>

        </div>

        {/* Bloco 2: 3 Cards de Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card Stat 1 */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-momento-lightest rounded-[32px] p-6 md:p-8 lg:p-10 flex flex-col justify-center items-start md:items-center text-left md:text-center"
          >
            <CountUp value={t.about.stat1Number} className="font-display text-[48px] md:text-[64px] lg:text-[80px] font-medium leading-none tracking-[-0.04em] text-momento-dark mb-4 block" />
            <p className="text-neutral-600 text-lg">{t.about.stat1Label}</p>
          </motion.article>

          {/* Card Stat 2 */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-momento-lightest rounded-[32px] p-6 md:p-8 lg:p-10 flex flex-col justify-center items-start md:items-center text-left md:text-center"
          >
            <CountUp value={t.about.stat2Number} className="font-display text-[48px] md:text-[64px] lg:text-[80px] font-medium leading-none tracking-[-0.04em] text-momento-dark mb-4 block" />
            <p className="text-neutral-600 text-lg">{t.about.stat2Label}</p>
          </motion.article>

          {/* Card Stat 3 */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-momento-lightest rounded-[32px] p-6 md:p-8 lg:p-10 flex flex-col justify-center items-start md:items-center text-left md:text-center"
          >
            <CountUp value={t.about.stat3Number} className="font-display text-[48px] md:text-[64px] lg:text-[80px] font-medium leading-none tracking-[-0.04em] text-momento-dark mb-4 block" />
            <p className="text-neutral-600 text-lg">{t.about.stat3Label}</p>
          </motion.article>

        </div>
      </div>
    </section>
  );
}
