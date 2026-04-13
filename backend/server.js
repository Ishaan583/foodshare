const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // needed to parse POST body

const MessData = require("./models/MessData");
const Donation = require("./models/Donation");
const Vote = require("./models/Vote");

mongoose.connect("mongodb://127.0.0.1:27017/muj_sustainx")
.then(() => {
  console.log("DB Connected to LOCAL HOST!");

  // 🔥 START SERVER ONLY AFTER DB CONNECTS
  app.listen(5001, () => {
    console.log("Server running on 5001");
  });
})
.catch(err => console.log(err));

// ============================================
// ROOT
// ============================================
app.get("/", (req, res) => {
  res.send("API Running");
});

// ============================================
// GET /data — All raw mess records
// ============================================
app.get("/data", async (req, res) => {
  try {
    const data = await MessData.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// GET /wastage-by-day — Total wastage grouped by day
// Used by: Dashboard line chart, Statistics page
// ============================================
app.get("/wastage-by-day", async (req, res) => {
  try {
    const data = await MessData.aggregate([
      {
        $group: {
          _id: "$day",
          total_wastage: { $sum: "$wastage_qty_kg" },
          total_prepared: { $sum: "$prepared_qty_kg" },
          total_consumed: { $sum: "$consumed_qty_kg" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// GET /wastage-by-meal — Total wastage grouped by meal_type
// Used by: Dashboard pie chart
// ============================================
app.get("/wastage-by-meal", async (req, res) => {
  try {
    const data = await MessData.aggregate([
      {
        $group: {
          _id: "$meal_type",
          total_wastage: { $sum: "$wastage_qty_kg" },
        },
      },
      { $sort: { total_wastage: -1 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// GET /stats — Summary KPI cards
// Used by: Dashboard stat cards
// ============================================
app.get("/stats", async (req, res) => {
  try {
    const [totals] = await MessData.aggregate([
      {
        $group: {
          _id: null,
          total_prepared: { $sum: "$prepared_qty_kg" },
          total_consumed: { $sum: "$consumed_qty_kg" },
          total_wastage: { $sum: "$wastage_qty_kg" },
          total_footfall: { $sum: "$footfall" },
        },
      },
    ]);

    const foodSaved = totals.total_consumed;
    const wasteReduction =
      totals.total_prepared > 0
        ? (
            ((totals.total_prepared - totals.total_wastage) /
              totals.total_prepared) *
            100
          ).toFixed(1)
        : 0;

    res.json({
      totalFoodSaved: `${Math.round(foodSaved).toLocaleString()} kg`,
      totalDonations: `₹${(Math.round(foodSaved) * 45).toLocaleString()}`, // rough estimated value
      wasteReduction: `${wasteReduction}%`,
      mealsOptimized: Math.round(totals.total_footfall / 100).toLocaleString(),
      rawTotals: totals,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// GET /top-wasted-food — Top 5 most wasted items
// Used by: Recommendations page
// ============================================
app.get("/top-wasted-food", async (req, res) => {
  try {
    const data = await MessData.aggregate([
      {
        $group: {
          _id: "$menu_item",
          total_wastage: { $sum: "$wastage_qty_kg" },
          total_prepared: { $sum: "$prepared_qty_kg" },
        },
      },
      { $sort: { total_wastage: -1 } },
      { $limit: 10 },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// GET /recommendations — Least wasted items (good to serve)
// Used by: Recommendations page
// ============================================
app.get("/recommendations", async (req, res) => {
  try {
    const data = await MessData.aggregate([
      {
        $group: {
          _id: "$menu_item",
          avg_wastage: { $avg: "$wastage_qty_kg" },
          avg_prepared: { $avg: "$prepared_qty_kg" },
          avg_consumed: { $avg: "$consumed_qty_kg" },
          meal_type: { $first: "$meal_type" },
        },
      },
      { $sort: { avg_wastage: 1 } }, // lowest wastage first = best dishes
      { $limit: 8 },
    ]);

    // Compute "popularity" as consumed/prepared ratio
    const recommendations = data.map((item) => ({
      name: item._id,
      category: item.meal_type,
      popularity: item.avg_prepared > 0
        ? Math.round((item.avg_consumed / item.avg_prepared) * 100)
        : 0,
      wastageScore: Math.round(item.avg_wastage * 10) / 10,
    }));

    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const WeeklyMenu = require("./models/WeeklyMenu");

// ============================================
// ADMIN MENU CONTROLS
// ============================================

// POST /admin/menu — Admin sets 4 options for a day and meal
app.post("/admin/menu", async (req, res) => {
  try {
    const { day, meal_type, options } = req.body;
    
    if (!options || options.length !== 4) {
      return res.status(400).json({ error: "Exactly 4 options must be provided" });
    }

    // Upsert (update if exists, otherwise create)
    const menu = await WeeklyMenu.findOneAndUpdate(
      { day, meal_type },
      { options },
      { new: true, upsert: true }
    );
    res.status(200).json({ success: true, menu });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /admin/wastage — Admin logs daily wastage for a meal
app.post("/admin/wastage", async (req, res) => {
  try {
    const { day, meal_type, prepared_qty_kg, wastage_qty_kg } = req.body;
    
    if (prepared_qty_kg == null || wastage_qty_kg == null) {
      return res.status(400).json({ error: "Missing quantities" });
    }

    const consumed_qty_kg = Number(prepared_qty_kg) - Number(wastage_qty_kg);

    const newRecord = new MessData({
      day,
      mess_name: "Hostel A Mess",
      meal_type,
      menu_item: "Mixed Meal", // Admin level bulk entry
      footfall: Math.floor(Math.random() * 500) + 1500, // mock attendance
      prepared_qty_kg: Number(prepared_qty_kg),
      consumed_qty_kg: consumed_qty_kg,
      wastage_qty_kg: Number(wastage_qty_kg)
    });

    await newRecord.save();
    res.status(201).json({ success: true, record: newRecord });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// VOTING SYSTEM (STUDENTS)
// ============================================

// GET /menu — Returns the weekly menu strictly SET BY ADMIN
app.get("/menu", async (req, res) => {
  try {
    // Group all WeeklyMenu entries by day
    const allMenus = await WeeklyMenu.find({});
    
    // Format to match frontend: [{ day: "Monday", meals: { Breakfast: ["A","B","C","D"] } }]
    const formattedMap = {};
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    // Initialize empty structure
    days.forEach(d => {
      formattedMap[d] = {
        Breakfast: [], Lunch: [], "Hi-Tea": [], Dinner: []
      };
    });

    allMenus.forEach(record => {
      if (formattedMap[record.day]) {
        formattedMap[record.day][record.meal_type] = record.options;
      }
    });

    const result = days.map(day => ({
      day,
      meals: formattedMap[day]
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// GET /vote-counts — Current vote counts per item
// Used by: Voting System (live results)
// ============================================
app.get("/vote-counts", async (req, res) => {
  try {
    const votes = await Vote.aggregate([
      {
        $group: {
          _id: { day: "$day", meal: "$meal", dish: "$dish" },
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(votes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// POST /vote — Submit votes for a day
// Body: { day, votes: { Breakfast: "Poha", Lunch: "Dal Rice", ... } }
// ============================================
app.post("/vote", async (req, res) => {
  try {
    const { day, votes } = req.body;
    if (!day || !votes) return res.status(400).json({ error: "day and votes required" });

    const docs = Object.entries(votes).map(([meal, dish]) => ({ day, meal, dish }));
    await Vote.insertMany(docs);

    res.status(201).json({ message: "Votes submitted", count: docs.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// POST /donations — Submit a food donation
// ============================================
app.post("/donations", async (req, res) => {
  try {
    const donation = new Donation(req.body);
    const saved = await donation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// GET /donations — List all donations
// ============================================
app.get("/donations", async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 }).limit(50);
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// GET /wastage-by-day-meal — Breakdown per day per meal
// Used by: Statistics bar chart
// ============================================
app.get("/wastage-by-day-meal", async (req, res) => {
  try {
    const data = await MessData.aggregate([
      {
        $group: {
          _id: { day: "$day", meal_type: "$meal_type" },
          total_wastage: { $sum: "$wastage_qty_kg" },
          total_prepared: { $sum: "$prepared_qty_kg" },
          total_consumed: { $sum: "$consumed_qty_kg" },
        },
      },
      { $sort: { "_id.day": 1 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5001, () => console.log("Running on 5001"));