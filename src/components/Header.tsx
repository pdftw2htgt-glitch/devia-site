"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/fonctionnalites", label: "Fonctionnalites" },
    { href: "/solutions", label: "Solutions" },
    { href: "/apprentissage", label: "Apprentissage" },
    { href: "/actualite", label: "Actualite" },
    { href: "/tarifs", label: "Tarifs" },
    { href: "/a-propos", label: "A propos" },
    { href: "/contact", label: "Contact" },
  ];

  const solutionsMenu = {
    ouvrages: [
      { href: "/solutions/charpente-traditionnelle", label: "Charpente traditionnelle", desc: "Fermes, pannes, chevrons calcules" },
      { href: "/solutions/charpente-industrielle", label: "Charpente industrielle", desc: "Fermettes et grandes series" },
      { href: "/solutions/construction-bois", label: "Construction bois", desc: "MOB et structures completes" },
      { href: "/solutions/charpente-couverture", label: "Charpente couverture", desc: "Couverture et calepinage complet" },
      { href: "/solutions/extension", label: "Extension", desc: "Agrandissements et surelevations" },
      { href: "/solutions/multi-structure", label: "Multi-structure", desc: "Plusieurs ouvrages, un seul devis" },
    ],
    services: [
      { href: "/solutions/neuf-renovation", label: "Neuf & renovation", desc: "Projets neufs et reprises d'existant" },
      { href: "/solutions/etude-calcul", label: "Etude & calcul de structure", desc: "Dimensionnement Eurocode 5" },
      { href: "/solutions/logistique", label: "Logistique", desc: "Metre, debit, approvisionnement" },
      { href: "/solutions/export-ifc", label: "Export IFC", desc: "Vers vos logiciels de conception" },
      { href: "/solutions/conception-chiffrage", label: "Conception & chiffrage", desc: "Du plan au devis chiffre" },
    ],
  };

  const apprentissageMenu = [
    { href: "/apprentissage/formation-devia", label: "Formation DEVIA", desc: "Prendre en main le logiciel pas a pas" },
    { href: "/apprentissage/programmes", label: "Nos programmes", desc: "Parcours guides selon votre profil" },
    { href: "/apprentissage/aide", label: "Aide", desc: "Questions frequentes et support" },
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
          {links.map((link) =>
            link.href === "/solutions" ? (
              <div key={link.href} className="relative group">
                <Link
                  href="/solutions"
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
                      <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">Ouvrages</div>
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
                      <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">Services</div>
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
            ) : link.href === "/apprentissage" ? (
              <div key={link.href} className="relative group">
                <Link
                  href="/apprentissage"
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
