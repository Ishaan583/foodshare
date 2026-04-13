const mongoose = require("mongoose");
const MessData = require("./models/MessData");

mongoose.connect("mongodb://127.0.0.1:27017/muj_sustainx")
  .then(async () => {
    console.log("Connected to Local MongoDB. Seeding data...");
    await MessData.deleteMany({}); // clear old data

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const meals = ['Breakfast', 'Lunch', 'Hi-Tea', 'Dinner'];
    const dishes = {
      Breakfast: ['Poha', 'Idli', 'Upma', 'Paratha', 'Corn Flakes', 'Boiled Eggs'],
      Lunch: ['Dal Makhani', 'Rajma Rice', 'Paneer Butter Masala', 'Chole Bhature', 'Veg Biryani'],
      'Hi-Tea': ['Samosa', 'Bread Pakoda', 'Tea', 'Coffee', 'Biscuits'],
      Dinner: ['Chapati', 'Mix Veg', 'Dal Tadka', 'Chicken Curry', 'Egg Curry']
    };

    let fakeData = [];
    for (let day of days) {
      for (let meal of meals) {
        // pick 4 random dishes
        const mealDishes = [...dishes[meal]].sort(() => 0.5 - Math.random()).slice(0, 4);
        
        for (let dish of mealDishes) {
          const footfall = Math.floor(Math.random() * 2000) + 1000;
          const prepared = Math.floor(Math.random() * 150) + 50;
          const consumed = prepared - (Math.floor(Math.random() * 20) + 5);
          
          fakeData.push({
            day: day,
            mess_name: "Hostel A Mess",
            meal_type: meal,
            menu_item: dish,
            footfall: footfall,
            prepared_qty_kg: prepared,
            consumed_qty_kg: consumed,
            wastage_qty_kg: prepared - consumed
          });
        }
      }
    }

    await MessData.insertMany(fakeData);
    console.log(`Successfully seeded ${fakeData.length} records into local MongoDB!`);
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
