import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPost from "@/components/BlogPost";
import { getAllPosts, getPost } from "@/lib/blog";

/**
 * Um post do blog, em /blog/<slug>.
 *
 * `params` é uma Promise no App Router do Next 16 — daí o `await` nas duas
 * funções. `generateStaticParams` pré-renderiza todos os posts no build; slug
 * fora da lista ainda responde, cai no `notFound()`.
 */

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: "/assets/hero.png", width: 1200, height: 630, alt: "Momento" }],
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <main className="relative z-[1] min-h-screen">
      <Navbar />
      <BlogPost post={post} />
      <Footer />
    </main>
  );
}
