import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, type UserRole } from '../context/AuthContext';

const roles: { key: UserRole; label: string; icon: string; description: string; redirect: string }[] = [
  { key: 'serveur', label: 'Serveur', icon: 'room_service', description: 'Gérer les tables et servir les plats', redirect: '/server' },
  { key: 'cuisinier', label: 'Cuisinier', icon: 'skillet', description: 'Préparer et expédier les commandes', redirect: '/kitchen' },
  { key: 'manager', label: 'Manager', icon: 'monitoring', description: 'Superviser le restaurant et la carte', redirect: '/dashboard' },
];

export default function Login() {
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!name.trim()) {
      setError('Veuillez entrer votre nom');
      return;
    }
    if (!selectedRole) {
      setError('Veuillez sélectionner votre rôle');
      return;
    }
    setError('');
    login(name.trim(), selectedRole);
    const role = roles.find(r => r.key === selectedRole)!;
    navigate(role.redirect);
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col items-center justify-center px-6">
      <div className="fixed inset-0 grain-overlay z-0" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none overflow-hidden" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-widest uppercase italic">
            L'ÉLITE
          </h1>
          <p className="font-headline-sm text-headline-sm text-on-surface-variant tracking-tighter opacity-80 mt-2">
            Espace Personnel
          </p>
        </div>

        {/* Champ nom */}
        <div className="mb-8">
          <label className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-widest block mb-3">
            Votre nom
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Jean-Baptiste"
            className="w-full bg-surface-container border border-outline-variant rounded-lg px-5 py-4 text-on-surface font-body-md placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>

        {/* Sélection du rôle */}
        <div className="mb-8">
          <label className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-widest block mb-3">
            Votre rôle
          </label>
          <div className="space-y-3">
            {roles.map(role => (
              <button
                key={role.key}
                onClick={() => setSelectedRole(role.key)}
                className={`w-full p-5 rounded-xl border text-left flex items-center gap-4 transition-all ${
                  selectedRole === role.key
                    ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(230,195,100,0.15)]'
                    : 'border-outline-variant bg-surface-container hover:border-primary/50'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  selectedRole === role.key ? 'bg-primary text-on-primary' : 'bg-surface-variant/30 text-on-surface-variant'
                }`}>
                  <span className="material-symbols-outlined">{role.icon}</span>
                </div>
                <div>
                  <p className={`font-label-md text-label-md ${selectedRole === role.key ? 'text-primary' : 'text-on-surface'}`}>
                    {role.label}
                  </p>
                  <p className="text-on-surface-variant text-xs mt-0.5">{role.description}</p>
                </div>
                {selectedRole === role.key && (
                  <span className="material-symbols-outlined text-primary ml-auto" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Erreur */}
        {error && (
          <p className="text-error font-label-md text-sm mb-4 text-center">{error}</p>
        )}

        {/* Bouton connexion */}
        <button
          onClick={handleLogin}
          className="w-full py-5 rounded-lg font-label-md bg-gradient-to-r from-primary to-primary-fixed-dim text-on-primary uppercase tracking-[0.2em] shadow-xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-300"
        >
          Se connecter
        </button>

        {/* Lien client */}
        <p className="text-center mt-8 text-on-surface-variant text-sm">
          Vous êtes client ?{' '}
          <button onClick={() => navigate('/')} className="text-primary underline underline-offset-4 hover:text-primary-fixed-dim transition-colors">
            Accéder au menu
          </button>
        </p>
      </div>
    </div>
  );
}
