import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

function GroceryList() {
  const { token } = useAuth();
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateList = async () => {
    setLoading(true);
    const res = await fetch('/api/grocery-lists/generate', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setList(data.groceryList);
    setLoading(false);
  };

  const toggleItem = async (index) => {
    const updated = { ...list };
    updated.items[index].checked = !updated.items[index].checked;
    setList({ ...updated });

    await fetch(`/api/grocery-lists/${list.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items: updated.items }),
    });
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl text-warm-700">Grocery List</h1>
          <p className="text-warm-400 text-sm mt-1">what you need from the store.</p>
        </div>
        <button
          onClick={generateList}
          disabled={loading}
          className="bg-sage-light/60 border border-sage/30 px-5 py-2 rounded-xl text-sm text-warm-700 hover:bg-sage-light transition-all disabled:opacity-50"
        >
          {loading ? 'making list...' : 'generate list'}
        </button>
      </div>

      {list ? (
        <div className="bg-cream rounded-2xl p-6 shadow-soft">
          <div className="space-y-2">
            {list.items.map((item, i) => (
              <label
                key={i}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                  item.checked
                    ? 'line-through text-warm-300'
                    : 'text-warm-600 hover:bg-parchment'
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleItem(i)}
                  className="w-4 h-4 accent-sage rounded"
                />
                <span className="text-sm">{item.quantity} {item.unit} {item.name}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-warm-300 mt-4 italic border-t border-warm-100 pt-3">
            {list.items.filter((i) => i.checked).length} of {list.items.length} items done
          </p>
        </div>
      ) : (
        <div className="bg-cream rounded-2xl p-12 text-center shadow-soft">
          <p className="font-serif italic text-warm-400">no list yet.</p>
          <p className="text-warm-400 text-sm mt-2">generate one from your latest meal plan.</p>
        </div>
      )}
    </div>
  );
}

export default GroceryList;
