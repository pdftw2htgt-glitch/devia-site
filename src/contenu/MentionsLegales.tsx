import { dico, type Langue } from "../i18n";

export default function MentionsLegales({ lang }: { lang: Langue }) {
  const t = dico(lang).juridique;

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-8">{t.mlTitre}</h1>
        <div className="prose prose-lg text-slate-700 space-y-6">
          {lang === "en" ? (
            <p className="text-sm text-slate-600 bg-slate-100 border border-slate-200 p-4 rounded-lg">{t.prevaut}</p>
          ) : null}
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <strong>{t.provisoire}</strong> {t.mlAvis}
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">{t.m0T}</h2>
          <p>
            DEVIA<br />
            {t.m0L2}<br />
            {t.m0L3}<br />
            Email : contact@devia.fr
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">{t.m1T}</h2>
          <p>
            Vercel Inc.<br />
            340 S Lemon Ave #4133, Walnut, CA 91789, USA<br />
            <a href="https://vercel.com" className="text-amber-700 hover:underline">vercel.com</a>
          </p>

          {[2, 3, 4].map((i) => (
            <div key={i}>
              <h2 className="text-xl font-semibold text-slate-900 mt-8">{t["m" + i + "T"]}</h2>
              <p>{t["m" + i + "D"]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
