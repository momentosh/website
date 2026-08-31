import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Texto } from "@/components/Texto";

/**
 * A política de privacidade, servida de content/privacidade.md.
 *
 * Mora aqui, e não na plataforma, porque esta é a home page declarada na tela de
 * consentimento do Google: o revisor exige alcançar a política a partir dela, sem
 * login, e a resposta mais curta para isso é a política estar no mesmo domínio.
 * `app.momento.sh/privacidade` redireciona para cá — endereço antigo que já
 * circulou não pode virar 404.
 *
 * Componente de servidor, ao contrário das outras páginas desta landing: elas são
 * `"use client"` por causa do `useLanguage`, e esta não precisa. O documento é em
 * português e só; a moldura em volta (Navbar, Footer) segue bilíngue por conta
 * própria. Traduzir texto jurídico é trabalho de tradutor, não de dicionário.
 */
export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Que dados o Momento guarda, por quê, e como removê-los.",
  alternates: {
    canonical: "/privacidade",
  },
};

export default async function PrivacidadePage() {
  const markdown = await readFile(
    path.join(process.cwd(), "content", "privacidade.md"),
    "utf8",
  );

  return (
    <main className="relative z-[1] min-h-screen">
      <Navbar />

      <section className="px-[5vw] pt-32 pb-24 md:pt-36">
        <article className="max-w-[68ch] mx-auto">
          <Texto>{markdown}</Texto>
        </article>
      </section>

      <Footer />
    </main>
  );
}
