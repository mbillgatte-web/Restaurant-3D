import { useState, useEffect } from 'react';
import { useOrders } from '../context/OrderContext';
import StaffNav from '../components/StaffNav';

function buildKpis(totalOrders: number, totalRevenue: number) {
  return [
    { label: 'Commandes', value: totalOrders.toString(), change: 'total', icon: 'restaurant', spark: 'M0,15 Q25,5 50,12 T100,2' },
    { label: 'Chiffre Affaires', value: totalRevenue > 1000 ? `${(totalRevenue / 1000).toFixed(1)}k` : totalRevenue.toFixed(0), change: '€', icon: 'payments', spark: 'M0,18 Q30,10 40,15 T70,5 T100,10' },
    { label: 'Tables Occupées', value: `${Math.min(totalOrders, 45)}/45`, change: `${Math.min(Math.round((totalOrders / 45) * 100), 100)}%`, icon: 'table_restaurant', bar: Math.min(Math.round((totalOrders / 45) * 100), 100) },
    { label: 'Temps Moyen', value: totalOrders > 0 ? '12' : '0', change: 'min', icon: 'timer', spark: 'M0,5 Q20,15 40,10 T80,18 T100,8' },
  ];
}

const statusStyles: Record<string, string> = {
  'nouvelle': 'bg-primary/20 text-primary border border-primary/50',
  'en-cours': 'bg-secondary-container text-on-secondary-container',
  'prete': 'bg-on-secondary-fixed-variant text-white',
  'servie': 'bg-surface-variant text-on-surface-variant',
};
const statusLabels: Record<string, string> = {
  'nouvelle': 'Nouvelle', 'en-cours': 'Préparation', 'prete': 'Prête', 'servie': 'Servie',
};

export default function ManagerDashboard() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('fr-FR', { hour12: false }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const { orders: realOrders } = useOrders();
  const totalOrders = realOrders.length;
  const totalRevenue = realOrders.reduce((s, o) => s + o.total, 0);

  return (
    <div className="bg-background text-on-background min-h-screen overflow-auto">
      <StaffNav />
      {/* Header */}
      <header className="sticky top-0 z-40 lg:ml-64 flex justify-between items-center px-container-margin h-16 bg-background border-b border-outline-variant shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span className="font-headline-md text-headline-sm text-primary italic tracking-tighter">L'ÉLITE</span>
          <span className="text-outline-variant mx-2 hidden md:inline">•</span>
          <span className="font-label-md text-label-md text-on-surface-variant hidden md:inline">{time}</span>
          <span className="text-outline-variant mx-2 hidden md:inline">•</span>
          <span className="font-label-md text-label-md text-primary uppercase tracking-widest hidden md:inline">Dinner Service Live</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-all">shopping_cart</button>
        </div>
      </header>

      <div className="lg:ml-64 p-container-margin md:p-10 space-y-10">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {buildKpis(totalOrders, totalRevenue).map(kpi => (
            <div key={kpi.label} className="bg-surface-container-low border border-outline-variant p-6 rounded-xl hover:border-primary/50 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-on-surface-variant font-label-md text-label-md uppercase tracking-widest">{kpi.label}</span>
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">{kpi.icon}</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-price-lg text-[48px] text-on-surface">{kpi.value}</span>
                <span className={`font-label-md text-label-md ${kpi.change.startsWith('+') ? 'text-primary' : kpi.bar ? 'text-secondary' : 'text-on-surface-variant'}`}>{kpi.change}</span>
              </div>
              <div className="mt-4 h-8 w-full overflow-hidden">
                {kpi.spark ? (
                  <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d={kpi.spark} fill="none" stroke="#e6c364" strokeWidth="2" />
                  </svg>
                ) : kpi.bar ? (
                  <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-primary" style={{ width: `${kpi.bar}%` }} />
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* Graphique revenu */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-surface-container-low border border-outline-variant rounded-xl p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Revenu Hebdomadaire</h3>
                <p className="text-on-surface-variant font-body-md">Performance comparative par rapport à la semaine dernière</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded border border-outline-variant text-label-md font-label-md hover:bg-surface-variant/20 transition-all">Export</button>
                <button className="px-4 py-2 rounded bg-primary text-on-primary text-label-md font-label-md">Full Report</button>
              </div>
            </div>
            <div className="h-[300px] w-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 300" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e6c364" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#e6c364" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="75" x2="1000" y2="75" stroke="#2A2A2A" strokeWidth="1" />
                <line x1="0" y1="150" x2="1000" y2="150" stroke="#2A2A2A" strokeWidth="1" />
                <line x1="0" y1="225" x2="1000" y2="225" stroke="#2A2A2A" strokeWidth="1" />
                <path d="M0,250 L100,220 L200,240 L300,150 L400,180 L500,80 L600,120 L700,50 L800,90 L900,40 L1000,60 L1000,300 L0,300 Z" fill="url(#chartGradient)" />
                <path d="M0,250 L100,220 L200,240 L300,150 L400,180 L500,80 L600,120 L700,50 L800,90 L900,40 L1000,60" fill="none" stroke="#e6c364" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <div className="flex justify-between mt-4 text-on-surface-variant font-label-md text-label-md">
                <span>LUN</span><span>MAR</span><span>MER</span><span>JEU</span><span>VEN</span><span>SAM</span><span>DIM</span>
              </div>
            </div>
          </div>

          {/* Panneau cuisine */}
          <div className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden flex flex-col">
            <div className="p-8 border-b border-outline-variant bg-surface-container">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Cuisine Status</h3>
              <p className="text-on-surface-variant font-label-md text-label-md mt-1">Live from Head Chef Station</p>
            </div>
            <div className="flex-1 p-8 space-y-6 overflow-y-auto">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary-container/20 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">fire_truck</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">Delivery Delayed</p>
                  <p className="text-[12px] text-on-surface-variant">Wine shipment arriving in 20min</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">skillet</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">Entrées Pipeline</p>
                  <p className="text-[12px] text-on-surface-variant">Optimal flow - 12m avg. prep</p>
                </div>
              </div>
              <div className="p-6 rounded-lg bg-surface-variant/20 border-l-4 border-primary">
                <p className="font-label-md text-label-md text-primary uppercase tracking-widest mb-2">Staff Note</p>
                <p className="font-body-md italic text-on-surface-variant">
                  "VIP Table 12 requested off-menu sommelier selection. Jean-Pierre is handling."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tableau commandes actives */}
        <div className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden shadow-2xl">
          <div className="p-8 flex justify-between items-center bg-surface-container border-b border-outline-variant">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Commandes Actives</h3>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="font-label-md text-label-md text-primary">LIVE VIEW</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low">
                  {['Table', 'Client', 'Status', 'Temps', 'Montant', 'Actions'].map(h => (
                    <th key={h} className={`px-8 py-5 font-label-md text-label-md text-on-surface-variant uppercase tracking-widest ${h === 'Actions' ? 'text-right' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {realOrders.length === 0 ? (
                  <tr><td colSpan={6} className="px-8 py-12 text-center text-on-surface-variant">Aucune commande pour le moment</td></tr>
                ) : realOrders.slice(-10).reverse().map(o => (
                  <tr key={o.id} className="hover:bg-primary/5 transition-colors">
                    <td className="px-8 py-5 font-price-md text-price-md text-primary">{o.table}</td>
                    <td className="px-8 py-5 font-body-md">#{o.id.slice(-4)}</td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${statusStyles[o.status] || ''}`}>{statusLabels[o.status]}</span>
                    </td>
                    <td className="px-8 py-5 font-label-md text-label-md text-on-surface-variant">{Math.floor((Date.now() - o.createdAt) / 60000)}m</td>
                    <td className="px-8 py-5 font-price-md text-price-md">{o.total.toFixed(2)}€</td>
                    <td className="px-8 py-5 text-right">
                      <button className="material-symbols-outlined text-on-surface-variant hover:text-primary p-2">more_vert</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
