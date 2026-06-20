import { useState } from 'react';
import Header from '../components/Header';

const dishes = [
  {
    id: 1,
    name: 'Wagyu A5 aux Truffes Noires',
    description: 'Fines tranches de Wagyu saisies à la flamme, éclats de truffes noires du Périgord, jus de viande corsé.',
    price: '85€',
    energy: 640,
    energyPct: 75,
    nutrients: ['PROTÉINES 42G', 'GLUCIDES 8G', 'LIPIDES 52G'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    name: 'Ravioles de Homard Bleu',
    description: "Pâte fraîche maison, chair de homard bleu, bisque onctueuse infusée au safran d'Iran.",
    price: '52€',
    energy: 480,
    energyPct: 55,
    nutrients: ['PROTÉINES 28G', 'GLUCIDES 34G', 'LIPIDES 22G'],
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop',
  },
];

export default function OrderReady() {
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [waiterCalled, setWaiterCalled] = useState(false);

  const rate = (dishId: number, rating: number) => {
    setRatings(prev => ({ ...prev, [dishId]: rating }));
  };

  return (
    <>
      <Header />

      <main className="pt-8 px-container-margin max-w-5xl mx-auto pb-32">
        {/* En-tête succès */}
        <header className="text-center mb-12 animate-fade-in-up">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">
            Votre commande est prête !
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Une symphonie culinaire vous attend. Nos serveurs vous rejoignent à l'instant même.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Cartes des plats */}
          <div className="lg:col-span-8 space-y-8">
            {dishes.map(dish => (
              <section
                key={dish.id}
                className="bg-[#1A1A1A] border border-[#2A2A2A] hover:border-primary transition-colors p-6 rounded-xl overflow-hidden"
              >
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
                    <img className="w-full h-full object-cover" src={dish.image} alt={dish.name} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">{dish.name}</h2>
                      <span className="font-price-md text-price-md text-primary">{dish.price}</span>
                    </div>
                    <p className="font-body-md text-on-surface-variant mb-6">{dish.description}</p>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between font-label-md text-on-surface-variant mb-1">
                          <span>Énergie</span>
                          <span className="text-primary">{dish.energy} kcal</span>
                        </div>
                        <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-secondary-container to-primary transition-all duration-1000"
                            style={{ width: `${dish.energyPct}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {dish.nutrients.map(n => (
                          <span
                            key={n}
                            className="px-3 py-1 rounded-full border border-outline-variant font-label-md text-on-surface-variant bg-surface-container-low"
                          >
                            {n}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating + action */}
                <div className="pt-6 border-t border-outline-variant flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <span className="font-label-md text-on-surface-variant">Notez ce plat :</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <span
                          key={star}
                          className={`material-symbols-outlined cursor-pointer transition-colors ${
                            (ratings[dish.id] || 0) >= star ? 'text-primary' : 'text-outline-variant hover:text-primary'
                          }`}
                          style={
                            (ratings[dish.id] || 0) >= star
                              ? { fontVariationSettings: "'FILL' 1" }
                              : undefined
                          }
                          onClick={() => rate(dish.id, star)}
                        >
                          star
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md hover:bg-primary-container transition-all active:scale-95">
                    Recommander ce plat
                  </button>
                </div>
              </section>
            ))}
          </div>

          {/* Panneau latéral — résumé nutritionnel */}
          <div className="lg:col-span-4 space-y-gutter">
            <section className="bg-[#1A1A1A] border border-[#2A2A2A] hover:border-primary transition-colors p-8 rounded-xl text-center">
              <h3 className="font-headline-sm text-on-surface mb-8">Profil Nutritionnel Total</h3>

              {/* Radar simplifié */}
              <div className="relative w-48 h-48 mx-auto mb-8">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <polygon className="fill-none stroke-outline-variant" strokeWidth="1" points="50,5 95,35 78,85 22,85 5,35" />
                  <polygon className="fill-none stroke-outline-variant" strokeWidth="1" points="50,25 72,40 64,65 36,65 28,40" />
                  <polygon className="fill-primary/20 stroke-primary" strokeWidth="2" points="50,15 85,38 70,75 35,80 15,45" />
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant">
                  <span className="block font-label-md text-on-surface-variant text-xs mb-1">CALORIES TOTALES</span>
                  <span className="font-headline-sm text-primary">1,120</span>
                </div>
                <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant">
                  <span className="block font-label-md text-on-surface-variant text-xs mb-1">IMPACT SANTÉ</span>
                  <span className="font-headline-sm text-primary">A+</span>
                </div>
              </div>

              <button
                onClick={() => setWaiterCalled(true)}
                className={`w-full py-4 border rounded-lg font-label-md transition-all flex items-center justify-center gap-2 mb-4 ${
                  waiterCalled
                    ? 'bg-primary-container text-on-primary-container border-primary-container'
                    : 'border-primary text-primary hover:bg-primary/10'
                }`}
              >
                <span className="material-symbols-outlined">
                  {waiterCalled ? 'done_all' : 'notifications_active'}
                </span>
                {waiterCalled ? 'SERVEUR EN ROUTE' : 'APPELER LE SERVEUR'}
              </button>
              <p className="font-body-md text-on-surface-variant text-sm italic">
                "Une expérience sans attente pour un plaisir sans égal."
              </p>
            </section>

            {/* Statut */}
            <section className="bg-[#1A1A1A] border border-[#2A2A2A] p-6 rounded-xl flex items-center gap-4 bg-secondary-container/10">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>
              <div>
                <h4 className="font-label-md text-on-surface">Service Immédiat</h4>
                <p className="font-body-md text-xs text-on-surface-variant">
                  Le Chef de Rang a été notifié de votre disponibilité.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
