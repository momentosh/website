import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manual de Mentoria para Mentores",
  description:
    "Guia do programa de mentorias do Momento: o que esperar das mentorias, como ser um bom mentor e como entrar em contato em caso de dúvidas.",
  alternates: {
    canonical: "/manual-mentor",
  },
};

export default function ManualMentorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
