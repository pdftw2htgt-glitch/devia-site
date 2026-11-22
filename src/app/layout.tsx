import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteTracker from "@/components/SiteTracker";
import { Suspense } from "react";

// Meme source que sitemap.ts et robots.ts : le jour ou devia.fr est branche, la
// variable suffit et les apercus de partage suivent.
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://devia-site.vercel.app";
const TITRE = "DEVIA - Logiciel professionnel de devis charpente";
const DESC = "Générez vos devis charpente en quelques minutes grâce à l'IA. Visualisation 3D, calculs Eurocode 5, export PDF. L'alternative moderne aux logiciels traditionnels.";

export const metadata: Metadata = {
  // Sans metadataBase, Next.js ne sait pas rendre absolue l adresse de l image de
  // partage, et les apercus arrivent vides.
  metadataBase: new URL(SITE),
  title: TITRE,
  description: DESC,
  keywords: ["devis charpente", "logiciel charpente", "charpente IA", "Cadwork alternative", "devis bois"],
  applicationName: "DEVIA",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "DEVIA",
    url: SITE,
    title: TITRE,
    description: DESC,
  },
  twitter: { card: "summary_large_image", title: TITRE, description: DESC },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="bg-white text-slate-900 antialiased">
        <Suspense fallback={null}>
          <SiteTracker />
        </Suspense>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
