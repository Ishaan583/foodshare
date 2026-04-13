import React, { useState, useEffect } from 'react';
import { ngoList } from '../data/ngoData';
import { CardGridSkeleton } from '../components/LoadingSkeleton';

// ============================================
// NGO Listing Page
// Displays partner NGOs with pickup request button
// ============================================
const NGOListing = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [requestedNGOs, setRequestedNGOs] = useState(new Set());
  const [confirmModal, setConfirmModal] = useState(null); // holds ngo object

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  // Unique categories
  const categories = ['All', ...new Set(ngoList.map((n) => n.category))];

  // Filter NGOs by search query and category
  const filtered = ngoList.filter((ngo) => {
    const matchSearch =
      ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ngo.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = categoryFilter === 'All' || ngo.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  // Handle pickup request
  const handleRequestPickup = (ngo) => {
    setConfirmModal(ngo);
  };

  // Confirm pickup
  const confirmPickup = () => {
    if (confirmModal) {
      setRequestedNGOs((prev) => new Set([...prev, confirmModal.id]));
      console.log('📦 Pickup Requested from:', confirmModal.name);
      setConfirmModal(null);
    }
  };

  // Badge color map
  const badgeMap = {
    green: 'bg-green-100 text-green-700 border-green-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
  };

  return (
    <div className="page-container space-y-8 animate-fade-in">
      {/* =========================================
          PAGE HEADER
          ========================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-gray-900">NGO Partners</h1>
          <p className="text-gray-500 text-sm mt-1">
            Connect with verified NGOs across Rajasthan for food pickup and redistribution
          </p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl self-start">
          <span className="text-blue-500 font-bold text-lg">{ngoList.length}</span>
          <span className="text-sm text-blue-700 font-medium">Verified Partners</span>
        </div>
      </div>

      {/* =========================================
          SEARCH & FILTER BAR
          ========================================= */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Search */}
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or location..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                categoryFilter === cat
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================
          NGO CARDS GRID
          ========================================= */}
      {loading ? (
        <CardGridSkeleton count={6} />
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <span className="text-5xl">🔍</span>
          <p className="mt-4 font-medium">No NGOs match your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((ngo, idx) => (
            <div
              key={ngo.id}
              className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              {/* NGO Card Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-500 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">
                    {ngo.emoji}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-white text-sm leading-tight">{ngo.name}</p>
                    <p className="text-green-200 text-xs">{ngo.category}</p>
                  </div>
                </div>
                {/* Verified badge */}
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${badgeMap[ngo.badgeColor] || badgeMap.green} bg-white`}>
                  {ngo.badge}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                {/* Tagline */}
                <p className="text-sm text-gray-500 italic leading-snug">"{ngo.tagline}"</p>

                {/* Info rows */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-gray-600">
                    <span className="flex-shrink-0">📍</span>
                    <span>{ngo.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>📞</span>
                    <a href={`tel:${ngo.phone}`} className="hover:text-green-600 transition-colors">{ngo.phone}</a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>📧</span>
                    <a href={`mailto:${ngo.email}`} className="hover:text-green-600 transition-colors truncate">{ngo.email}</a>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {ngo.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats strip */}
                <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between text-xs text-gray-500">
                  <span>⭐ {ngo.rating}/5.0 rating</span>
                  <span>🍱 {ngo.mealsServed}</span>
                  <span>📅 Since {ngo.since}</span>
                </div>

                {/* CTA Button */}
                {requestedNGOs.has(ngo.id) ? (
                  <div className="w-full py-2.5 rounded-xl bg-green-50 border border-green-200 text-center text-sm font-medium text-green-700">
                    ✅ Pickup Requested
                  </div>
                ) : (
                  <button
                    onClick={() => handleRequestPickup(ngo)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white text-sm font-semibold hover:shadow-green hover:shadow-md transition-all"
                  >
                    🚛 Request Pickup
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================
          CONFIRM MODAL
          ========================================= */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slide-up">
            <div className="text-center mb-5">
              <span className="text-5xl">{confirmModal.emoji}</span>
              <h3 className="font-display font-bold text-xl text-gray-900 mt-3">Confirm Pickup Request</h3>
              <p className="text-gray-500 text-sm mt-2">
                You are requesting a food pickup from{' '}
                <strong>{confirmModal.name}</strong>.<br />
                They will contact you within 2 hours to confirm the slot.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-5 text-sm space-y-1.5">
              <p><span className="text-gray-400">NGO:</span> <span className="font-medium">{confirmModal.name}</span></p>
              <p><span className="text-gray-400">Location:</span> <span className="font-medium">{confirmModal.location}</span></p>
              <p><span className="text-gray-400">Contact:</span> <span className="font-medium">{confirmModal.phone}</span></p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModal(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmPickup}
                className="flex-1 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition"
              >
                ✅ Confirm Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NGOListing;
