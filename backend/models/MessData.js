const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  day: String,
  mess_name: String, // 🔥 ADD THIS
  meal_type: String,
  menu_item: String,
  footfall: Number,
  prepared_qty_kg: Number,
  consumed_qty_kg: Number,
  wastage_qty_kg: Number
});

// 🔥 FORCE correct collection
module.exports = mongoose.model("MessData", schema, "mess_data");