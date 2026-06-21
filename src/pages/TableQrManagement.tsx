import { useState } from 'react';
import StaffNav from '../components/StaffNav';

type TableStatus = 'Occupée' | 'Disponible' | 'En Nettoyage';

interface TableData {
  id: string;
  seats: number;
  status: TableStatus;
}

const generateTables = (): TableData[] => {
  const manual: TableData[] = [
    { id: '01', seats: 4, status: 'Occupée' },
    { id: '02', seats: 2, status: 'En Nettoyage' },
    { id: '03', seats: 6, status: 'Disponible' },
  ];
  for (let i = 4; i <= 15; i++) {
    manual.push({
      id: i.toString().padStart(2, '0'),
      seats: (i % 4) + 2,
      status: i % 3 === 0 ? 'Occupée' : i % 5 === 0 ? 'En Nettoyage' : 'Disponible',
    });
  }
  return manual;
};

const statusConfig: Record<TableStatus, { dot: string; label: string; labelColor: string }> = {
  'Occupée': { dot: 'bg-secondary-container shadow-[0_0_10px_#8e1c1c]', label: 'OCCUPÉE', labelColor: 'text-on-secondary-container' },
  'Disponible': { dot: 'bg-[#4CAF50] shadow-[0_0_10px_#4CAF50]', label: 'LIBRE', labelColor: 'text-[#4CAF50]' },
  'En Nettoyage': { dot: 'bg-primary-container shadow-[0_0_10px_#c9a84c]', label: 'À NETTOYER', labelColor: 'text-primary' },
};

export default function TableQrManagement() {
  const [tables] = useState(generateTables);
  const [selected, setSelected] = useState<string>('01');

  const selectedTable = tables.find(t => t.id === selected)!;

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen overflow-hidden">
      <StaffNav />
      {/* Header */}
      <header className="fixed top-0 w-full lg:left-64 z-50 flex justify-between items-center px-container-margin h-16 bg-background border-b border-outline-variant shadow-sm">
        <span className="font-headline-md text-headline-sm text-primary tracking-tighter italic">L'ÉLITE</span>
        <button className="material-symbols-outlined text-primary">shopping_cart</button>
      </header>

      <main className="mt-16 lg:ml-64 p-6 lg:p-10 h-[calc(100vh-64px)] overflow-hidden flex flex-col">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="font-headline-md text-headline-sm lg:text-headline-md text-on-surface">Plan de Salle & QR Codes</h1>
            <p className="font-body-md text-on-surface-variant mt-1">Gestion interactive de l'élégance culinaire.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-primary/10 transition-all active:scale-95">
            <span className="material-symbols-outlined">qr_code_2</span>
            Générer tous les QR
          </button>
        </header>

        <div className="flex flex-1 gap-8 overflow-hidden">
          {/* Grille de tables */}
          <div className="flex-1 overflow-y-auto pr-4" style={{ scrollbarWidth: 'none' }}>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
              {tables.map(table => {
                const c = statusConfig[table.status];
                return (
                  <div
                    key={table.id}
                    onClick={() => setSelected(table.id)}
                    className={`relative p-8 bg-surface-container border border-outline-variant rounded-xl cursor-pointer group transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(230,195,100,0.2)] ${
                      selected === table.id ? 'shadow-[0_0_0_2px_#e6c364]' : ''
                    }`}
                  >
                    <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${c.dot}`} />
                    <span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">{table.id}</span>
                    <p className="font-label-md text-label-md text-on-surface-variant mt-2">{table.seats} Personnes</p>
                    <div className="mt-4 pt-4 border-t border-outline-variant flex justify-between items-center">
                      <span className={`text-[10px] uppercase tracking-widest font-bold ${c.labelColor}`}>{c.label}</span>
                      <span className="material-symbols-outlined text-on-surface-variant text-sm">more_horiz</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Panneau détail */}
          <aside className="w-[380px] hidden xl:flex flex-col bg-surface-container-high border border-outline-variant rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-outline-variant bg-surface-variant/10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-on-surface-variant font-label-md text-label-md">DÉTAILS DE LA TABLE</span>
                  <h2 className="font-headline-md text-headline-md text-primary">Table {selected}</h2>
                </div>
                <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${
                  selectedTable.status === 'Occupée' ? 'bg-secondary-container' :
                  selectedTable.status === 'Disponible' ? 'bg-[#4CAF50]' : 'bg-primary-container'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-tighter">{selectedTable.status}</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl flex flex-col items-center gap-4 shadow-inner">
                <img
                  className="w-48 h-48"
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=Table${selected}_L_ELITE_ORDER&bgcolor=ffffff&color=0d0d0d`}
                  alt={`QR Code Table ${selected}`}
                />
                <p className="font-label-md text-label-md text-black/50 text-center">ID: ELT-TB-{selected}-2024</p>
              </div>
              <button className="w-full mt-6 py-4 flex items-center justify-center gap-3 bg-primary text-on-primary font-label-md text-label-md rounded-lg transition-all hover:brightness-110 active:scale-95">
                <span className="material-symbols-outlined">download</span>
                Télécharger PNG
              </button>
            </div>
            <div className="flex-1 p-8 overflow-y-auto space-y-6" style={{ scrollbarWidth: 'thin' }}>
              <div>
                <h3 className="font-label-md text-label-md text-on-surface mb-4">Statut de Commande</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#e6c364]" />
                    <div>
                      <p className="text-on-surface font-label-md text-sm">Entrées servies</p>
                      <p className="text-on-surface-variant text-xs">Il y a 12 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 opacity-50">
                    <div className="mt-1 w-2 h-2 rounded-full bg-outline-variant" />
                    <div>
                      <p className="text-on-surface font-label-md text-sm">Plats principaux en cuisine</p>
                      <p className="text-on-surface-variant text-xs">Prévision: 8 min</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-outline-variant">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-on-surface-variant text-xs uppercase tracking-widest">Total Actuel</span>
                  <span className="font-price-md text-price-md text-primary">184,00 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant text-xs uppercase tracking-widest">Serveur</span>
                  <span className="font-label-md text-label-md text-on-surface">Jean-Baptiste</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
