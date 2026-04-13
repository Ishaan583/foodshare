import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import Login from './pages/Login';
import './index.css';

// ============================================
// Root App Component
// Wraps the app with BrowserRouter, Navbar, content, and Footer
// ============================================
function App() {
  const [role, setRole] = React.useState(null);

  if (!role) {
    return <Login onLogin={setRole} />;
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Sticky top navigation */}
        <Navbar role={role} />

        {/* Main page content area */}
        <main className="flex-1">
          <AppRoutes role={role} />
        </main>

        {/* Site footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
