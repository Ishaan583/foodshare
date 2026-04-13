// ============================================
// Mock Dashboard Data
// Summary statistics for the dashboard
// ============================================

export const summaryStats = [
  {
    id: 1,
    title: 'Total Food Saved',
    value: '2,840 kg',
    change: '+12% this week',
    positive: true,
    icon: '🥗',
    color: 'green',
  },
  {
    id: 2,
    title: 'Total Donations',
    value: '₹1,24,500',
    change: '+8% this month',
    positive: true,
    icon: '🤝',
    color: 'orange',
  },
  {
    id: 3,
    title: 'Waste Reduction',
    value: '67.4%',
    change: '+3.2% vs last month',
    positive: true,
    icon: '♻️',
    color: 'blue',
  },
  {
    id: 4,
    title: 'Meals Optimized',
    value: '18,320',
    change: '+520 this week',
    positive: true,
    icon: '🍽️',
    color: 'purple',
  },
];

// Weekly food wastage trend data for line chart
export const weeklyWastageTrend = [
  { day: 'Mon', wastage: 120, saved: 380 },
  { day: 'Tue', wastage: 98, saved: 402 },
  { day: 'Wed', wastage: 140, saved: 360 },
  { day: 'Thu', wastage: 85, saved: 415 },
  { day: 'Fri', wastage: 170, saved: 330 },
  { day: 'Sat', wastage: 60, saved: 440 },
  { day: 'Sun', wastage: 45, saved: 455 },
];

// Category-wise waste data for pie chart
export const categoryWaste = [
  { name: 'Breakfast', value: 22, color: '#f59e0b' },
  { name: 'Lunch', value: 38, color: '#22c55e' },
  { name: 'Hi-Tea', value: 14, color: '#f97316' },
  { name: 'Dinner', value: 26, color: '#3b82f6' },
];

// Recent activities for the dashboard feed
export const recentActivities = [
  {
    id: 1,
    type: 'donation',
    message: 'Hostel A donated 25 kg of rice to Akshaya Patra Foundation',
    time: '2 hours ago',
    icon: '🤝',
    color: 'green',
  },
  {
    id: 2,
    type: 'waste',
    message: 'Lunch wastage reduced by 18% compared to last Tuesday',
    time: '5 hours ago',
    icon: '📉',
    color: 'blue',
  },
  {
    id: 3,
    type: 'vote',
    message: 'Weekly menu voting closed — Biryani wins for Friday lunch!',
    time: '1 day ago',
    icon: '🗳️',
    color: 'orange',
  },
  {
    id: 4,
    type: 'ngo',
    message: 'NGO "Feeding India" picked up 60 kg from Central Kitchen',
    time: '1 day ago',
    icon: '🚛',
    color: 'purple',
  },
  {
    id: 5,
    type: 'alert',
    message: 'High wastage alert: Dinner on Thursday exceeded 150 kg threshold',
    time: '2 days ago',
    icon: '⚠️',
    color: 'red',
  },
];
