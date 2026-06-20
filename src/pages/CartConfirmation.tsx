import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';

export default function CartConfirmation() {
  const { items, updateQty, totalPrice, clearCart, totalItems } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const serviceFee = Math.round(totalPrice * 0.12 * 100) / 100;
  const total = totalPrice + serviceFee;

  if (items.length === 0 && !showConfirmation) {
    return (
      <>
        <Header />
        <main className="pt-8 pb-32 px-container-margin max-w-4xl mx-auto text-center">
          <div className="mt-20">
            <span className="material-symbols-outlined text-6xl text-outline-variant mb-6 block">shopping_cart</span>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Votre panier est vide</h2>
            <p className="text-on-surface-variant font-body-md mb-8">Parcourez notre carte et ajoutez vos plats favoris.</p>
            <button
              onClick={() => navigate('/menu')}
              className="px-8 py-4 rounded-lg font-label-md bg-primary text-on-primary uppercase tracking-widest hover:shadow-[0_0_20px_rgba(230,195,100,0.4)] transition-all active:scale-95"
            >
              Voir le menu
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="pt-8 pb-32 px-container-margin max-w-4xl mx-auto">
        {/* Titre */}
        <div className="mb-12">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-2">
            Votre Sélection
          </h2>
          <p className="text-on-surface-variant font-body-md">
            {totalItems} {totalItems > 1 ? 'articles' : 'article'} — prêts à être confirmés.
          </p>
        </div>

        {/* Liste des articles */}
        <div className="space-y-8">
          {items.map((item, index) => (
            <div key={item.id}>
              <div className="flex items-center gap-4 sm:gap-6 group">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
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
                  {item.subtitle && (
                    <p className="text-label-md text-on-surface-variant mb-2 truncate">{item.subtitle}</p>
                  )}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-outline-variant rounded-lg bg-surface-container-lowest overflow-hidden">
                      <button
                        className="px-3 py-1 hover:bg-surface-variant transition-colors text-primary"
                        onClick={() => updateQty(item.id, item.qty - 1)}
                      >
                        -
                      </button>
                      <span className="px-3 font-label-md text-on-surface">{item.qty}</span>
                      <button
                        className="px-3 py-1 hover:bg-surface-variant transition-colors text-primary"
                        onClick={() => updateQty(item.id, item.qty + 1)}
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
        <section className="mt-16 p-6 sm:p-8 bg-surface-container rounded-xl border border-outline-variant shadow-lg">
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center text-on-surface-variant">
              <span className="font-body-md">Sous-total</span>
              <span className="font-price-md">{totalPrice.toFixed(2)}€</span>
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
                className="w-full sm:w-auto px-8 py-4 rounded-lg font-label-md bg-gradient-to-r from-secondary-container to-primary text-on-primary-fixed font-bold tracking-widest hover:shadow-[0_0_20px_rgba(230,195,100,0.4)] transition-all duration-300 active:scale-95 uppercase"
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
                onClick={() => { clearCart(); navigate('/tracking'); }}
                className="w-full py-4 border border-primary text-primary rounded-lg font-label-md hover:bg-primary/10 transition-colors uppercase tracking-widest"
              >
                Suivre ma commande
              </button>
              <button
                onClick={() => { clearCart(); navigate('/menu'); }}
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
