import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Texto } from "@/components/Texto";

/** Os termos de uso. Mesmo arranjo da política — ver o comentário de `privacidade`. */
export const metadata: Metadata = {
  title: "Termos de uso",
  description: "As regras de uso da plataforma do programa de mentoria Momento.",
  alternates: {
    canonical: "/termos",
  },
};

export default async function TermosPage() {
  const markdown = await readFile(path.join(process.cwd(), "content", "termos.md"), "utf8");

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
