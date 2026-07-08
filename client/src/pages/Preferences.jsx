import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const CUISINES = ['Indian', 'Mexican', 'Italian', 'Chinese', 'Korean', 'Japanese', 'Thai', 'Mediterranean', 'American', 'Middle Eastern'];
const DIETARY = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Halal', 'Kosher', 'Keto', 'Low-Carb'];
const SKILLS = ['Beginner', 'Intermediate', 'Advanced'];
const GOALS = ['Bulk', 'Cut', 'Maintain', 'Budget'];

function Preferences() {
  const { token } = useAuth();
  const [cuisines, setCuisines] = useState([]);
  const [dietary, setDietary] = useState([]);
  const [skill, setSkill] = useState('Beginner');
  const [maxCookTime, setMaxCookTime] = useState(30);
  const [servings, setServings] = useState(2);
  const [goal, setGoal] = useState('Maintain');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/preferences', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.preferences) {
          setCuisines(data.preferences.cuisines || []);
          setDietary(data.preferences.dietaryRestrictions || []);
          setSkill(data.preferences.cookingSkill || 'Beginner');
          setMaxCookTime(data.preferences.maxCookTimeMinutes || 30);
          setServings(data.preferences.servings || 2);
          setGoal(data.preferences.goal || 'Maintain');
        }
      });
  }, [token]);

  const toggleItem = (list, setList, item) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const handleSave = async () => {
    setLoading(true);
    await fetch('/api/preferences', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cuisines,
        dietaryRestrictions: dietary,
        cookingSkill: skill,
        maxCookTimeMinutes: maxCookTime,
        servings,
        goal,
      }),
    });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="font-serif text-2xl text-warm-700 mb-2">Your Preferences</h1>
      <p className="text-warm-400 text-sm mb-10">Tell us a bit about how you eat. You can always change this later.</p>

      <div className="space-y-10">
        <div>
          <h2 className="text-sm text-warm-500 mb-3 font-medium">Cuisines you enjoy</h2>
          <div className="flex flex-wrap gap-2">
            {CUISINES.map((c) => (
              <button
                key={c}
                onClick={() => toggleItem(cuisines, setCuisines, c)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  cuisines.includes(c)
                    ? 'bg-sage-light border border-sage/40 text-warm-700'
                    : 'bg-cream border border-warm-200 text-warm-500 hover:border-warm-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm text-warm-500 mb-3 font-medium">Dietary needs</h2>
          <div className="flex flex-wrap gap-2">
            {DIETARY.map((d) => (
              <button
                key={d}
                onClick={() => toggleItem(dietary, setDietary, d)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  dietary.includes(d)
                    ? 'bg-warm-200 border border-warm-300 text-warm-700'
                    : 'bg-cream border border-warm-200 text-warm-500 hover:border-warm-300'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm text-warm-500 mb-3 font-medium">How comfortable are you cooking?</h2>
          <div className="flex gap-2">
            {SKILLS.map((s) => (
              <button
                key={s}
                onClick={() => setSkill(s)}
                className={`px-5 py-2 rounded-lg text-sm transition-all ${
                  skill === s
                    ? 'bg-sage-light border border-sage/40 text-warm-700'
                    : 'bg-cream border border-warm-200 text-warm-500 hover:border-warm-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm text-warm-500 mb-3 font-medium">
            How much time do you have? — <span className="italic">{maxCookTime} minutes</span>
          </h2>
          <input
            type="range"
            min="10"
            max="120"
            step="5"
            value={maxCookTime}
            onChange={(e) => setMaxCookTime(Number(e.target.value))}
            className="w-full accent-sage"
          />
          <div className="flex justify-between text-xs text-warm-300 mt-1">
            <span>quick (10 min)</span>
            <span>slow cook (2 hrs)</span>
          </div>
        </div>

        <div>
          <h2 className="text-sm text-warm-500 mb-3 font-medium">Servings</h2>
          <input
            type="number"
            min="1"
            max="10"
            value={servings}
            onChange={(e) => setServings(Number(e.target.value))}
            className="w-20 bg-cream border border-warm-200 rounded-lg px-3 py-2 text-sm text-warm-700 focus:outline-none focus:border-warm-400"
          />
        </div>

        <div>
          <h2 className="text-sm text-warm-500 mb-3 font-medium">What's your goal right now?</h2>
          <div className="flex gap-2">
            {GOALS.map((g) => (
              <button
                key={g}
                onClick={() => setGoal(g)}
                className={`px-5 py-2 rounded-lg text-sm transition-all ${
                  goal === g
                    ? 'bg-sky/30 border border-sky/50 text-warm-700'
                    : 'bg-cream border border-warm-200 text-warm-500 hover:border-warm-300'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-sage-light/60 border border-sage/30 px-6 py-3 rounded-xl text-sm text-warm-700 font-medium hover:bg-sage-light transition-all disabled:opacity-50"
          >
            {loading ? 'saving...' : 'save preferences'}
          </button>
          {saved && <span className="text-sm text-sage-dark italic">saved ✓</span>}
        </div>
      </div>
    </div>
  );
}

export default Preferences;
