import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

function Ingredients() {
  const { token } = useAuth();
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIngredients();
  }, [token]);

  const fetchIngredients = async () => {
    const res = await fetch('/api/ingredients', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setIngredients(data.ingredients || []);
    setLoading(false);
  };

  const addIngredient = async (e) => {
    e.preventDefault();
    if (!newIngredient.trim()) return;

    const res = await fetch('/api/ingredients', {
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
    await fetch(`/api/ingredients/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setIngredients(ingredients.filter((i) => i.id !== id));
  };

  if (loading) return <p className="text-warm-400 text-center py-12 italic">loading your pantry...</p>;

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="font-serif text-2xl text-warm-700 mb-2">Your Pantry</h1>
      <p className="text-warm-400 text-sm mb-8">
        What do you have at home? Just list what comes to mind.
      </p>

      <form onSubmit={addIngredient} className="flex gap-3 mb-8">
        <input
          type="text"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          placeholder="eggs, rice, tomatoes..."
          className="flex-1 bg-cream border border-warm-200 rounded-xl px-4 py-3 text-sm text-warm-700 focus:outline-none focus:border-warm-400 transition-colors placeholder:text-warm-300"
        />
        <button
          type="submit"
          className="bg-sage-light/60 border border-sage/30 px-5 py-3 rounded-xl text-sm text-warm-700 hover:bg-sage-light transition-all"
        >
          add
        </button>
      </form>

      {ingredients.length === 0 ? (
        <div className="bg-cream rounded-2xl p-10 text-center shadow-soft">
          <p className="font-serif italic text-warm-400">your pantry is empty.</p>
          <p className="text-warm-400 text-sm mt-2">add a few things and we'll work with what you've got.</p>
        </div>
      ) : (
        <div className="bg-cream rounded-2xl p-6 shadow-soft">
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ing) => (
              <span
                key={ing.id}
                className="inline-flex items-center gap-2 bg-parchment border border-warm-200 rounded-lg px-3 py-2 text-sm text-warm-600"
              >
                {ing.name}
                <button
                  onClick={() => removeIngredient(ing.id)}
                  className="text-warm-300 hover:text-berry transition-colors"
                  aria-label={`Remove ${ing.name}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <p className="text-xs text-warm-400 mt-4 italic">
            {ingredients.length} item{ingredients.length !== 1 ? 's' : ''} in your pantry
          </p>
        </div>
      )}
    </div>
  );
}

export default Ingredients;
