import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const managerLinks = [
  { path: '/dashboard', icon: 'monitoring', label: 'Analytics' },
  { path: '/menu-management', icon: 'restaurant_menu', label: 'Menu' },
  { path: '/tables', icon: 'grid_view', label: 'Tables & QR' },
  { path: '/kitchen', icon: 'skillet', label: 'Cuisine' },
  { path: '/server', icon: 'room_service', label: 'Service' },
];

export default function StaffNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const currentPath = '/' + pathname.split('/').pop();

  return (
    <aside className="hidden lg:flex flex-col h-full py-8 px-4 fixed left-0 top-0 w-64 bg-surface-container-low border-r border-outline-variant shadow-lg z-50">
      <div className="font-headline-md text-headline-md text-primary mb-8 tracking-tighter italic">L'ÉLITE</div>

      {user && (
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
            <span className="material-symbols-outlined text-primary">person</span>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface">{user.name}</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">{user.role}</p>
          </div>
        </div>
      )}

      <nav className="flex-1 space-y-2">
        {managerLinks.map(link => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              currentPath === link.path
                ? 'text-primary border-r-2 border-primary bg-secondary-container/10'
                : 'text-on-surface-variant hover:bg-surface-variant/20 hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined">{link.icon}</span>
            <span className="font-label-md text-label-md">{link.label}</span>
          </button>
        ))}
      </nav>

      <button
        onClick={() => { logout(); navigate('/login'); }}
        className="mt-auto flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/20 hover:text-error transition-all"
      >
        <span className="material-symbols-outlined">logout</span>
        <span className="font-label-md text-label-md">Déconnexion</span>
      </button>
    </aside>
  );
}
