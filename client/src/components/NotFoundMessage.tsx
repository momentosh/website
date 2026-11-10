"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

/**
 * A mensagem da 404 do site.
 *
 * Separada do `app/not-found.tsx` porque aquele arquivo precisa ser componente
 * de servidor — é ele que o Next usa para qualquer endereço que não casa com
 * rota nenhuma, e um `"use client"` ali faz o framework cair na 404 crua. O
 * hook do idioma, então, mora aqui, num filho de cliente.
 */
export default function NotFoundMessage() {
  const { t } = useLanguage();

  return (
    <>
      <span className="text-momento-accent font-bold mb-4 text-base tracking-wider block">
        404
      </span>
      <h1 className="font-display font-medium text-[42px] md:text-[56px] leading-[1] tracking-[-0.03em] text-black mb-4">
        {t.notFound.title}
      </h1>
      <Link
        href="/"
        className="mt-4 text-sm font-medium text-momento-brand hover:text-momento-accent transition-colors"
      >
        {t.notFound.back}
      </Link>
    </>
  );
}
