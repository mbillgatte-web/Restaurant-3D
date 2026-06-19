import Header from '../components/Header';

const steps = [
  { label: 'Reçue', icon: 'check', done: true },
  { label: 'Confirmée', icon: 'check', done: true },
  { label: 'En cuisson', icon: 'restaurant', active: true },
  { label: 'Prête', icon: 'notifications', done: false },
];

const orderItems = [
  { name: 'Filet de Bœuf Wagyu', qty: 1, price: '85,00€' },
  { name: 'Domaine de la Romanée-Conti (Verre)', qty: 2, price: '120,00€' },
];

export default function OrderTracking() {
  return (
    <>
      <Header />

      <main className="pt-0 min-h-screen flex flex-col">
        {/* Zone d'animation 3D */}
        <section className="relative h-[400px] md:h-[530px] w-full flex items-center justify-center overflow-hidden bg-surface-container-lowest">
          <div className="flex items-center justify-center" style={{ perspective: '1000px' }}>
            <div
              className="relative w-64 h-64 md:w-80 md:h-80"
              style={{ animation: 'rotate-plate 12s linear infinite' }}
            >
              <img
                alt="Cooking Animation Plate"
                className="w-full h-full object-cover rounded-full border-2 border-primary/30 shadow-2xl opacity-80"
                src="https://lh3.googleusercontent.com/aida/AP1WRLs6l_kKdZS3Xj9qLAEH9MVSr7TGPm149AJmVWfYEXIyyz4oaH9NxeK32lyaIHAuErf4zKkuxTLhDpSFsowJN88nuoMIRtQOkq-T79SJtogHULRzL-2tDoGpAiIGYSmCw0P9rNyzwdfmvOLayCI8jQ_ZVV0yYs44Nw42WjDy316PT2OjAMmoFodCMixkoC4lzZ8B0vrQ1DJXC7xXfAskUUMzRAXVxD7cHTxbmIo83dN4zK2tQkpBXelC35M"
              />
              <div className="absolute -top-4 -left-4 w-12 h-12 border border-primary rounded-full animate-ping opacity-20" />
              <div className="absolute -bottom-8 -right-4 w-16 h-16 border border-secondary rounded-full animate-bounce opacity-10" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </section>

        {/* Statut & Tracking */}
        <section className="flex-1 px-container-margin -mt-12 relative z-10 pb-32">
          <div className="max-w-2xl mx-auto space-y-12">
            {/* Temps estimé */}
            <div className="text-center space-y-4">
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary">
                ~ 4 <span className="font-price-lg text-price-lg">MIN</span>
              </h2>
              <p className="font-headline-sm text-headline-sm italic text-on-surface-variant">
                Le chef s'affaire avec soin...
              </p>
            </div>

            {/* Stepper horizontal */}
            <div className="relative pt-8 pb-4">
              <div className="absolute top-[48px] left-0 w-full h-1 bg-surface-variant/30 rounded-full" />
              <div className="absolute top-[48px] left-0 w-[66%] h-1 rounded-full bg-gradient-to-r from-secondary-container to-primary" />
              <div className="relative flex justify-between items-start">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center gap-4 w-1/4 ${!step.done && !step.active ? 'opacity-40' : ''}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.active
                          ? 'bg-primary text-on-primary shadow-[0_0_15px_rgba(230,195,100,0.4)]'
                          : step.done
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-surface-variant'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-sm"
                        style={step.done || step.active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        {step.icon}
                      </span>
                    </div>
                    <span
                      className={`font-label-md text-label-md ${
                        step.active ? 'text-primary font-bold' : 'text-on-surface opacity-70'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Détails de commande */}
            <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/30 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-sm text-headline-sm">Votre Commande</h3>
                <span className="text-secondary font-label-md">#EL-2094</span>
              </div>
              <ul className="space-y-4">
                {orderItems.map((item, i) => (
                  <li key={i} className="flex justify-between items-center text-on-surface-variant">
                    <span>{item.name} × {item.qty}</span>
                    <span className="font-price-md text-primary">{item.price}</span>
                  </li>
                ))}
                <li className="pt-4 border-t border-outline-variant flex justify-between items-center">
                  <span className="font-bold text-on-surface">Total</span>
                  <span className="font-price-lg text-primary font-bold">205,00€</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
