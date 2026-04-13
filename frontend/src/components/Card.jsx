import React from 'react';

// ============================================
// Reusable Card Component
// With multiple variants: default, stat, highlight, glass
// ============================================
const Card = ({
  children,
  className = '',
  variant = 'default',  // 'default' | 'stat' | 'glass' | 'highlight'
  hover = true,
  padding = 'p-6',
  onClick = null,
}) => {
  // Style map for each variant
  const variantStyles = {
    default: 'bg-white rounded-2xl shadow-card border border-gray-100',
    stat: 'bg-white rounded-2xl shadow-card border border-gray-100 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1',
    glass: 'bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-card',
    highlight: 'bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100 shadow-card',
  };

  const hoverStyle = hover && variant === 'default'
    ? 'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5'
    : '';

  const clickStyle = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`${variantStyles[variant]} ${hoverStyle} ${clickStyle} ${padding} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
