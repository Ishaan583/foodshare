import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import { WastageLineChart, CategoryPieChart } from '../components/ChartWrapper';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { fetchStats, fetchWastageByDay, fetchWastageByMeal } from '../services/api';

// Day ordering for chart axis
const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAY_SHORT = { Monday:'Mon', Tuesday:'Tue', Wednesday:'Wed', Thursday:'Thu', Friday:'Fri', Saturday:'Sat', Sunday:'Sun' };

// Pie chart colors per meal
const MEAL_COLORS = { Breakfast:'#f59e0b', Lunch:'#22c55e', 'Hi-Tea':'#f97316', Dinner:'#3b82f6' };

// ============================================
// Dashboard Page — connected to MongoDB via /stats, /wastage-by-day, /wastage-by-meal
// ============================================
const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        // Fetch all three endpoints in parallel
        const [statsRes, byDayRes, byMealRes] = await Promise.all([
          fetchStats(),
          fetchWastageByDay(),
          fetchWastageByMeal(),
        ]);

        setStats(statsRes);

        // Shape wastage-by-day → chart format
        const sorted = [...byDayRes].sort(
          (a, b) => DAY_ORDER.indexOf(a._id) - DAY_ORDER.indexOf(b._id)
        );
        setLineData(
          sorted.map((d) => ({
            day: DAY_SHORT[d._id] || d._id,
            wastage: Math.round(d.total_wastage),
            saved: Math.round(d.total_consumed),
          }))
        );

        // Shape wastage-by-meal → pie format
        setPieData(
          byMealRes.map((m) => ({
            name: m._id,
            value: Math.round(m.total_wastage),
            color: MEAL_COLORS[m._id] || '#94a3b8',
          }))
        );
      } catch (err) {
        console.error('Dashboard load error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Build stat cards from API response
  const summaryCards = stats
    ? [
        { id: 1, title: 'Total Food Saved', value: stats.totalFoodSaved, change: '+12% this week', positive: true, icon: '🥗', color: 'green' },
        { id: 2, title: 'Total Donations (Est.)', value: stats.totalDonations, change: '+8% this month', positive: true, icon: '🤝', color: 'orange' },
        { id: 3, title: 'Waste Reduction', value: stats.wasteReduction, change: '+3.2% vs last month', positive: true, icon: '♻️', color: 'blue' },
        { id: 4, title: 'Meals Optimized', value: stats.mealsOptimized, change: '+520 this week', positive: true, icon: '🍽️', color: 'purple' },
      ]
    : [];

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="page-container flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <span className="text-5xl">⚠️</span>
          <p className="mt-4 font-display font-bold text-xl text-gray-800">Could not load data</p>
          <p className="text-sm text-gray-500 mt-2">{error}</p>
          <p className="text-xs text-gray-400 mt-1">Make sure your backend is running on localhost:5001</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container space-y-8 animate-fade-in">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            📍 MUJ Campus • Last updated:{' '}
            <span className="font-medium text-gray-700">
              {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-xl self-start">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-green-700">Live from MongoDB</span>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {summaryCards.map((stat) => (
          <StatCard key={stat.id} title={stat.title} value={stat.value}
            change={stat.change} positive={stat.positive} icon={stat.icon} color={stat.color} />
        ))}
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <WastageLineChart data={lineData} title="Weekly Wastage vs Consumption" height={280} />
        </div>
        <div className="lg:col-span-2">
          <CategoryPieChart
            data={pieData}
            title="Waste by Meal Type"
            height={220}
          />
        </div>
      </div>

      {/* QUICK METRICS */}
      {stats?.rawTotals && (
        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Prepared', value: `${Math.round(stats.rawTotals.total_prepared).toLocaleString()} kg`, icon: '🍳' },
              { label: 'Total Consumed', value: `${Math.round(stats.rawTotals.total_consumed).toLocaleString()} kg`, icon: '✅' },
              { label: 'Total Wastage', value: `${Math.round(stats.rawTotals.total_wastage).toLocaleString()} kg`, icon: '⚠️' },
              { label: 'Total Footfall', value: stats.rawTotals.total_footfall.toLocaleString(), icon: '👥' },
            ].map((m) => (
              <div key={m.label} className="text-center">
                <span className="text-2xl">{m.icon}</span>
                <p className="font-display font-bold text-xl text-white mt-1">{m.value}</p>
                <p className="text-green-200 text-xs">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-center text-xs text-gray-400 pb-2">
        Data pulled live from MongoDB · MUJ SustainX v1.0
      </p>
    </div>
  );
};

export default Dashboard;
