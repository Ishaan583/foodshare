// ============================================
// api.js — Centralized API service layer
// All backend calls go through here.
// Base URL: http://localhost:5001
// ============================================

import { summaryStats, weeklyWastageTrend, categoryWaste } from '../data/dashboardData';
import { dailyWasteData, weeklyWasteData } from '../data/statsData';
import { weeklyMenu } from '../data/menuData';
import { recommendedDishes } from '../data/recommendationsData';

const BASE_URL = "http://localhost:5001";

// Helper: fetch with error handling and automatic mock fallback!
const apiFetch = async (path, options = {}, mockFallback = null) => {
  try {
    const res = await fetch(`${BASE_URL}${path}`, options);
    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    if (mockFallback) {
      console.warn(`Backend is offline/failing (${path}). Falling back to mock data...`);
      return mockFallback;
    }
    throw err;
  }
};

// ============================================
// DASHBOARD
// ============================================

export const fetchStats = () => apiFetch("/stats", {}, {
  totalFoodSaved: summaryStats[0].value,
  totalDonations: summaryStats[1].value,
  wasteReduction: summaryStats[2].value,
  mealsOptimized: summaryStats[3].value,
  rawTotals: { total_prepared: 232000, total_consumed: 206000, total_wastage: 26000, total_footfall: 57000 }
});

export const fetchWastageByDay = () => apiFetch("/wastage-by-day", {}, 
  weeklyWastageTrend.map(d => ({
    _id: d.day,
    total_wastage: d.wastage,
    total_consumed: d.saved,
    total_prepared: d.wastage + d.saved
  }))
);

export const fetchWastageByMeal = () => apiFetch("/wastage-by-meal", {}, 
  categoryWaste.map(m => ({ _id: m.name, total_wastage: m.value }))
);

// ============================================
// STATISTICS
// ============================================

export const fetchWastageByDayMeal = () => apiFetch("/wastage-by-day-meal", {}, 
  weeklyWastageTrend.flatMap(d => 
    ["Breakfast", "Lunch", "Hi-Tea", "Dinner"].map(meal => ({
      _id: { day: d.day, meal_type: meal },
      total_wastage: d.wastage / 4,
      total_prepared: 1000,
      total_consumed: 800
    }))
  )
);

// ============================================
// MENU & VOTING
// ============================================

export const fetchMenu = () => apiFetch("/menu", {}, weeklyMenu);

export const fetchVoteCounts = () => apiFetch("/vote-counts", {}, []);

export const submitVotes = (day, votes) => apiFetch("/vote", {
  method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ day, votes }),
}, { success: true });

export const submitAdminMenu = (menuData) => apiFetch("/admin/menu", {
  method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify(menuData)
});

export const submitAdminWastage = (wastageData) => apiFetch("/admin/wastage", {
  method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify(wastageData)
});

// ============================================
// RECOMMENDATIONS
// ============================================

export const fetchRecommendations = () => apiFetch("/recommendations", {}, recommendedDishes);

export const fetchTopWasted = () => apiFetch("/top-wasted-food", {}, [
  { _id: 'Sambar', total_wastage: 543 },
  { _id: 'Dal Makhani', total_wastage: 489 },
  { _id: 'Chapati', total_wastage: 320 }
]);

// ============================================
// DONATIONS
// ============================================

export const submitDonation = (formData) => apiFetch("/donations", {
  method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
}, { _id: "mock-id-123", ...formData });

export const fetchDonations = () => apiFetch("/donations", {}, []);
