import React, { useState } from 'react';
import Button from '../components/Button';
import { submitDonation } from '../services/api';
import { foodTypes, pickupSlots } from '../data/ngoData';

// ============================================
// Food Donation Page — POSTs to POST /donations (MongoDB)
// ============================================
const FoodDonation = () => {
  const [form, setForm] = useState({
    name: '', email: '', hostel: '', foodQuantity: '', quantityUnit: 'kg',
    foodType: '', pickupLocation: '', timeSlot: '', notes: '', agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [savedDonation, setSavedDonation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const hostelOptions = [
    'Hostel A (Boys)', 'Hostel B (Boys)', 'Hostel C (Boys)',
    'Hostel D (Girls)', 'Hostel E (Girls)',
    'Faculty Residence', 'Central Kitchen', 'Other',
  ];

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.hostel) e.hostel = 'Please select hostel/location';
    if (!form.foodQuantity || isNaN(form.foodQuantity) || Number(form.foodQuantity) <= 0) e.foodQuantity = 'Enter valid quantity';
    if (!form.foodType) e.foodType = 'Please select food type';
    if (!form.pickupLocation.trim()) e.pickupLocation = 'Pickup location is required';
    if (!form.timeSlot) e.timeSlot = 'Please select a time slot';
    if (!form.agreeTerms) e.agreeTerms = 'You must agree to the terms';
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    setApiError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }

    setLoading(true);
    try {
      const { agreeTerms, ...donationData } = form;
      // Submit to MongoDB via POST /donations
      const saved = await submitDonation({ ...donationData, foodQuantity: Number(donationData.foodQuantity) });
      console.log('✅ Donation saved to MongoDB:', saved);
      setSavedDonation(saved);
      setSubmitted(true);
    } catch (err) {
      setApiError('Failed to submit: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const FieldError = ({ field }) =>
    errors[field] ? <p className="text-red-500 text-xs mt-1">{errors[field]}</p> : null;

  if (submitted) {
    return (
      <div className="page-container flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
        <div className="bg-white rounded-3xl shadow-card border border-green-100 p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">🎉</div>
          <h2 className="font-display font-bold text-2xl text-gray-900 mb-3">Donation Saved!</h2>
          <p className="text-gray-500 mb-6">
            Your donation of <strong>{form.foodQuantity} {form.quantityUnit}</strong> of <strong>{form.foodType}</strong> has been recorded in our database.
            An NGO partner will contact you for pickup.
          </p>
          {savedDonation?._id && (
            <p className="text-xs text-gray-400 mb-4">Donation ID: <span className="font-mono text-gray-600">{savedDonation._id}</span></p>
          )}
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6 text-left text-sm space-y-2">
            <p><span className="text-gray-400">📍 Location:</span> <span className="font-medium">{form.pickupLocation}</span></p>
            <p><span className="text-gray-400">⏰ Time Slot:</span> <span className="font-medium">{form.timeSlot}</span></p>
            <p><span className="text-gray-400">📦 Type:</span> <span className="font-medium">{form.foodType}</span></p>
          </div>
          <Button variant="primary" fullWidth onClick={() => {
            setSubmitted(false); setSavedDonation(null);
            setForm({ name:'', email:'', hostel:'', foodQuantity:'', quantityUnit:'kg', foodType:'', pickupLocation:'', timeSlot:'', notes:'', agreeTerms:false });
          }}>
            Submit Another Donation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container space-y-8 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-3xl text-gray-900">Donate Food</h1>
        <p className="text-gray-500 text-sm mt-1">Submissions are saved to MongoDB and connected to NGO partners</p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: '🍱', value: '1,240', label: 'Donations This Month' },
          { icon: '🚛', value: '6', label: 'NGO Partners' },
          { icon: '👥', value: '8,600+', label: 'Meals Redistributed' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl shadow-card border border-gray-100 p-4 text-center">
            <span className="text-2xl">{stat.icon}</span>
            <p className="font-display font-bold text-xl text-gray-900 mt-1">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="max-w-2xl">
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 sm:p-8">
          <h2 className="font-display font-semibold text-lg text-gray-800 mb-6 flex items-center gap-2">
            <span>🤝</span> Donation Details
          </h2>

          {apiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              ⚠️ {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-400">*</span></label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Rahul Sharma"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.name ? 'border-red-300' : 'border-gray-200'}`} />
                <FieldError field="name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-400">*</span></label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@muj.edu.in"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.email ? 'border-red-300' : 'border-gray-200'}`} />
                <FieldError field="email" />
              </div>
            </div>

            {/* Hostel */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hostel / Building <span className="text-red-400">*</span></label>
              <select name="hostel" value={form.hostel} onChange={handleChange}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white ${errors.hostel ? 'border-red-300' : 'border-gray-200'}`}>
                <option value="">Select hostel/location</option>
                {hostelOptions.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
              <FieldError field="hostel" />
            </div>

            {/* Quantity + Unit */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Food Quantity <span className="text-red-400">*</span></label>
                <input name="foodQuantity" type="number" min="0.1" step="0.1" value={form.foodQuantity} onChange={handleChange} placeholder="e.g. 10"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.foodQuantity ? 'border-red-300' : 'border-gray-200'}`} />
                <FieldError field="foodQuantity" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <select name="quantityUnit" value={form.quantityUnit} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white">
                  <option value="kg">kg</option>
                  <option value="grams">grams</option>
                  <option value="plates">plates</option>
                  <option value="boxes">boxes</option>
                </select>
              </div>
            </div>

            {/* Food Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Food Type <span className="text-red-400">*</span></label>
              <select name="foodType" value={form.foodType} onChange={handleChange}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white ${errors.foodType ? 'border-red-300' : 'border-gray-200'}`}>
                <option value="">Select food type</option>
                {foodTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <FieldError field="foodType" />
            </div>

            {/* Pickup Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exact Pickup Location <span className="text-red-400">*</span></label>
              <input name="pickupLocation" value={form.pickupLocation} onChange={handleChange} placeholder="e.g. Hostel A Ground Floor Mess"
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.pickupLocation ? 'border-red-300' : 'border-gray-200'}`} />
              <FieldError field="pickupLocation" />
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Pickup Time <span className="text-red-400">*</span></label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {pickupSlots.map((slot) => (
                  <button key={slot} type="button"
                    onClick={() => { setForm((p) => ({ ...p, timeSlot: slot })); if (errors.timeSlot) setErrors((p) => ({ ...p, timeSlot: undefined })); }}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${form.timeSlot === slot ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-green-300'}`}>
                    {slot}
                  </button>
                ))}
              </div>
              <FieldError field="timeSlot" />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes <span className="text-gray-400 font-normal">(optional)</span></label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="e.g. Food is packed in containers, freshly cooked at 11 AM..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none" />
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} className="mt-0.5 w-4 h-4 accent-green-600" />
                <span className="text-sm text-gray-600">
                  I confirm the food is safe for consumption and stored hygienically. I agree to the{' '}
                  <span className="text-green-600 font-medium">MUJ SustainX donation guidelines</span>.
                </span>
              </label>
              <FieldError field="agreeTerms" />
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} icon="🤝">
              Submit & Save to Database
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FoodDonation;
