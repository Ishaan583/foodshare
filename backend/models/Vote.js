const mongoose = require("mongoose");

// ============================================
// Vote Model
// Stores individual vote records (one per meal per day)
// ============================================
const voteSchema = new mongoose.Schema(
  {
    day: { type: String, required: true },   // e.g. "Monday"
    meal: { type: String, required: true },  // e.g. "Breakfast"
    dish: { type: String, required: true },  // e.g. "Poha"
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vote", voteSchema, "votes");
