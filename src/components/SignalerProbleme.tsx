"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { dico, type Langue } from "../i18n";

type Etat = "idle" | "envoi" | "ok" | "erreur";

export default function SignalerProbleme() {
  // Langue lue dans l URL, comme le menu.
  const chemin = usePathname() || "/";
  const lang: Langue = (chemin === "/en" || chemin.startsWith("/en/")) ? "en" : "fr";
  const t = dico(lang).sav;
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [categorie, setCategorie] = useState<"bug" | "question" | "demande">("bug");
  const [etat, setEtat] = useState<Etat>("idle");
  const [messageErreur, setMessageErreur] = useState("");

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    if (!titre.trim()) return;

    setEtat("envoi");
    setMessageErreur("");

    const { error } = await supabase.from("sav_tickets").insert({
      user_id: null,
      company_name: email.trim() || null,
      title: titre.trim(),
      description: description.trim() || null,
      category: categorie,
      priority: "moyenne",
      channel: "app",
      status: "ouvert",
    });

    if (error) {
      setEtat("erreur");
      setMessageErreur(error.message);
    } else {
      setEtat("ok");
      setTitre("");
      setDescription("");
      setEmail("");
      setCategorie("bug");
    }
  }

  if (etat === "ok") {
    return (
      <div className="bg-slate-50 rounded-2xl p-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">{t.merciTitre}</h2>
        <p className="text-slate-700 mb-4">{t.merciTexte}</p>
        <button
          type="button"
          onClick={() => setEtat("idle")}
          className="text-amber-700 font-semibold hover:underline"
        >
          {t.merciAutre}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 rounded-2xl p-8">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">{t.titre}</h2>
      <p className="text-slate-700 mb-6">{t.intro}</p>

      <form onSubmit={envoyer} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.typeLabel}</label>
          <select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value as "bug" | "question" | "demande")}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
          >
            <option value="bug">{t.typeBug}</option>
            <option value="question">{t.typeQuestion}</option>
            <option value="demande">{t.typeDemande}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.objetLabel}</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder={t.objetPlaceholder}
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            {t.emailLabel}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.descLabel}</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder={t.descPlaceholder}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
          />
        </div>

        {etat === "erreur" && (
          <p className="text-sm text-red-600">
            {t.erreurAvant}{messageErreur}{t.erreurApres}
          </p>
        )}

        <button
          type="submit"
          disabled={etat === "envoi" || !titre.trim()}
          className="inline-flex items-center bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {etat === "envoi" ? t.envoiEnCours : t.envoyer}
        </button>
      </form>
    </div>
  );
}
