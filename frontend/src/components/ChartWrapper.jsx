import React from 'react';
import {
  LineChart, Line,
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

// ============================================
// ChartWrapper Component
// Wraps Recharts charts with a consistent card UI
// ============================================

// Line/Area Chart
export const WastageLineChart = ({ data, title = 'Weekly Wastage Trend', height = 280 }) => (
  <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
    <h3 className="font-display font-semibold text-gray-800 mb-1">{title}</h3>
    <p className="text-xs text-gray-400 mb-5">Kilograms of food tracked daily</p>
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <defs>
          {/* Gradient fill for saved area */}
          <linearGradient id="savedGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
          {/* Gradient fill for wastage area */}
          <linearGradient id="wastageGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
          labelStyle={{ fontWeight: 600, color: '#374151' }}
        />
        <Legend iconType="circle" iconSize={8} />
        <Area type="monotone" dataKey="saved" stroke="#22c55e" strokeWidth={2.5} fill="url(#savedGradient)" name="Food Saved (kg)" />
        <Area type="monotone" dataKey="wastage" stroke="#f97316" strokeWidth={2.5} fill="url(#wastageGradient)" name="Wastage (kg)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

// Pie Chart
export const CategoryPieChart = ({ data, title = 'Category-wise Waste', height = 280 }) => {
  const RADIAN = Math.PI / 180;

  // Custom label rendered inside pie slices
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
      <h3 className="font-display font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-xs text-gray-400 mb-5">Distribution by meal type</p>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
              labelLine={false}
              label={renderLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}%`, 'Waste Share']}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Legend */}
        <div className="flex flex-col gap-2 min-w-max">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-gray-600">{item.name}</span>
              <span className="text-sm font-semibold text-gray-800 ml-auto pl-4">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Bar Chart for statistics page
export const WasteBarChart = ({ data, title = 'Daily Waste Breakdown', height = 300 }) => (
  <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
    <h3 className="font-display font-semibold text-gray-800 mb-1">{title}</h3>
    <p className="text-xs text-gray-400 mb-5">Kilograms per meal per day</p>
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }} barSize={8} barGap={2}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false}
          tickFormatter={(v) => v.slice(8)} />
        <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
        />
        <Legend iconType="circle" iconSize={8} />
        <Bar dataKey="Breakfast" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Breakfast" />
        <Bar dataKey="Lunch" fill="#22c55e" radius={[4, 4, 0, 0]} name="Lunch" />
        <Bar dataKey="HiTea" fill="#f97316" radius={[4, 4, 0, 0]} name="Hi-Tea" />
        <Bar dataKey="Dinner" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Dinner" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// Weekly Line Chart for Statistics page
export const WeeklyLineChart = ({ data, title = 'Weekly Efficiency Trend', height = 300 }) => (
  <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
    <h3 className="font-display font-semibold text-gray-800 mb-1">{title}</h3>
    <p className="text-xs text-gray-400 mb-5">Total waste vs saved food (kg)</p>
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
        />
        <Legend iconType="circle" iconSize={8} />
        <Line type="monotone" dataKey="totalWaste" stroke="#f97316" strokeWidth={2.5} dot={{ r: 4, fill: '#f97316' }} name="Total Waste (kg)" />
        <Line type="monotone" dataKey="saved" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 4, fill: '#22c55e' }} name="Saved (kg)" />
        <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6' }} strokeDasharray="5 3" name="Efficiency %" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default WastageLineChart;
