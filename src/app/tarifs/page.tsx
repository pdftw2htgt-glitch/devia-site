import Link from "next/link";

export default function PricingPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Un prix juste, transparent.
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Achetez DEVIA une fois. Utilisez-le a vie.
            L&apos;abonnement maintenance est optionnel.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          {/* OFFRE INSTALLATION */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="text-sm font-semibold text-slate-500 mb-2">INSTALLATION</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Acces a vie</h2>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-bold text-slate-900">2 000</span>
              <span className="text-2xl text-slate-600">&euro;</span>
              <span className="text-sm text-slate-500 ml-2">paiement unique</span>
            </div>
            <p className="text-slate-600 mb-6">
              Une seule fois. Vous gardez l&apos;acces a la version achetee
              indefiniment, meme sans abonnement.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Acces complet a DEVIA</li>
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Generation IA illimitee</li>
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Visualisation 3D</li>
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Calculs Eurocode 5</li>
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Export PDF illimite</li>
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Support email 30 jours</li>
            </ul>
            <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
              Acheter DEVIA
            </button>
          </div>

          {/* OFFRE MAINTENANCE */}
          <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-8 shadow-sm relative">
            <div className="absolute -top-3 left-8 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              RECOMMANDE
            </div>
            <div className="text-sm font-semibold text-amber-700 mb-2">MAINTENANCE</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Mises a jour</h2>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-bold text-slate-900">35</span>
              <span className="text-2xl text-slate-600">&euro;</span>
              <span className="text-sm text-slate-500 ml-2">/ mois</span>
            </div>
            <p className="text-slate-600 mb-6">
              Acces aux nouvelles fonctionnalites, corrections et evolutions
              du logiciel. Annulable a tout moment.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Toutes les nouvelles fonctionnalites</li>
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Corrections de bugs prioritaires</li>
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Mises a jour Eurocode</li>
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Support email illimite</li>
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Acces beta nouvelles features</li>
              <li className="flex gap-2 text-sm text-slate-700"><span className="text-green-600">&check;</span> Annulation libre</li>
            </ul>
            <button className="w-full bg-amber-500 text-slate-900 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors">
              Activer la maintenance
            </button>
          </div>
        </div>

        {/* FAQ courte */}
        <div className="max-w-3xl mx-auto px-6 mt-24">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Questions frequentes
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">L&apos;abonnement est-il obligatoire ?</h3>
              <p className="text-slate-600">Non. Vous pouvez utiliser DEVIA a vie avec votre achat initial. L&apos;abonnement maintenance debloque uniquement les nouvelles versions et le support etendu.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Comment recevoir ma cle de licence ?</h3>
              <p className="text-slate-600">Apres paiement, vous recevez immediatement par email votre cle au format DEVIA-2026-XXXX-XXXX-XXXX. Connectez-vous a l&apos;application et activez-la en quelques secondes.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Puis-je tester avant d&apos;acheter ?</h3>
              <p className="text-slate-600">Une demo en ligne est disponible. Contactez-nous pour acceder a une demonstration personnalisee.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Combien d&apos;ordinateurs puis-je utiliser ?</h3>
              <p className="text-slate-600">Une licence DEVIA est valable pour un utilisateur. Vous pouvez vous connecter depuis n&apos;importe quel ordinateur, mais pas simultanement.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
