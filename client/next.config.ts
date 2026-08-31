import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * A política e os termos leem content/*.md, e o tracing do Next não descobre
   * isso sozinho: o caminho é montado com path.join, não é literal. Sem esta
   * linha o arquivo fica fora do bundle de produção e as duas páginas quebram só
   * no deploy.
   */
  outputFileTracingIncludes: {
    "/privacidade": ["./content/**"],
    "/termos": ["./content/**"],
  },

  /*
   * O repo tem lockfile na raiz e outro aqui, e o Turbopack avisa a cada `dev`
   * que não sabe qual é a raiz. Apontar explicitamente cala o aviso e garante
   * que ele resolva por este package.json. Veio do PR #11, que foi revertido
   * inteiro por um problema de conta na Vercel — o ajuste não tinha a ver.
   */
  turbopack: {
    root: __dirname,
  },

  reactCompiler: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
