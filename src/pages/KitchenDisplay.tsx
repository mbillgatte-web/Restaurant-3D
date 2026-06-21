import { useOrders, type Order } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function timeSince(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function OrderCard({ order, actionLabel, actionIcon, onAction, flash }: {
  order: Order;
  actionLabel: string;
  actionIcon?: string;
  onAction: () => void;
  flash?: boolean;
}) {
  return (
    <article className={`bg-surface-container-high border rounded-xl p-6 ${flash ? 'border-primary/30 shadow-[0_0_15px_rgba(230,195,100,0.2)]' : 'border-outline-variant'}`}>
      <div className="flex justify-between items-start mb-4">
        <span className="font-display-lg text-display-lg text-primary leading-none">#{order.id.slice(-4)}</span>
        <div className="text-right">
          <p className={`font-bold flex items-center gap-1 ${flash ? 'text-error' : 'text-on-surface-variant'}`}>
            <span className="material-symbols-outlined text-sm">schedule</span>
            {timeSince(order.createdAt)}
          </p>
          <p className="text-xs text-on-surface-variant">{order.covers} Couverts</p>
        </div>
      </div>
      <ul className="space-y-3 mb-6 border-t border-outline-variant pt-4">
        {order.items.map((item, i) => (
          <li key={i} className="flex justify-between items-center">
            <span className="font-bold text-on-surface">{item.qty}x {item.name}</span>
            <span className="text-xs text-on-surface-variant">{item.price.toFixed(2)}€</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mb-4">
        <span className="text-on-surface-variant text-xs">{order.table}</span>
        <span className="font-price-md text-primary">{order.total.toFixed(2)}€</span>
      </div>
      <button
        onClick={onAction}
        className="w-full bg-primary text-on-primary font-label-md py-3 rounded-lg hover:bg-primary/90 active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        {actionIcon && <span className="material-symbols-outlined">{actionIcon}</span>}
        {actionLabel}
      </button>
    </article>
  );
}

export default function KitchenDisplay() {
  const { orders, updateStatus, getOrdersByStatus } = useOrders();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const nouvelles = getOrdersByStatus('nouvelle');
  const enCours = getOrdersByStatus('en-cours');
  const pretes = getOrdersByStatus('prete');

  const hasOrders = orders.length > 0;

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen overflow-hidden">
      {/* Header KDS */}
      <header className="fixed top-0 right-0 left-0 h-16 bg-background/80 backdrop-blur-md flex justify-between items-center px-container-margin border-b border-outline-variant z-40">
        <div className="flex items-center gap-4">
          <h1 className="font-headline-md text-headline-sm text-primary italic tracking-tighter">L'ÉLITE</h1>
          <h2 className="font-headline-sm text-headline-sm text-on-surface hidden md:block">Kitchen Display</h2>
          <span className="px-3 py-1 bg-secondary-container/20 text-on-secondary-container rounded-full text-xs font-label-md border border-secondary-container/30">
            SERVICE ACTIF
          </span>
        </div>
        <div className="flex items-center gap-4">
          {user && <span className="text-on-surface-variant text-xs hidden md:inline">{user.name}</span>}
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-sm"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
          </button>
        </div>
      </header>

      {/* Grille 3 colonnes */}
      <main className="pt-16 h-screen flex flex-col overflow-hidden">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-0 h-full">
          {/* Colonne 1: Nouvelles */}
          <section className="border-r border-outline-variant flex flex-col">
            <div className="p-6 bg-surface-container-lowest/50 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-center">
              <h2 className="font-headline-sm text-lg text-primary uppercase tracking-widest">Nouvelles</h2>
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-on-primary font-bold">{nouvelles.length}</span>
            </div>
            <div className="overflow-y-auto p-4 space-y-4 flex-1" style={{ scrollbarWidth: 'none' }}>
              {nouvelles.length === 0 && (
                <div className="text-center py-20 text-on-surface-variant opacity-50">
                  <span className="material-symbols-outlined text-4xl mb-2 block">hourglass_empty</span>
                  <p className="text-sm">En attente de commandes...</p>
                </div>
              )}
              {nouvelles.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  actionLabel="LANCER"
                  flash
                  onAction={() => updateStatus(order.id, 'en-cours')}
                />
              ))}
            </div>
          </section>

          {/* Colonne 2: En cours */}
          <section className="border-r border-outline-variant flex flex-col bg-surface-container-lowest/20">
            <div className="p-6 bg-surface-container-lowest/50 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-center">
              <h2 className="font-headline-sm text-lg text-on-surface uppercase tracking-widest">En cours</h2>
              <span className="w-8 h-8 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant font-bold">{enCours.length}</span>
            </div>
            <div className="overflow-y-auto p-4 space-y-4 flex-1" style={{ scrollbarWidth: 'none' }}>
              {enCours.length === 0 && (
                <div className="text-center py-20 text-on-surface-variant opacity-50">
                  <span className="material-symbols-outlined text-4xl mb-2 block">restaurant</span>
                  <p className="text-sm">Aucun plat en préparation</p>
                </div>
              )}
              {enCours.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  actionLabel="PRÊT À SERVIR"
                  actionIcon="restaurant"
                  onAction={() => updateStatus(order.id, 'prete')}
                />
              ))}
            </div>
          </section>

          {/* Colonne 3: Prêtes */}
          <section className="flex flex-col">
            <div className="p-6 bg-surface-container-lowest/50 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-center">
              <h2 className="font-headline-sm text-lg text-on-surface-variant uppercase tracking-widest">Prêtes</h2>
              <span className="w-8 h-8 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant font-bold">{pretes.length}</span>
            </div>
            <div className="overflow-y-auto p-4 space-y-4 flex-1" style={{ scrollbarWidth: 'none' }}>
              {pretes.length === 0 && (
                <div className="text-center py-20 text-on-surface-variant opacity-50">
                  <span className="material-symbols-outlined text-4xl mb-2 block">check_circle</span>
                  <p className="text-sm">Aucune commande en attente de service</p>
                </div>
              )}
              {pretes.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  actionLabel="SERVIE"
                  actionIcon="done_all"
                  onAction={() => updateStatus(order.id, 'servie')}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Message si aucune commande n'a jamais été passée */}
        {!hasOrders && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center opacity-30">
              <span className="material-symbols-outlined text-6xl text-primary mb-4 block">restaurant_menu</span>
              <p className="font-headline-sm text-on-surface">En attente du premier service</p>
              <p className="text-on-surface-variant text-sm mt-2">Les commandes clients apparaîtront ici en temps réel</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
