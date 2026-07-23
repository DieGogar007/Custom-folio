import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "El Isótopo — Tours e islas en Cartagena y Barú",
    template: "%s — El Isótopo",
  },
  description:
    "Agencia de turismo en Cartagena de Indias. Tours en lancha a las Islas del Rosario y Barú, planes full day, Tour 4 Islas, Playa Tranquila VIP y experiencias con atención personalizada.",
  keywords: [
    "Cartagena",
    "Barú",
    "Islas del Rosario",
    "tours",
    "full day",
    "playa",
    "turismo",
  ],
};

export const viewport: Viewport = {
  themeColor: "#071e2a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
