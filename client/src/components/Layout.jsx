import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen pb-8">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-surface-primary/70 border-b border-white/40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-xl font-bold text-brand-navy flex items-center gap-2">
            <span className="w-8 h-8 bg-gradient-orange rounded-full shadow-clay-sm flex items-center justify-center text-sm">🍜</span>
            what to cook
          </Link>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Link
                  to="/ingredients"
                  className={`clay-chip ${isActive('/ingredients') ? 'bg-gradient-sage text-text-primary' : 'bg-surface-card text-text-secondary'}`}
                >
                  pantry
                </Link>
                <Link
                  to="/meal-plan"
                  className={`clay-chip ${isActive('/meal-plan') ? 'bg-gradient-teal text-text-primary' : 'bg-surface-card text-text-secondary'}`}
                >
                  meals
                </Link>
                <Link
                  to="/grocery-list"
                  className={`clay-chip ${isActive('/grocery-list') ? 'bg-gradient-orange text-text-primary' : 'bg-surface-card text-text-secondary'}`}
                >
                  grocery
                </Link>
                <Link
                  to="/favorites"
                  className={`clay-chip ${isActive('/favorites') ? 'bg-gradient-pink text-text-primary' : 'bg-surface-card text-text-secondary'}`}
                >
                  saved
                </Link>
                <button
                  onClick={logout}
                  className="clay-chip bg-surface-card text-text-muted hover:text-text-primary"
                >
                  ×
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="clay-chip bg-surface-card text-text-secondary">
                  log in
                </Link>
                <Link to="/register" className="clay-button bg-gradient-teal text-text-primary px-5 py-2">
                  sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
