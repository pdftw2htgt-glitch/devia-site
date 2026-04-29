import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "DEVIA - Logiciel professionnel de devis charpente",
  description: "Generez vos devis charpente en 30 secondes grace a l'IA. Visualisation 3D, calculs Eurocode, export PDF. L'alternative moderne aux logiciels traditionnels.",
  keywords: ["devis charpente", "logiciel charpente", "charpente IA", "Cadwork alternative", "devis bois"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="bg-white text-slate-900 antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
