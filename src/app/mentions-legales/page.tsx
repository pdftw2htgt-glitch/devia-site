export default function LegalPage() {
  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-8">
          Mentions legales
        </h1>
        <div className="prose prose-lg text-slate-700 space-y-6">
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <strong>Document provisoire.</strong> Ces mentions legales seront
            completees apres immatriculation officielle de l&apos;entreprise.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Editeur du site</h2>
          <p>
            DEVIA<br />
            Adresse : (a completer apres immatriculation)<br />
            SIRET : (a completer)<br />
            Email : contact@devia.fr
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Hebergement</h2>
          <p>
            Vercel Inc.<br />
            340 S Lemon Ave #4133, Walnut, CA 91789, USA<br />
            <a href="https://vercel.com" className="text-amber-700 hover:underline">vercel.com</a>
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Donnees personnelles</h2>
          <p>
            DEVIA collecte uniquement les donnees strictement necessaires au
            fonctionnement du service (email, mot de passe hache, cle de licence).
            Aucune donnee n&apos;est revendue a des tiers. Conformement au RGPD,
            vous disposez d&apos;un droit d&apos;acces, de rectification et de
            suppression de vos donnees en nous contactant a contact@devia.fr.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Cookies</h2>
          <p>
            Le site utilise uniquement des cookies techniques necessaires
            a l&apos;authentification. Aucun cookie de tracking ou publicitaire
            n&apos;est utilise.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 mt-8">Propriete intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu du site (textes, images, logos, code source)
            est protege par le droit d&apos;auteur. Toute reproduction non autorisee
            est interdite.
          </p>
        </div>
      </div>
    </section>
  );
}
