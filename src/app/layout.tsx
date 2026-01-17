import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OFTALMO HORUS Center | Dra. Yelín Vento Rojas",
  description:
    "Centro oftalmológico de excelencia en Ecuador. Cirugía de cataratas, corrección láser, glaucoma y oftalmología pediátrica con la Dra. Yelín Vento Rojas.",
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
      <body className={`${poppins.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
