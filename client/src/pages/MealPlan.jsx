import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

function MealPlan() {
  const { token } = useAuth();
  const [meals, setMeals] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generatePlan = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/meal-plans/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to generate meal plan');
        return;
      }

      setMeals(data.mealPlan);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (mealId) => {
    await fetch(`/api/meals/${mealId}/favorite`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });

    setMeals({
      ...meals,
      meals: meals.meals.map((m) =>
        m.id === mealId ? { ...m, isFavorite: !m.isFavorite } : m
      ),
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl text-warm-700">Today's Meals</h1>
          <p className="text-warm-400 text-sm mt-1">gentle suggestions for your day.</p>
        </div>
        <button
          onClick={generatePlan}
          disabled={loading}
          className="bg-sage-light/60 border border-sage/30 px-5 py-2 rounded-xl text-sm text-warm-700 hover:bg-sage-light transition-all disabled:opacity-50"
        >
          {loading ? 'thinking...' : meals ? 'try again' : 'suggest meals'}
        </button>
      </div>

      {error && (
        <div className="bg-berry/10 border border-berry/20 p-4 rounded-xl mb-6 text-sm text-warm-700 text-center">{error}</div>
      )}

      {loading && (
        <div className="text-center py-16">
          <p className="font-serif italic text-warm-400 text-lg">thinking of something nice...</p>
          <p className="text-warm-300 text-sm mt-2">this takes a few moments</p>
        </div>
      )}

      {meals && !loading && (
        <div className="space-y-6">
          {meals.meals.map((meal) => (
            <div key={meal.id} className="bg-cream rounded-2xl p-6 shadow-soft border border-warm-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-warm-400 mb-1">{meal.type}</p>
                  <h2 className="font-serif text-xl text-warm-700">{meal.title}</h2>
                </div>
                <button
                  onClick={() => toggleFavorite(meal.id)}
                  className="text-lg transition-transform hover:scale-110"
                  aria-label={meal.isFavorite ? 'Remove from saved' : 'Save this recipe'}
                >
                  {meal.isFavorite ? '♥' : '♡'}
                </button>
              </div>

              <div className="flex gap-4 mt-3 text-xs text-warm-400">
                <span>{meal.prepTimeMinutes + meal.cookTimeMinutes} min</span>
                <span>~{meal.estimatedCalories} cal</span>
                <span>{meal.estimatedProteinG}g protein</span>
              </div>

              <div className="mt-5 border-t border-warm-100 pt-4">
                <p className="text-xs font-medium text-warm-500 mb-2">You'll need</p>
                <div className="flex flex-wrap gap-2">
                  {meal.ingredients.map((ing, i) => (
                    <span key={i} className="bg-parchment border border-warm-200 rounded-lg px-2 py-1 text-xs text-warm-600">
                      {ing.quantity} {ing.unit} {ing.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 border-t border-warm-100 pt-4">
                <p className="text-xs font-medium text-warm-500 mb-2">Steps</p>
                <ol className="space-y-2">
                  {meal.instructions.map((step, i) => (
                    <li key={i} className="text-sm text-warm-600 leading-relaxed">
                      <span className="text-warm-300 font-serif italic mr-2">{i + 1}.</span>
                      {step.text}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      )}

      {!meals && !loading && (
        <div className="bg-cream rounded-2xl p-12 text-center shadow-soft">
          <p className="font-serif italic text-warm-400 text-lg">no meals yet.</p>
          <p className="text-warm-400 text-sm mt-2">click "suggest meals" and we'll find something for you.</p>
        </div>
      )}
    </div>
  );
}

export default MealPlan;
