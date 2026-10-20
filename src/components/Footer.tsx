"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dico, lien, type Langue } from "../i18n";

export default function Footer() {
  // Meme principe que le menu : la langue se lit dans l URL.
  const chemin = usePathname() || "/";
  const lang: Langue = (chemin === "/en" || chemin.startsWith("/en/")) ? "en" : "fr";
  const d = dico(lang);
  const t = d.pied;
  const n = d.nav;
  const L = (c: string) => lien(lang, c);

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
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">{t.tagline}</p>
        </div>

        {/* Liens produit */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm">{t.colProduit}</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href={L("/fonctionnalites")} className="hover:text-white transition-colors">{n.fonctionnalites}</Link></li>
            <li><Link href={L("/solutions")} className="hover:text-white transition-colors">{n.solutions}</Link></li>
            <li><Link href={L("/apprentissage")} className="hover:text-white transition-colors">{n.apprentissage}</Link></li>
            <li><Link href={L("/actualite")} className="hover:text-white transition-colors">{n.actualite}</Link></li>
            <li><Link href={L("/tarifs")} className="hover:text-white transition-colors">{n.tarifs}</Link></li>
            <li><a href="https://devia-iota.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{n.connexion}</a></li>
          </ul>
        </div>

        {/* Liens entreprise */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm">{t.colEntreprise}</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href={L("/a-propos")} className="hover:text-white transition-colors">{n.aPropos}</Link></li>
            <li><Link href={L("/contact")} className="hover:text-white transition-colors">{n.contact}</Link></li>
            <li><Link href={L("/mentions-legales")} className="hover:text-white transition-colors">{t.mentions}</Link></li>
            <li><Link href={L("/cgv")} className="hover:text-white transition-colors">{t.cgv}</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6 text-xs text-slate-500 flex flex-col md:flex-row justify-between gap-2">
          <p>{t.droits}</p>
          <p>{t.concu}</p>
        </div>
      </div>
    </footer>
  );
}
