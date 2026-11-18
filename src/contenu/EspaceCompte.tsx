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
type Licence = {
  license_key: string;
  subscription_status: string;
  subscription_expires_at: string | null;
  stripe_customer_id: string | null;
};

const URL_LOGICIEL = "https://devia-iota.vercel.app";

export default function EspaceCompte({ lang, achatOuvert }: { lang: Langue; achatOuvert: boolean }) {
  const t = dico(lang).compte;
  const g = dico(lang).guides;
  const L = (c: string) => lien(lang, c);
  const [session, setSession] = useState<Session | null>(null);
  const [pret, setPret] = useState(false);
  const [mode, setMode] = useState<"connexion" | "inscription" | "oubli">("connexion");
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState("");
  const [info, setInfo] = useState("");
  const [veutAcheter, setVeutAcheter] = useState(false);
  const [accepte, setAccepte] = useState(false);
  const [tour, setTour] = useState(0);
  const [recuperation, setRecuperation] = useState(false);
  const [mdp2, setMdp2] = useState("");
  const [licence, setLicence] = useState<Licence | null>(null);
  const [licenceLue, setLicenceLue] = useState(false);
  const suiteLancee = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setVeutAcheter(params.get("suite") === "acheter");
    // Arrivee par le lien "mot de passe oublie" : l adresse porte type=recovery tant que
    // Supabase ne l a pas lue, puis il emet PASSWORD_RECOVERY. On guette les deux.
    if (window.location.hash.indexOf("type=recovery") >= 0) setRecuperation(true);
    // Retour de Stripe apres la souscription : le webhook met quelques secondes a passer,
    // la licence est relue un peu plus tard.
    if (params.get("maintenance") === "ok") {
      setInfo(t.maintenanceMerci);
      setTimeout(() => setTour(1), 4000);
    }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setPret(true); });
    const { data: abo } = supabase.auth.onAuthStateChange((evt, s) => {
      if (evt === "PASSWORD_RECOVERY") setRecuperation(true);
      setSession(s);
    });
    return () => { abo.subscription.unsubscribe(); };
  }, []);

  // La licence du compte : la politique RLS ne laisse lire que la sienne.
  useEffect(() => {
    if (session === null) { setLicence(null); setLicenceLue(false); return; }
    let actif = true;
    supabase
      .from("licenses")
      .select("license_key, subscription_status, subscription_expires_at, stripe_customer_id")
      .eq("user_id", session.user.id)
      .limit(1)
      .then(({ data }) => {
        if (actif === false) return;
        setLicence(data && data.length > 0 ? (data[0] as Licence) : null);
        setLicenceLue(true);
      });
    return () => { actif = false; };
  }, [session, tour]);

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
    if (s.includes("different from the old")) return t.errMdpIdentique;
    if (s.includes("for security purposes")) return t.errTropDeTentatives;
    if (s.includes("password")) return t.errMdp;
    return m;
  };

  const valider = async (e: FormEvent) => {
    e.preventDefault();
    setErreur("");
    setInfo("");
    if (mode === "inscription" && accepte === false) { setErreur(t.errAccepte); return; }
    setEnCours(true);
    if (mode === "oubli") {
      // Le lien de l e-mail revient ici, sur Mon compte : la personne reste sur le site.
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: window.location.origin + L("/compte"),
      });
      if (error) setErreur(traduireErreur(error.message));
      else setInfo(t.oubliEnvoye);
    } else if (mode === "connexion") {
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

  // Arrivee par le lien de l e-mail : la session de recuperation permet de fixer le
  // nouveau mot de passe, valable aussi dans le logiciel (meme compte).
  const changerMdp = async (e: FormEvent) => {
    e.preventDefault();
    setErreur("");
    setInfo("");
    if (mdp.length < 12 || /[a-zA-Z]/.test(mdp) === false || /[0-9]/.test(mdp) === false) { setErreur(t.errMdp); return; }
    if ((mdp === mdp2) === false) { setErreur(t.errMdpDifferents); return; }
    setEnCours(true);
    const { error } = await supabase.auth.updateUser({ password: mdp });
    setEnCours(false);
    if (error) { setErreur(traduireErreur(error.message)); return; }
    setMdp("");
    setMdp2("");
    setRecuperation(false);
    setInfo(t.mdpChange);
    window.history.replaceState(null, "", window.location.pathname);
  };

  // Souscrire la maintenance ou ouvrir l espace client Stripe : le serveur verifie le compte.
  const appelerStripe = async (route: string) => {
    if (session === null) return;
    setErreur("");
    setInfo("");
    setEnCours(true);
    try {
      const r = await fetch(route, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + session.access_token },
        body: JSON.stringify({ lang: lang }),
      });
      const j = await r.json();
      if (j.url) { window.location.href = j.url; return; }
      setErreur(j.error || dico(lang).achat.acErreur);
    } catch (e) {
      setErreur(e instanceof Error ? e.message : dico(lang).achat.acErreur);
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
              {mode === "oubli" ? <p className="text-sm text-slate-600">{t.oubliIntro}</p> : null}
              <div>
                <label htmlFor="compte-email" className="block text-sm font-medium text-slate-700 mb-1">{t.email}</label>
                <input id="compte-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={champ} />
              </div>
              {mode === "oubli" ? null : (
              <div>
                <label htmlFor="compte-mdp" className="block text-sm font-medium text-slate-700 mb-1">{t.motDePasse}</label>
                <input id="compte-mdp" type="password" required minLength={mode === "inscription" ? 12 : undefined}
                  autoComplete={mode === "inscription" ? "new-password" : "current-password"}
                  value={mdp} onChange={(e) => setMdp(e.target.value)} className={champ} />
                {mode === "inscription" ? <p className="mt-1 text-xs text-slate-500">{t.mdpRegle}</p> : null}
              </div>
              )}
              {mode === "inscription" ? (
                <label htmlFor="compte-accepte" className="flex items-start gap-2 text-sm text-slate-600">
                  <input id="compte-accepte" type="checkbox" required checked={accepte} onChange={(e) => setAccepte(e.target.checked)} className="mt-1" />
                  <span>
                    {t.accepte1} <Link href={L("/cgu")} target="_blank" className="text-amber-700 hover:underline">{t.accepteCgu}</Link>{" "}
                    {t.accepte2} <Link href={L("/confidentialite")} target="_blank" className="text-amber-700 hover:underline">{t.accepteConf}</Link>.
                  </span>
                </label>
              ) : null}
              <button type="submit" disabled={enCours} className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors disabled:opacity-60">
                {enCours ? t.enCours : (mode === "connexion" ? t.seConnecter : (mode === "oubli" ? t.oubliEnvoyer : t.creer))}
              </button>
            </form>
            {messages}
            {mode === "connexion" ? (
              <p className="mt-6 text-sm">
                <button type="button" onClick={() => { setMode("oubli"); setErreur(""); setInfo(""); }} className="text-amber-700 hover:underline">{t.oubli}</button>
              </p>
            ) : (mode === "oubli" ? (
              <p className="mt-6 text-sm">
                <button type="button" onClick={() => { setMode("connexion"); setErreur(""); setInfo(""); }} className="text-amber-700 hover:underline">{t.retourConnexion}</button>
              </p>
            ) : (
              <p className="mt-6 text-xs text-slate-500">{t.inscriptionPro}</p>
            ))}
          </div>
        ) : null}

        {pret && session && recuperation ? (
          <div className={carte + " max-w-md"}>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">{t.nouveauMdpT}</h2>
            <p className="text-sm text-slate-600 mb-6">{t.connecteEn} <span className="font-semibold text-slate-900">{session.user.email}</span></p>
            <form onSubmit={changerMdp} className="space-y-4">
              <div>
                <label htmlFor="compte-nmdp1" className="block text-sm font-medium text-slate-700 mb-1">{t.nouveauMdp}</label>
                <input id="compte-nmdp1" type="password" required autoComplete="new-password" value={mdp} onChange={(e) => setMdp(e.target.value)} className={champ} />
                <p className="mt-1 text-xs text-slate-500">{t.mdpRegle}</p>
              </div>
              <div>
                <label htmlFor="compte-nmdp2" className="block text-sm font-medium text-slate-700 mb-1">{t.confirmerMdp}</label>
                <input id="compte-nmdp2" type="password" required autoComplete="new-password" value={mdp2} onChange={(e) => setMdp2(e.target.value)} className={champ} />
              </div>
              <button type="submit" disabled={enCours} className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors disabled:opacity-60">
                {enCours ? t.enCours : t.enregistrerMdp}
              </button>
            </form>
            {messages}
          </div>
        ) : null}

        {pret && session && recuperation === false ? (
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
                    {t.maintenance} : {licence.subscription_status === "active" ? t.maintenanceActive
                      : (licence.subscription_status === "past_due" ? t.maintenanceRetard
                      : (licence.subscription_status === "cancelled" ? t.maintenanceResiliee : t.maintenanceAucune))}
                    {licence.subscription_expires_at ? " - " + t.valableJusquau + " " + new Date(licence.subscription_expires_at).toLocaleDateString(lang === "en" ? "en-GB" : "fr-FR") : ""}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <a href={URL_LOGICIEL} className="inline-block bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors">{t.ouvrirLogiciel}</a>
                    {achatOuvert && (licence.subscription_status === "active" || licence.subscription_status === "past_due") === false ? (
                      <button type="button" onClick={() => appelerStripe("/api/maintenance")} disabled={enCours}
                        className="bg-amber-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors disabled:opacity-60">
                        {t.maintenanceSouscrire}
                      </button>
                    ) : null}
                    {licence.stripe_customer_id ? (
                      <button type="button" onClick={() => appelerStripe("/api/portail")} disabled={enCours}
                        className="border border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors disabled:opacity-60">
                        {t.maintenanceGerer}
                      </button>
                    ) : null}
                  </div>
                  <p className="text-xs text-slate-500">{t.maintenanceTexte}</p>
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
