import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';

type TabKey = 'a-servir' | 'toutes';

function timeSince(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

export default function ServerMobile() {
  const [activeTab, setActiveTab] = useState<TabKey>('a-servir');
  const { updateStatus, getOrdersByStatus } = useOrders();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const pretes = getOrdersByStatus('prete');
  const enCours = getOrdersByStatus('en-cours');
  const nouvelles = getOrdersByStatus('nouvelle');
  const servies = getOrdersByStatus('servie');

  const aServir = pretes;
  const toutes = [...nouvelles, ...enCours, ...pretes, ...servies.slice(-5)];

  const displayed = activeTab === 'a-servir' ? aServir : toutes;

  return (
    <>
      {/* Header custom avec logout */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-outline-variant/20">
        <div className="max-w-md mx-auto px-container-margin py-4 flex justify-between items-center">
          <div>
            <h1 className="font-headline-md text-headline-sm text-primary italic tracking-tighter">L'ÉLITE</h1>
            {user && <p className="text-on-surface-variant text-[10px] font-label-md">{user.name} — Serveur</p>}
          </div>
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </header>

      <main className="pt-4 pb-24 px-4 max-w-md mx-auto min-h-screen">
        <header className="mb-6">
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-1">Service en cours</h2>
          <p className="font-label-md text-label-md text-on-surface-variant opacity-70">
            {pretes.length} commande{pretes.length > 1 ? 's' : ''} à servir · {enCours.length} en cuisine
          </p>
        </header>

        {/* Onglets */}
        <div className="flex bg-surface-container-low rounded-lg p-1 mb-6 border border-outline-variant/30">
          {([['a-servir', `À servir (${pretes.length})`], ['toutes', 'Toutes']] as [TabKey, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 py-3 px-2 rounded-md font-label-md text-label-md transition-all ${
                activeTab === key
                  ? 'text-primary bg-secondary-container/10 border-r-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Liste */}
        <div className="space-y-4">
          {displayed.length === 0 && (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 block">restaurant_menu</span>
              <p className="font-headline-sm text-outline">Aucune tâche en attente</p>
              <p className="text-on-surface-variant text-sm mt-2">Le service est parfaitement fluide.</p>
            </div>
          )}

          {displayed.map(order => {
            const statusConfig = {
              'nouvelle': { border: 'border-primary/30', label: 'Nouvelle commande', icon: 'fiber_new', color: 'text-primary' },
              'en-cours': { border: 'border-outline-variant/30 opacity-70', label: 'En cuisine', icon: 'skillet', color: 'text-on-surface-variant' },
              'prete': { border: 'border-secondary/40 shadow-lg', label: 'Prêt à servir', icon: 'restaurant', color: 'text-secondary' },
              'servie': { border: 'border-outline-variant/20 opacity-50', label: 'Servie', icon: 'check_circle', color: 'text-on-surface-variant' },
            }[order.status];

            return (
              <div
                key={order.id}
                className={`rounded-xl p-5 border bg-surface-container ${statusConfig.border}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="font-headline-sm text-headline-sm text-primary block mb-1">{order.table}</span>
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined text-sm ${statusConfig.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                        {statusConfig.icon}
                      </span>
                      <span className={`font-label-md text-[12px] uppercase tracking-widest ${statusConfig.color}`}>
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`font-price-md text-price-md block ${statusConfig.color}`}>
                      {timeSince(order.createdAt)}
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-label-md">#{order.id.slice(-4)}</span>
                  </div>
                </div>

                <div className="mb-3 space-y-1">
                  {order.items.map((item, i) => (
                    <p key={i} className="text-on-surface-variant text-sm flex justify-between">
                      <span>{item.qty}x {item.name}</span>
                      <span className="text-xs text-outline italic">{item.price.toFixed(2)}€</span>
                    </p>
                  ))}
                </div>

                {order.status === 'prete' && (
                  <button
                    onClick={() => updateStatus(order.id, 'servie')}
                    className="w-full py-3 rounded-lg bg-primary-container text-on-primary-container font-label-md text-[13px] active:scale-95 transition-transform flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    Marquer comme servie
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
