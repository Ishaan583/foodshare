// ============================================
// Food Statistics Mock Data
// Used in the Food Statistics page for charts and filters
// ============================================

// Daily wastage data (used for daily trend chart)
export const dailyWasteData = [
  { date: '2024-04-01', Breakfast: 18, Lunch: 42, HiTea: 12, Dinner: 35 },
  { date: '2024-04-02', Breakfast: 22, Lunch: 38, HiTea: 10, Dinner: 29 },
  { date: '2024-04-03', Breakfast: 15, Lunch: 55, HiTea: 18, Dinner: 44 },
  { date: '2024-04-04', Breakfast: 20, Lunch: 34, HiTea: 8,  Dinner: 31 },
  { date: '2024-04-05', Breakfast: 30, Lunch: 68, HiTea: 22, Dinner: 50 },
  { date: '2024-04-06', Breakfast: 12, Lunch: 28, HiTea: 14, Dinner: 24 },
  { date: '2024-04-07', Breakfast: 10, Lunch: 22, HiTea: 9,  Dinner: 18 },
  { date: '2024-04-08', Breakfast: 25, Lunch: 46, HiTea: 16, Dinner: 38 },
  { date: '2024-04-09', Breakfast: 19, Lunch: 39, HiTea: 11, Dinner: 33 },
  { date: '2024-04-10', Breakfast: 27, Lunch: 52, HiTea: 20, Dinner: 45 },
  { date: '2024-04-11', Breakfast: 14, Lunch: 31, HiTea: 9,  Dinner: 27 },
  { date: '2024-04-12', Breakfast: 21, Lunch: 44, HiTea: 15, Dinner: 36 },
];

// Weekly wastage aggregated (used for weekly trend chart)
export const weeklyWasteData = [
  { week: 'Week 1', totalWaste: 480, saved: 1120, efficiency: 70 },
  { week: 'Week 2', totalWaste: 420, saved: 1180, efficiency: 74 },
  { week: 'Week 3', totalWaste: 390, saved: 1210, efficiency: 76 },
  { week: 'Week 4', totalWaste: 350, saved: 1250, efficiency: 78 },
  { week: 'Week 5', totalWaste: 310, saved: 1290, efficiency: 81 },
  { week: 'Week 6', totalWaste: 280, saved: 1320, efficiency: 83 },
];

// Meal type options for filter dropdown
export const mealTypes = ['All', 'Breakfast', 'Lunch', 'Hi-Tea', 'Dinner'];

// Metric summary for stats bar
export const wasteMetrics = [
  { label: 'Avg Daily Waste', value: '127 kg', icon: '📊' },
  { label: 'Best Day', value: 'Sunday', icon: '🏆' },
  { label: 'Worst Day', value: 'Friday', icon: '⚠️' },
  { label: 'This Month Saved', value: '3,210 kg', icon: '♻️' },
];
