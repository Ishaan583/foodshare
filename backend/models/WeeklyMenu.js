const mongoose = require("mongoose");

const WeeklyMenuSchema = new mongoose.Schema({
  day: { type: String, required: true }, // e.g. "Monday"
  meal_type: { type: String, required: true }, // e.g. "Lunch"
  options: [{ type: String, required: true }] // exactly 4 items
});

// Compound index to ensure only one menu per day-meal combination
WeeklyMenuSchema.index({ day: 1, meal_type: 1 }, { unique: true });

module.exports = mongoose.model("WeeklyMenu", WeeklyMenuSchema);
