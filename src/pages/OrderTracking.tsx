import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import Header from '../components/Header';

const stepConfig = [
  { label: 'Reçue', icon: 'check', status: 'nouvelle' },
  { label: 'En cuisine', icon: 'skillet', status: 'en-cours' },
  { label: 'Prête', icon: 'restaurant', status: 'prete' },
  { label: 'Servie', icon: 'done_all', status: 'servie' },
];

const statusIndex: Record<string, number> = { 'nouvelle': 0, 'en-cours': 1, 'prete': 2, 'servie': 3 };

export default function OrderTracking() {
  const { currentClientOrder } = useOrders();
  const navigate = useNavigate();

  if (!currentClientOrder) {
    return (
      <>
        <Header />
        <main className="pt-8 pb-32 px-container-margin max-w-4xl mx-auto text-center">
          <div className="mt-20">
            <span className="material-symbols-outlined text-6xl text-outline-variant mb-6 block">search</span>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Aucune commande en cours</h2>
            <p className="text-on-surface-variant font-body-md mb-8">Passez une commande depuis le menu pour suivre sa progression.</p>
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

  const order = currentClientOrder;
  const currentStep = statusIndex[order.status] ?? 0;
  const progressPct = ((currentStep + 1) / stepConfig.length) * 100;

  return (
    <>
      <Header />

      <main className="pt-0 min-h-screen flex flex-col">
        {/* Zone animation */}
        <section className="relative h-[300px] md:h-[400px] w-full flex items-center justify-center overflow-hidden bg-surface-container-lowest">
          <div className="flex items-center justify-center" style={{ perspective: '1000px' }}>
            <div
              className="relative w-48 h-48 md:w-64 md:h-64"
              style={{ animation: order.status === 'en-cours' ? 'rotate-plate 12s linear infinite' : 'none' }}
            >
              <img
                alt="Plat en préparation"
                className="w-full h-full object-cover rounded-full border-2 border-primary/30 shadow-2xl opacity-80"
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop"
              />
              {order.status === 'en-cours' && (
                <>
                  <div className="absolute -top-4 -left-4 w-12 h-12 border border-primary rounded-full animate-ping opacity-20" />
                  <div className="absolute -bottom-8 -right-4 w-16 h-16 border border-secondary rounded-full animate-bounce opacity-10" />
                </>
              )}
              {order.status === 'prete' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                  <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
              )}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </section>

        {/* Statut */}
        <section className="flex-1 px-container-margin -mt-8 relative z-10 pb-32">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Message de statut */}
            <div className="text-center space-y-3">
              {order.status === 'nouvelle' && (
                <h2 className="font-headline-sm text-headline-sm italic text-on-surface-variant">
                  Commande reçue, en attente de la cuisine...
                </h2>
              )}
              {order.status === 'en-cours' && (
                <h2 className="font-headline-sm text-headline-sm italic text-on-surface-variant">
                  Le chef s'affaire avec soin...
                </h2>
              )}
              {order.status === 'prete' && (
                <>
                  <h2 className="font-display-lg text-display-lg-mobile text-primary">Votre commande est prête !</h2>
                  <p className="text-on-surface-variant">Un serveur vous l'apporte dans un instant.</p>
                  <button
                    onClick={() => navigate('/ready')}
                    className="mt-4 px-8 py-4 rounded-lg font-label-md bg-primary text-on-primary uppercase tracking-widest active:scale-95 transition-all"
                  >
                    Voir les détails
                  </button>
                </>
              )}
              {order.status === 'servie' && (
                <>
                  <h2 className="font-display-lg text-display-lg-mobile text-primary">Bon appétit !</h2>
                  <p className="text-on-surface-variant">Votre commande a été servie. Régalez-vous !</p>
                </>
              )}
            </div>

            {/* Stepper */}
            <div className="relative pt-8 pb-4">
              <div className="absolute top-[48px] left-0 w-full h-1 bg-surface-variant/30 rounded-full" />
              <div
                className="absolute top-[48px] left-0 h-1 rounded-full bg-gradient-to-r from-secondary-container to-primary transition-all duration-700"
                style={{ width: `${progressPct}%` }}
              />
              <div className="relative flex justify-between items-start">
                {stepConfig.map((step, i) => {
                  const done = i <= currentStep;
                  const active = i === currentStep;
                  return (
                    <div key={i} className={`flex flex-col items-center gap-3 w-1/4 ${!done ? 'opacity-40' : ''}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        active
                          ? 'bg-primary text-on-primary shadow-[0_0_15px_rgba(230,195,100,0.4)]'
                          : done
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-surface-variant'
                      }`}>
                        <span
                          className="material-symbols-outlined text-sm"
                          style={done ? { fontVariationSettings: "'FILL' 1" } : undefined}
                        >
                          {done && !active ? 'check' : step.icon}
                        </span>
                      </div>
                      <span className={`font-label-md text-[11px] text-center ${active ? 'text-primary font-bold' : 'text-on-surface'}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Détails commande */}
            <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/30 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-sm text-headline-sm">Votre Commande</h3>
                <span className="text-secondary font-label-md">#{order.id}</span>
              </div>
              <ul className="space-y-4">
                {order.items.map((item, i) => (
                  <li key={i} className="flex justify-between items-center text-on-surface-variant">
                    <span>{item.name} × {item.qty}</span>
                    <span className="font-price-md text-primary">{(item.price * item.qty).toFixed(2)}€</span>
                  </li>
                ))}
                <li className="pt-4 border-t border-outline-variant flex justify-between items-center">
                  <span className="font-bold text-on-surface">Total</span>
                  <span className="font-price-lg text-primary font-bold">{order.total.toFixed(2)}€</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
