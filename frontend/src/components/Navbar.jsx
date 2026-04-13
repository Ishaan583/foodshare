import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';

// ============================================
// Navbar Component
// Responsive top navigation with mobile menu
// ============================================
const Navbar = ({ role }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Navigation links configuration
  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/statistics', label: 'Statistics', icon: '📈' },
    { to: '/vote', label: 'Vote', icon: '🗳️' },
    ...(role === 'admin' ? [{ to: '/admin', label: 'Admin Setup', icon: '⚙️' }] : []),
    { to: '/recommendations', label: 'Recommendations', icon: '⭐' },
    { to: '/donate', label: 'Donate', icon: '🤝' },
    { to: '/ngos', label: 'NGOs', icon: '🏢' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-green transition-transform group-hover:scale-110">
              <span className="text-white text-lg">🌿</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-gray-900 text-lg leading-tight">
                MUJ <span className="text-green-600">SustainX</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-green-50 text-green-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
                  }`
                }
              >
                <span className="text-xs">{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-700 font-medium">Live System</span>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-green-50 text-green-700 font-semibold border border-green-100'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <span>{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
            <div className="pt-2 border-t border-gray-100 mt-2">
              <div className="flex items-center gap-2 px-4 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-700 font-medium">Live System Active</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
