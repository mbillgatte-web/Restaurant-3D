import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const categories = ['Entrées', 'Plats', 'Desserts', 'Boissons'];

const dishes = [
  {
    id: 1,
    name: 'Noix de Saint-Jacques',
    description: 'Émulsion au safran, tuile de corail et jeunes pousses croquantes.',
    price: '28,00 €',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&h=400&fit=crop',
    has3d: true,
  },
  {
    id: 2,
    name: 'Tartare de Bœuf fumé',
    description: "Préparé au couteau, fumage minute au bois de hêtre et jaune d'œuf confit.",
    price: '34,00 €',
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=600&h=400&fit=crop',
    has3d: true,
  },
  {
    id: 3,
    name: 'Élixir de Nuit',
    description: 'Gin artisanal, liqueur de violette, or 24 carats et essence de jasmin.',
    price: '22,00 €',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop',
    has3d: false,
  },
];

export default function MenuBrowser() {
  const [activeCategory, setActiveCategory] = useState('Entrées');
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <main className="pt-0 pb-32">
        {/* Barre de catégories horizontale */}
        <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur-md py-4 border-b border-outline-variant/30">
          <div className="flex overflow-x-auto hide-scrollbar px-container-margin gap-8 items-center max-w-4xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap font-label-md text-label-md transition-colors ${
                  activeCategory === cat
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </nav>

        {/* Liste des plats */}
        <section className="px-container-margin mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {dishes.map((dish) => (
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
              <div className="p-6 flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    {dish.name}
                  </h2>
                  <p className="font-body-md text-on-surface-variant opacity-80 max-w-[80%]">
                    {dish.description}
                  </p>
                  <p className="font-price-md text-price-md text-primary mt-3">
                    {dish.price}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: logique d'ajout au panier (Phase 3)
                  }}
                  className="bg-primary text-on-primary w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg"
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
