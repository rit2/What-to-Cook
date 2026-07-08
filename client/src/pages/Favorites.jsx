import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

function Favorites() {
  const { token } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/meals/favorites', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data.meals || []);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <p className="text-warm-400 text-center py-12 italic">loading your saved recipes...</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-serif text-2xl text-warm-700 mb-2">Saved Recipes</h1>
      <p className="text-warm-400 text-sm mb-8">the ones you want to come back to.</p>

      {favorites.length === 0 ? (
        <div className="bg-cream rounded-2xl p-12 text-center shadow-soft">
          <p className="font-serif italic text-warm-400">nothing saved yet.</p>
          <p className="text-warm-400 text-sm mt-2">when you find a meal you love, tap the heart to save it here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {favorites.map((meal) => (
            <div key={meal.id} className="bg-cream border border-warm-100 rounded-xl p-5 shadow-soft">
              <h2 className="font-serif text-lg text-warm-700">{meal.title}</h2>
              <div className="flex gap-4 mt-2 text-xs text-warm-400">
                <span>{meal.prepTimeMinutes + meal.cookTimeMinutes} min</span>
                <span>~{meal.estimatedCalories} cal</span>
                <span>{meal.estimatedProteinG}g protein</span>
                {meal.cuisine && <span className="italic">{meal.cuisine}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
