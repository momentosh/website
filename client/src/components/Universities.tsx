"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Universities() {
  const { t } = useLanguage();

  return (
    <section id="universidades" className="py-20 px-[5vw]">
      <div className="max-w-[1440px] mx-auto text-center">
        <h3 className="font-display font-medium text-[30px] md:text-[40px] lg:text-[48px] leading-[1.02] tracking-[-0.03em] text-black mb-16">
          {t.universities.title}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12 md:gap-x-16 md:gap-y-16 justify-items-center items-center">
          {t.universities.items.map((uni) => (
            <a
              key={uni.name}
              href={uni.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={uni.name}
              className="block h-20 w-full max-w-[10rem] md:h-28 md:max-w-[11rem] relative grayscale opacity-60 hover:opacity-100 hover:grayscale-0 hover:scale-110 transition-all duration-300 ease-[var(--ease-out-expo)]"
            >
              <Image
                src={uni.logo}
                alt={uni.name}
                fill
                className="object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
