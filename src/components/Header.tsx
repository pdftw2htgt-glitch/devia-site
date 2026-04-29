"use client";

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
