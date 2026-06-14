import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://momento.app.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Momento — Find Your Mentor",
    template: "%s | Momento",
  },
  description:
    "Conectando estudantes universitários ao mercado de trabalho através de mentoria e comunidade.",
  applicationName: "Momento",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Momento",
    title: "Momento — Find Your Mentor",
    description:
      "Conectando estudantes universitários ao mercado de trabalho através de mentoria e comunidade.",
    images: [
      {
        url: "/assets/hero.png",
        width: 1200,
        height: 630,
        alt: "Momento",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Momento — Find Your Mentor",
    description:
      "Conectando estudantes universitários ao mercado de trabalho através de mentoria e comunidade.",
    images: ["/assets/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="antialiased min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
