import { useState } from 'react';

const stats = [
  { label: 'Total Plats', value: '42', icon: 'restaurant', color: 'text-outline-variant' },
  { label: 'Actifs', value: '38', icon: 'check_circle', color: 'text-primary' },
  { label: 'Épuisés', value: '4', icon: 'warning', color: 'text-secondary' },
  { label: 'Chiffre Estimé', value: '€12.4k', icon: 'analytics', color: 'text-outline-variant' },
];

const menuItems = [
  { id: 1, name: 'Wagyu A5 aux Morilles', subtitle: 'Pièce de 200g, origine Kagoshima', category: 'Viandes', price: '€125,00', active: true },
  { id: 2, name: "Sphère d'Or Chocolat", subtitle: "Praliné noisette et éclat d'or", category: 'Desserts', price: '€28,00', active: true },
  { id: 3, name: 'Huîtres Gillardeau N°2', subtitle: "Plateau de 6, perles d'Oléron", category: 'Entrées', price: '€42,00', active: false },
];

export default function MenuManagement() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toggles, setToggles] = useState<Record<number, boolean>>(
    Object.fromEntries(menuItems.map(i => [i.id, i.active]))
  );

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 right-0 left-0 z-30 flex justify-between items-center px-container-margin h-16 bg-background border-b border-outline-variant shadow-sm">
        <h1 className="font-headline-sm text-headline-sm text-on-surface">Gestion Menu</h1>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setDrawerOpen(true)}
            className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md text-label-md hover:shadow-[0_0_15px_rgba(230,195,100,0.4)] transition-all active:scale-95 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            NOUVEAU PLAT
          </button>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="mt-16 p-container-margin overflow-auto h-[calc(100vh-64px)]" style={{ scrollbarWidth: 'thin', scrollbarColor: '#4d4637 #121411' }}>
        <div className="max-w-7xl mx-auto space-y-6 pb-24">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {stats.map(s => (
              <div key={s.label} className="bg-surface-container p-4 rounded-xl border border-outline-variant flex justify-between items-end">
                <div>
                  <p className="font-label-md text-on-surface-variant text-[10px] uppercase tracking-widest">{s.label}</p>
                  <h3 className="font-headline-md text-primary mt-1">{s.value}</h3>
                </div>
                <span className={`material-symbols-outlined ${s.color}`}>{s.icon}</span>
              </div>
            ))}
          </div>

          {/* Tableau */}
          <div className="bg-surface-container-low rounded-xl border border-outline-variant overflow-hidden shadow-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container border-b border-outline-variant">
                  {['Produit', 'Catégorie', 'Prix', 'Disponibilité', 'Actions'].map(h => (
                    <th
                      key={h}
                      className={`px-6 py-4 font-label-md text-on-surface-variant text-[11px] uppercase tracking-widest ${
                        h === 'Prix' || h === 'Actions' ? 'text-right' : h === 'Disponibilité' ? 'text-center' : ''
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {menuItems.map(item => (
                  <tr
                    key={item.id}
                    className="group hover:bg-surface-variant/10 transition-colors cursor-pointer"
                    onClick={() => setDrawerOpen(true)}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-surface-container-highest border border-outline-variant" />
                        <div>
                          <p className="font-headline-sm text-base text-on-surface group-hover:text-primary transition-colors">{item.name}</p>
                          <p className="font-body-md text-xs text-on-surface-variant">{item.subtitle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 rounded-full border border-outline-variant text-[10px] font-label-md text-on-surface-variant uppercase">{item.category}</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <p className="font-price-md text-primary">{item.price}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setToggles(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                          }}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                            toggles[item.id] ? 'bg-primary' : 'bg-outline-variant'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ${
                              toggles[item.id] ? 'translate-x-5 bg-on-primary' : 'translate-x-0 bg-surface-container-highest'
                            }`}
                          />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="material-symbols-outlined text-outline-variant hover:text-primary">more_vert</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Drawer d'édition */}
      {drawerOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]" onClick={() => setDrawerOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-surface-container-low border-l border-outline-variant z-[60] shadow-2xl flex flex-col">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container">
              <div>
                <h2 className="font-headline-sm text-primary">Édition Plat</h2>
                <p className="text-xs text-on-surface-variant">Identifiant unique: #LX-9402</p>
              </div>
              <button className="p-2 hover:bg-surface-variant rounded-full transition-colors" onClick={() => setDrawerOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8" style={{ scrollbarWidth: 'thin' }}>
              {/* Zone photo */}
              <div className="space-y-3">
                <label className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-widest">Photographie & 3D</label>
                <div className="w-full h-48 rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-lowest flex flex-col items-center justify-center gap-3 hover:border-primary transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-4xl text-outline-variant">add_a_photo</span>
                  <p className="text-xs text-on-surface-variant">Faire glisser une image haute résolution</p>
                </div>
              </div>
              {/* Champs */}
              <div className="space-y-4">
                <div>
                  <label className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-widest block mb-2">Nom du Plat</label>
                  <input className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" type="text" defaultValue="Wagyu A5 aux Morilles" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-widest block mb-2">Prix (€)</label>
                    <input className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 text-primary font-price-md focus:border-primary outline-none" type="number" defaultValue="125.00" />
                  </div>
                  <div>
                    <label className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-widest block mb-2">Catégorie</label>
                    <select className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary outline-none">
                      <option>Entrées</option>
                      <option>Viandes</option>
                      <option>Poissons</option>
                      <option>Desserts</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* Nutrition */}
              <div className="space-y-4">
                <label className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-widest block">Valeurs Nutritionnelles (pour 100g)</label>
                <div className="grid grid-cols-3 gap-3">
                  {[{ l: 'Kcal', v: '342' }, { l: 'Prot.', v: '24g' }, { l: 'Gluc.', v: '2g' }].map(n => (
                    <div key={n.l} className="bg-background border border-outline-variant p-3 rounded-lg text-center">
                      <p className="text-[10px] text-on-surface-variant uppercase">{n.l}</p>
                      <p className="font-price-md text-sm text-on-surface">{n.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-outline-variant bg-surface-container flex gap-3">
              <button onClick={() => setDrawerOpen(false)} className="flex-1 py-3 border border-outline-variant rounded-lg text-on-surface font-label-md text-sm hover:bg-surface-variant transition-colors">
                ANNULER
              </button>
              <button className="flex-[2] py-3 bg-primary text-on-primary rounded-lg font-label-md text-sm hover:shadow-[0_0_15px_rgba(230,195,100,0.3)] transition-all">
                ENREGISTRER
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
