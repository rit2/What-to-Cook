import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 text-center relative">
        <div className="relative z-10">
          <div className="w-20 h-20 bg-gradient-orange rounded-full shadow-clay-lg mx-auto mb-6 flex items-center justify-center text-3xl">
            🍜
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-brand-navy leading-tight mb-4">
            what should i<br />cook today?
          </h1>
          <p className="font-body text-text-secondary text-lg max-w-md mx-auto leading-relaxed mb-10">
            add your ingredients, tell us your vibe, and we'll suggest something delicious.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/meal-plan"
              className="clay-button bg-gradient-teal text-brand-navy px-8 py-4 text-base"
            >
              ✨ generate meals
            </Link>
            <Link
              to="/ingredients"
              className="clay-button bg-surface-card text-text-secondary px-8 py-4 text-base"
            >
              update pantry
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12">
        <h2 className="font-display text-2xl font-bold text-center text-brand-navy mb-10">how it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="clay-card p-8 text-center">
            <div className="w-14 h-14 bg-gradient-sage rounded-2xl shadow-clay-sm mx-auto mb-4 flex items-center justify-center text-2xl">🥕</div>
            <h3 className="font-display font-bold text-brand-navy mb-2">add ingredients</h3>
            <p className="text-text-secondary text-sm leading-relaxed">whatever's in your fridge — eggs, rice, that random bell pepper.</p>
          </div>
          <div className="clay-card p-8 text-center">
            <div className="w-14 h-14 bg-gradient-pink rounded-2xl shadow-clay-sm mx-auto mb-4 flex items-center justify-center text-2xl">⚙️</div>
            <h3 className="font-display font-bold text-brand-navy mb-2">set your vibe</h3>
            <p className="text-text-secondary text-sm leading-relaxed">pick cuisines, dietary needs, cook time, and your goals.</p>
          </div>
          <div className="clay-card p-8 text-center">
            <div className="w-14 h-14 bg-gradient-orange rounded-2xl shadow-clay-sm mx-auto mb-4 flex items-center justify-center text-2xl">✨</div>
            <h3 className="font-display font-bold text-brand-navy mb-2">get your meals</h3>
            <p className="text-text-secondary text-sm leading-relaxed">ai generates breakfast, lunch & dinner with full recipes.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <div className="clay-card p-10">
          <h2 className="font-display text-2xl font-bold text-brand-navy mb-8 text-center">built for real life</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: '🌍', title: 'cultural cuisines', desc: 'indian, korean, mexican, thai — food that feels like home', color: 'bg-gradient-teal' },
              { icon: '⏱️', title: 'time-aware', desc: '15 min or 2 hours — recipes that fit your schedule', color: 'bg-gradient-orange' },
              { icon: '💪', title: 'nutrition goals', desc: 'bulk, cut, or chill — with calorie & protein estimates', color: 'bg-gradient-sage' },
              { icon: '🛒', title: 'auto grocery list', desc: 'one tap turns your meal plan into a shopping list', color: 'bg-gradient-pink' },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-4 p-4 rounded-2xl bg-surface-muted/50">
                <div className={`w-10 h-10 ${f.color} rounded-xl shadow-clay-sm flex items-center justify-center text-lg flex-shrink-0`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-brand-navy text-sm">{f.title}</h3>
                  <p className="text-text-secondary text-xs mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
