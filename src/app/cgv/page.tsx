export default function CgvPage() {
  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-8">
          Conditions Generales de Vente
        </h1>
        <div className="prose prose-lg text-slate-700 space-y-6">
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <strong>Document provisoire.</strong> Ces CGV doivent etre validees
            par un juriste avant utilisation commerciale reelle.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Article 1 - Objet</h2>
          <p>
            Les presentes CGV regissent les relations contractuelles entre DEVIA
            (l&apos;Editeur) et toute personne physique ou morale (le Client)
            achetant le logiciel DEVIA.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Article 2 - Produit</h2>
          <p>
            Le logiciel DEVIA est un outil de generation de devis pour la
            charpente, accessible via Internet, fourni sous la forme d&apos;un
            acces personnel par cle de licence.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Article 3 - Prix et paiement</h2>
          <p>
            Le prix de l&apos;installation est de 2 000 &euro; (paiement unique).
            L&apos;abonnement maintenance optionnel est de 35 &euro; par mois,
            sans engagement, annulable a tout moment.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Article 4 - Licence</h2>
          <p>
            Le Client beneficie d&apos;une licence d&apos;utilisation personnelle
            et non transferable du logiciel. La cle de licence est strictement
            personnelle et ne peut etre partagee.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Article 5 - Droit de retractation</h2>
          <p>
            Conformement a l&apos;article L221-28 du Code de la consommation,
            le droit de retractation ne s&apos;applique pas aux contenus
            numeriques fournis sur un support immateriel apres execution.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Article 6 - Responsabilite</h2>
          <p>
            DEVIA est un outil d&apos;aide au chiffrage. La responsabilite finale
            de l&apos;exactitude des devis transmis aux clients tiers incombe
            au professionnel utilisateur. DEVIA ne saurait etre tenu responsable
            d&apos;erreurs de saisie ou d&apos;interpretation.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Article 7 - Litiges</h2>
          <p>
            En cas de litige, une solution amiable sera recherchee. A defaut,
            les tribunaux francais seront seuls competents.
          </p>
        </div>
      </div>
    </section>
  );
}
