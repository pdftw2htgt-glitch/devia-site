"use client";

import { usePathname, useRouter } from "next/navigation";

// Bascule FR / EN. La langue se lit dans l URL (prefixe /en), donc ce composant
// n a besoin d aucun reglage exterieur : il marche sur toutes les pages.
export default function SelecteurLangue() {
  const chemin = usePathname() || "/";
  const router = useRouter();
  const enAnglais = chemin === "/en" || chemin.startsWith("/en/");

  const versLangue = (cible: "fr" | "en") => {
    // On retire d abord le prefixe eventuel, puis on remet celui qu il faut.
    const nu = enAnglais ? (chemin.slice(3) || "/") : chemin;
    const dest = cible === "en" ? (nu === "/" ? "/en" : "/en" + nu) : nu;
    router.push(dest);
  };

  const base = "px-2.5 py-1 text-xs font-semibold rounded-md transition-colors";
  const actif = "bg-slate-900 text-white";
  const inactif = "text-slate-500 hover:text-slate-900";

  return (
    <div className="flex items-center gap-0.5 border border-slate-200 rounded-lg p-0.5" aria-label="Langue">
      <button
        type="button"
        onClick={() => versLangue("fr")}
        className={base + " " + (enAnglais ? inactif : actif)}
        aria-current={enAnglais ? undefined : "true"}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => versLangue("en")}
        className={base + " " + (enAnglais ? actif : inactif)}
        aria-current={enAnglais ? "true" : undefined}
      >
        EN
      </button>
    </div>
  );
}
