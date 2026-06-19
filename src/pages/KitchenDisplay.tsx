export default function KitchenDisplay() {
  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen overflow-hidden">
      {/* Header KDS */}
      <header className="fixed top-0 right-0 left-0 h-16 bg-background/80 backdrop-blur-md flex justify-between items-center px-container-margin border-b border-outline-variant z-40">
        <div className="flex items-center gap-4">
          <h1 className="font-headline-md text-headline-sm text-primary italic tracking-tighter">L'ÉLITE</h1>
          <h2 className="font-headline-sm text-headline-sm text-on-surface hidden md:block">Kitchen Display System</h2>
          <span className="px-3 py-1 bg-secondary-container/20 text-on-secondary-container rounded-full text-xs font-label-md border border-secondary-container/30">
            SERVICE ACTIF
          </span>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-right hidden md:block">
            <p className="text-xs text-on-surface-variant font-label-md">TEMPS MOYEN</p>
            <p className="text-primary font-bold">14:20 min</p>
          </div>
        </div>
      </header>

      {/* Grille 3 colonnes */}
      <main className="pt-16 h-screen flex flex-col overflow-hidden">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-0 h-full">
          {/* Colonne 1: Nouvelles */}
          <section className="border-r border-outline-variant flex flex-col">
            <div className="p-6 bg-surface-container-lowest/50 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-center">
              <h2 className="font-headline-sm text-lg text-primary uppercase tracking-widest">Nouvelles</h2>
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-on-primary font-bold">3</span>
            </div>
            <div className="overflow-y-auto p-4 space-y-4 flex-1" style={{ scrollbarWidth: 'none' }}>
              {/* Commande flash */}
              <article className="bg-surface-container-high border border-primary/30 rounded-xl p-6 shadow-[0_0_15px_rgba(230,195,100,0.2)]">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-display-lg text-display-lg text-primary leading-none">#12</span>
                  <div className="text-right">
                    <p className="text-error font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span> 01:45
                    </p>
                    <p className="text-xs text-on-surface-variant">2 Couverts</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-6 border-t border-outline-variant pt-4">
                  <li className="flex justify-between items-center">
                    <span className="font-bold text-on-surface">1x Filet de Bœuf Rossini</span>
                    <span className="text-xs bg-error/10 text-error px-2 py-1 rounded">Saignant</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-bold text-on-surface">1x Homard Bleu d'Armorique</span>
                  </li>
                </ul>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-primary text-on-primary font-label-md py-3 rounded-lg hover:bg-primary/90 active:scale-95 transition-all">LANCER</button>
                  <button className="border border-outline-variant text-on-surface font-label-md py-3 rounded-lg hover:bg-surface-variant/20 transition-all">VOIR PLUS</button>
                </div>
              </article>

              {/* Commande standard */}
              <article className="bg-surface-container rounded-xl p-6 border border-outline-variant">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-display-lg text-display-lg text-primary leading-none">#08</span>
                  <div className="text-right">
                    <p className="text-on-surface-variant font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span> 05:12
                    </p>
                    <p className="text-xs text-on-surface-variant">4 Couverts</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-6 border-t border-outline-variant pt-4">
                  <li className="font-bold text-on-surface">4x Menu Dégustation "Élite"</li>
                </ul>
                <button className="w-full bg-primary text-on-primary font-label-md py-3 rounded-lg hover:bg-primary/90 active:scale-95 transition-all">LANCER TOUT</button>
              </article>
            </div>
          </section>

          {/* Colonne 2: En cours */}
          <section className="border-r border-outline-variant flex flex-col bg-surface-container-lowest/20">
            <div className="p-6 bg-surface-container-lowest/50 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-center">
              <h2 className="font-headline-sm text-lg text-on-surface uppercase tracking-widest">En cours</h2>
              <span className="w-8 h-8 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant font-bold">2</span>
            </div>
            <div className="overflow-y-auto p-4 space-y-4 flex-1" style={{ scrollbarWidth: 'none' }}>
              <article className="bg-surface-container-high border border-outline-variant rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-display-lg text-display-lg text-primary leading-none">#04</span>
                  <div className="text-right">
                    <p className="text-primary font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">hourglass_top</span> 12:30
                    </p>
                    <p className="text-xs text-on-surface-variant">Table VIP</p>
                  </div>
                </div>
                <div className="space-y-4 mb-6 border-t border-outline-variant pt-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="text-on-surface-variant line-through">Entrées servies</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-on-surface">2x Risotto aux Truffes</span>
                      <span className="text-xs text-primary italic">En dressage</span>
                    </div>
                    <div className="w-full bg-surface-variant/50 h-1 rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-3/4" />
                    </div>
                  </div>
                </div>
                <button className="w-full bg-primary-container text-on-primary-container font-label-md py-4 rounded-lg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">restaurant</span>
                  PRÊT À SERVIR
                </button>
              </article>
            </div>
          </section>

          {/* Colonne 3: Prêtes */}
          <section className="flex flex-col">
            <div className="p-6 bg-surface-container-lowest/50 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-center">
              <h2 className="font-headline-sm text-lg text-on-surface-variant uppercase tracking-widest">Prêtes</h2>
              <span className="w-8 h-8 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant font-bold">1</span>
            </div>
            <div className="overflow-y-auto p-4 space-y-4 flex-1" style={{ scrollbarWidth: 'none' }}>
              <article className="bg-surface-container-high border-2 border-primary/20 rounded-xl p-6 opacity-80">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-display-lg text-display-lg text-on-surface-variant leading-none">#01</span>
                  <div className="text-right">
                    <p className="text-on-surface-variant font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">check_circle</span> 18:05
                    </p>
                    <p className="text-xs text-on-surface-variant">Serveur: Marc</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-6 border-t border-outline-variant pt-4 opacity-50">
                  <li className="text-on-surface">2x Soufflé au Grand Marnier</li>
                </ul>
                <button className="w-full border border-outline-variant text-on-surface-variant font-label-md py-3 rounded-lg hover:bg-surface-variant/20 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">undo</span>
                  RAPPELER
                </button>
              </article>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
