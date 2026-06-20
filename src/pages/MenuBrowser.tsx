import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const categories = ['Entrées', 'Plats', 'Desserts', 'Boissons'];

const dishes = [
  // === ENTRÉES ===
  {
    id: 1, category: 'Entrées',
    name: 'Noix de Saint-Jacques',
    description: 'Émulsion au safran, tuile de corail et jeunes pousses croquantes.',
    price: '28,00 €',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&h=400&fit=crop',
    has3d: true,
  },
  {
    id: 2, category: 'Entrées',
    name: 'Tartare de Bœuf fumé',
    description: "Préparé au couteau, fumage minute au bois de hêtre et jaune d'œuf confit.",
    price: '34,00 €',
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=600&h=400&fit=crop',
    has3d: true,
  },
  {
    id: 3, category: 'Entrées',
    name: 'Velouté de Cèpes',
    description: 'Crème de cèpes du Périgord, éclats de noisettes torréfiées et huile de truffe.',
    price: '19,00 €',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
    has3d: false,
  },

  // === PLATS ===
  {
    id: 4, category: 'Plats',
    name: 'Filet de Bœuf Wellington',
    description: 'Truffe noire, duxelles de champignons et pâte feuilletée dorée maison.',
    price: '68,00 €',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop',
    has3d: true,
  },
  {
    id: 5, category: 'Plats',
    name: 'Homard Bleu d\'Armorique',
    description: 'Rôti au beurre demi-sel, bisque corsée et légumes de saison glacés.',
    price: '85,00 €',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop',
    has3d: true,
  },
  {
    id: 6, category: 'Plats',
    name: 'Canard à l\'Orange',
    description: 'Magret rôti sur coffre, mousseline de carottes et jus réduit à l\'orange amère.',
    price: '42,00 €',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
    has3d: true,
  },
  {
    id: 7, category: 'Plats',
    name: 'Risotto aux Truffes',
    description: 'Carnaroli crémeux, parmesan 24 mois et copeaux de truffe noire fraîche.',
    price: '38,00 €',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop',
    has3d: false,
  },

  // === DESSERTS ===
  {
    id: 8, category: 'Desserts',
    name: 'Soufflé au Chocolat Noir',
    description: 'Grand Cru 70%, cœur coulant et glace vanille Bourbon de Madagascar.',
    price: '22,00 €',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=400&fit=crop',
    has3d: true,
  },
  {
    id: 9, category: 'Desserts',
    name: 'Tarte Tatin Revisitée',
    description: 'Pommes caramélisées, pâte sablée et crème fraîche d\'Isigny légèrement vanillée.',
    price: '18,00 €',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop',
    has3d: false,
  },
  {
    id: 10, category: 'Desserts',
    name: 'Sphère d\'Or Chocolat',
    description: 'Praliné noisette, éclat d\'or 24 carats et coulis de fruits rouges.',
    price: '28,00 €',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=400&fit=crop',
    has3d: true,
  },

  // === BOISSONS ===
  {
    id: 11, category: 'Boissons',
    name: 'Élixir de Nuit',
    description: 'Gin artisanal, liqueur de violette, or 24 carats et essence de jasmin.',
    price: '22,00 €',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop',
    has3d: false,
  },
  {
    id: 12, category: 'Boissons',
    name: 'Dom Pérignon Vintage',
    description: 'Cuvée de Prestige 2012, bulles fines et notes de brioche dorée.',
    price: '245,00 €',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=400&fit=crop',
    has3d: false,
  },
  {
    id: 13, category: 'Boissons',
    name: 'Infusion Grand Cru',
    description: 'Thé vert Gyokuro du Japon, servi dans une théière en fonte artisanale.',
    price: '14,00 €',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop',
    has3d: false,
  },
  {
    id: 14, category: 'Boissons',
    name: 'Mocktail Jardin Secret',
    description: 'Concombre, basilic frais, citron vert et eau pétillante infusée au gingembre.',
    price: '16,00 €',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&h=400&fit=crop',
    has3d: false,
  },
];

export default function MenuBrowser() {
  const [activeCategory, setActiveCategory] = useState('Entrées');
  const navigate = useNavigate();

  const filtered = dishes.filter(d => d.category === activeCategory);

  return (
    <>
      <Header />

      <main className="pt-0 pb-32">
        {/* Barre de catégories horizontale */}
        <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur-md py-4 border-b border-outline-variant/30">
          <div className="flex overflow-x-auto hide-scrollbar px-container-margin gap-8 items-center max-w-4xl mx-auto">
            {categories.map((cat) => {
              const count = dishes.filter(d => d.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap font-label-md text-label-md transition-colors flex items-center gap-2 ${
                    activeCategory === cat
                      ? 'text-primary border-b-2 border-primary pb-1'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {cat}
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat
                      ? 'bg-primary/20 text-primary'
                      : 'bg-surface-variant/50 text-on-surface-variant'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Liste des plats filtrés */}
        <section className="px-container-margin mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {filtered.map((dish) => (
            <article
              key={dish.id}
              onClick={() => navigate(`/dish/${dish.id}`)}
              className="bg-surface-container-lowest rounded-xl overflow-hidden border border-[#2A2A2A] group cursor-pointer active:scale-[0.99] transition-transform"
            >
              {/* Image du plat */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={dish.image}
                  alt={dish.name}
                />
                {dish.has3d && (
                  <div className="absolute top-4 left-4 bg-background/60 backdrop-blur-md border border-primary/40 px-3 py-1 rounded-full flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-primary text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      auto_awesome
                    </span>
                    <span className="font-label-md text-[10px] text-primary uppercase tracking-widest">
                      Vue 3D ✦
                    </span>
                  </div>
                )}
              </div>

              {/* Infos du plat */}
              <div className="p-5 flex justify-between items-start gap-3">
                <div className="space-y-1 min-w-0">
                  <h2 className="font-headline-sm text-headline-sm text-on-surface truncate">
                    {dish.name}
                  </h2>
                  <p className="font-body-md text-on-surface-variant opacity-80 line-clamp-2 text-sm">
                    {dish.description}
                  </p>
                  <p className="font-price-md text-price-md text-primary mt-2">
                    {dish.price}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-primary text-on-primary w-11 h-11 rounded-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg flex-shrink-0"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>

      {/* Barre flottante du panier en bas */}
      <div className="fixed bottom-6 left-6 right-6 z-50 max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/cart')}
          className="w-full h-16 bg-secondary-container text-on-secondary-container rounded-xl flex items-center justify-between px-6 shadow-[0_-4px_24px_rgba(0,0,0,0.6)] transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <div className="bg-on-secondary-container/20 p-2 rounded-lg">
              <span className="material-symbols-outlined text-on-secondary-container">
                shopping_bag
              </span>
            </div>
            <div className="text-left">
              <p className="font-label-md text-label-md uppercase opacity-70">
                2 Articles
              </p>
              <p className="font-headline-sm text-on-secondary-container text-lg">
                Voir le panier
              </p>
            </div>
          </div>
          <div className="font-price-lg text-price-lg">62,00 €</div>
        </button>
      </div>
    </>
  );
}
