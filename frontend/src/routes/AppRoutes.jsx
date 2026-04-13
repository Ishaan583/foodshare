import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import all page components
import Landing from '../pages/Landing';
import Dashboard from '../pages/Dashboard';
import Statistics from '../pages/Statistics';
import VotingSystem from '../pages/VotingSystem';
import Recommendations from '../pages/Recommendations';
import FoodDonation from '../pages/FoodDonation';
import NGOListing from '../pages/NGOListing';
import AdminMenu from '../pages/AdminMenu';

// ============================================
// AppRoutes Component
// Central routing configuration for the app
// ============================================
const AppRoutes = ({ role }) => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/statistics" element={<Statistics />} />
      
      {/* Both can see these, but Admin has the special setup page */}
      <Route path="/vote" element={<VotingSystem role={role} />} />
      {role === 'admin' && <Route path="/admin" element={<AdminMenu />} />}

      <Route path="/recommendations" element={<Recommendations />} />
      <Route path="/donate" element={<FoodDonation />} />
      <Route path="/ngos" element={<NGOListing />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
