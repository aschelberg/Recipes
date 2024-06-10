// Search criteria

const useFilters = () => {
  const FILTERS = {
    diet: [
      'balanced', 'high-fiber','high-protein', 'low-carb', 'low-fat', 'low-sodium'
    ],
    health: [
      'alcohol-cocktail',
      'alcohol-free',
      'celery-free',
      'crustacean-free',
      'dairy-free',
      'DASH',
      'egg-free',
      'fish-free',
      'fodmap-free',
      'gluten-free',
      'immuno-supportive',
      'keto-friendly',
      'kidney-friendly',
      'kosher',
      'low-fat-abs',
      'low-potassium',
      'low-suger',
      'lupine-free',
      'Mediterranean',
      'mollusk-free',
      'mustard-free',
      'no-oil-added',
      'paleo',
      'pescatarian',
      'pork-free',
      'red-meat-free',
      'sesame-free',
      'shellfish-free',
      'soy-free',
      'sugar-conscious',
      'sulfite-free',
      'tree-nut-free',
      'vegan',
      'vegetarian',
      'wheat-free',
    ],
    cuisineType: [
      'American',
      'Asian',
      'British',
      'Caribbean',
      'Central Europe',
      'Chinese',
      'Eastern Europe',
      'French',
      'Indian',
      'Italian',
      'Japanese',
      'Kosher',
      'Mediterranean',
      'Mexican',
      'Middle Eastern',
      'Nordic',
      'South American',
      'South East Asian'
    ],
    mealType: [
    'Breakfast',
    'Dinner',
    'Lunch',
    'Snack',
    'Teatime'
    ],
    dishType: [
      'Biscuits and cookies',
      'Bread',
      'Cereals',
      'Condiments and sauces',
      'Desserts',
      'Drinks',
      'Main course',
      'Pancake',
      'Preps',
      'Preserve',
      'Salad',
      'Sandwiches',
      'Side dish',
      'Soup',
      'Starter',
      'Sweets'
    ]
  }
  
  return { FILTERS }
}

export default useFilters;