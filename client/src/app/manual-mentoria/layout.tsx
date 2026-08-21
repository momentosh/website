import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manual de Mentoria para Mentorados",
  description:
    "Guia do programa de mentorias do Momento: o que é, seus objetivos e como aproveitar ao máximo cada encontro com o seu mentor.",
  alternates: {
    canonical: "/manual-mentoria",
  },
};

export default function ManualMentoriaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
