import { dico, type Langue } from "../i18n";

// Conditions generales d utilisation : acceptees a la creation du compte (Mon compte).
// Un article = un titre (uNT), un texte (uND), et au besoin une liste (uNL0, uNL1...).
const NB = 12;

export default function Cgu({ lang }: { lang: Langue }) {
  const t = dico(lang).cgu;
  const j = dico(lang).juridique;

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-8">{t.titre}</h1>
        <div className="prose prose-lg text-slate-700 space-y-6">
          {lang === "en" ? (
            <p className="text-sm text-slate-600 bg-slate-100 border border-slate-200 p-4 rounded-lg">{j.prevaut}</p>
          ) : null}
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <strong>{j.provisoire}</strong> {t.avis}
          </p>
          <p className="text-sm text-slate-500">{t.maj}</p>
          {Array.from({ length: NB }, (x, i) => i).map((i) => {
            const liste = [0, 1, 2, 3, 4, 5, 6, 7]
              .map((k) => t["u" + i + "L" + k])
              .filter((v) => (v === undefined ? false : true));
            return (
              <div key={i}>
                <h2 className="text-xl font-semibold text-slate-900 mt-8">{t["u" + i + "T"]}</h2>
                <p>{t["u" + i + "D"]}</p>
                {liste.length > 0 ? (
                  <ul className="list-disc pl-6 space-y-2">
                    {liste.map((v, k) => <li key={k}>{v}</li>)}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
