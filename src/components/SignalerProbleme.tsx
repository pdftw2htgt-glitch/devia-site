"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Etat = "idle" | "envoi" | "ok" | "erreur";

export default function SignalerProbleme() {
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
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Merci, votre signalement a bien été envoyé.
        </h2>
        <p className="text-slate-700 mb-4">
          Notre équipe va le traiter au plus vite.
        </p>
        <button
          type="button"
          onClick={() => setEtat("idle")}
          className="text-amber-700 font-semibold hover:underline"
        >
          Signaler un autre problème
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 rounded-2xl p-8">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Signaler un problème</h2>
      <p className="text-slate-700 mb-6">
        Décrivez votre souci, on s&apos;en occupe. Laissez votre email pour être recontacté.
      </p>

      <form onSubmit={envoyer} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Type</label>
          <select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value as "bug" | "question" | "demande")}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
          >
            <option value="bug">Bug / dysfonctionnement</option>
            <option value="question">Question</option>
            <option value="demande">Demande / suggestion</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Objet *</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Ex : Le rendu 3D ne se génère pas"
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Votre email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@exemple.fr"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Décrivez ce qui s'est passé, à quel moment…"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
          />
        </div>

        {etat === "erreur" && (
          <p className="text-sm text-red-600">
            Une erreur est survenue : {messageErreur}. Réessayez ou écrivez-nous par email.
          </p>
        )}

        <button
          type="submit"
          disabled={etat === "envoi" || !titre.trim()}
          className="inline-flex items-center bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {etat === "envoi" ? "Envoi…" : "Envoyer le signalement"}
        </button>
      </form>
    </div>
  );
}
