import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          RESTO<span>3D</span>
        </Link>
        <nav className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Accueil</Link>
          <Link to="/menu" className={location.pathname === '/menu' ? 'active' : ''}>Le Menu</Link>
          <Link to="/reservation" className="btn-reserver">Réserver</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
