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
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLto9sFi5U0-GbeqbNwJWv6pbMpGBWfN1QNEyqnkq2gvwOFqh-iNweDE0uA-V-3sU7V3WBsq_vjeo10aBoGZLSFOGlciJwqOGI_7AZbAZmG_tmwKP6-Tmr3ftsQUNwNbE7bNpVVFoSaJduB7ye5q8GIePVMBJUvGcgzjkgpJO0WJ4cK37bYwhDspFv1r5iL6lvRMelSaCKPhLc3JPNM5A-srnHttvofaDMP5HtRwE_BqkyvtFCNVgtUhdw',
    has3d: true,
  },
  {
    id: 2,
    name: 'Tartare de Bœuf fumé',
    description: "Préparé au couteau, fumage minute au bois de hêtre et jaune d'œuf confit.",
    price: '34,00 €',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLttSRDBKu1FFVGBgbD0JZmgPlb0cajenEg3ZiiMF-7_dnOhpUrnYKXOzxBXvPDN4xGBDHCHGZ3vx3asG7NLhyTgqWKMr0KdjiokcRrzYZi3ED28RVCkA97f0wtDs5npIGvHZF-9-L0BKUJkndFWeBsdhR5beT4S2sDC2LSJMWSWOLCmk_H5_nhgFmdN__iGlYztvf0yftSoRC5Htx6fNObYKleK-8nymrh82lpKh6q-3bzFRFmJ3GPxe5c',
    has3d: true,
  },
  {
    id: 3,
    name: 'Élixir de Nuit',
    description: 'Gin artisanal, liqueur de violette, or 24 carats et essence de jasmin.',
    price: '22,00 €',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLv3n53FIi_Mx8R9dp7x6k3HfkHj667Ru_zEQMEIbL4q1bB1vKytSY6wxrPT5NKyG3mirRKZOT-bI39B4vaK8-mw4I3mjzi4oWnv_dNKxerdTvoW81m_IG87jzanoJeZzBCXcrnFhAPNTNEObcp4L3tCLeh_Xin94ck65X-pqVhPbhcUl4ZEvY_4tFD5dVJqqPfBkPNf-05fBmqzR1bh1UvHvNkD8NcX-MTLUbh0_jdvV_hZ0IB1fl9MWfM',
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
          <div className="flex overflow-x-auto hide-scrollbar px-container-margin gap-8 items-center">
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
        <section className="px-container-margin mt-8 grid grid-cols-1 gap-12">
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
      <div className="fixed bottom-6 left-6 right-6 z-50">
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
