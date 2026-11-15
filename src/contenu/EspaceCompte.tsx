"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import AchatConnecte, { lancerPaiement } from "@/components/AchatConnecte";
import { GUIDES } from "./FormationDevia";
import { dico, lien, type Langue } from "../i18n";

// Mon compte : un seul compte pour le site et le logiciel (meme base Supabase).
// Sans session : connexion ou creation de compte. Avec session : la licence du compte et
// ses formations, qui s ouvrent des que le compte a une licence (achat rattache par le
// webhook Stripe, ou cle activee dans le logiciel).
type Licence = { license_key: string; subscription_status: string; subscription_expires_at: string | null };

const URL_LOGICIEL = "https://devia-iota.vercel.app";

export default function EspaceCompte({ lang, achatOuvert }: { lang: Langue; achatOuvert: boolean }) {
  const t = dico(lang).compte;
  const g = dico(lang).guides;
  const L = (c: string) => lien(lang, c);
  const [session, setSession] = useState<Session | null>(null);
  const [pret, setPret] = useState(false);
  const [mode, setMode] = useState<"connexion" | "inscription">("connexion");
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState("");
  const [info, setInfo] = useState("");
  const [veutAcheter, setVeutAcheter] = useState(false);
  const [licence, setLicence] = useState<Licence | null>(null);
  const [licenceLue, setLicenceLue] = useState(false);
  const suiteLancee = useRef(false);

  useEffect(() => {
    setVeutAcheter(new URLSearchParams(window.location.search).get("suite") === "acheter");
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setPret(true); });
    const { data: abo } = supabase.auth.onAuthStateChange((_evt, s) => { setSession(s); });
    return () => { abo.subscription.unsubscribe(); };
  }, []);

  // La licence du compte : la politique RLS ne laisse lire que la sienne.
  useEffect(() => {
    if (session === null) { setLicence(null); setLicenceLue(false); return; }
    let actif = true;
    supabase
      .from("licenses")
      .select("license_key, subscription_status, subscription_expires_at")
      .eq("user_id", session.user.id)
      .limit(1)
      .then(({ data }) => {
        if (actif === false) return;
        setLicence(data && data.length > 0 ? (data[0] as Licence) : null);
        setLicenceLue(true);
      });
    return () => { actif = false; };
  }, [session]);

  // Arrive ici depuis un bouton d achat : une fois connecte, le paiement repart tout seul.
  useEffect(() => {
    if (session === null || licenceLue === false || suiteLancee.current) return;
    if (veutAcheter === false || achatOuvert === false) return;
    suiteLancee.current = true;
    if ((licence === null) === false) return;
    setInfo(t.redirectionPaiement);
    lancerPaiement(lang, session.access_token).then((res) => {
      if (res.url) { window.location.href = res.url; return; }
      setInfo("");
      setErreur(res.error || dico(lang).achat.acErreur);
    });
  }, [session, licenceLue, licence, veutAcheter, achatOuvert, lang, t.redirectionPaiement]);

  const traduireErreur = (m: string) => {
    const s = m.toLowerCase();
    if (s.includes("invalid login")) return t.errIdentifiants;
    if (s.includes("not confirmed")) return t.errNonConfirme;
    if (s.includes("already registered") || s.includes("already been registered")) return t.errDejaInscrit;
    if (s.includes("rate limit") || s.includes("too many")) return t.errTropDeTentatives;
    if (s.includes("password")) return t.errMdp;
    return m;
  };

  const valider = async (e: FormEvent) => {
    e.preventDefault();
    setErreur("");
    setInfo("");
    setEnCours(true);
    if (mode === "connexion") {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: mdp });
      if (error) setErreur(traduireErreur(error.message));
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: mdp,
        options: { emailRedirectTo: window.location.origin + L("/compte") },
      });
      if (error) setErreur(traduireErreur(error.message));
      else if (data.session === null) setInfo(t.verifierMail);
    }
    setEnCours(false);
  };

  const deconnecter = async () => {
    await supabase.auth.signOut();
    setInfo("");
    setErreur("");
  };

  const champ = "w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400";
  const carte = "bg-white border border-slate-200 rounded-2xl p-8 shadow-sm";
  const ongletActif = "flex-1 py-2 rounded-lg text-sm font-semibold bg-slate-900 text-white";
  const ongletInactif = "flex-1 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900";

  const messages = (
    <>
      {info === "" ? null : <p className="mt-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">{info}</p>}
      {erreur === "" ? null : <p className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">{erreur}</p>}
    </>
  );

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-3">{t.titre}</h1>
        <p className="text-slate-600 mb-10">{t.intro}</p>

        {pret === false ? <p className="text-slate-500">{t.chargement}</p> : null}

        {pret && session === null ? (
          <div className={carte + " max-w-md"}>
            {veutAcheter ? <p className="mb-6 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3">{t.pourAcheter}</p> : null}
            <div className="flex gap-2 mb-6 bg-slate-100 rounded-xl p-1">
              <button type="button" onClick={() => { setMode("connexion"); setErreur(""); setInfo(""); }} className={mode === "connexion" ? ongletActif : ongletInactif}>{t.ongletConnexion}</button>
              <button type="button" onClick={() => { setMode("inscription"); setErreur(""); setInfo(""); }} className={mode === "inscription" ? ongletActif : ongletInactif}>{t.ongletInscription}</button>
            </div>
            <form onSubmit={valider} className="space-y-4">
              <div>
                <label htmlFor="compte-email" className="block text-sm font-medium text-slate-700 mb-1">{t.email}</label>
                <input id="compte-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={champ} />
              </div>
              <div>
                <label htmlFor="compte-mdp" className="block text-sm font-medium text-slate-700 mb-1">{t.motDePasse}</label>
                <input id="compte-mdp" type="password" required minLength={mode === "inscription" ? 12 : undefined}
                  autoComplete={mode === "inscription" ? "new-password" : "current-password"}
                  value={mdp} onChange={(e) => setMdp(e.target.value)} className={champ} />
                {mode === "inscription" ? <p className="mt-1 text-xs text-slate-500">{t.mdpRegle}</p> : null}
              </div>
              <button type="submit" disabled={enCours} className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors disabled:opacity-60">
                {enCours ? t.enCours : (mode === "connexion" ? t.seConnecter : t.creer)}
              </button>
            </form>
            {messages}
            {mode === "connexion" ? (
              <p className="mt-6 text-sm text-slate-500">
                {t.oubli} {t.oubliTexte} <a href={URL_LOGICIEL} className="text-amber-700 hover:underline">{t.ouvrirLogiciel}</a>
              </p>
            ) : (
              <p className="mt-6 text-xs text-slate-500">{t.inscriptionPro}</p>
            )}
          </div>
        ) : null}

        {pret && session ? (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-slate-600">{t.connecteEn} <span className="font-semibold text-slate-900">{session.user.email}</span></p>
              <button type="button" onClick={deconnecter} className="text-sm font-medium text-slate-600 hover:text-slate-900 underline">{t.deconnexion}</button>
            </div>
            {messages}

            <div className={carte}>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">{t.licenceT}</h2>
              {licenceLue === false ? <p className="text-slate-500">{t.chargement}</p> : null}
              {licenceLue && licence ? (
                <div className="space-y-3">
                  <p className="text-sm text-slate-600">{t.licenceCle}</p>
                  <p className="font-mono text-lg font-bold tracking-wider text-slate-900">{licence.license_key}</p>
                  <p className="text-sm text-slate-600">
                    {t.maintenance} : {licence.subscription_status === "active" ? t.maintenanceActive : t.maintenanceAucune}
                    {licence.subscription_expires_at ? " - " + t.valableJusquau + " " + new Date(licence.subscription_expires_at).toLocaleDateString(lang === "en" ? "en-GB" : "fr-FR") : ""}
                  </p>
                  <a href={URL_LOGICIEL} className="inline-block mt-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors">{t.ouvrirLogiciel}</a>
                </div>
              ) : null}
              {licenceLue && licence === null ? (
                <div className="space-y-4">
                  <p className="text-slate-600">{t.licenceAucune}</p>
                  {achatOuvert ? (
                    <div className="max-w-xs"><AchatConnecte lang={lang} libelle={t.acheter} /></div>
                  ) : (
                    <Link href={L("/tarifs")} className="inline-block bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors">{t.voirTarifs}</Link>
                  )}
                </div>
              ) : null}
            </div>

            <div className={carte}>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">{t.formationsT}</h2>
              {licenceLue && licence ? (
                <>
                  <p className="text-slate-600 mb-6">{t.formationsIntro}</p>
                  <ul className="space-y-3">
                    {GUIDES.map((slug, i) => (
                      <li key={slug}>
                        <Link href={L("/apprentissage/formation-devia/" + slug)} className="block rounded-xl border border-slate-200 px-5 py-4 hover:border-amber-400 hover:bg-amber-50 transition-colors">
                          <div className="text-xs font-semibold tracking-widest text-amber-600 uppercase">{g.eyebrowGuide} {"0" + (i + 1)}</div>
                          <div className="font-semibold text-slate-900">{g["g" + i + "T"]}</div>
                          <div className="text-sm text-slate-600">{g["g" + i + "I"]}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 rounded-xl border border-dashed border-amber-300 bg-amber-50 px-5 py-4">
                    <div className="font-semibold text-slate-900">{t.bonusT}</div>
                    <p className="text-sm text-slate-600">{t.bonusBientot}</p>
                  </div>
                </>
              ) : (
                <p className="text-slate-600">{t.formationsVerrou}</p>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
