"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function ManualMentorPage() {
  const { t } = useLanguage();
  const { objectives, activities } = t.manual;
  const m = t.manualMentor;
  const steps = [...m.steps, { title: m.activitiesStepTitle, items: activities }];

  return (
    <main className="relative z-[1] min-h-screen">
      <Navbar />

      <section className="px-[5vw] pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-[1200px] mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-momento-brand transition-colors mb-8"
          >
            {m.backLink}
          </Link>

          <span className="text-momento-accent font-bold mb-4 text-base tracking-wider block">
            {m.badge}
          </span>
          <h1 className="font-display font-medium text-[42px] md:text-[60px] lg:text-[72px] leading-[0.98] tracking-[-0.035em] text-black mb-3">
            {m.title1}
            <br />
            {m.title2}
          </h1>
        </div>
      </section>

      <section className="bg-white px-[5vw] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display font-medium text-[32px] md:text-[42px] leading-[1.05] tracking-[-0.025em] text-black mb-4">
            {m.objectivesHeading}
          </h2>
          <div className="flex flex-col gap-4 text-[17px] text-neutral-600 leading-relaxed mb-10">
            {m.objectivesIntro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {objectives.map((item, idx) => {
              const isFeature = idx === 0;
              const isWide = idx === 1 || idx === 4;
              return (
                <article
                  key={item.title}
                  className={`rounded-2xl border border-black/[0.08] bg-momento-light/40 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-momento-brand hover:shadow-[0_24px_50px_-20px_rgba(133,92,196,0.45)] ${
                    isFeature ? "md:col-span-2 md:row-span-2 p-8" : "p-6"
                  } ${isWide ? "md:col-span-2" : ""}`}
                >
                  <h3
                    className={`font-display font-medium text-momento-dark mb-2 ${
                      isFeature ? "text-2xl" : "text-lg"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-neutral-600 leading-relaxed ${
                      isFeature ? "text-base" : "text-[15px]"
                    }`}
                  >
                    {item.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-[5vw] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display font-medium text-[32px] md:text-[42px] leading-[1.05] tracking-[-0.025em] text-black mb-4">
            {m.stepsHeading}
          </h2>
          <p className="text-[17px] text-neutral-600 leading-relaxed mb-10">{m.stepsIntro}</p>

          <div className="flex flex-col gap-4 mb-10">
            {steps.map((step, idx) => (
              <article
                key={step.title}
                className="rounded-2xl bg-white border border-black/[0.08] shadow-sm p-6 md:p-7 flex gap-5"
              >
                <span className="shrink-0 w-9 h-9 rounded-full bg-momento-brand text-white font-display text-base flex items-center justify-center">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-medium mb-2">
                    {step.title}
                  </h3>
                  {"items" in step ? (
                    <ul className="flex flex-col gap-2">
                      {step.items.map((activity) => (
                        <li
                          key={activity}
                          className="flex gap-2 text-[15px] md:text-base text-neutral-600"
                        >
                          <span className="text-momento-brand">→</span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[15px] md:text-base text-neutral-600 leading-relaxed">
                      {step.desc}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
