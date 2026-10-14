import type { Metadata } from "next";
import { Sora, Figtree } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OFTALMO HORUS Center | Dra. Yelín Vento Rojas",
  description:
    "Centro oftalmológico en Quito, Ecuador. Cirugía de cataratas, corrección láser, glaucoma y oftalmología pediátrica con la Dra. Yelín Vento Rojas.",
  keywords: [
    "oftalmología",
    "cirugía de cataratas",
    "corrección láser",
    "LASIK",
    "glaucoma",
    "oftalmología pediátrica",
    "Ecuador",
    "Quito",
    "Dra. Yelín Vento Rojas",
    "OFTALMO HORUS",
  ],
  authors: [{ name: "OFTALMO HORUS Center" }],
  openGraph: {
    title: "OFTALMO HORUS Center | Dra. Yelín Vento Rojas",
    description:
      "Tu visión en manos expertas. Excelencia oftalmológica con estándares internacionales.",
    type: "website",
    locale: "es_EC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${sora.variable} ${figtree.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
