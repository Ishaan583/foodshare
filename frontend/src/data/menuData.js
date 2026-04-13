// ============================================
// Weekly Menu & Voting Data
// Predefined dish options for each meal per day
// ============================================

// The full weekly menu with 4 options per meal per day
export const weeklyMenu = [
  {
    day: 'Monday',
    meals: {
      Breakfast: ['Poha', 'Sandwich', 'Idli', 'Paratha'],
      Lunch: ['Dal Rice', 'Paneer Butter Masala', 'Rajma Chawal', 'Veg Biryani'],
      'Hi-Tea': ['Samosa', 'Maggi', 'Butter Cookies', 'Veg Sandwich'],
      Dinner: ['Roti Sabzi', 'Pasta Arabiata', 'Khichdi', 'Hakka Noodles'],
    },
  },
  {
    day: 'Tuesday',
    meals: {
      Breakfast: ['Upma', 'Bread Omelette', 'Dosa', 'Stuffed Paratha'],
      Lunch: ['Chole Bhature', 'Matar Paneer', 'Kadhi Chawal', 'Pulao'],
      'Hi-Tea': ['Bread Pakora', 'Cold Coffee', 'Banana Chips', 'Spring Rolls'],
      Dinner: ['Dal Makhani + Roti', 'Fried Rice', 'Veg Stew', 'Chowmein'],
    },
  },
  {
    day: 'Wednesday',
    meals: {
      Breakfast: ['Poori Bhaji', 'Corn Flakes', 'Vada', 'Aloo Paratha'],
      Lunch: ['Bhindi Fry + Roti', 'Shahi Paneer', 'Moong Dal', 'Tahri'],
      'Hi-Tea': ['Kachori', 'Chai + Biscuits', 'Patties', 'Fruit Salad'],
      Dinner: ['Pav Bhaji', 'Pasta Bake', 'Lemon Rice', 'Veg Burger'],
    },
  },
  {
    day: 'Thursday',
    meals: {
      Breakfast: ['Masala Dosa', 'Toast + Jam', 'Besan Chilla', 'Methi Paratha'],
      Lunch: ['Sambhar Rice', 'Kofta Curry', 'Palak Paneer + Roti', 'Jeera Rice'],
      'Hi-Tea': ['Dhokla', 'Popcorn', 'Veg Rolls', 'Lemonade'],
      Dinner: ['Roti + Mix Veg', 'Veg Manchurian', 'Khichdi', 'Mac & Cheese'],
    },
  },
  {
    day: 'Friday',
    meals: {
      Breakfast: ['Misal Pav', 'Cornflakes', 'Rava Idli', 'Gobhi Paratha'],
      Lunch: ['Rajma Rice', 'Paneer Tikka Masala', 'Aloo Gobi + Roti', 'Biryani'],
      'Hi-Tea': ['Jalebi', 'Sandwich', 'Veg Puffs', 'Chai'],
      Dinner: ['Dal + Roti', 'Spaghetti', 'Bisi Bele Bath', 'Noodles'],
    },
  },
  {
    day: 'Saturday',
    meals: {
      Breakfast: ['Idli Sambar', 'Oats', 'Aloo Tikki', 'Mooli Paratha'],
      Lunch: ['Chana Dal + Rice', 'Veg Korma', 'Dum Aloo', 'Veg Fried Rice'],
      'Hi-Tea': ['Pakora', 'Cold Drink', 'Nachos', 'Cupcake'],
      Dinner: ['Roti + Dal Fry', 'White Sauce Pasta', 'Khichdi', 'Schezwan Rice'],
    },
  },
  {
    day: 'Sunday',
    meals: {
      Breakfast: ['Chole Puri', 'Pancake', 'Medu Vada', 'Lachha Paratha'],
      Lunch: ['Kadhi Pakora + Rice', 'Paneer Lababdar', 'Aloo Matar', 'Special Biryani'],
      'Hi-Tea': ['Raj Kachori', 'Milkshake', 'Veg Pizza Slice', 'Samosa'],
      Dinner: ['Dal + Roti + Salad', 'Pasta', 'Lemon Rice', 'Veg Hakka Noodles'],
    },
  },
];

// Meal type order for display
export const mealOrder = ['Breakfast', 'Lunch', 'Hi-Tea', 'Dinner'];

// Color mapping for meals
export const mealColors = {
  Breakfast: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-800', icon: '🌅' },
  Lunch: { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-800', icon: '☀️' },
  'Hi-Tea': { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-800', icon: '🍵' },
  Dinner: { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-800', icon: '🌙' },
};
