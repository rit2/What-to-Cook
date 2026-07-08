import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Home() {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero */}
      <section className="py-20 text-center">
        <p className="text-sm text-warm-400 tracking-wide mb-6">~ no rush, no pressure ~</p>
        <h1 className="font-serif text-4xl md:text-5xl text-warm-800 leading-snug mb-6">
          Not sure what<br />to cook today?
        </h1>
        <p className="text-warm-500 max-w-md mx-auto leading-relaxed mb-10">
          That's okay. Tell us what you have, and we'll gently suggest
          something nice to make. No meal prep stress. Just simple ideas.
        </p>

        {user ? (
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/meal-plan"
              className="bg-sage-light/60 border border-sage/30 px-7 py-3 rounded-xl text-warm-700 font-medium hover:bg-sage-light transition-all"
            >
              see today's ideas
            </Link>
            <Link
              to="/ingredients"
              className="border border-warm-200 px-7 py-3 rounded-xl text-warm-500 hover:border-warm-300 transition-all"
            >
              update pantry
            </Link>
          </div>
        ) : (
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/register"
              className="bg-sage-light/60 border border-sage/30 px-7 py-3 rounded-xl text-warm-700 font-medium hover:bg-sage-light transition-all"
            >
              get started
            </Link>
            <Link
              to="/login"
              className="border border-warm-200 px-7 py-3 rounded-xl text-warm-500 hover:border-warm-300 transition-all"
            >
              welcome back
            </Link>
          </div>
        )}
      </section>

      {/* Divider */}
      <div className="flex items-center gap-4 py-4">
        <div className="flex-1 border-t border-warm-200"></div>
        <span className="text-warm-300 text-xs italic font-serif">how it works</span>
        <div className="flex-1 border-t border-warm-200"></div>
      </div>

      {/* Steps */}
      <section className="py-12">
        <div className="space-y-6">
          <div className="bg-cream rounded-2xl p-6 shadow-soft">
            <div className="flex items-start gap-4">
              <span className="text-warm-300 font-serif text-2xl italic">1.</span>
              <div>
                <h3 className="font-serif text-lg text-warm-700 mb-1">Open your fridge</h3>
                <p className="text-warm-500 text-sm leading-relaxed">
                  Just type what you see. Eggs, leftover rice, that bell pepper — anything works.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-cream rounded-2xl p-6 shadow-soft">
            <div className="flex items-start gap-4">
              <span className="text-warm-300 font-serif text-2xl italic">2.</span>
              <div>
                <h3 className="font-serif text-lg text-warm-700 mb-1">Tell us what you like</h3>
                <p className="text-warm-500 text-sm leading-relaxed">
                  Your favorite cuisines, how much time you have, any dietary needs. Set it once.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-cream rounded-2xl p-6 shadow-soft">
            <div className="flex items-start gap-4">
              <span className="text-warm-300 font-serif text-2xl italic">3.</span>
              <div>
                <h3 className="font-serif text-lg text-warm-700 mb-1">Get a gentle suggestion</h3>
                <p className="text-warm-500 text-sm leading-relaxed">
                  We'll suggest breakfast, lunch, and dinner. With ingredients, steps, and a grocery list if you need it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom note */}
      {!user && (
        <section className="py-16 text-center">
          <p className="font-serif italic text-warm-400 mb-6">
            "Cooking should feel like a quiet moment, not a chore."
          </p>
          <Link
            to="/register"
            className="bg-sage-light/60 border border-sage/30 px-7 py-3 rounded-xl text-warm-700 font-medium hover:bg-sage-light transition-all"
          >
            start here
          </Link>
        </section>
      )}
    </div>
  );
}

export default Home;
