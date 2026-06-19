import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const initialItems = [
  {
    id: 1,
    name: 'Filet de Bœuf Wellington',
    subtitle: 'Truffe noire, pâte feuilletée maison',
    price: 68,
    qty: 1,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLu3FiQ9M-5nakA5QmcZxe7okq8T0gJrHL7-Z8zATxkHkSXNsf92lzNaOTWV3N_e2uNruxn1yogBYSpNmvuzHSM9q1raaVgEcBy0BON7JRxEgj_0J3Mqh6vowi1VnxAM-uTDQtGeL6arfAIxWHfT0asW9LOvVHY2sbtv2YUUB9lalfC-4B76kjtUud3lyGEykl5ykqEfFkD1LP4jGKjzzzFzVX9L-lRvRkI03Dy3avH-JYbHIUr7pqyPnsE',
  },
  {
    id: 2,
    name: 'Dom Pérignon Vintage',
    subtitle: 'Cuvée de Prestige 2012',
    price: 245,
    qty: 1,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLviKMkk4t_l86UlI4lMlfROcgyRYUZ9N1xDfCHGz-EWQzU_8otQHn-briVzwiXoJZww2lhPE52YG-7Frvah2hyERcVIH1H9T5OT45byXlpThD5yv3LQ2u-5lmDPQwQ03nRFuE1gnfEQTLoPDVQVgy1CXcU0kLDdvDTcSvu-A4njqTKR4bbjLCh4d4qXsXzSm6tygFVSOWZvnemRIWYsIdGmO7ldLI6yW6hKcEjuk-6sqD9NE5v_byzi1w',
  },
  {
    id: 3,
    name: 'Soufflé au Chocolat Noir',
    subtitle: 'Grand Cru, glace vanille Bourbon',
    price: 22,
    qty: 2,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLvrZaXo-RldTyR0FAMByLNQB09h1iylSzwZFVSt55DDZC4zOswargzSTWMuCe7NGmbugL53CIkMm96Prme9exftG5KllPQIOzBMTXU-CqPRAKeheCL8TmT5nS6omGnBG6RtDqlZqsvs2pzUWV7kWZUvg5NqB5VfdqZvNYf_Ti4-x-Ubxg_QeIbC1B5-cDOjbTw3GzQwOIVeNfX6Y8PoqhG9Ik_lBreEe8mcm9tCo4ZaAwlPm3bpgZCl3NY',
  },
];

export default function CartConfirmation() {
  const [items, setItems] = useState(initialItems);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const changeQty = (id: number, delta: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
      ).filter(item => item.qty > 0)
    );
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const serviceFee = Math.round(subtotal * 0.12 * 100) / 100;
  const total = subtotal + serviceFee;

  return (
    <>
      <Header />

      <main className="pt-8 pb-32 px-container-margin max-w-2xl mx-auto">
        {/* Titre */}
        <div className="mb-12">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-2">
            Votre Sélection
          </h2>
          <p className="text-on-surface-variant font-body-md">
            Une expérience gastronomique sur mesure, prête à être confirmée.
          </p>
        </div>

        {/* Liste des articles */}
        <div className="space-y-8">
          {items.map((item, index) => (
            <div key={item.id}>
              <div className="flex items-center gap-6 group">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <img
                    alt={item.name}
                    className="w-full h-full object-cover rounded-full border border-outline-variant group-hover:border-primary transition-colors"
                    src={item.image}
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1 truncate">
                    {item.name}
                  </h3>
                  <p className="text-label-md text-on-surface-variant mb-2">{item.subtitle}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-outline-variant rounded-lg bg-surface-container-lowest overflow-hidden">
                      <button
                        className="px-3 py-1 hover:bg-surface-variant transition-colors text-primary"
                        onClick={() => changeQty(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="px-3 font-label-md text-on-surface">{item.qty}</span>
                      <button
                        className="px-3 py-1 hover:bg-surface-variant transition-colors text-primary"
                        onClick={() => changeQty(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-price-lg text-price-lg text-primary">
                    {(item.price * item.qty).toFixed(2)}€
                  </span>
                </div>
              </div>
              {index < items.length - 1 && (
                <div className="h-px w-full bg-gradient-to-r from-transparent via-outline-variant to-transparent mt-8" />
              )}
            </div>
          ))}
        </div>

        {/* Résumé */}
        <section className="mt-16 p-8 bg-surface-container rounded-xl border border-outline-variant shadow-lg">
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center text-on-surface-variant">
              <span className="font-body-md">Sous-total</span>
              <span className="font-price-md">{subtotal.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant">
              <span className="font-body-md">Frais de service (12%)</span>
              <span className="font-price-md">{serviceFee.toFixed(2)}€</span>
            </div>
            <div className="pt-4 border-t border-outline-variant/30 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <span className="block font-label-md text-primary uppercase tracking-widest mb-1">
                  Grand Total TTC
                </span>
                <span className="font-display-lg text-display-lg-mobile text-on-surface leading-none">
                  {total.toFixed(2)}€
                </span>
              </div>
              <button
                onClick={() => setShowConfirmation(true)}
                className="px-8 py-4 rounded-lg font-label-md bg-gradient-to-r from-secondary-container to-primary text-on-primary-fixed font-bold tracking-widest hover:shadow-[0_0_20px_rgba(230,195,100,0.4)] transition-all duration-300 active:scale-95 uppercase"
              >
                Commander maintenant
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Modale de confirmation */}
      {showConfirmation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm bg-background/90">
          <div className="bg-surface-container-highest border border-primary/30 p-12 rounded-2xl max-w-md w-full text-center shadow-2xl animate-fade-in-up">
            <div className="mb-8 flex justify-center">
              <svg className="w-24 h-24 text-primary" viewBox="0 0 52 52">
                <circle className="stroke-current fill-none" cx="26" cy="26" opacity="0.2" r="25" strokeWidth="2" />
                <path
                  className="stroke-current fill-none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  style={{ strokeDasharray: 100, strokeDashoffset: 0 }}
                />
              </svg>
            </div>
            <h2 className="font-display-lg text-display-lg-mobile text-primary mb-4">
              Commande Confirmée
            </h2>
            <p className="text-on-surface-variant font-body-md mb-8">
              Votre sélection a été transmise au Chef. Préparez-vous pour une expérience d'exception.
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => navigate('/tracking')}
                className="w-full py-4 border border-primary text-primary rounded-lg font-label-md hover:bg-primary/10 transition-colors uppercase tracking-widest"
              >
                Suivre ma commande
              </button>
              <button
                onClick={() => { setShowConfirmation(false); navigate('/menu'); }}
                className="text-on-surface-variant font-label-md hover:text-on-surface transition-colors underline underline-offset-4"
              >
                Retour à la carte
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
