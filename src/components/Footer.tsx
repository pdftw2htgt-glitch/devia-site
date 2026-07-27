import Link from "next/link";

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
            <li><Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link></li>
            <li><Link href="/apprentissage" className="hover:text-white transition-colors">Apprentissage</Link></li>
            <li><Link href="/actualite" className="hover:text-white transition-colors">Actualite</Link></li>
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
