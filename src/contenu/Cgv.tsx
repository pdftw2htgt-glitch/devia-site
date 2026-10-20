import { dico, type Langue } from "../i18n";

const NB = 7;

export default function Cgv({ lang }: { lang: Langue }) {
  const t = dico(lang).juridique;

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-8">{t.cgvTitre}</h1>
        <div className="prose prose-lg text-slate-700 space-y-6">
          {lang === "en" ? (
            <p className="text-sm text-slate-600 bg-slate-100 border border-slate-200 p-4 rounded-lg">{t.prevaut}</p>
          ) : null}
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <strong>{t.provisoire}</strong> {t.cgvAvis}
          </p>
          {Array.from({ length: NB }, (x, i) => i).map((i) => (
            <div key={i}>
              <h2 className="text-xl font-semibold text-slate-900 mt-8">{t["c" + i + "T"]}</h2>
              <p>{t["c" + i + "D"]}</p>
              {t["c" + i + "D2"] === undefined ? null : <p>{t["c" + i + "D2"]}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
