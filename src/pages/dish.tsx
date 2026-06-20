import React, { useState, useEffect } from 'react';

export default function Dish() {
    // === État local (State) ===
    const [qty, setQty] = useState(1);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // === Effet au chargement (Animation d'entrée) ===
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // === Fonctions ===
    const changeQty = (delta: number) => {
        setQty(prevQty => Math.max(1, prevQty + delta));
    };

    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    const closeModal = () => {
        setIsVisible(false);
        // Ici, plus tard, on ajoutera la logique pour revenir à la page précédente (React Router)
    };

    // Gestion du clic sur l'arrière-plan
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className="bg-background text-on-background font-body-md overflow-hidden min-h-screen relative">
            <div className="grain-overlay"></div>
            
            {/* Background Content Mockup (L'ÉLITE Main View) */}
            <main className="min-h-screen px-container-margin py-8 opacity-30 select-none">
                <header className="flex justify-between items-center mb-12">
                    <h1 className="font-headline-md text-headline-md text-primary italic tracking-tighter">L'ÉLITE</h1>
                    <span className="material-symbols-outlined text-primary text-3xl">shopping_cart</span>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                    <div className="h-64 bg-surface-container rounded-xl"></div>
                    <div className="h-64 bg-surface-container rounded-xl"></div>
                </div>
            </main>

            {/* Modal Backdrop */}
            <div 
                className={`fixed inset-0 z-40 backdrop-blur-custom flex items-end transition-opacity duration-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
                onClick={handleBackdropClick}
            >
                {/* Bottom Sheet Modal */}
                <div 
                    className="w-full max-w-2xl mx-auto bg-surface-container-low rounded-t-[32px] shadow-2xl overflow-hidden relative border-t border-outline-variant transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]" 
                    style={{ transform: isVisible ? 'translateY(0)' : 'translateY(100%)' }}
                >
                    {/* Handle */}
                    <div className="w-12 h-1.5 bg-outline-variant/50 rounded-full mx-auto mt-4 mb-2"></div>
                    
                    {/* Close Action (Absolute) */}
                    <button 
                        onClick={closeModal}
                        className="absolute right-6 top-6 z-50 text-on-surface-variant hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-outlined text-2xl">close</span>
                    </button>
                    
                    {/* Scrollable Content Container */}
                    <div className="max-h-[751px] overflow-y-auto pb-32">
                        {/* 3D Viewer Area / Hero Image */}
                        <div className="relative w-full h-[280px] bg-[#0D0D0D] flex items-center justify-center overflow-hidden">
                            {/* 3D Model Placeholder Representation */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-container-low/80"></div>
                            <img 
                                className="h-full w-full object-cover mix-blend-lighten scale-110 hover:scale-125 transition-transform duration-700 ease-out" 
                                alt="Canard à l'orange 3D rendering" 
                                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop"
                            />
                            {/* Interaction Indicator */}
                            <div className="absolute bottom-4 right-6 flex items-center gap-2 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full border border-outline-variant/30">
                                <span className="material-symbols-outlined text-primary text-sm">3d_rotation</span>
                                <span className="text-[10px] font-label-md text-on-surface-variant uppercase tracking-widest">Aperçu 3D interactif</span>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="px-container-margin mt-8">
                            <div className="flex justify-between items-start gap-4">
                                <h2 className="font-headline-md text-headline-md-mobile md:text-headline-md text-on-surface leading-tight">
                                    Canard à l'Orange <br/>
                                    <span className="italic font-normal">Façon Élite</span>
                                </h2>
                                <span className="font-price-lg text-price-lg text-primary">38,00€</span>
                            </div>
                            <p className="mt-4 text-on-surface-variant font-body-md text-body-md-mobile leading-relaxed max-w-prose">
                                Magret de canard de Barbarie rôti sur coffre, fine mousseline de carottes au gingembre, et son jus corsé réduit à l'orange amère de Sicile. Une harmonie parfaite entre puissance et acidité.
                            </p>

                            {/* Allergen Pill Icons */}
                            <div className="flex gap-3 mt-6">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-outline-variant bg-surface-variant/10">
                                    <span className="material-symbols-outlined text-primary text-lg">psychology</span>
                                    <span className="font-label-md text-[11px] uppercase text-on-surface-variant">Fruits à coque</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-outline-variant bg-surface-variant/10">
                                    <span className="material-symbols-outlined text-primary text-lg">eco</span>
                                    <span className="font-label-md text-[11px] uppercase text-on-surface-variant">Bio-sourcé</span>
                                </div>
                            </div>

                            {/* Nutrient Accordion */}
                            <div className="mt-8 border-t border-outline-variant/30">
                                <button 
                                    className="w-full flex justify-between items-center py-5 group" 
                                    onClick={toggleAccordion}
                                >
                                    <span className="font-label-md text-label-md text-on-surface">VALEURS NUTRITIONNELLES</span>
                                    <span 
                                        className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-transform duration-300"
                                        style={{ transform: isAccordionOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                    >
                                        expand_more
                                    </span>
                                </button>
                                
                                <div className={`overflow-hidden transition-all duration-300 ${isAccordionOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="grid grid-cols-2 gap-4 pb-6">
                                        <div className="bg-surface-container-highest/30 p-4 rounded-lg border border-outline-variant/20">
                                            <p className="text-on-surface-variant text-[12px] font-label-md mb-1 uppercase">Énergie</p>
                                            <p className="font-price-md text-primary text-xl">485 <span className="text-sm font-label-md">KCAL</span></p>
                                        </div>
                                        <div className="bg-surface-container-highest/30 p-4 rounded-lg border border-outline-variant/20">
                                            <p className="text-on-surface-variant text-[12px] font-label-md mb-1 uppercase">Protéines</p>
                                            <p className="font-price-md text-on-surface text-xl">32g</p>
                                        </div>
                                        <div className="bg-surface-container-highest/30 p-4 rounded-lg border border-outline-variant/20">
                                            <p className="text-on-surface-variant text-[12px] font-label-md mb-1 uppercase">Lipides</p>
                                            <p className="font-price-md text-on-surface text-xl">24g</p>
                                        </div>
                                        <div className="bg-surface-container-highest/30 p-4 rounded-lg border border-outline-variant/20">
                                            <p className="text-on-surface-variant text-[12px] font-label-md mb-1 uppercase">Glucides</p>
                                            <p className="font-price-md text-on-surface text-xl">12g</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Sticky Footer Actions */}
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-surface-container-low border-t border-outline-variant/50 flex items-center justify-between gap-6">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-outline-variant rounded-lg bg-surface-container-lowest h-14 overflow-hidden">
                            <button 
                                className="w-12 h-full flex items-center justify-center text-primary hover:bg-surface-variant/20 transition-colors" 
                                onClick={() => changeQty(-1)}
                            >
                                <span className="material-symbols-outlined">remove</span>
                            </button>
                            <span className="w-10 text-center font-price-md text-on-surface">
                                {qty}
                            </span>
                            <button 
                                className="w-12 h-full flex items-center justify-center text-primary hover:bg-surface-variant/20 transition-colors" 
                                onClick={() => changeQty(1)}
                            >
                                <span className="material-symbols-outlined">add</span>
                            </button>
                        </div>
                        
                        {/* Add to Cart Button */}
                        <button className="flex-1 h-14 bg-primary text-on-primary rounded-lg font-label-md flex items-center justify-center gap-3 shadow-lg shadow-primary/20 active:scale-95 transition-all">
                            <span className="material-symbols-outlined text-xl">shopping_bag</span>
                            AJOUTER AU PANIER
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
