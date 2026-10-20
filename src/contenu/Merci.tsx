"use client";

import { useEffect, useState } from "react";
import { dico, type Langue } from "../i18n";

// Page d arrivee apres paiement. Elle interroge le serveur jusqu a ce que le webhook ait
// cree la cle : Stripe redirige l acheteur avant d avoir fini de prevenir le serveur, donc
// la premiere reponse est souvent "en attente" - c est normal, on reessaie.
export default function Merci({ lang }: { lang: Langue }) {
  const t = dico(lang).achat;
  const [cle, setCle] = useState("");
  const [erreur, setErreur] = useState("");
  const [copie, setCopie] = useState(false);

  useEffect(() => {
    const idSession = new URLSearchParams(window.location.search).get("session_id") || "";
    if (idSession === "") {
      setErreur(t.meSansRef);
      return;
    }
    let essais = 0;
    let actif = true;
    const demander = async () => {
      essais += 1;
      try {
        const r = await fetch("/api/ma-cle?session_id=" + encodeURIComponent(idSession));
        const j = await r.json();
        if (actif === false) return;
        if (j.license_key) { setCle(j.license_key); return; }
        if (j.error) { setErreur(j.error); return; }
        if (essais < 15) setTimeout(demander, 1500);
        else setErreur(t.meLent);
      } catch {
        if (actif && essais < 15) setTimeout(demander, 1500);
      }
    };
    demander();
    return () => { actif = false; };
  }, [t.meSansRef, t.meLent]);

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(cle);
      setCopie(true);
      setTimeout(() => setCopie(false), 2000);
    } catch {
      setCopie(false);
    }
  };

  return (
    <main style={{ maxWidth: 620, margin: "0 auto", padding: "80px 24px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 30, marginBottom: 10 }}>{t.meTitre}</h1>

      {cle === "" && erreur === "" && (
        <p style={{ opacity: 0.75 }}>{t.meAttente}</p>
      )}

      {erreur !== "" && (
        <p style={{ color: "#c0392b" }}>{erreur}</p>
      )}

      {cle !== "" && (
        <>
          <p style={{ opacity: 0.8, lineHeight: 1.6 }}>{t.meTexte}</p>
          <div style={{
            margin: "22px 0", padding: "18px 20px", borderRadius: 12,
            border: "1px solid rgba(240,192,64,0.5)", background: "rgba(240,192,64,0.08)",
            fontSize: 22, fontWeight: 700, letterSpacing: 1.5, textAlign: "center",
          }}>
            {cle}
          </div>
          <button onClick={copier} style={{
            padding: "10px 18px", borderRadius: 9, cursor: "pointer",
            border: "1px solid rgba(0,0,0,0.2)", background: "transparent", fontSize: 14,
          }}>
            {copie ? t.meCopie : t.meCopier}
          </button>

          <h2 style={{ fontSize: 17, marginTop: 40, marginBottom: 8 }}>{t.meDebutT}</h2>
          <ol style={{ lineHeight: 1.9, paddingLeft: 20, opacity: 0.85 }}>
            <li>{t.meDebut1} <a href="https://devia-iota.vercel.app">devia-iota.vercel.app</a></li>
            <li>{t.meDebut2}</li>
            <li>{t.meDebut3}</li>
          </ol>
        </>
      )}
    </main>
  );
}
