import React from 'react';

// ============================================
// Reusable Button Component
// Supports multiple variants, sizes, and states
// ============================================
const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',     // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size = 'md',             // 'sm' | 'md' | 'lg'
  disabled = false,
  loading = false,
  icon = null,             // Optional leading icon (emoji or JSX)
  fullWidth = false,
  className = '',
}) => {
  // Variant style map
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 shadow-green hover:shadow-lg',
    secondary:
      'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-lg',
    outline:
      'border-2 border-green-600 text-green-600 hover:bg-green-50 bg-white',
    ghost:
      'text-gray-600 hover:bg-gray-100 hover:text-green-600',
    danger:
      'bg-red-500 text-white hover:bg-red-600 shadow-md',
  };

  // Size style map
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-5 py-2.5 text-sm rounded-xl',
    lg: 'px-7 py-3.5 text-base rounded-xl',
  };

  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium font-sans transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 select-none';

  const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled || loading ? disabledStyles : 'cursor-pointer'}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {/* Loading spinner */}
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor" strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {/* Optional icon */}
      {!loading && icon && <span className="text-base">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
