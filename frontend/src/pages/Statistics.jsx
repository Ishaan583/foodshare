import React, { useState, useEffect } from 'react';
import { WasteBarChart, WeeklyLineChart } from '../components/ChartWrapper';
import { ChartSkeleton, StatCardSkeleton } from '../components/LoadingSkeleton';
import { fetchWastageByDayMeal, fetchWastageByDay } from '../services/api';

// Day ordering for correct chart axis
const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = ['All', 'Breakfast', 'Lunch', 'Hi-Tea', 'Dinner'];

// ============================================
// Food Statistics Page — real data from /wastage-by-day-meal & /wastage-by-day
// ============================================
const Statistics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState('All');
  const [chartView, setChartView] = useState('daily');
  const [rawDayMeal, setRawDayMeal] = useState([]);   // from /wastage-by-day-meal
  const [rawByDay, setRawByDay] = useState([]);        // from /wastage-by-day

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [dayMeal, byDay] = await Promise.all([
          fetchWastageByDayMeal(),
          fetchWastageByDay(),
        ]);
        setRawDayMeal(dayMeal);
        setRawByDay(byDay);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Build daily bar chart data in the shape WasteBarChart expects:
  // [{date: "Monday", Breakfast: X, Lunch: Y, HiTea: Z, Dinner: W}, ...]
  const dailyChartData = (() => {
    // Group rawDayMeal by day
    const map = {};
    DAY_ORDER.forEach((d) => {
      map[d] = { date: d, Breakfast: 0, Lunch: 0, HiTea: 0, Dinner: 0 };
    });
    rawDayMeal.forEach(({ _id, total_wastage }) => {
      const { day, meal_type } = _id;
      if (!map[day]) return;
      if (meal_type === 'Hi-Tea') map[day].HiTea = Math.round(total_wastage);
      else if (map[day][meal_type] !== undefined) map[day][meal_type] = Math.round(total_wastage);
    });

    // Filter by selected meal
    return DAY_ORDER.map((d) => {
      if (selectedMeal === 'All') return map[d];
      const key = selectedMeal === 'Hi-Tea' ? 'HiTea' : selectedMeal;
      return { date: d, [key]: map[d][key] };
    });
  })();

  // Build weekly line chart data
  const weeklyChartData = [...rawByDay]
    .sort((a, b) => DAY_ORDER.indexOf(a._id) - DAY_ORDER.indexOf(b._id))
    .map((d) => ({
      week: d._id,
      totalWaste: Math.round(d.total_wastage),
      saved: Math.round(d.total_consumed),
      efficiency: d.total_prepared > 0
        ? Math.round((d.total_consumed / d.total_prepared) * 100)
        : 0,
    }));

  // Compute summary metrics from raw data
  const totalWastage = rawByDay.reduce((s, d) => s + d.total_wastage, 0);
  const totalConsumed = rawByDay.reduce((s, d) => s + d.total_consumed, 0);
  const worstDay = rawByDay.sort ? [...rawByDay].sort((a, b) => b.total_wastage - a.total_wastage)[0]?._id : '—';
  const bestDay = [...rawByDay].sort((a, b) => a.total_wastage - b.total_wastage)[0]?._id || '—';

  const wasteMetrics = [
    { label: 'Total Wastage', value: `${Math.round(totalWastage).toLocaleString()} kg`, icon: '📊' },
    { label: 'Total Consumed', value: `${Math.round(totalConsumed).toLocaleString()} kg`, icon: '✅' },
    { label: 'Best Day', value: bestDay, icon: '🏆' },
    { label: 'Worst Day', value: worstDay, icon: '⚠️' },
  ];

  if (error) {
    return (
      <div className="page-container flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <span className="text-5xl">⚠️</span>
          <p className="mt-4 font-display font-bold text-xl text-gray-800">Could not load statistics</p>
          <p className="text-sm text-gray-500 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container space-y-8 animate-fade-in">
      {/* PAGE HEADER */}
      <div>
        <h1 className="font-display font-bold text-3xl text-gray-900">Food Statistics</h1>
        <p className="text-gray-500 text-sm mt-1">
          Real wastage data from MUJ campus mess — pulled live from MongoDB
        </p>
      </div>

      {/* METRIC CARDS */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => <StatCardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {wasteMetrics.map((m) => (
            <div key={m.label} className="bg-white rounded-2xl shadow-card border border-gray-100 p-5 flex flex-col items-center text-center">
              <span className="text-3xl mb-2">{m.icon}</span>
              <p className="font-display font-bold text-xl text-gray-900">{m.value}</p>
              <p className="text-xs text-gray-500 mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* FILTER PANEL */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-5">
        <h2 className="font-display font-semibold text-gray-800 mb-4">🔍 Filters & Controls</h2>
        <div className="flex flex-wrap gap-4 items-end">
          {/* Meal Type Filter */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Meal Type</label>
            <div className="flex gap-2 flex-wrap">
              {mealTypes.map((meal) => (
                <button key={meal} onClick={() => setSelectedMeal(meal)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedMeal === meal ? 'bg-green-600 text-white shadow-green' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                  {meal}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-gray-200" />

          {/* Chart View Toggle */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Chart View</label>
            <div className="flex bg-gray-100 rounded-xl p-1">
              {['daily', 'weekly'].map((view) => (
                <button key={view} onClick={() => setChartView(view)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
                    chartView === view ? 'bg-white text-green-700 shadow-sm font-semibold' : 'text-gray-500 hover:text-gray-700'
                  }`}>
                  {view}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => { setSelectedMeal('All'); setChartView('daily'); }}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition self-end">
            ↺ Reset
          </button>
        </div>
      </div>

      {/* CHART */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton height="h-72" /><ChartSkeleton height="h-72" />
        </div>
      ) : (
        <div className="space-y-6">
          {chartView === 'daily' ? (
            <WasteBarChart
              data={dailyChartData}
              title={`Wastage by Day — ${selectedMeal === 'All' ? 'All Meals' : selectedMeal}`}
              height={320}
            />
          ) : (
            <WeeklyLineChart
              data={weeklyChartData}
              title="Weekly Consumption Efficiency"
              height={320}
            />
          )}

          {/* INSIGHTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: '📉 Waste Rate',
                value: totalWastage > 0 && (totalWastage + totalConsumed) > 0
                  ? `${((totalWastage / (totalWastage + totalConsumed)) * 100).toFixed(1)}%`
                  : '—',
                desc: 'Of total food prepared ends up as waste',
                color: 'text-orange-600', bg: 'bg-orange-50 border-orange-100',
              },
              {
                title: '⚠️ Highest Waste Day',
                value: worstDay,
                desc: 'Review menu choices and portion sizes on this day',
                color: 'text-red-600', bg: 'bg-red-50 border-red-100',
              },
              {
                title: '🏆 Best Efficiency Day',
                value: bestDay,
                desc: 'Lowest wastage — replicate this day\'s strategy',
                color: 'text-green-600', bg: 'bg-green-50 border-green-100',
              },
            ].map((insight) => (
              <div key={insight.title} className={`border rounded-2xl p-5 ${insight.bg}`}>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{insight.title}</p>
                <p className={`font-display font-bold text-2xl ${insight.color} mb-1`}>{insight.value}</p>
                <p className="text-xs text-gray-500">{insight.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
