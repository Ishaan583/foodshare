import React from 'react';

// ============================================
// StatCard Component
// Displays a single KPI stat with icon, value, and trend
// ============================================
const StatCard = ({
  title,
  value,
  change,
  positive = true,
  icon,
  color = 'green',
}) => {
  // Color theme map for icon backgrounds
  const colorMap = {
    green: {
      bg: 'bg-green-100',
      icon: 'text-green-600',
      badge: 'bg-green-50 text-green-700',
      border: 'border-green-100',
    },
    orange: {
      bg: 'bg-orange-100',
      icon: 'text-orange-600',
      badge: 'bg-orange-50 text-orange-700',
      border: 'border-orange-100',
    },
    blue: {
      bg: 'bg-blue-100',
      icon: 'text-blue-600',
      badge: 'bg-blue-50 text-blue-700',
      border: 'border-blue-100',
    },
    purple: {
      bg: 'bg-purple-100',
      icon: 'text-purple-600',
      badge: 'bg-purple-50 text-purple-700',
      border: 'border-purple-100',
    },
  };

  const theme = colorMap[color] || colorMap.green;

  return (
    <div className={`bg-white rounded-2xl shadow-card border ${theme.border} p-6 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 animate-slide-up`}>
      {/* Icon and trend badge */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${theme.bg} rounded-xl flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        {change && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${theme.badge}`}>
            {positive ? '↑' : '↓'} {change}
          </span>
        )}
      </div>

      {/* Stats values */}
      <div>
        <p className="font-display font-bold text-2xl text-gray-900 mb-1">{value}</p>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
