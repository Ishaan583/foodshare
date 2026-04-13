import React, { useState } from 'react';
import Button from '../components/Button';
import { submitAdminMenu, submitAdminWastage } from '../services/api';

const AdminMenu = () => {
  const [activeTab, setActiveTab] = useState('menu');

  // Menu State
  const [day, setDay] = useState('Monday');
  const [meal, setMeal] = useState('Breakfast');
  const [options, setOptions] = useState(['', '', '', '']);
  const [menuLoading, setMenuLoading] = useState(false);
  const [menuSuccess, setMenuSuccess] = useState(false);
  const [menuError, setMenuError] = useState(null);

  // Wastage State
  const [wasteDay, setWasteDay] = useState('Monday');
  const [wasteMeal, setWasteMeal] = useState('Breakfast');
  const [prepared, setPrepared] = useState('');
  const [wasted, setWasted] = useState('');
  const [wasteLoading, setWasteLoading] = useState(false);
  const [wasteSuccess, setWasteSuccess] = useState(false);
  const [wasteError, setWasteError] = useState(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const meals = ['Breakfast', 'Lunch', 'Hi-Tea', 'Dinner'];

  const handleMenuSave = async () => {
    if (options.some(opt => !opt.trim())) {
      setMenuError('Please fill out all 4 options');
      return;
    }
    setMenuLoading(true); setMenuError(null); setMenuSuccess(false);
    try {
      await submitAdminMenu({ day, meal_type: meal, options });
      setMenuSuccess(true);
    } catch (err) {
      setMenuError(err.message);
    } finally {
      setMenuLoading(false);
    }
  };

  const handleWastageSave = async () => {
    if (!prepared || !wasted || Number(prepared) < Number(wasted)) {
      setWasteError('Please enter valid quantities (Wasted cannot exceed Prepared)');
      return;
    }
    setWasteLoading(true); setWasteError(null); setWasteSuccess(false);
    try {
      await submitAdminWastage({
        day: wasteDay,
        meal_type: wasteMeal,
        prepared_qty_kg: Number(prepared),
        wastage_qty_kg: Number(wasted)
      });
      setWasteSuccess(true);
      setPrepared('');
      setWasted('');
    } catch (err) {
      setWasteError(err.message);
    } finally {
      setWasteLoading(false);
    }
  };

  return (
    <div className="page-container max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-3xl text-gray-900">Admin Setup</h1>
        <p className="text-gray-500 text-sm mt-1">
          Configure voting menus and log daily wastage to update live statistics.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-6">
        <button
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'menu' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('menu')}
        >
          📝 Set Student Menu
        </button>
        <button
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'wastage' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('wastage')}
        >
          🗑️ Log Daily Wastage
        </button>
      </div>

      {activeTab === 'menu' && (
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 sm:p-8 space-y-6 animate-fade-in">
          <h2 className="font-display font-semibold text-xl text-gray-800 mb-4">Set 4 Dish Choices</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
              <select value={day} onChange={(e) => { setDay(e.target.value); setMenuSuccess(false); }} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white">
                {days.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meal</label>
              <select value={meal} onChange={(e) => { setMeal(e.target.value); setMenuSuccess(false); }} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white">
                {meals.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 border-b pb-2">Provide exactly 4 food options:</label>
            {[0, 1, 2, 3].map(idx => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-500 shrink-0">{idx + 1}</span>
                <input type="text" value={options[idx]} onChange={(e) => { const n = [...options]; n[idx] = e.target.value; setOptions(n); setMenuSuccess(false); }} 
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
            ))}
          </div>

          {menuError && <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg">{menuError}</div>}
          {menuSuccess && <div className="text-green-600 text-sm font-medium bg-green-50 p-3 rounded-lg">✅ Menu saved for students!</div>}

          <div className="pt-4 border-t">
            <Button onClick={handleMenuSave} loading={menuLoading} variant="primary" fullWidth size="lg">Save Menu Choices</Button>
          </div>
        </div>
      )}

      {activeTab === 'wastage' && (
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 sm:p-8 space-y-6 animate-fade-in">
          <h2 className="font-display font-semibold text-xl text-gray-800 mb-4">Record Food Wastage</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
              <select value={wasteDay} onChange={(e) => setWasteDay(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white">
                {days.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meal</label>
              <select value={wasteMeal} onChange={(e) => setWasteMeal(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white">
                {meals.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Prepared (kg)</label>
              <input type="number" min="0" value={prepared} onChange={(e) => { setPrepared(e.target.value); setWasteSuccess(false); }} placeholder="e.g. 150"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Wasted (kg)</label>
              <input type="number" min="0" value={wasted} onChange={(e) => { setWasted(e.target.value); setWasteSuccess(false); }} placeholder="e.g. 20"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
          </div>

          {wasteError && <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg">{wasteError}</div>}
          {wasteSuccess && <div className="text-green-600 text-sm font-medium bg-green-50 p-3 rounded-lg">✅ Wastage successfully logged! The statistics page is updated live.</div>}

          <div className="pt-4 border-t">
            <Button onClick={handleWastageSave} loading={wasteLoading} variant="primary" fullWidth size="lg">Log Daily Wastage</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
