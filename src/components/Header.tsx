import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-outline-variant/20">
      <div className="max-w-4xl mx-auto px-container-margin py-4 flex justify-between items-center">
        <Link to="/menu" className="no-underline">
          <h1 className="font-headline-md text-headline-sm text-primary italic tracking-tighter">
            L'ÉLITE
          </h1>
        </Link>

        <button
          onClick={() => navigate('/cart')}
          className="relative text-primary hover:scale-110 transition-transform"
        >
          <span className="material-symbols-outlined text-3xl">shopping_cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-secondary-container text-[10px] font-bold text-on-secondary-container">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
