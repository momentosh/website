"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { formatDate } from "@/lib/format";
import type { BlogPostMeta } from "@/lib/blog";

/**
 * A listagem do blog.
 *
 * Componente de cliente só para ler o idioma: os posts chegam prontos da página
 * de servidor (`app/blog/page.tsx`), que é quem tem acesso ao sistema de
 * arquivos. A ordem do `getAllPosts` é mantida — ordem de leitura é decisão de
 * quem edita, não do componente.
 */
export default function BlogList({ posts }: { posts: BlogPostMeta[] }) {
  const { t, language } = useLanguage();
  const b = t.blog;

  return (
    <section className="px-[5vw] pt-24 pb-16 md:pt-28 md:pb-20">
      <div className="max-w-[1200px] mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-momento-brand transition-colors mb-8"
        >
          {b.backToHome}
        </Link>

        <span className="text-momento-accent font-bold mb-4 text-base tracking-wider block">
          {b.badge}
        </span>
        <h1 className="font-display font-medium text-[42px] md:text-[60px] lg:text-[72px] leading-[0.98] tracking-[-0.035em] text-black mb-5">
          {b.title1}
          <br />
          {b.title2}
        </h1>
        <p className="text-[17px] md:text-lg text-neutral-600 leading-relaxed max-w-[60ch]">
          {b.subtitle}
        </p>

        {posts.length === 0 ? (
          <p className="mt-12 text-[17px] text-neutral-500">{b.empty}</p>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="relative rounded-2xl bg-white border border-black/[0.08] shadow-sm p-6 md:p-8 flex flex-col transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-momento-brand hover:shadow-[0_24px_50px_-20px_rgba(133,92,196,0.45)]"
              >
                <p className="text-sm text-neutral-500 mb-3">
                  {formatDate(post.date, language)}
                  <span className="mx-2 text-neutral-300">·</span>
                  {post.readingMinutes} {b.minRead}
                </p>

                <h2 className="font-display font-medium text-[26px] md:text-[30px] leading-[1.1] tracking-[-0.02em] text-black mb-3">
                  {/* O link cobre o card inteiro via `after:absolute`, o que dá
                      uma área de clique grande sem aninhar o texto num <a>. */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="after:absolute after:inset-0 focus-visible:outline-none"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="text-[15px] md:text-base text-neutral-600 leading-relaxed mb-6">
                  {post.description}
                </p>

                <span className="mt-auto text-sm font-medium text-momento-brand">
                  {b.readPost} <span aria-hidden="true">→</span>
                </span>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
