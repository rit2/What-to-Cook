import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen">
      <nav className="border-b border-warm-200 bg-cream/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="font-serif text-xl text-warm-700 italic">
            What to Cook
          </Link>

          <div className="flex items-center gap-5">
            {user ? (
              <>
                <Link to="/ingredients" className="text-sm text-warm-500 hover:text-warm-700 transition-colors">
                  pantry
                </Link>
                <Link to="/meal-plan" className="text-sm text-warm-500 hover:text-warm-700 transition-colors">
                  meals
                </Link>
                <Link to="/grocery-list" className="text-sm text-warm-500 hover:text-warm-700 transition-colors">
                  groceries
                </Link>
                <Link to="/favorites" className="text-sm text-warm-500 hover:text-warm-700 transition-colors">
                  saved
                </Link>
                <button
                  onClick={logout}
                  className="text-sm text-warm-400 hover:text-warm-600 transition-colors"
                >
                  leave
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-warm-500 hover:text-warm-700 transition-colors">
                  sign in
                </Link>
                <Link
                  to="/register"
                  className="text-sm bg-sage-light/60 border border-sage/30 px-4 py-2 rounded-xl text-warm-700 hover:bg-sage-light transition-colors"
                >
                  join
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Outlet />
      </main>

      <footer className="border-t border-warm-200 py-6 text-center">
        <p className="text-xs text-warm-400 italic font-serif">take it easy. one meal at a time.</p>
      </footer>
    </div>
  );
}

export default Layout;
