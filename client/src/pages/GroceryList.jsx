import { useState } from 'react';
import { apiUrl } from '../utils/api.js';

function GroceryList() {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateList = async () => {
    setLoading(true);
    const res = await fetch(apiUrl('/api/grocery-lists/generate'), { method: 'POST' });
    const data = await res.json();
    setList(data.groceryList);
    setLoading(false);
  };

  const toggleItem = async (index) => {
    const updated = { ...list };
    updated.items[index].checked = !updated.items[index].checked;
    setList({ ...updated });

    await fetch(apiUrl(`/api/grocery-lists/${list.id}`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: updated.items }),
    });
  };

  const checkedCount = list ? list.items.filter((i) => i.checked).length : 0;
  const totalCount = list ? list.items.length : 0;
  const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-navy">grocery list</h1>
          <p className="text-text-secondary text-sm mt-1">what you need from the store</p>
        </div>
        <button
          onClick={generateList}
          disabled={loading}
          className="clay-button bg-gradient-orange text-brand-navy px-5 py-3 text-sm disabled:opacity-50"
        >
          {loading ? 'making list...' : '🛒 generate'}
        </button>
      </div>

      {list ? (
        <div className="clay-card p-6">
          <div className="mb-6">
            <div className="flex justify-between text-xs font-display text-text-muted mb-2">
              <span>{checkedCount} of {totalCount} items</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-surface-muted rounded-pill overflow-hidden shadow-clay-inset">
              <div
                className="h-full bg-gradient-teal rounded-pill transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-2">
            {list.items.map((item, i) => (
              <label
                key={i}
                className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
                  item.checked
                    ? 'bg-brand-teal-light/20 line-through text-text-muted'
                    : 'bg-surface-muted hover:shadow-clay-sm text-text-primary'
                }`}
              >
                <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                  item.checked
                    ? 'bg-gradient-teal border-brand-teal shadow-clay-sm'
                    : 'border-text-muted/30'
                }`}>
                  {item.checked && <span className="text-white text-xs">✓</span>}
                </div>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleItem(i)}
                  className="sr-only"
                />
                <span className="text-sm font-body">{item.quantity} {item.unit} {item.name}</span>
              </label>
            ))}
          </div>
        </div>
      ) : (
        <div className="clay-card p-12 text-center">
          <div className="w-16 h-16 bg-gradient-orange rounded-full shadow-clay mx-auto mb-4 flex items-center justify-center text-2xl">🛒</div>
          <p className="font-display font-semibold text-brand-navy">no list yet</p>
          <p className="text-text-muted text-sm mt-2">generate one from your latest meal plan.</p>
        </div>
      )}
    </div>
  );
}

export default GroceryList;
