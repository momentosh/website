import type { Metadata } from "next";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://momentosh.com";
const siteName = "O Momento é agora";
const siteDescription =
  "Potencialize sua graduação em tech com quem já chegou lá";

export const metadata: Metadata = {
  // Básico
  title: {
    default: "O Momento é agora",
    template: "%s | O Momento é agora",
  },
  description: siteDescription,
  keywords: [
    "tech",
    "carreira",
    "desenvolvimento",
    "programação",
    "mentoria",
    "bootcamp",
    "ensino tech",
  ],
  authors: [{ name: "Momento" }],
  creator: "Momento",

  // Canonical
  alternates: {
    canonical: baseUrl,
  },

  // Open Graph (para Meta, Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: baseUrl,
    title: "O Momento é agora",
    description: siteDescription,
    siteName: siteName,
    images: [
      {
        url: `${baseUrl}/logo-momento.png`,
        width: 1200,
        height: 630,
        alt: "O Momento é agora - Potencialize sua graduação em tech",
        type: "image/png",
      },
      {
        url: `${baseUrl}/logo-momento.png`,
        width: 800,
        height: 600,
        alt: "O Momento é agora",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "O Momento é agora",
    description: siteDescription,
    creator: "@momentosh",
    images: [`${baseUrl}/logo-momento.png`],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icones
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  // Outros
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  formatDetection: {
    email: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Preconnect para performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
