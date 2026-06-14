"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-momento-off-white pt-20 pb-12 px-[5vw]">
      {/* Top shadow gradient for depth */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/[0.04] to-transparent pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative">
        <div className="bg-white rounded-[24px] border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-16">
            {/* Left */}
            <div>
              <Image src="/assets/logo-fig.png" alt="Momento" width={64} height={64} className="h-16 w-auto mb-5" />
              <p className="text-neutral-500 max-w-sm leading-relaxed text-[15px]">
                {t.footer.desc}
              </p>
              <div className="flex gap-3 mt-6">
                <a href="https://www.linkedin.com/company/momentosh/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-neutral-600 hover:bg-black hover:text-white hover:border-black transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://www.instagram.com/momento.sh/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-neutral-600 hover:bg-black hover:text-white hover:border-black transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>
                <a href="mailto:contato@momento.sh" className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-neutral-600 hover:bg-black hover:text-white hover:border-black transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </a>
              </div>
            </div>

            {/* Right columns */}
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <p className="font-display text-sm font-semibold text-black mb-5 tracking-wide">{t.footer.navTitle}</p>
                <ul className="flex flex-col gap-3 text-neutral-500 text-[15px]">
                  <li><Link href="#sobre" className="hover:text-black transition-colors">{t.navbar.about}</Link></li>
                  <li><Link href="#depoimentos" className="hover:text-black transition-colors">{t.navbar.testimonials}</Link></li>
                  <li><Link href="#servicos" className="hover:text-black transition-colors">{t.navbar.services}</Link></li>
                  <li><Link href="#faq" className="hover:text-black transition-colors">{t.navbar.faq}</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-black mb-5 tracking-wide">Social</p>
                <ul className="flex flex-col gap-3 text-neutral-500 text-[15px]">
                  <li><a href="https://www.linkedin.com/company/momentosh/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">LinkedIn</a></li>
                  <li><a href="https://www.instagram.com/momento.sh/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Instagram</a></li>
                  <li><a href="mailto:contato@momento.sh" className="hover:text-black transition-colors">Email</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4 text-neutral-400 text-sm">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
