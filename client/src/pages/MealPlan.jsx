import { useState } from 'react';
import { apiUrl } from '../utils/api.js';

function MealPlan() {
  const [meals, setMeals] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generatePlan = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(apiUrl('/api/meal-plans/generate'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    await fetch(apiUrl(`/api/meals/${mealId}/favorite`), { method: 'PATCH' });

    setMeals({
      ...meals,
      meals: meals.meals.map((m) =>
        m.id === mealId ? { ...m, isFavorite: !m.isFavorite } : m
      ),
    });
  };

  const mealGradients = {
    breakfast: 'bg-gradient-orange',
    lunch: 'bg-gradient-sage',
    dinner: 'bg-gradient-teal',
  };

  const mealIcons = {
    breakfast: '🌅',
    lunch: '☀️',
    dinner: '🌙',
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-navy">today's meals</h1>
          <p className="text-text-secondary text-sm mt-1">personalized just for you</p>
        </div>
        <button
          onClick={generatePlan}
          disabled={loading}
          className="clay-button bg-gradient-teal text-brand-navy px-6 py-3 text-sm disabled:opacity-50"
        >
          {loading ? '🧠 thinking...' : meals ? '🔄 regenerate' : '✨ suggest meals'}
        </button>
      </div>

      {error && (
        <div className="clay-card bg-brand-pink-light/30 p-4 mb-6 text-sm text-center text-text-primary">{error}</div>
      )}

      {loading && (
        <div className="clay-card p-16 text-center">
          <div className="w-16 h-16 bg-gradient-teal rounded-full shadow-clay mx-auto mb-4 animate-pulse flex items-center justify-center text-2xl">🧠</div>
          <p className="font-display font-semibold text-brand-navy">cooking up ideas...</p>
          <p className="text-text-muted text-sm mt-2">this takes a few seconds</p>
        </div>
      )}

      {meals && !loading && (
        <div className="space-y-6">
          {meals.meals.map((meal) => (
            <div key={meal.id} className="clay-card p-6 overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${mealGradients[meal.type] || 'bg-gradient-teal'} rounded-xl shadow-clay-sm flex items-center justify-center`}>
                    {mealIcons[meal.type] || '🍽️'}
                  </div>
                  <div>
                    <p className="text-xs font-display font-bold uppercase tracking-wider text-text-muted">{meal.type}</p>
                    <h2 className="font-display text-lg font-bold text-brand-navy">{meal.title}</h2>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(meal.id)}
                  className="clay-chip bg-surface-muted text-lg"
                  aria-label={meal.isFavorite ? 'Remove from saved' : 'Save recipe'}
                >
                  {meal.isFavorite ? '❤️' : '🤍'}
                </button>
              </div>

              <div className="flex gap-2 mb-5">
                <span className="clay-chip bg-surface-muted text-xs text-text-secondary">⏱ {meal.prepTimeMinutes + meal.cookTimeMinutes} min</span>
                <span className="clay-chip bg-surface-muted text-xs text-text-secondary">🔥 {meal.estimatedCalories} cal</span>
                <span className="clay-chip bg-surface-muted text-xs text-text-secondary">💪 {meal.estimatedProteinG}g protein</span>
              </div>

              <div className="mb-5">
                <p className="text-xs font-display font-bold text-text-secondary uppercase tracking-wide mb-3">ingredients</p>
                <div className="flex flex-wrap gap-2">
                  {meal.ingredients.map((ing, i) => (
                    <span key={i} className="bg-surface-muted rounded-pill px-3 py-1 text-xs text-text-primary shadow-clay-sm">
                      {ing.quantity} {ing.unit} {ing.name}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-display font-bold text-text-secondary uppercase tracking-wide mb-3">steps</p>
                <div className="space-y-3">
                  {meal.instructions.map((step, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="w-6 h-6 bg-gradient-teal rounded-full shadow-clay-sm flex items-center justify-center text-xs font-bold text-brand-navy flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm text-text-secondary leading-relaxed pt-0.5">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!meals && !loading && (
        <div className="clay-card p-12 text-center">
          <div className="w-16 h-16 bg-gradient-orange rounded-full shadow-clay mx-auto mb-4 flex items-center justify-center text-2xl">🍜</div>
          <p className="font-display font-semibold text-brand-navy">no meals yet</p>
          <p className="text-text-muted text-sm mt-2">tap "suggest meals" and we'll plan your day.</p>
        </div>
      )}
    </div>
  );
}

export default MealPlan;
