import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { apiUrl } from '../utils/api.js';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      login(data.token, data.user);
      navigate('/meal-plan');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto py-12">
      <div className="clay-card p-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-teal rounded-2xl shadow-clay-sm mx-auto mb-4 flex items-center justify-center text-2xl">👋</div>
          <h1 className="font-display text-2xl font-bold text-brand-navy">welcome back</h1>
          <p className="text-text-muted text-sm mt-1">good to see you again</p>
        </div>

        {error && (
          <div className="bg-brand-pink-light/50 text-text-primary p-3 rounded-2xl mb-6 text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-display font-semibold text-text-secondary mb-2 ml-1">email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="clay-input w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-display font-semibold text-text-secondary mb-2 ml-1">password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="clay-input w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="clay-button bg-gradient-teal text-brand-navy w-full py-4 text-sm mt-2 disabled:opacity-50"
          >
            {loading ? 'signing in...' : 'sign in'}
          </button>
        </form>

        <p className="text-center text-text-muted text-sm mt-6">
          new here?{' '}
          <Link to="/register" className="text-brand-teal font-semibold">
            sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
