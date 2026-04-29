#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
DEVIA SITE VITRINE - Setup structure complete
Cree toutes les pages et le layout pour le site marketing DEVIA.

A lancer depuis ~/Desktop/devia-site :
    python3 setup_site.py
"""

import os
import sys

# --- Verifications ---
if not os.path.exists("package.json"):
    print("ERREUR : package.json introuvable.")
    print("Lance ce script depuis ~/Desktop/devia-site")
    sys.exit(1)

if not os.path.exists("src/app"):
    print("ERREUR : src/app introuvable.")
    print("Le projet Next.js semble mal cree.")
    sys.exit(1)

print("Setup du site vitrine DEVIA...")
print()

# --- Helper pour creer/ecraser un fichier ---
def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"[OK] {path}")


# ============================================
# 1. LAYOUT COMMUN (src/app/layout.tsx)
# ============================================
layout_tsx = '''import type { Metadata } from "next";
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
'''
write_file("src/app/layout.tsx", layout_tsx)


# ============================================
# 2. STYLES GLOBAUX (src/app/globals.css)
# ============================================
globals_css = '''@import "tailwindcss";

:root {
  --color-primary: #0f172a;
  --color-accent: #d97706;
  --color-bg: #ffffff;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif;
}
'''
write_file("src/app/globals.css", globals_css)


# ============================================
# 3. HEADER (src/components/Header.tsx)
# ============================================
header_tsx = '''"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/fonctionnalites", label: "Fonctionnalites" },
    { href: "/tarifs", label: "Tarifs" },
    { href: "/a-propos", label: "A propos" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            D
          </div>
          <span className="font-bold text-xl tracking-tight">DEVIA</span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://devia-iota.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-slate-900 text-sm font-medium"
          >
            Connexion
          </a>
          <Link
            href="/tarifs"
            className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            Acheter DEVIA
          </Link>
        </div>

        {/* Burger mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-slate-700"
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M3 12h18M3 6h18M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="flex flex-col px-6 py-4 gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-slate-700 py-2 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://devia-iota.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 py-2 text-sm font-medium"
            >
              Connexion
            </a>
            <Link
              href="/tarifs"
              onClick={() => setOpen(false)}
              className="bg-slate-900 text-white px-5 py-3 rounded-lg text-sm font-semibold text-center mt-2"
            >
              Acheter DEVIA
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
'''
write_file("src/components/Header.tsx", header_tsx)


# ============================================
# 4. FOOTER (src/components/Footer.tsx)
# ============================================
footer_tsx = '''import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + tagline */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-slate-900 font-bold text-sm">
              D
            </div>
            <span className="font-bold text-xl tracking-tight text-white">DEVIA</span>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            Le logiciel professionnel de devis charpente nouvelle generation.
            Genere vos devis en 30 secondes grace a l&apos;IA.
          </p>
        </div>

        {/* Liens produit */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm">Produit</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/fonctionnalites" className="hover:text-white transition-colors">Fonctionnalites</Link></li>
            <li><Link href="/tarifs" className="hover:text-white transition-colors">Tarifs</Link></li>
            <li><a href="https://devia-iota.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Connexion</a></li>
          </ul>
        </div>

        {/* Liens entreprise */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm">Entreprise</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/a-propos" className="hover:text-white transition-colors">A propos</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions legales</Link></li>
            <li><Link href="/cgv" className="hover:text-white transition-colors">CGV</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6 text-xs text-slate-500 flex flex-col md:flex-row justify-between gap-2">
          <p>&copy; 2026 DEVIA. Tous droits reserves.</p>
          <p>Concu en France pour les professionnels de la charpente.</p>
        </div>
      </div>
    </footer>
  );
}
'''
write_file("src/components/Footer.tsx", footer_tsx)


# ============================================
# 5. PAGE ACCUEIL (src/app/page.tsx)
# ============================================
home_tsx = '''import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
              Nouveau - Propulse par l&apos;intelligence artificielle
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.05] mb-6">
              Vos devis charpente
              <br />
              <span className="text-amber-600">en 30 secondes.</span>
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
              DEVIA est le logiciel professionnel qui revolutionne la creation
              de devis charpente. Decrivez votre projet en langage naturel,
              obtenez un devis complet et une visualisation 3D instantanement.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tarifs"
                className="inline-flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-800 transition-colors"
              >
                Acheter DEVIA - 2 000 &euro;
              </Link>
              <Link
                href="/fonctionnalites"
                className="inline-flex items-center justify-center border border-slate-300 text-slate-700 px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-50 transition-colors"
              >
                Decouvrir les fonctionnalites
              </Link>
            </div>

            <p className="text-sm text-slate-500 mt-6">
              Achat unique. Acces a vie. Mise a jour optionnelle a 35 &euro;/mois.
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Concu pour les professionnels exigeants
            </h2>
            <p className="text-lg text-slate-600">
              Trois principes simples : rapidite, precision, simplicite.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-700">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Rapide</h3>
              <p className="text-slate-600 leading-relaxed">
                Devis complet en 30 secondes au lieu de 30 minutes.
                Reaffectez votre temps a ce qui compte vraiment.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-700">
                  <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Precis</h3>
              <p className="text-slate-600 leading-relaxed">
                Calculs structurels selon les normes Eurocode 5.
                Vos devis sont fiables, professionnels, defendables.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-700">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Simple</h3>
              <p className="text-slate-600 leading-relaxed">
                Interface pensee pour les artisans, pas pour les ingenieurs.
                Decrivez en francais courant, DEVIA s&apos;occupe du reste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARAISON */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Pourquoi pas Cadwork ou SEMA ?
            </h2>
            <p className="text-lg text-slate-300">
              Ces logiciels sont puissants, mais hors de portee pour 80% des artisans.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-800 rounded-2xl p-8">
              <div className="text-slate-400 text-sm font-semibold mb-2">Logiciels traditionnels</div>
              <div className="text-3xl font-bold mb-4">8 000 &euro; - 20 000 &euro;</div>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>&times; Formation longue (semaines)</li>
                <li>&times; Materiel puissant requis</li>
                <li>&times; Maintenance complexe</li>
                <li>&times; Cible les bureaux d&apos;etudes</li>
              </ul>
            </div>

            <div className="bg-amber-50 text-slate-900 rounded-2xl p-8 ring-2 ring-amber-400">
              <div className="text-amber-700 text-sm font-semibold mb-2">DEVIA</div>
              <div className="text-3xl font-bold mb-4">2 000 &euro;</div>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>&check; Prise en main immediate</li>
                <li>&check; Fonctionne sur n&apos;importe quel ordinateur</li>
                <li>&check; Mise a jour automatique</li>
                <li>&check; Concu pour les artisans</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/tarifs"
              className="inline-flex items-center bg-amber-500 text-slate-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-amber-400 transition-colors"
            >
              Voir les tarifs detailles
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-6">
            Pret a moderniser vos devis ?
          </h2>
          <p className="text-xl text-slate-600 mb-10">
            Rejoignez les charpentiers qui gagnent du temps avec DEVIA.
          </p>
          <Link
            href="/tarifs"
            className="inline-flex items-center bg-slate-900 text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-800 transition-colors"
          >
            Commencer maintenant
          </Link>
        </div>
      </section>
    </>
  );
}
'''
write_file("src/app/page.tsx", home_tsx)


# ============================================
# 6. PAGE FONCTIONNALITES
# ============================================
features_tsx = '''import Link from "next/link";

const features = [
  {
    title: "Generation IA",
    description: "Decrivez votre projet en francais courant. DEVIA comprend, structure et chiffre automatiquement.",
    icon: "&#x2728;",
  },
  {
    title: "Visualisation 3D",
    description: "Visualisez votre charpente en 3D temps reel directement dans le logiciel. Manipulez, zoomez, exportez.",
    icon: "&#x1F4D0;",
  },
  {
    title: "Calculs Eurocode 5",
    description: "Verifications structurelles automatiques selon les normes en vigueur. Sections, charges, fleches.",
    icon: "&#x2696;",
  },
  {
    title: "Export PDF",
    description: "Devis professionnel pret a envoyer au client. Personnalisable avec votre logo et coordonnees.",
    icon: "&#x1F4C4;",
  },
  {
    title: "Catalogue prix",
    description: "Renseignez vos prix une fois, DEVIA les applique automatiquement a tous vos devis futurs.",
    icon: "&#x1F4B0;",
  },
  {
    title: "Multi-projets",
    description: "Gerez tous vos chantiers depuis une interface unique. Historique, modifications, suivi.",
    icon: "&#x1F4C2;",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Tout ce dont vous avez besoin
              <br />
              <span className="text-amber-600">pour des devis pros.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              DEVIA est concu pour remplacer entierement votre processus actuel
              de chiffrage. Toutes les etapes, dans un seul outil.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4" dangerouslySetInnerHTML={{ __html: f.icon }} />
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link
              href="/tarifs"
              className="inline-flex items-center bg-slate-900 text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-slate-800 transition-colors"
            >
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
'''
write_file("src/app/fonctionnalites/page.tsx", features_tsx)


# ============================================
# 7. PAGE TARIFS
# ============================================
pricing_tsx = '''import Link from "next/link";

export default function PricingPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Un prix juste, transparent.
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Achetez DEVIA une fois. Utilisez-le a vie.
            L&apos;abonnement maintenance est optionnel.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          {/* OFFRE INSTALLATION */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="text-sm font-semibold text-slate-500 mb-2">INSTALLATION</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Acces a vie</h2>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-bold text-slate-900">2 000</span>
              <span className="text-2xl text-slate-600">&euro;</span>
              <span className="text-sm text-slate-500 ml-2">paiement unique</span>
            </div>
            <p className="text-slate-600 mb-6">
              Une seule fois. Vous gardez l&apos;acces a la version achetee
              indefiniment, meme sans abonnement.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Acces complet a DEVIA</li>
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Generation IA illimitee</li>
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Visualisation 3D</li>
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Calculs Eurocode 5</li>
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Export PDF illimite</li>
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Support email 30 jours</li>
            </ul>
            <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
              Acheter DEVIA
            </button>
          </div>

          {/* OFFRE MAINTENANCE */}
          <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-8 shadow-sm relative">
            <div className="absolute -top-3 left-8 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              RECOMMANDE
            </div>
            <div className="text-sm font-semibold text-amber-700 mb-2">MAINTENANCE</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Mises a jour</h2>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-bold text-slate-900">35</span>
              <span className="text-2xl text-slate-600">&euro;</span>
              <span className="text-sm text-slate-500 ml-2">/ mois</span>
            </div>
            <p className="text-slate-600 mb-6">
              Acces aux nouvelles fonctionnalites, corrections et evolutions
              du logiciel. Annulable a tout moment.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Toutes les nouvelles fonctionnalites</li>
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Corrections de bugs prioritaires</li>
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Mises a jour Eurocode</li>
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Support email illimite</li>
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Acces beta nouvelles features</li>
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Annulation libre</li>
            </ul>
            <button className="w-full bg-amber-500 text-slate-900 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors">
              Activer la maintenance
            </button>
          </div>
        </div>

        {/* FAQ courte */}
        <div className="max-w-3xl mx-auto px-6 mt-24">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Questions frequentes
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">L&apos;abonnement est-il obligatoire ?</h3>
              <p className="text-slate-600">Non. Vous pouvez utiliser DEVIA a vie avec votre achat initial. L&apos;abonnement maintenance debloque uniquement les nouvelles versions et le support etendu.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Comment recevoir ma cle de licence ?</h3>
              <p className="text-slate-600">Apres paiement, vous recevez immediatement par email votre cle au format DEVIA-2026-XXXX-XXXX-XXXX. Connectez-vous a l&apos;application et activez-la en quelques secondes.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Puis-je tester avant d&apos;acheter ?</h3>
              <p className="text-slate-600">Une demo en ligne est disponible. Contactez-nous pour acceder a une demonstration personnalisee.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Combien d&apos;ordinateurs puis-je utiliser ?</h3>
              <p className="text-slate-600">Une licence DEVIA est valable pour un utilisateur. Vous pouvez vous connecter depuis n&apos;importe quel ordinateur, mais pas simultanement.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
'''
write_file("src/app/tarifs/page.tsx", pricing_tsx)


# ============================================
# 8. PAGE A PROPOS
# ============================================
about_tsx = '''export default function AboutPage() {
  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-8">
          Notre mission.
        </h1>
        <div className="prose prose-lg text-slate-700 space-y-6">
          <p className="text-xl leading-relaxed">
            DEVIA est ne d&apos;un constat simple : les logiciels existants pour
            la charpente sont trop chers, trop complexes, et concus pour les
            bureaux d&apos;etudes. Pas pour les artisans qui font le travail au quotidien.
          </p>
          <p>
            Notre mission est de democratiser l&apos;outillage numerique pour
            les professionnels de la charpente. Que vous soyez un artisan solo
            ou une petite entreprise de 5 personnes, vous meritez un outil
            puissant, intuitif, et a un prix juste.
          </p>
          <p>
            DEVIA combine le meilleur de l&apos;intelligence artificielle moderne
            avec l&apos;expertise des normes du batiment francais (Eurocode).
            Le resultat : des devis professionnels, generes en quelques secondes,
            avec une visualisation 3D claire pour vos clients.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Nos valeurs</h2>
          <ul className="space-y-3">
            <li><strong>Simplicite.</strong> Un logiciel doit etre evident a utiliser.</li>
            <li><strong>Honnetete.</strong> Pas de prix cache, pas d&apos;upsell agressif.</li>
            <li><strong>Qualite.</strong> Vos devis representent votre travail. Ils doivent etre impeccables.</li>
            <li><strong>Independance.</strong> Vous payez une fois, vous gardez l&apos;acces. Pas de location forcee.</li>
          </ul>
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Le projet</h2>
          <p>
            DEVIA est un projet francais, developpe par une petite equipe
            passionnee par le bois et le code. Nous travaillons en proximite
            avec des charpentiers professionnels pour faire evoluer le logiciel
            en fonction des besoins reels du terrain.
          </p>
        </div>
      </div>
    </section>
  );
}
'''
write_file("src/app/a-propos/page.tsx", about_tsx)


# ============================================
# 9. PAGE CONTACT
# ============================================
contact_tsx = '''export default function ContactPage() {
  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">
          Contactez-nous.
        </h1>
        <p className="text-xl text-slate-600 mb-12">
          Une question ? Une demonstration ? Ecrivez-nous, nous repondons sous 24h.
        </p>

        <div className="bg-slate-50 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Email</h2>
          <p className="text-slate-700 mb-2">Pour toute question commerciale ou technique :</p>
          <a href="mailto:contact@devia.fr" className="text-amber-700 font-semibold hover:underline">
            contact@devia.fr
          </a>
        </div>

        <div className="bg-slate-50 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Demo personnalisee</h2>
          <p className="text-slate-700 mb-4">
            Vous voulez voir DEVIA en action sur un de vos chantiers types ?
            Reservez 30 minutes avec nous, nous vous montrerons comment DEVIA
            transformerait votre workflow.
          </p>
          <a href="mailto:demo@devia.fr?subject=Demande de demo DEVIA" className="inline-flex items-center bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
            Reserver une demo
          </a>
        </div>
      </div>
    </section>
  );
}
'''
write_file("src/app/contact/page.tsx", contact_tsx)


# ============================================
# 10. MENTIONS LEGALES (template provisoire)
# ============================================
legal_tsx = '''export default function LegalPage() {
  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-8">
          Mentions legales
        </h1>
        <div className="prose prose-lg text-slate-700 space-y-6">
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <strong>Document provisoire.</strong> Ces mentions legales seront
            completees apres immatriculation officielle de l&apos;entreprise.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Editeur du site</h2>
          <p>
            DEVIA<br />
            Adresse : (a completer apres immatriculation)<br />
            SIRET : (a completer)<br />
            Email : contact@devia.fr
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Hebergement</h2>
          <p>
            Vercel Inc.<br />
            340 S Lemon Ave #4133, Walnut, CA 91789, USA<br />
            <a href="https://vercel.com" className="text-amber-700 hover:underline">vercel.com</a>
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Donnees personnelles</h2>
          <p>
            DEVIA collecte uniquement les donnees strictement necessaires au
            fonctionnement du service (email, mot de passe hache, cle de licence).
            Aucune donnee n&apos;est revendue a des tiers. Conformement au RGPD,
            vous disposez d&apos;un droit d&apos;acces, de rectification et de
            suppression de vos donnees en nous contactant a contact@devia.fr.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Cookies</h2>
          <p>
            Le site utilise uniquement des cookies techniques necessaires
            a l&apos;authentification. Aucun cookie de tracking ou publicitaire
            n&apos;est utilise.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Propriete intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu du site (textes, images, logos, code source)
            est protege par le droit d&apos;auteur. Toute reproduction non autorisee
            est interdite.
          </p>
        </div>
      </div>
    </section>
  );
}
'''
write_file("src/app/mentions-legales/page.tsx", legal_tsx)


# ============================================
# 11. CGV (template provisoire)
# ============================================
cgv_tsx = '''export default function CgvPage() {
  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-8">
          Conditions Generales de Vente
        </h1>
        <div className="prose prose-lg text-slate-700 space-y-6">
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <strong>Document provisoire.</strong> Ces CGV doivent etre validees
            par un juriste avant utilisation commerciale reelle.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Article 1 - Objet</h2>
          <p>
            Les presentes CGV regissent les relations contractuelles entre DEVIA
            (l&apos;Editeur) et toute personne physique ou morale (le Client)
            achetant le logiciel DEVIA.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Article 2 - Produit</h2>
          <p>
            Le logiciel DEVIA est un outil de generation de devis pour la
            charpente, accessible via Internet, fourni sous la forme d&apos;un
            acces personnel par cle de licence.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Article 3 - Prix et paiement</h2>
          <p>
            Le prix de l&apos;installation est de 2 000 &euro; (paiement unique).
            L&apos;abonnement maintenance optionnel est de 35 &euro; par mois,
            sans engagement, annulable a tout moment.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Article 4 - Licence</h2>
          <p>
            Le Client beneficie d&apos;une licence d&apos;utilisation personnelle
            et non transferable du logiciel. La cle de licence est strictement
            personnelle et ne peut etre partagee.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Article 5 - Droit de retractation</h2>
          <p>
            Conformement a l&apos;article L221-28 du Code de la consommation,
            le droit de retractation ne s&apos;applique pas aux contenus
            numeriques fournis sur un support immateriel apres execution.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Article 6 - Responsabilite</h2>
          <p>
            DEVIA est un outil d&apos;aide au chiffrage. La responsabilite finale
            de l&apos;exactitude des devis transmis aux clients tiers incombe
            au professionnel utilisateur. DEVIA ne saurait etre tenu responsable
            d&apos;erreurs de saisie ou d&apos;interpretation.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Article 7 - Litiges</h2>
          <p>
            En cas de litige, une solution amiable sera recherchee. A defaut,
            les tribunaux francais seront seuls competents.
          </p>
        </div>
      </div>
    </section>
  );
}
'''
write_file("src/app/cgv/page.tsx", cgv_tsx)


# ============================================
# 12. CONFIG TAILWIND - on s'assure qu'il scanne les bons fichiers
# Pour Next.js 16 avec Tailwind 4, c'est gere automatiquement, on ne touche pas
# ============================================

print()
print("=" * 60)
print("Site vitrine DEVIA cree avec succes !")
print("=" * 60)
print()
print("STRUCTURE :")
print("  src/app/layout.tsx              (layout commun)")
print("  src/app/globals.css             (styles Tailwind)")
print("  src/app/page.tsx                (Accueil)")
print("  src/app/fonctionnalites/page.tsx")
print("  src/app/tarifs/page.tsx")
print("  src/app/a-propos/page.tsx")
print("  src/app/contact/page.tsx")
print("  src/app/mentions-legales/page.tsx")
print("  src/app/cgv/page.tsx")
print("  src/components/Header.tsx")
print("  src/components/Footer.tsx")
print()
print("PROCHAINE COMMANDE : npm run dev")
print("  -> Ouvre http://localhost:3000")
print("  -> Tu dois voir le site DEVIA pro avec navigation complete !")
