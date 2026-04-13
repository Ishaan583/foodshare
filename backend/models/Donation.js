const mongoose = require("mongoose");

// ============================================
// Donation Model
// Stores food donation form submissions
// ============================================
const donationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    hostel: { type: String, required: true },
    foodQuantity: { type: Number, required: true },
    quantityUnit: { type: String, default: "kg" },
    foodType: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    timeSlot: { type: String, required: true },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema, "donations");
