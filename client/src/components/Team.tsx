"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

// Glyph oficial do "in" do LinkedIn (apenas as letras, sem o quadrado).
const LINKEDIN_IN = (
  <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM5 8H0v16h5V8zm7.982 0H8.014v16h4.968v-8.399c0-4.67 6.029-5.052 6.029 0V24H24V13.869c0-7.88-8.922-7.593-11.018-3.714V8z" />
);

// Só o octocat do GitHub (sem moldura).
const GITHUB_ICON = (
  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
);

export default function Team() {
  const { t } = useLanguage();
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  return (
    <section className="px-[5vw] py-20 lg:py-28" id="time">
      <div className="max-w-[1440px] mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-base mb-6 text-momento-accent font-medium uppercase tracking-wide"
        >
          {t.team.badge}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center font-display font-medium text-[42px] md:text-[60px] lg:text-[80px] leading-[0.95] tracking-[-0.04em] mb-16 md:mb-20"
        >
          {t.team.title1}<br />{t.team.title2}
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6">
          {t.team.members.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * (idx % 5) }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-momento-light">
                {!failed[idx] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                    onError={() => setFailed((f) => ({ ...f, [idx]: true }))}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-display text-4xl font-medium text-momento-dark/60 select-none">
                    {initials(member.name)}
                  </div>
                )}
              </div>

              <div className="pt-4">
                <p className="font-display text-[20px] md:text-[22px] font-medium leading-tight text-black">
                  {member.name}
                </p>
                <p className="mt-1 text-momento-brand text-sm md:text-base">
                  {member.role}
                </p>

                {member.socials.length > 0 && (
                  <div className="mt-4 flex items-center gap-2.5">
                    {member.socials.map((social) => {
                      const isLinkedin = social.type === "linkedin";
                      return (
                        <a
                          key={social.type}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} no ${social.type}`}
                          className={`w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5 ${
                            isLinkedin
                              ? "bg-momento-brand text-white hover:bg-momento-mid"
                              : "bg-neutral-300 text-neutral-800 hover:bg-neutral-400"
                          }`}
                        >
                          {isLinkedin ? (
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                              {LINKEDIN_IN}
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]" aria-hidden="true">
                              {GITHUB_ICON}
                            </svg>
                          )}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
