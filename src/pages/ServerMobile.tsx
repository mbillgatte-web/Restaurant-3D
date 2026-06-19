import { useState } from 'react';
import Header from '../components/Header';

type TabKey = 'servir' | 'appels' | 'toutes';

const tables = [
  {
    id: 12, type: 'call' as const,
    label: 'Appel Client', time: '02:45', timeLabel: 'Attente',
    action: "Répondre à l'appel",
  },
  {
    id: 8, type: 'ready' as const,
    label: 'Prêt à servir', time: '05:12', timeLabel: 'En cuisine',
    items: ['2x Homard Bleu', '1x Filet Rossini'],
    action: 'Marquer comme servie',
  },
  {
    id: 4, type: 'occupied' as const,
    label: 'Dégustation', time: '18:30', timeLabel: 'Temps total',
  },
  {
    id: 21, type: 'call' as const,
    label: 'Addition demandée', time: '00:45', timeLabel: 'Attente',
    action: "Répondre à l'appel",
  },
];

export default function ServerMobile() {
  const [activeTab, setActiveTab] = useState<TabKey>('servir');

  const filtered = activeTab === 'appels'
    ? tables.filter(t => t.type === 'call')
    : activeTab === 'servir'
    ? tables.filter(t => t.type !== 'occupied')
    : tables;

  return (
    <>
      <Header />

      <main className="pt-4 pb-24 px-4 max-w-md mx-auto min-h-screen">
        <header className="mb-8">
          <h1 className="font-headline-sm text-headline-sm text-on-surface mb-2">Service en cours</h1>
          <p className="font-label-md text-label-md text-on-surface-variant opacity-70">Zone : Salon Principal</p>
        </header>

        {/* Onglets */}
        <div className="flex bg-surface-container-low rounded-lg p-1 mb-6 border border-outline-variant/30">
          {(['servir', 'appels', 'toutes'] as TabKey[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-2 rounded-md font-label-md text-label-md transition-all relative ${
                activeTab === tab
                  ? 'text-primary bg-secondary-container/10 border-r-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {tab === 'servir' ? 'À servir' : tab === 'appels' ? 'Appels' : 'Toutes'}
              {tab === 'appels' && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Liste des tables */}
        <div className="space-y-4">
          {filtered.map(table => (
            <div
              key={table.id}
              className={`rounded-xl p-5 border ${
                table.type === 'call'
                  ? 'bg-surface-container-high border-secondary/40 shadow-lg'
                  : table.type === 'occupied'
                  ? 'bg-surface-container border-outline-variant/30 opacity-70'
                  : 'bg-surface-container border-outline-variant/50 hover:border-primary/30 transition-colors'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="font-headline-sm text-headline-sm text-primary block mb-1">
                    Table {table.id.toString().padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`material-symbols-outlined text-sm ${
                        table.type === 'call' ? 'text-secondary' : table.type === 'ready' ? 'text-primary-container' : 'text-outline'
                      }`}
                      style={table.type !== 'occupied' ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {table.type === 'call' ? 'notifications_active' : table.type === 'ready' ? 'restaurant' : 'hourglass_empty'}
                    </span>
                    <span className={`font-label-md text-[12px] uppercase tracking-widest ${
                      table.type === 'call' ? 'text-secondary' : 'text-on-surface-variant'
                    }`}>
                      {table.label}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`font-price-md text-price-md block ${
                    table.type === 'call' ? 'text-secondary' : table.type === 'ready' ? 'text-primary-container' : 'text-outline'
                  }`}>
                    {table.time}
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-label-md uppercase">{table.timeLabel}</span>
                </div>
              </div>

              {table.items && (
                <div className="mb-4 space-y-1">
                  {table.items.map((item, i) => (
                    <p key={i} className="text-on-surface-variant text-sm flex justify-between">
                      <span>{item}</span>
                      <span className="text-xs text-outline italic">Prêt</span>
                    </p>
                  ))}
                </div>
              )}

              {table.action && (
                <div className="flex gap-3">
                  <button
                    className={`flex-1 py-3 rounded-lg font-label-md text-[13px] active:scale-95 transition-transform flex items-center justify-center gap-2 ${
                      table.type === 'call'
                        ? 'bg-secondary-container text-on-secondary-container border border-on-secondary-fixed-variant'
                        : 'bg-primary-container text-on-primary-container'
                    }`}
                  >
                    {table.type === 'ready' && <span className="material-symbols-outlined text-lg">check_circle</span>}
                    {table.action}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
