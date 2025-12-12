import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jonathan Tyar | Senior Full Stack Engineer",
  description: "Portfolio of Jonathan Tyar, an experienced Full Stack Engineer specializing in financial technology and web development. Expertise in React, Next.js, Node.js, and microservices architecture.",
  icons: "/logo.ico",
  keywords: [
    "Jonathan Tyar",
    "Full Stack Engineer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Financial Technology",
    "Fintech Developer",
    "Software Engineer",
    "Portfolio",
    "Crypto Developer",
    "Blockchain Developer",
    "Web3 Developer",
  ],
  authors: [{ name: "Jonathan Tyar" }],
  creator: "Jonathan Tyar",
  publisher: "Jonathan Tyar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jonathan.tyar.dev",
    title: "Jonathan Tyar | Senior Full Stack Engineer",
    description: "Portfolio of Jonathan Tyar, an experienced Full Stack Engineer specializing in financial technology and web development.",
    siteName: "Jonathan Tyar Portfolio",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "Jonathan Tyar Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jonathan Tyar | Senior Full Stack Engineer",
    description: "Portfolio of Jonathan Tyar, an experienced Full Stack Engineer specializing in financial technology and web development.",
    images: ["/og.webp"],
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://jonathan.tyar.dev" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
