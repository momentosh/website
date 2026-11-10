import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import { getAllPosts } from "@/lib/blog";

/**
 * A listagem do blog.
 *
 * Server component: é aqui que o `content/blog` é lido, em tempo de build.
 * A moldura (Navbar, Footer, textos de interface) é bilíngue por conta própria;
 * os posts são em português, como os documentos legais.
 */
const TITLE = "Blog";
const DESCRIPTION =
  "Textos do time do Momento sobre mentoria, carreira e o que aprendemos acompanhando quem está começando.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/blog",
  },
  // `openGraph` é substituído inteiro quando um segmento o define, não fundido
  // com o do layout — sem este bloco o og:url do blog continuaria sendo o da home.
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/blog",
    images: [{ url: "/assets/hero.png", width: 1200, height: 630, alt: "Momento" }],
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="relative z-[1] min-h-screen">
      <Navbar />
      <BlogList posts={posts} />
      <Footer />
    </main>
  );
}
