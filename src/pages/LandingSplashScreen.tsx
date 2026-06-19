import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingSplashScreen() {
  const [activeLang, setActiveLang] = useState('FR');
  const languages = ['FR', 'EN', 'AR'];
  const navigate = useNavigate();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  return (
    <>
      {/* Grain Overlay */}
      <div className="fixed inset-0 grain-overlay z-0"></div>
      
      {/* Background Atmospheric Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none overflow-hidden"></div>
      
      <main className="relative z-10 w-full max-w-md px-container-margin flex flex-col items-center text-center mx-auto min-h-screen justify-center pb-24">
        {/* Logo Section */}
        <div className="animate-fade-in-up mb-12">
          <div className="w-32 h-32 md:w-40 md:h-40 border-[0.5px] border-primary/30 rounded-full flex items-center justify-center relative group">
            <div className="absolute inset-0 border border-primary/10 rounded-full scale-110 animate-pulse"></div>
            <span 
              className="material-symbols-outlined text-primary text-6xl md:text-7xl group-hover:scale-110 transition-transform duration-700" 
              style={{ fontVariationSettings: "'wght' 200" }}
            >
              restaurant
            </span>
          </div>
        </div>

        {/* Brand Name & Badge */}
        <div className="animate-fade-in-up animate-delay-200 space-y-4 mb-16">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-widest uppercase italic">
            L'ÉLITE
          </h1>
          <h2 className="font-headline-sm text-headline-sm-mobile md:text-headline-sm text-on-surface-variant tracking-tighter opacity-80">
            COMMANDE TABLE
          </h2>
          <div className="pt-4">
            <span className="inline-flex items-center px-6 py-2 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md-mobile border border-on-secondary-fixed-variant/30 shadow-lg">
              Table 7
            </span>
          </div>
        </div>

        {/* CTA Section */}
        <div className="animate-fade-in-up animate-delay-400 w-full">
          <button
            onMouseMove={handleMouseMove}
            onClick={() => navigate('/menu')}
            className="group w-full py-5 px-8 rounded-lg bg-gradient-to-r from-primary to-primary-fixed-dim text-on-primary font-label-md text-label-md uppercase tracking-[0.2em] shadow-xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center space-x-3"
          >
            <span>Voir le menu</span>
            <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-2">arrow_forward</span>
          </button>
        </div>

        {/* Image Hint */}
        <div className="sr-only">
          <img 
            alt="A cinematic, low-angle photograph of a prestigious Michelin-starred restaurant interior at night..." 
            src="https://lh3.googleusercontent.com/aida/AP1WRLvHUUDP_xSuzYUOgVu06nQIeILuuc78VBUYWCvYcqYPcKKxnB9uFG7iE-tkSvCs3FHXaRsuK-l-d-bS7dycEbc2aK-56P6W1y0xlm0H08fp6wjoSIc2PeHrYNkEypTtHH2exfOplTMSOdMjmIoJpJejiqgfGVzPbbs7OlFwH-YL-BNX0oK3eZhlnFNH_qP4LvARcDVoEPxIJ2Q40UvCWfiiOC-1qNbD0k0wNWNrSYwDM1T_XTSGJyHLWoE" 
          />
        </div>
      </main>

      {/* Language Selector Footer */}
      <footer className="fixed bottom-12 left-0 w-full z-10 animate-fade-in-up animate-delay-600">
        <div className="flex justify-center items-center space-x-8">
          {languages.map((lang) => (
            <button 
              key={lang}
              onClick={() => setActiveLang(lang)}
              className={`font-label-md text-label-md-mobile pb-1 transition-colors ${
                activeLang === lang 
                  ? 'text-primary border-b border-primary' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </footer>
    </>
  );
}
