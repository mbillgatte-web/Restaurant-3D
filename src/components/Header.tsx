import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-outline-variant/20">
      <div className="max-w-2xl mx-auto px-container-margin py-4 flex justify-between items-center">
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
        </button>
      </div>
    </header>
  );
}
