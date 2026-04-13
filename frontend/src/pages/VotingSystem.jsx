import React, { useState, useEffect } from 'react';
import { fetchMenu, fetchVoteCounts, submitVotes } from '../services/api';

// Meal display config
const mealColors = {
  Breakfast: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-800', icon: '🌅' },
  Lunch:     { bg: 'bg-green-50',  border: 'border-green-200',  badge: 'bg-green-100 text-green-800',  icon: '☀️' },
  'Hi-Tea':  { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-800', icon: '🍵' },
  Dinner:    { bg: 'bg-blue-50',   border: 'border-blue-200',   badge: 'bg-blue-100 text-blue-800',    icon: '🌙' },
};
const mealOrder = ['Breakfast', 'Lunch', 'Hi-Tea', 'Dinner'];
const DAY_ORDER = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

// ============================================
// Voting System Page — real data from /menu & /vote-counts
// Votes are submitted to POST /vote
// ============================================
const VotingSystem = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weeklyMenu, setWeeklyMenu] = useState([]);

  // votes[dayIndex][meal] = selected dish
  const [votes, setVotes] = useState({});
  // dbCounts: flat map from "day|meal|dish" → count (from DB)
  const [dbCounts, setDbCounts] = useState({});

  const [selectedDay, setSelectedDay] = useState(0);
  const [submittedDays, setSubmittedDays] = useState(new Set());
  const [showResults, setShowResults] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [menuData, voteCounts] = await Promise.all([fetchMenu(), fetchVoteCounts()]);

        // Sort by day order
        const sorted = [...menuData].sort(
          (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day)
        );
        setWeeklyMenu(sorted);

        // Build flat count map: "day|meal|dish" → count
        const countMap = {};
        voteCounts.forEach(({ _id, count }) => {
          const key = `${_id.day}|${_id.meal}|${_id.dish}`;
          countMap[key] = count;
        });
        setDbCounts(countMap);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleVote = (dayIndex, meal, dish) => {
    if (submittedDays.has(dayIndex)) return;
    setVotes((prev) => ({
      ...prev,
      [dayIndex]: { ...(prev[dayIndex] || {}), [meal]: dish },
    }));
  };

  const handleSubmitDay = async (dayIndex) => {
    if (submittedDays.has(dayIndex) || submitting) return;
    const dayData = weeklyMenu[dayIndex];
    const dayVotes = votes[dayIndex] || {};
    try {
      setSubmitting(true);
      await submitVotes(dayData.day, dayVotes);
      // Update local counts optimistically
      setDbCounts((prev) => {
        const updated = { ...prev };
        Object.entries(dayVotes).forEach(([meal, dish]) => {
          const key = `${dayData.day}|${meal}|${dish}`;
          updated[key] = (updated[key] || 0) + 1;
        });
        return updated;
      });
      setSubmittedDays((prev) => new Set([...prev, dayIndex]));
      setShowResults((prev) => ({ ...prev, [dayIndex]: true }));
    } catch (err) {
      alert('Failed to submit votes: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Count votes for a meal (sum of all dish counts)
  const getMealTotal = (dayName, meal) => {
    const dayData = weeklyMenu.find((d) => d.day === dayName);
    if (!dayData) return 0;
    return (dayData.meals[meal] || []).reduce((sum, dish) => {
      return sum + (dbCounts[`${dayName}|${meal}|${dish}`] || 0);
    }, 0);
  };

  const getDishCount = (dayName, meal, dish) =>
    dbCounts[`${dayName}|${meal}|${dish}`] || 0;

  const getDishPct = (dayName, meal, dish) => {
    const total = getMealTotal(dayName, meal);
    if (total === 0) return 0;
    return Math.round((getDishCount(dayName, meal, dish) / total) * 100);
  };

  const getBarColor = (pct) =>
    pct >= 40 ? 'bg-green-500' : pct >= 25 ? 'bg-amber-400' : 'bg-gray-300';

  if (loading) {
    return (
      <div className="page-container flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading menu from database...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <span className="text-5xl">⚠️</span>
          <p className="mt-4 font-display font-bold text-xl">Could not load menu</p>
          <p className="text-sm text-gray-500 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (weeklyMenu.length === 0) {
    return (
      <div className="page-container flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <span className="text-5xl">🍽️</span>
          <p className="mt-4 font-display font-bold text-xl">No menu data found</p>
          <p className="text-sm text-gray-500 mt-2">Make sure your MongoDB has mess data imported</p>
        </div>
      </div>
    );
  }

  const currentDay = weeklyMenu[selectedDay];
  const dayVotes = votes[selectedDay] || {};
  const isDaySubmitted = submittedDays.has(selectedDay);
  const mealsVotedCount = Object.keys(dayVotes).length;
  const availableMeals = mealOrder.filter((m) => (currentDay?.meals[m] || []).length > 0);
  const allMealsVoted = availableMeals.length > 0 && availableMeals.every((m) => dayVotes[m]);

  return (
    <div className="page-container space-y-8 animate-fade-in">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display font-bold text-3xl text-gray-900">Weekly Menu Voting</h1>
          <p className="text-gray-500 text-sm mt-1">
            Menu loaded from MongoDB · Votes saved to database
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-xl self-start sm:self-auto">
          <span className="text-green-600 font-semibold text-sm">{submittedDays.size}</span>
          <span className="text-gray-500 text-sm">/ {weeklyMenu.length} days voted</span>
        </div>
      </div>

      {/* INSTRUCTIONS */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-start gap-3">
        <span className="text-amber-500 text-xl flex-shrink-0">💡</span>
        <p className="text-sm text-amber-800">
          <strong>How to vote:</strong> Select one dish per meal, then click <strong>"Submit Votes"</strong>.
          Live vote counts are fetched from MongoDB and update after your submission.
        </p>
      </div>

      {/* DAY TABS */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {weeklyMenu.map((dayData, index) => (
          <button key={dayData.day} onClick={() => setSelectedDay(index)}
            className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl border-2 transition-all min-w-[80px] ${
              selectedDay === index ? 'border-green-500 bg-green-50 text-green-700' :
              submittedDays.has(index) ? 'border-green-200 bg-green-50/50 text-green-600' :
              'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            }`}>
            <span className="text-xs font-bold">{dayData.day.slice(0, 3).toUpperCase()}</span>
            {submittedDays.has(index) && <span className="text-green-500 text-sm mt-1">✓</span>}
            {!submittedDays.has(index) && votes[index] && (
              <span className="text-xs text-amber-500 mt-0.5">{Object.keys(votes[index]).length}/{availableMeals.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* VOTING PANEL */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
        {/* Day header */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-2xl text-white">{currentDay?.day}</h2>
            <p className="text-green-200 text-sm">
              {isDaySubmitted ? '✅ Votes saved to database' : `${mealsVotedCount} of ${availableMeals.length} meals selected`}
            </p>
          </div>
          {isDaySubmitted && (
            <span className="bg-white/20 text-white text-sm px-3 py-1.5 rounded-full border border-white/30">🏆 Voted</span>
          )}
        </div>

        {/* Meals */}
        <div className="p-6 space-y-6">
          {mealOrder.map((meal) => {
            const config = mealColors[meal];
            const dishes = currentDay?.meals[meal] || [];
            if (dishes.length === 0) return null;
            const selected = dayVotes[meal];
            const showResult = showResults[selectedDay];
            const dayName = currentDay?.day;

            return (
              <div key={meal} className={`border-2 rounded-xl overflow-hidden ${config.border} ${config.bg}`}>
                <div className="px-4 py-3 flex items-center gap-2">
                  <span className="text-xl">{config.icon}</span>
                  <h3 className="font-display font-semibold text-gray-800">{meal}</h3>
                  <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${config.badge}`}>{meal}</span>
                  {showResult && (
                    <span className="text-xs text-gray-400 ml-2">
                      {getMealTotal(dayName, meal)} total votes
                    </span>
                  )}
                </div>

                <div className="px-4 pb-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {dishes.map((dish) => {
                    const pct = getDishPct(dayName, meal, dish);
                    const count = getDishCount(dayName, meal, dish);
                    const isSelected = selected === dish;
                    const maxPct = Math.max(...dishes.map((d) => getDishPct(dayName, meal, d)));

                    return (
                      <div key={dish} className="flex flex-col gap-2">
                        <button onClick={() => handleVote(selectedDay, meal, dish)} disabled={isDaySubmitted}
                          className={`w-full p-3 rounded-xl border-2 text-sm font-medium text-left transition-all duration-200 ${
                            isSelected ? 'border-green-500 bg-green-500 text-white shadow-green' :
                            isDaySubmitted ? 'border-gray-200 bg-white/70 text-gray-500 cursor-default' :
                            'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50 cursor-pointer'
                          }`}>
                          <div className="flex items-center justify-between gap-1">
                            <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${isSelected ? 'border-white' : 'border-gray-400'}`}>
                              {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                            </span>
                            <span className="flex-1 text-xs leading-tight">{dish}</span>
                            {showResult && pct === maxPct && pct > 0 && <span className="text-xs">🏆</span>}
                          </div>
                        </button>

                        {showResult && (
                          <div>
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>{count} votes</span>
                              <span className="font-semibold">{pct}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full transition-all duration-700 ${getBarColor(pct)}`} style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit */}
        <div className="px-6 pb-6">
          {!isDaySubmitted ? (
            <button onClick={() => handleSubmitDay(selectedDay)} disabled={!allMealsVoted || submitting}
              className={`w-full py-4 rounded-xl font-display font-semibold text-base transition-all duration-200 ${
                allMealsVoted && !submitting
                  ? 'bg-gradient-to-r from-green-600 to-green-500 text-white hover:shadow-green hover:shadow-lg'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}>
              {submitting ? '⏳ Saving to database...' :
               allMealsVoted ? `✅ Submit Votes for ${currentDay?.day}` :
               `Select all meals to submit (${mealsVotedCount}/${availableMeals.length} done)`}
            </button>
          ) : (
            <div className="w-full py-4 rounded-xl bg-green-50 border border-green-200 text-center">
              <span className="text-green-600 font-semibold">🎉 Votes saved to MongoDB!</span>
            </div>
          )}
        </div>
      </div>

      {/* OVERVIEW TABLE */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
        <h2 className="font-display font-semibold text-lg text-gray-800 mb-4">📋 Weekly Voting Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 pr-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Day</th>
                {mealOrder.map((m) => (
                  <th key={m} className="text-center py-2 px-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                    {mealColors[m].icon} {m}
                  </th>
                ))}
                <th className="text-center py-2 px-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {weeklyMenu.map((dayData, i) => (
                <tr key={dayData.day} className={`hover:bg-gray-50 transition-colors ${selectedDay === i ? 'bg-green-50/50' : ''}`}>
                  <td className="py-2.5 pr-4 font-medium text-gray-700">{dayData.day}</td>
                  {mealOrder.map((meal) => (
                    <td key={meal} className="py-2.5 px-3 text-center text-gray-500 text-xs">
                      {votes[i]?.[meal] ? <span className="text-green-600 font-medium">{votes[i][meal]}</span> : <span className="text-gray-300">—</span>}
                    </td>
                  ))}
                  <td className="py-2.5 px-3 text-center">
                    {submittedDays.has(i)
                      ? <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">✓ Done</span>
                      : votes[i] && Object.keys(votes[i]).length > 0
                      ? <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">In Progress</span>
                      : <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">Pending</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VotingSystem;
