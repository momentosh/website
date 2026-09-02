"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Universities.module.css";

export default function Universities() {
  const { t } = useLanguage();
  const marqueeDuration = Math.max(24, t.universities.items.length * 5);

  return (
    <section id="universidades" className="py-20 px-[5vw]">
      <div className="max-w-[1440px] mx-auto text-center">
        <h3 className="font-display font-medium text-[30px] md:text-[40px] lg:text-[48px] leading-[1.02] tracking-[-0.03em] text-black mb-12 md:mb-16">
          {t.universities.title}
        </h3>

        <div className={styles.marquee}>
          <div
            className={styles.track}
            style={{ animationDuration: `${marqueeDuration}s` }}
          >
            {[false, true].map((isDuplicate) => (
              <div
                key={isDuplicate ? "duplicate" : "original"}
                className={styles.group}
                aria-hidden={isDuplicate || undefined}
              >
                {t.universities.items.map((uni) => (
                  <a
                    key={uni.name}
                    href={uni.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={uni.name}
                    tabIndex={isDuplicate ? -1 : undefined}
                    className="relative block h-20 w-32 shrink-0 grayscale opacity-60 transition-all duration-300 ease-[var(--ease-out-expo)] hover:scale-105 hover:grayscale-0 hover:opacity-100 focus-visible:scale-105 focus-visible:grayscale-0 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-momento-mid md:h-28 md:w-44"
                  >
                    <Image
                      src={uni.logo}
                      alt={uni.name}
                      fill
                      sizes="(min-width: 768px) 176px, 128px"
                      className="object-contain"
                    />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
