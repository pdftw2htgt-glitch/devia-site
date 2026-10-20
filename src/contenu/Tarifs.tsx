import Link from "next/link";
import CalculateurRentabilite from "@/components/CalculateurRentabilite";
import BoutonAchat from "@/components/BoutonAchat";
import { dico, lien, type Langue } from "../i18n";

export default function Tarifs({ lang }: { lang: Langue }) {
  const t = dico(lang).tarifs;
  const L = (c: string) => lien(lang, c);
  const puce = (texte: string) => (
    <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> {texte}</li>
  );

  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">{t.h1}</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">{t.intro}</p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          {/* FORMULE STANDARD */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="text-sm font-semibold text-slate-500 mb-2">{t.stdEtiquette}</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.stdTitre}</h2>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-sm text-slate-500">{t.aPartirDe}</span>
              <span className="text-5xl font-bold text-slate-900">3 500</span>
              <span className="text-2xl text-slate-600">&euro;</span>
            </div>
            <div className="text-slate-600 font-medium mb-6">{t.stdRecurrent}</div>
            <p className="text-slate-600 mb-6">{t.stdTexte}</p>
            <ul className="space-y-3 mb-8">
              {puce(t.std1)}{puce(t.std2)}{puce(t.std3)}{puce(t.std4)}{puce(t.std5)}{puce(t.std6)}
            </ul>
            {/* Le paiement ne s affiche que la ou Stripe est configure : en ligne, tant que les
                cles ne sont pas posees sur Vercel, le visiteur voit un bouton de contact plutot
                qu un bouton d achat qui tomberait en erreur.
                ACHAT_OUVERT=1 ouvre la vente au public ; sans elle, seule la page /acheter
                (sans lien depuis le site) permet de passer commande. */}
            {process.env.ACHAT_OUVERT === "1" ? (
              <BoutonAchat
                lang={lang}
                libelle={t.acheter}
                className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
              />
            ) : (
              <Link href={L("/contact")} className="block w-full text-center bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
                {t.contacter}
              </Link>
            )}
          </div>

          {/* FORMULE PERSONNALISEE */}
          <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-8 shadow-sm relative">
            <div className="absolute -top-3 left-8 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {t.surMesure}
            </div>
            <div className="text-sm font-semibold text-amber-700 mb-2">{t.persoEtiquette}</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.persoTitre}</h2>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-sm text-slate-500">{t.aPartirDe}</span>
              <span className="text-5xl font-bold text-slate-900">4 500</span>
              <span className="text-2xl text-slate-600">&euro;</span>
            </div>
            <div className="text-slate-600 font-medium mb-6">{t.persoRecurrent}</div>
            <p className="text-slate-600 mb-6">{t.persoTexte}</p>
            <ul className="space-y-3 mb-8">
              {puce(t.per1)}{puce(t.per2)}{puce(t.per3)}{puce(t.per4)}{puce(t.per5)}{puce(t.per6)}
            </ul>
            <Link href={L("/contact")} className="block w-full text-center bg-amber-500 text-slate-900 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors">
              {t.persoCta}
            </Link>
          </div>
        </div>

        <CalculateurRentabilite />

        {/* FAQ courte (depliable) */}
        <div className="max-w-3xl mx-auto px-6 mt-24">
          <details className="group bg-white border border-slate-200 rounded-2xl shadow-sm">
            <summary className="flex items-center justify-between cursor-pointer select-none px-8 py-6 list-none [&::-webkit-details-marker]:hidden">
              <span className="text-xl font-bold text-slate-900">{t.faqTitre}</span>
              <span className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-2xl font-semibold leading-none transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <div className="space-y-6 px-8 pb-8 pt-4 border-t border-slate-100">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">{t.faq1Q}</h3>
                <p className="text-slate-600">{t.faq1R}</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">{t.faq2Q}</h3>
                <p className="text-slate-600">{t.faq2R}</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">{t.faq3Q}</h3>
                <p className="text-slate-600">{t.faq3R}</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">{t.faq4Q}</h3>
                <p className="text-slate-600">{t.faq4R}</p>
              </div>
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
