import { useState, useEffect } from 'react';
import { apiUrl } from '../utils/api.js';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl('/api/meals/favorites'))
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data.meals || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-text-muted text-center py-12 font-display">loading saved recipes...</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-gradient-pink rounded-2xl shadow-clay-sm mx-auto mb-4 flex items-center justify-center text-2xl">❤️</div>
        <h1 className="font-display text-2xl font-bold text-brand-navy">saved recipes</h1>
        <p className="text-text-secondary text-sm mt-1">the ones you want to cook again</p>
      </div>

      {favorites.length === 0 ? (
        <div className="clay-card p-12 text-center">
          <p className="font-display font-semibold text-brand-navy">nothing saved yet</p>
          <p className="text-text-muted text-sm mt-2">tap the heart on meals you love to save them here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {favorites.map((meal) => (
            <div key={meal.id} className="clay-card p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-pink rounded-xl shadow-clay-sm flex items-center justify-center">❤️</div>
                <div className="flex-1">
                  <h2 className="font-display font-bold text-brand-navy">{meal.title}</h2>
                  <div className="flex gap-3 mt-1">
                    <span className="text-xs text-text-muted">{meal.prepTimeMinutes + meal.cookTimeMinutes} min</span>
                    <span className="text-xs text-text-muted">{meal.estimatedCalories} cal</span>
                    <span className="text-xs text-text-muted">{meal.estimatedProteinG}g protein</span>
                    {meal.cuisine && <span className="text-xs text-brand-teal">{meal.cuisine}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
