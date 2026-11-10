"use client";

import Link from "next/link";
import { Texto } from "@/components/Texto";
import { useLanguage } from "@/context/LanguageContext";
import { formatDate } from "@/lib/format";
import type { BlogPost as BlogPostData } from "@/lib/blog";

/**
 * Um post: moldura bilíngue em volta de um texto que não é.
 *
 * O corpo vem em português, como os documentos legais, porque traduzir texto
 * editorial é trabalho de tradutor, não de dicionário. A moldura — data, autor,
 * tempo de leitura, voltar — segue o idioma escolhido no seletor da navbar.
 *
 * Cliente pelo `useLanguage`; o markdown em si é renderizado no cliente pelo
 * `Texto`, que é o mesmo componente de privacidade e termos.
 */
export default function BlogPost({ post }: { post: BlogPostData }) {
  const { t, language } = useLanguage();
  const b = t.blog;

  return (
    <section className="px-[5vw] pt-24 pb-16 md:pt-28 md:pb-20">
      <article className="max-w-[68ch] mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-momento-brand transition-colors mb-8"
        >
          {b.backToBlog}
        </Link>

        <span className="text-momento-accent font-bold mb-4 text-base tracking-wider block">
          {b.badge}
        </span>
        <h1 className="font-display font-medium text-[38px] md:text-[52px] leading-[1.02] tracking-[-0.03em] text-black mb-5">
          {post.title}
        </h1>

        <p className="text-[15px] text-neutral-500 mb-8">
          {formatDate(post.date, language)}
          <span className="mx-2 text-neutral-300">·</span>
          {b.by} {post.author}
          <span className="mx-2 text-neutral-300">·</span>
          {post.readingMinutes} {b.minRead}
        </p>

        <p className="text-[19px] leading-relaxed text-neutral-600 mb-10">{post.description}</p>

        <hr className="border-black/10 mb-10" />

        <Texto>{post.content}</Texto>

        <div className="mt-14 pt-8 border-t border-black/10">
          <Link
            href="/blog"
            className="text-sm font-medium text-momento-brand hover:text-momento-accent transition-colors"
          >
            {b.backToBlog}
          </Link>
        </div>
      </article>
    </section>
  );
}
