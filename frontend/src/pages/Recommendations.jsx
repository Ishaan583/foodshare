import React, { useState, useEffect } from 'react';
import { fetchRecommendations, fetchTopWasted } from '../services/api';
import { CardGridSkeleton } from '../components/LoadingSkeleton';

// Emoji palette for dish cards (cycles through)
const EMOJIS = ['🍛', '🥘', '🍲', '🫕', '🍚', '🥗', '🍜', '🫓', '🍝', '🥙'];
// Gradient palette for dish cards
const GRADIENTS = [
  'from-amber-400 to-orange-500', 'from-green-400 to-teal-500', 'from-orange-400 to-red-500',
  'from-blue-400 to-indigo-500', 'from-purple-400 to-violet-500', 'from-teal-400 to-green-500',
  'from-red-400 to-rose-500', 'from-yellow-400 to-amber-500',
];

// ============================================
// Recommendations Page — real data from /recommendations & /top-wasted-food
// ============================================
const Recommendations = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [topWasted, setTopWasted] = useState([]);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Breakfast', 'Lunch', 'Hi-Tea', 'Dinner'];

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [recs, wasted] = await Promise.all([fetchRecommendations(), fetchTopWasted()]);
        setDishes(recs);
        setTopWasted(wasted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = filter === 'All' ? dishes : dishes.filter((d) => d.category === filter);
  const sorted = [...filtered].sort((a, b) => b.popularity - a.popularity);

  if (error) {
    return (
      <div className="page-container flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <span className="text-5xl">⚠️</span>
          <p className="mt-4 font-display font-bold text-xl">Could not load recommendations</p>
          <p className="text-sm text-gray-500 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container space-y-8 animate-fade-in">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-gray-900">Recommendations</h1>
          <p className="text-gray-500 text-sm mt-1">
            Dishes with highest consumption ratio — computed from real MongoDB data
          </p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl self-start">
          <span className="text-xl">🤖</span>
          <span className="text-sm font-medium text-amber-700">Data-Driven Picks</span>
        </div>
      </div>

      {/* CATEGORY FILTER */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === cat ? 'bg-green-600 text-white shadow-green' : 'bg-white border border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-600'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* TOP 3 PODIUM */}
      {!loading && filter === 'All' && sorted.length >= 3 && (
        <div className="bg-gradient-to-br from-green-700 to-green-600 rounded-2xl p-6">
          <h2 className="font-display font-semibold text-white mb-5">🏆 Most Consumed (Least Wasted)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {sorted.slice(0, 3).map((dish, idx) => {
              const medals = ['🥇', '🥈', '🥉'];
              return (
                <div key={dish.name}
                  className={`bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl p-4 text-center ${idx === 0 ? 'sm:order-2' : ''}`}>
                  <div className="text-2xl mb-1">{medals[idx]}</div>
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${GRADIENTS[idx]} flex items-center justify-center text-3xl mb-3`}>
                    {EMOJIS[idx]}
                  </div>
                  <p className="font-display font-semibold text-white text-sm">{dish.name}</p>
                  <p className="text-green-300 text-xs mb-2">{dish.category || 'Mixed'}</p>
                  <div className="bg-white/20 rounded-full px-3 py-1 inline-block">
                    <span className="text-white font-bold text-sm">{dish.popularity}%</span>
                    <span className="text-green-200 text-xs"> consumed</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* DISH CARDS */}
      {loading ? (
        <CardGridSkeleton count={8} />
      ) : sorted.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <span className="text-5xl">🍽️</span>
          <p className="mt-4 font-medium">No dishes found for this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {sorted.map((dish, idx) => (
            <div key={dish.name}
              className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${idx * 60}ms` }}>
              {/* Image area */}
              <div className={`h-36 bg-gradient-to-br ${GRADIENTS[idx % GRADIENTS.length]} flex items-center justify-center relative`}>
                <span className="text-5xl">{EMOJIS[idx % EMOJIS.length]}</span>
                {idx < 3 && filter === 'All' && (
                  <div className="absolute top-2 left-2 bg-white/90 rounded-lg px-2 py-1 text-xs font-bold text-gray-700">#{idx + 1}</div>
                )}
                {dish.category && (
                  <div className="absolute top-2 right-2 bg-black/30 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">{dish.category}</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-display font-semibold text-gray-900 mb-3 text-sm leading-tight">{dish.name}</h3>
                {/* Popularity */}
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Consumption rate</span>
                    <span className="font-semibold text-green-700">{dish.popularity}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full" style={{ width: `${dish.popularity}%` }} />
                  </div>
                </div>
                {/* Wastage Score */}
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Avg wastage</span>
                    <span className={`font-semibold ${dish.wastageScore <= 15 ? 'text-green-600' : 'text-orange-500'}`}>
                      {dish.wastageScore} kg
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${dish.wastageScore <= 15 ? 'bg-green-400' : 'bg-orange-400'}`}
                      style={{ width: `${Math.min(dish.wastageScore * 2, 100)}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TOP WASTED STRIP */}
      {!loading && topWasted.length > 0 && (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
          <h2 className="font-display font-semibold text-gray-800 mb-4">
            ⚠️ Most Wasted Items — Review These Dishes
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {topWasted.map((item, i) => (
              <div key={item._id} className="bg-white rounded-xl p-4 text-center shadow-sm border border-red-100">
                <span className="text-2xl">🍽️</span>
                <p className="font-medium text-gray-800 mt-2 text-xs leading-tight">{item._id}</p>
                <p className="text-red-600 font-bold text-base mt-1">{Math.round(item.total_wastage)} kg</p>
                <p className="text-gray-400 text-xs">wasted total</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
