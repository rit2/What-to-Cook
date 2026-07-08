import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { apiUrl } from '../utils/api.js';

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
    fetch(apiUrl('/api/preferences'), {
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
    await fetch(apiUrl('/api/preferences'), {
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
      <div className="text-center mb-10">
        <div className="w-14 h-14 bg-gradient-pink rounded-2xl shadow-clay-sm mx-auto mb-4 flex items-center justify-center text-2xl">⚙️</div>
        <h1 className="font-display text-2xl font-bold text-brand-navy">your preferences</h1>
        <p className="text-text-secondary text-sm mt-1">tell us your vibe. change anytime.</p>
      </div>

      <div className="space-y-8">
        <div className="clay-card p-6">
          <h2 className="text-xs font-display font-bold text-text-secondary uppercase tracking-wide mb-4">cuisines you love</h2>
          <div className="flex flex-wrap gap-2">
            {CUISINES.map((c) => (
              <button
                key={c}
                onClick={() => toggleItem(cuisines, setCuisines, c)}
                className={`clay-chip ${
                  cuisines.includes(c)
                    ? 'bg-gradient-teal text-brand-navy'
                    : 'bg-surface-muted text-text-secondary'
                }`}
              >
                {c.toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="clay-card p-6">
          <h2 className="text-xs font-display font-bold text-text-secondary uppercase tracking-wide mb-4">dietary needs</h2>
          <div className="flex flex-wrap gap-2">
            {DIETARY.map((d) => (
              <button
                key={d}
                onClick={() => toggleItem(dietary, setDietary, d)}
                className={`clay-chip ${
                  dietary.includes(d)
                    ? 'bg-gradient-pink text-brand-navy'
                    : 'bg-surface-muted text-text-secondary'
                }`}
              >
                {d.toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="clay-card p-6">
          <h2 className="text-xs font-display font-bold text-text-secondary uppercase tracking-wide mb-4">cooking skill</h2>
          <div className="flex gap-2">
            {SKILLS.map((s) => (
              <button
                key={s}
                onClick={() => setSkill(s)}
                className={`clay-chip flex-1 text-center ${
                  skill === s
                    ? 'bg-gradient-sage text-brand-navy'
                    : 'bg-surface-muted text-text-secondary'
                }`}
              >
                {s.toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="clay-card p-6">
          <h2 className="text-xs font-display font-bold text-text-secondary uppercase tracking-wide mb-3">
            max cook time — <span className="text-brand-orange">{maxCookTime} min</span>
          </h2>
          <input
            type="range"
            min="10"
            max="120"
            step="5"
            value={maxCookTime}
            onChange={(e) => setMaxCookTime(Number(e.target.value))}
            className="w-full accent-brand-teal h-2 rounded-pill"
          />
          <div className="flex justify-between text-xs text-text-muted mt-2 font-display">
            <span>10 min</span>
            <span>2 hrs</span>
          </div>
        </div>

        <div className="clay-card p-6">
          <h2 className="text-xs font-display font-bold text-text-secondary uppercase tracking-wide mb-4">servings</h2>
          <input
            type="number"
            min="1"
            max="10"
            value={servings}
            onChange={(e) => setServings(Number(e.target.value))}
            className="clay-input w-24 text-center font-display font-bold text-lg"
          />
        </div>

        <div className="clay-card p-6">
          <h2 className="text-xs font-display font-bold text-text-secondary uppercase tracking-wide mb-4">current goal</h2>
          <div className="flex gap-2">
            {GOALS.map((g) => (
              <button
                key={g}
                onClick={() => setGoal(g)}
                className={`clay-chip flex-1 text-center ${
                  goal === g
                    ? 'bg-gradient-orange text-brand-navy'
                    : 'bg-surface-muted text-text-secondary'
                }`}
              >
                {g.toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="clay-button bg-gradient-teal text-brand-navy px-8 py-4 text-sm disabled:opacity-50"
          >
            {loading ? 'saving...' : '✓ save preferences'}
          </button>
          {saved && <span className="text-sm text-brand-sage font-display font-semibold">saved!</span>}
        </div>
      </div>
    </div>
  );
}

export default Preferences;
