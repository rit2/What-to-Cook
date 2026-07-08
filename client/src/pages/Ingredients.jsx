import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { apiUrl } from '../utils/api.js';

function Ingredients() {
  const { token } = useAuth();
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIngredients();
  }, [token]);

  const fetchIngredients = async () => {
    const res = await fetch(apiUrl('/api/ingredients'), {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setIngredients(data.ingredients || []);
    setLoading(false);
  };

  const addIngredient = async (e) => {
    e.preventDefault();
    if (!newIngredient.trim()) return;

    const res = await fetch(apiUrl('/api/ingredients'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newIngredient.trim() }),
    });

    if (res.ok) {
      const data = await res.json();
      setIngredients([...ingredients, data.ingredient]);
      setNewIngredient('');
    }
  };

  const removeIngredient = async (id) => {
    await fetch(apiUrl(`/api/ingredients/${id}`), {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setIngredients(ingredients.filter((i) => i.id !== id));
  };

  if (loading) return <p className="text-text-muted text-center py-12 font-display">loading pantry...</p>;

  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-gradient-sage rounded-2xl shadow-clay-sm mx-auto mb-4 flex items-center justify-center text-2xl">🧊</div>
        <h1 className="font-display text-2xl font-bold text-brand-navy">your pantry</h1>
        <p className="text-text-secondary text-sm mt-1">what do you have at home?</p>
      </div>

      <form onSubmit={addIngredient} className="flex gap-3 mb-8">
        <input
          type="text"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          placeholder="eggs, chicken, rice..."
          className="clay-input flex-1"
        />
        <button
          type="submit"
          className="clay-button bg-gradient-sage text-brand-navy px-6 py-4 text-sm"
        >
          + add
        </button>
      </form>

      {ingredients.length === 0 ? (
        <div className="clay-card p-10 text-center">
          <p className="text-text-muted font-display">your pantry is empty</p>
          <p className="text-text-muted text-sm mt-2">add ingredients and we'll work with what you've got.</p>
        </div>
      ) : (
        <div className="clay-card p-6">
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ing) => (
              <span
                key={ing.id}
                className="clay-chip bg-surface-muted text-text-primary inline-flex items-center gap-2"
              >
                {ing.name}
                <button
                  onClick={() => removeIngredient(ing.id)}
                  className="text-text-muted hover:text-brand-pink transition-colors ml-1 text-lg leading-none"
                  aria-label={`Remove ${ing.name}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-surface-muted">
            <p className="text-xs text-text-muted font-display">
              {ingredients.length} item{ingredients.length !== 1 ? 's' : ''} in pantry
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ingredients;
