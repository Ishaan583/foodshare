import React from 'react';
import { Link } from 'react-router-dom';

// ============================================
// Footer Component
// Site-wide footer with links and social icons
// ============================================
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/statistics', label: 'Statistics' },
    { to: '/vote', label: 'Vote Menu' },
    { to: '/recommendations', label: 'Recommendations' },
    { to: '/donate', label: 'Donate Food' },
    { to: '/ngos', label: 'NGO Partners' },
  ];

  const socialLinks = [
    { icon: '🌐', label: 'Website', href: '#' },
    { icon: '📧', label: 'Email', href: 'mailto:sustainx@muj.edu.in' },
    { icon: '📱', label: 'Instagram', href: '#' },
    { icon: '💼', label: 'LinkedIn', href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">🌿</span>
              </div>
              <span className="font-display font-bold text-xl">
                MUJ <span className="text-green-400">SustainX</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-xs">
              Smart Food Resource Optimization & Redistribution Platform for Malaviya University of Technology, Jaipur. 
              Building a zero-waste campus community, one meal at a time.
            </p>
            <div className="flex flex-wrap gap-2">
              {['SDG 2: Zero Hunger', 'SDG 12: Responsible Consumption', 'SDG 13: Climate Action'].map((badge) => (
                <span key={badge} className="text-xs bg-green-900/50 text-green-400 border border-green-800 px-2 py-1 rounded-full">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-green-400 text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contact Us
            </h3>
            <div className="space-y-3 mb-6">
              <p className="text-gray-400 text-sm">📍 MUJ Campus, Jaipur, Rajasthan 302017</p>
              <p className="text-gray-400 text-sm">📧 sustainx@muj.edu.in</p>
              <p className="text-gray-400 text-sm">📞 +91 141 271 5071</p>
            </div>
            <h3 className="font-display font-semibold text-white mb-3 text-sm uppercase tracking-wider">
              Social
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  title={social.label}
                  className="w-9 h-9 bg-gray-800 hover:bg-green-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <span className="text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">
            © {currentYear} MUJ SustainX. Built with 💚 for a sustainable campus.
          </p>
          <p className="text-gray-600 text-xs">
            Powered by MUJ CSE Innovation Lab
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
