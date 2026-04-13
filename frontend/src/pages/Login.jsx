import React, { useState } from 'react';
import Button from '../components/Button';

const Login = ({ onLogin }) => {
  const [role, setRole] = useState('student');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'admin') {
      if (passcode === 'admin123') {
        onLogin('admin');
      } else {
        setError('Incorrect Admin Passcode (Hint: admin123)');
      }
    } else {
      onLogin('student');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-card border border-green-100 max-w-sm w-full text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mx-auto flex items-center justify-center mb-6">
          <span className="text-3xl">🌿</span>
        </div>
        <h1 className="font-display font-bold text-2xl text-gray-900 mb-2">MUJ SustainX</h1>
        <p className="text-gray-500 text-sm mb-8">Sign in to continue</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${role === 'student' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => { setRole('student'); setError(''); }}
            >
              Student (Voter)
            </button>
            <button
              type="button"
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${role === 'admin' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => { setRole('admin'); setError(''); }}
            >
              Admin
            </button>
          </div>

          {role === 'admin' && (
            <div className="text-left animate-fade-in">
              <label className="block text-sm font-medium text-gray-700 mb-1">Admin Passcode</label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => { setPasscode(e.target.value); setError(''); }}
                placeholder="Enter passcode"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
          )}

          <Button type="submit" variant="primary" fullWidth size="lg">
            {role === 'admin' ? 'Login as Admin' : 'Continue as Student'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
