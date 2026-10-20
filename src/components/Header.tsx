"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SelecteurLangue from "./SelecteurLangue";
import { dico, lien, type Langue } from "../i18n";

export default function Header() {
  const [open, setOpen] = useState(false);
  // La langue se lit dans l URL : le menu n a besoin d aucun reglage venu du layout.
  const chemin = usePathname() || "/";
  const lang: Langue = (chemin === "/en" || chemin.startsWith("/en/")) ? "en" : "fr";
  const t = dico(lang).nav;
  const L = (c: string) => lien(lang, c);

  // L attribut lang de la page suit la langue affichee. Le layout racine ecrit "fr" par
  // defaut ; ici on le corrige sur les pages anglaises, et on le remet a "fr" au retour.
  // C est ce que lisent les lecteurs d ecran, les moteurs et les traducteurs automatiques.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // href deja prefixes par la langue : plus aucun lien a traiter ensuite dans le rendu.
  const links = [
    { href: L("/fonctionnalites"), label: t.fonctionnalites },
    { href: L("/solutions"), label: t.solutions },
    { href: L("/apprentissage"), label: t.apprentissage },
    { href: L("/actualite"), label: t.actualite },
    { href: L("/tarifs"), label: t.tarifs },
    { href: L("/a-propos"), label: t.aPropos },
    { href: L("/contact"), label: t.contact },
  ];

  const solutionsMenu = {
    ouvrages: [
      { href: L("/solutions/charpente-traditionnelle"), label: t.solTradL, desc: t.solTradD },
      { href: L("/solutions/charpente-industrielle"), label: t.solIndusL, desc: t.solIndusD },
      { href: L("/solutions/construction-bois"), label: t.solBoisL, desc: t.solBoisD },
      { href: L("/solutions/charpente-couverture"), label: t.solCouvL, desc: t.solCouvD },
      { href: L("/solutions/extension"), label: t.solExtL, desc: t.solExtD },
      { href: L("/solutions/multi-structure"), label: t.solMultiL, desc: t.solMultiD },
    ],
    services: [
      { href: L("/solutions/neuf-renovation"), label: t.solNeufL, desc: t.solNeufD },
      { href: L("/solutions/etude-calcul"), label: t.solEtudeL, desc: t.solEtudeD },
      { href: L("/solutions/logistique"), label: t.solLogiL, desc: t.solLogiD },
      { href: L("/solutions/export-ifc"), label: t.solIfcL, desc: t.solIfcD },
      { href: L("/solutions/conception-chiffrage"), label: t.solChiffL, desc: t.solChiffD },
    ],
  };

  const apprentissageMenu = [
    { href: L("/apprentissage/formation-devia"), label: t.appFormL, desc: t.appFormD },
    { href: L("/apprentissage/programmes"), label: t.appProgL, desc: t.appProgD },
    { href: L("/apprentissage/aide"), label: t.appAideL, desc: t.appAideD },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={L("/")} className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            D
          </div>
          <span className="font-bold text-xl tracking-tight">DEVIA</span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) =>
            link.href === L("/solutions") ? (
              <div key={link.href} className="relative group">
                <Link
                  href={L("/solutions")}
                  className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
                >
                  Solutions
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:rotate-180">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 hidden group-hover:block">
                  <div className="w-[560px] bg-white border border-slate-200 rounded-2xl shadow-xl p-6 grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">{t.grpOuvrages}</div>
                      <div className="flex flex-col gap-1">
                        {solutionsMenu.ouvrages.map((s) => (
                          <Link key={s.href} href={s.href} className="rounded-lg px-3 py-2 hover:bg-slate-50 transition-colors">
                            <div className="text-sm font-semibold text-slate-900">{s.label}</div>
                            <div className="text-xs text-slate-500">{s.desc}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">{t.grpServices}</div>
                      <div className="flex flex-col gap-1">
                        {solutionsMenu.services.map((s) => (
                          <Link key={s.href} href={s.href} className="rounded-lg px-3 py-2 hover:bg-slate-50 transition-colors">
                            <div className="text-sm font-semibold text-slate-900">{s.label}</div>
                            <div className="text-xs text-slate-500">{s.desc}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : link.href === L("/apprentissage") ? (
              <div key={link.href} className="relative group">
                <Link
                  href={L("/apprentissage")}
                  className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
                >
                  Apprentissage
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:rotate-180">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 hidden group-hover:block">
                  <div className="w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 flex flex-col gap-1">
                    {apprentissageMenu.map((s) => (
                      <Link key={s.href} href={s.href} className="rounded-lg px-3 py-2 hover:bg-slate-50 transition-colors">
                        <div className="text-sm font-semibold text-slate-900">{s.label}</div>
                        <div className="text-xs text-slate-500">{s.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:flex items-center gap-3">
          <SelecteurLangue />
          <a
            href="https://devia-iota.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-slate-900 text-sm font-medium"
          >
            {t.connexion}
          </a>
          <Link
            href={L("/tarifs")}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            {t.acheter}
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
              {t.connexion}
            </a>
            <Link
              href={L("/tarifs")}
              onClick={() => setOpen(false)}
              className="bg-slate-900 text-white px-5 py-3 rounded-lg text-sm font-semibold text-center mt-2"
            >
              {t.acheter}
            </Link>
            <div className="pt-3 mt-1 border-t border-slate-200">
              <SelecteurLangue />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
