import { dico, type Langue } from "../i18n";

// Politique de confidentialite (RGPD). Elle decrit ce que le site et le logiciel font
// reellement : a mettre a jour le jour ou un traitement change (mesure d audience,
// nouvel outil, nouvelle duree de conservation).
const NB_DONNEES = 6;
const PRESTATAIRES = [
  "https://supabase.com/legal/dpa",
  "https://vercel.com/legal/dpa",
  "https://www.anthropic.com/legal/data-processing-addendum",
  "https://stripe.com/legal/dpa",
  "",
];

export default function Confidentialite({ lang }: { lang: Langue }) {
  const t = dico(lang).confidentialite;
  const j = dico(lang).juridique;
  const th = "text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-b border-slate-200 py-2 pr-4";
  const td = "align-top text-sm text-slate-700 border-b border-slate-100 py-3 pr-4";
  const h2 = "text-xl font-semibold text-slate-900 mt-10 mb-3";

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-8">{t.titre}</h1>
        <div className="text-slate-700 leading-relaxed space-y-4">
          {lang === "en" ? (
            <p className="text-sm text-slate-600 bg-slate-100 border border-slate-200 p-4 rounded-lg">{j.prevaut}</p>
          ) : null}
          <p className="text-sm text-slate-500">{t.maj}</p>
          <p>{t.intro}</p>

          <h2 className={h2}>{t.s0T}</h2>
          <p>{t.s0D}</p>

          <h2 className={h2}>{t.s1T}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={th}>{t.hD}</th>
                  <th className={th}>{t.hP}</th>
                  <th className={th}>{t.hB}</th>
                  <th className={th}>{t.hDu}</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: NB_DONNEES }, (x, i) => i).map((i) => (
                  <tr key={i}>
                    <td className={td}>{t["d" + i + "a"]}</td>
                    <td className={td}>{t["d" + i + "b"]}</td>
                    <td className={td}>{t["d" + i + "c"]}</td>
                    <td className={td}>{t["d" + i + "d"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className={h2}>{t.s2T}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={th}>{t.hPr}</th>
                  <th className={th}>{t.hR}</th>
                  <th className={th}>{t.hL}</th>
                  <th className={th}>{t.hG}</th>
                </tr>
              </thead>
              <tbody>
                {PRESTATAIRES.map((url, i) => (
                  <tr key={i}>
                    <td className={td + " font-medium text-slate-900"}>{t["p" + i + "a"]}</td>
                    <td className={td}>{t["p" + i + "b"]}</td>
                    <td className={td}>{t["p" + i + "c"]}</td>
                    <td className={td}>
                      {t["p" + i + "d"]}
                      {url === "" ? null : (
                        <> (<a href={url} target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline">{t.dpa}</a>)</>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>{t.s2D}</p>

          <h2 className={h2}>{t.s3T}</h2>
          <p>{t.s3D}</p>

          <h2 className={h2}>{t.s4T}</h2>
          <p>{t.s4D}</p>

          <h2 className={h2}>{t.s5T}</h2>
          <p>{t.s5D}</p>
        </div>
      </div>
    </section>
  );
}
