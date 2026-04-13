// ============================================
// Recommendations Data
// Dishes with highest votes and lowest wastage
// ============================================

export const recommendedDishes = [
  {
    id: 1,
    name: 'Veg Biryani',
    category: 'Lunch',
    popularity: 92,
    wastageScore: 8,   // lower is better
    emoji: '🍛',
    tags: ['Fan Favorite', 'Low Waste'],
    bgColor: 'from-amber-400 to-orange-500',
  },
  {
    id: 2,
    name: 'Paneer Butter Masala',
    category: 'Lunch',
    popularity: 88,
    wastageScore: 12,
    emoji: '🧆',
    tags: ['Popular', 'High Protein'],
    bgColor: 'from-orange-400 to-amber-500',
  },
  {
    id: 3,
    name: 'Masala Dosa',
    category: 'Breakfast',
    popularity: 85,
    wastageScore: 10,
    emoji: '🫓',
    tags: ['Most Voted', 'Eco-Friendly'],
    bgColor: 'from-yellow-400 to-orange-400',
  },
  {
    id: 4,
    name: 'Dal Makhani',
    category: 'Dinner',
    popularity: 82,
    wastageScore: 15,
    emoji: '🍲',
    tags: ['Comfort Food', 'Popular'],
    bgColor: 'from-green-400 to-teal-500',
  },
  {
    id: 5,
    name: 'Chole Bhature',
    category: 'Breakfast',
    popularity: 80,
    wastageScore: 18,
    emoji: '🥗',
    tags: ['Weekend Special'],
    bgColor: 'from-teal-400 to-green-500',
  },
  {
    id: 6,
    name: 'Pasta Arabiata',
    category: 'Dinner',
    popularity: 76,
    wastageScore: 22,
    emoji: '🍝',
    tags: ['Low Waste', 'Student Fav'],
    bgColor: 'from-red-400 to-rose-500',
  },
  {
    id: 7,
    name: 'Idli Sambar',
    category: 'Breakfast',
    popularity: 74,
    wastageScore: 9,
    emoji: '🥘',
    tags: ['Healthy', 'Eco-Friendly'],
    bgColor: 'from-blue-400 to-indigo-500',
  },
  {
    id: 8,
    name: 'Samosa',
    category: 'Hi-Tea',
    popularity: 70,
    wastageScore: 25,
    emoji: '🫔',
    tags: ['Hi-Tea Fav'],
    bgColor: 'from-purple-400 to-violet-500',
  },
];

// Top wastage reducers (dishes that lead to least waste)
export const lowWastageChampions = [
  { name: 'Idli Sambar', savings: '95%', icon: '🥘' },
  { name: 'Khichdi', savings: '93%', icon: '🍚' },
  { name: 'Upma', savings: '91%', icon: '🫕' },
  { name: 'Dosa', savings: '90%', icon: '🫓' },
];
