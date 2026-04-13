import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

// ============================================
// Landing Page
// Hero section with project intro and CTA buttons
// ============================================
const Landing = () => {
  // Stats displayed in the hero section
  const heroStats = [
    { value: '2,840 kg', label: 'Food Saved' },
    { value: '18,320', label: 'Meals Optimized' },
    { value: '67.4%', label: 'Waste Reduced' },
    { value: '6 NGOs', label: 'Partner NGOs' },
  ];

  // Feature cards data
  const features = [
    {
      icon: '📊',
      title: 'Smart Analytics',
      desc: 'Real-time wastage tracking and trend analysis to identify patterns and optimize food production.',
      color: 'bg-green-50 border-green-100',
      iconBg: 'bg-green-100',
    },
    {
      icon: '🗳️',
      title: 'Democratic Menu Voting',
      desc: 'Students vote on weekly menus, ensuring popular and less-wasteful dishes are served.',
      color: 'bg-amber-50 border-amber-100',
      iconBg: 'bg-amber-100',
    },
    {
      icon: '🤝',
      title: 'Food Donation Network',
      desc: 'Seamlessly connect surplus campus food with verified NGOs and communities in need.',
      color: 'bg-orange-50 border-orange-100',
      iconBg: 'bg-orange-100',
    },
    {
      icon: '🤖',
      title: 'AI Recommendations',
      desc: 'Data-driven dish recommendations based on voting patterns and historical wastage scores.',
      color: 'bg-blue-50 border-blue-100',
      iconBg: 'bg-blue-100',
    },
    {
      icon: '🏢',
      title: 'NGO Connect',
      desc: 'Browse and connect with verified NGO partners for quick and efficient food redistribution.',
      color: 'bg-purple-50 border-purple-100',
      iconBg: 'bg-purple-100',
    },
    {
      icon: '♻️',
      title: 'Zero Waste Mission',
      desc: 'Aligned with UN SDG 12 & 2, committed to eliminating campus food waste by 2026.',
      color: 'bg-teal-50 border-teal-100',
      iconBg: 'bg-teal-100',
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'B.Tech CSE, 3rd Year',
      quote: 'SustainX helped us reduce hostel food waste by 40% in just two months!',
      avatar: '👩‍💻',
    },
    {
      name: 'Dr. Rakesh Meena',
      role: 'Dean, Student Affairs',
      quote: 'A landmark student initiative. The data-driven approach to campus sustainability is commendable.',
      avatar: '👨‍🏫',
    },
    {
      name: 'Ankit Gupta',
      role: 'Mess Manager, Hostel A',
      quote: 'The voting system lets us plan efficiently. We now cook 25% less excess food each week.',
      avatar: '👨‍🍳',
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* =========================================
          HERO SECTION
          ========================================= */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-green-700">
          {/* Decorative circles */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-600/10 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-green-700/50 border border-green-500/40 text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              MUJ Campus Initiative • Jaipur, Rajasthan
            </div>

            {/* Main Heading */}
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6">
              MUJ{' '}
              <span className="text-green-400">SustainX</span>
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl text-green-100/90 font-light mb-4 leading-relaxed">
              Smart Consumption for a{' '}
              <span className="text-amber-300 font-medium">Sustainable Campus</span>
            </p>
            <p className="text-base text-green-200/70 mb-10 max-w-xl leading-relaxed">
              Leveraging data, community voting, and NGO partnerships to eliminate food waste 
              and ensure every meal matters at Malaviya University of Technology.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-14">
              <Link to="/dashboard">
                <Button variant="secondary" size="lg" icon="📊">
                  Explore Dashboard
                </Button>
              </Link>
              <Link to="/vote">
                <Button
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20"
                  icon="🗳️"
                >
                  Vote This Week
                </Button>
              </Link>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-4 text-center"
                >
                  <p className="font-display font-bold text-2xl text-white">{stat.value}</p>
                  <p className="text-green-300 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 animate-bounce">
          <span className="text-xs">Scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* =========================================
          SDG BANNER
          ========================================= */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-8 text-white text-sm font-medium">
          {[
            { icon: '🎯', label: 'SDG 2: Zero Hunger' },
            { icon: '♻️', label: 'SDG 12: Responsible Consumption' },
            { icon: '🌡️', label: 'SDG 13: Climate Action' },
            { icon: '🤝', label: 'SDG 17: Partnerships' },
          ].map((sdg) => (
            <div key={sdg.label} className="flex items-center gap-2">
              <span>{sdg.icon}</span>
              <span className="text-green-100">{sdg.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          FEATURES SECTION
          ========================================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl text-gray-900 mb-4">
              Built for{' '}
              <span className="text-gradient">Sustainability</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Six powerful features working together to create a zero-waste campus ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`border rounded-2xl p-6 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 animate-slide-up ${feature.color}`}
              >
                <div className={`w-14 h-14 ${feature.iconBg} rounded-2xl flex items-center justify-center text-2xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          HOW IT WORKS
          ========================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-500 text-lg">Simple steps to make campus dining smarter</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-8 left-1/8 right-1/8 h-0.5 bg-gradient-to-r from-green-300 to-green-500 z-0" style={{ left: '12.5%', right: '12.5%' }} />

            {[
              { step: '01', icon: '🗳️', title: 'Students Vote', desc: 'Choose preferred dishes from structured weekly menu options' },
              { step: '02', icon: '🤖', title: 'AI Analyzes', desc: 'System predicts optimal quantities based on votes and history' },
              { step: '03', icon: '👨‍🍳', title: 'Mess Prepares', desc: 'Kitchen prepares right amounts, minimizing over-cooking' },
              { step: '04', icon: '🤝', title: 'Surplus Donated', desc: 'Remaining food is donated to NGO partners same day' },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-green">
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-green-500 mb-1">STEP {item.step}</span>
                <h3 className="font-display font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          TESTIMONIALS
          ========================================= */}
      <section className="py-20 bg-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl text-white mb-4">
              What the Community Says
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-green-800/60 backdrop-blur-sm border border-green-700/50 rounded-2xl p-6">
                <div className="text-4xl mb-4">{t.avatar}</div>
                <p className="text-green-100 text-sm leading-relaxed mb-4 italic">"{t.quote}"</p>
                <div>
                  <p className="text-white font-semibold">{t.name}</p>
                  <p className="text-green-400 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          CTA SECTION
          ========================================= */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-green-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-4xl text-gray-900 mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Join thousands of MUJ students already contributing to a sustainable campus
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/dashboard">
              <Button variant="primary" size="lg" icon="📊">
                View Dashboard
              </Button>
            </Link>
            <Link to="/vote">
              <Button variant="outline" size="lg" icon="🗳️">
                Start Voting
              </Button>
            </Link>
            <Link to="/donate">
              <Button variant="secondary" size="lg" icon="🤝">
                Donate Food
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
