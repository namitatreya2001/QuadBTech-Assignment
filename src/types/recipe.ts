export interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
  instructions: string;
  extendedIngredients: Ingredient[];
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
}

export interface Ingredient {
  id: number;
  original: string;
  amount: number;
  unit: string;
  name: string;
}

export type Cuisine = 'Italian' | 'Mexican' | 'Asian' | 'American' | 'Mediterranean' | 'Indian' | 'All';