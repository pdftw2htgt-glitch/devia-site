import { dico, type Langue } from "../i18n";

export default function APropos({ lang }: { lang: Langue }) {
  const t = dico(lang).apropos;

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-8">{t.h1}</h1>
        <div className="prose prose-lg text-slate-700 space-y-6">
          <p className="text-xl leading-relaxed">{t.p1}</p>
          <p>{t.p2Avant}<strong>{t.p2Fort}</strong>{t.p2Apres}</p>
          <p>{t.p3}</p>
          <p>{t.p4}</p>
          <p>{t.p5}</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">{t.valeursTitre}</h2>
          <ul className="space-y-3">
            <li><strong>{t.v1T}</strong> {t.v1}</li>
            <li><strong>{t.v2T}</strong> {t.v2}</li>
            <li><strong>{t.v3T}</strong> {t.v3}</li>
            <li><strong>{t.v4T}</strong> {t.v4}</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">{t.projetTitre}</h2>
          <p>{t.projet}</p>
        </div>
      </div>
    </section>
  );
}
