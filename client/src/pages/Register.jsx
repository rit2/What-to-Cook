import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { apiUrl } from '../utils/api.js';

function Register() {
  const [name, setName] = useState('');
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
      const res = await fetch(apiUrl('/api/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
        return;
      }

      login(data.token, data.user);
      navigate('/preferences');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto py-12">
      <h1 className="font-serif text-2xl text-center text-warm-700 mb-2">Hello there</h1>
      <p className="text-center text-warm-400 text-sm mb-8">let's get you set up. it only takes a moment.</p>

      {error && (
        <div className="bg-berry/10 border border-berry/20 text-warm-700 p-3 rounded-xl mb-6 text-sm text-center">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm text-warm-500 mb-2">your name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-cream border border-warm-200 rounded-xl px-4 py-3 text-sm text-warm-700 focus:outline-none focus:border-warm-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-warm-500 mb-2">email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-cream border border-warm-200 rounded-xl px-4 py-3 text-sm text-warm-700 focus:outline-none focus:border-warm-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-warm-500 mb-2">password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full bg-cream border border-warm-200 rounded-xl px-4 py-3 text-sm text-warm-700 focus:outline-none focus:border-warm-400 transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sage-light/60 border border-sage/30 py-3 rounded-xl text-warm-700 font-medium hover:bg-sage-light transition-all disabled:opacity-50"
        >
          {loading ? 'setting up...' : 'create account'}
        </button>
      </form>

      <p className="text-center text-warm-400 text-sm mt-6">
        already have an account?{' '}
        <Link to="/login" className="text-warm-600 underline decoration-warm-300">
          sign in
        </Link>
      </p>
    </div>
  );
}

export default Register;
