import React from 'react';

// ============================================
// LoadingSkeleton Component
// Animated placeholder skeletons for loading states
// ============================================

// Single skeleton bar
export const SkeletonBar = ({ className = '', width = 'w-full', height = 'h-4' }) => (
  <div className={`${width} ${height} rounded-lg skeleton ${className}`} />
);

// Stat card skeleton
export const StatCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 rounded-xl skeleton" />
      <div className="w-16 h-5 rounded-full skeleton" />
    </div>
    <div className="space-y-2">
      <div className="w-3/4 h-7 rounded skeleton" />
      <div className="w-1/2 h-4 rounded skeleton" />
    </div>
  </div>
);

// Chart skeleton
export const ChartSkeleton = ({ height = 'h-64' }) => (
  <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
    <div className="w-1/3 h-5 rounded skeleton mb-2" />
    <div className="w-40 h-4 rounded skeleton mb-6" />
    <div className={`${height} rounded-xl skeleton`} />
  </div>
);

// Activity row skeleton
export const ActivitySkeleton = () => (
  <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100">
    <div className="w-10 h-10 rounded-full skeleton flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="w-4/5 h-4 rounded skeleton" />
      <div className="w-1/4 h-3 rounded skeleton" />
    </div>
  </div>
);

// Card grid skeleton (used for recommendation cards)
export const CardGridSkeleton = ({ count = 4 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
        <div className="h-40 skeleton" />
        <div className="p-4 space-y-2">
          <div className="w-3/4 h-5 rounded skeleton" />
          <div className="w-1/2 h-4 rounded skeleton" />
          <div className="w-full h-3 rounded-full skeleton mt-3" />
        </div>
      </div>
    ))}
  </div>
);

// Default export: full dashboard skeleton
const LoadingSkeleton = () => (
  <div className="page-container space-y-6 animate-fade-in">
    {/* Stats row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => <StatCardSkeleton key={i} />)}
    </div>
    {/* Chart row */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartSkeleton height="h-72" />
      <ChartSkeleton height="h-72" />
    </div>
    {/* Activity row */}
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
      <div className="w-40 h-5 rounded skeleton mb-4" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => <ActivitySkeleton key={i} />)}
      </div>
    </div>
  </div>
);

export default LoadingSkeleton;
