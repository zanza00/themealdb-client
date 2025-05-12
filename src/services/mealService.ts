const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const mealService = {
  searchMeals: async (query: string): Promise<Meal[]> => {
    const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
    const data: MealsResponse = await response.json();
    return data.meals ?? [];
  },

  getMealById: async (id: string): Promise<Meal | null> => {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data: MealsResponse = await response.json();
    return data.meals?.[0] ?? null;
  },

  getRandomMeal: async (): Promise<Meal | null> => {
    const response = await fetch(`${BASE_URL}/random.php`);
    const data: MealsResponse = await response.json();
    return data.meals?.[0] ?? null;
  },

  getMealsByCategory: async (category: string): Promise<Meal[]> => {
    const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    const data: MealsResponse = await response.json();
    return data.meals ?? [];
  },

  getMealsByArea: async (area: string): Promise<Meal[]> => {
    const response = await fetch(`${BASE_URL}/filter.php?a=${area}`);
    const data: MealsResponse = await response.json();
    return data.meals ?? [];
  },

  getMealsByIngredient: async (ingredient: string): Promise<Meal[]> => {
    const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
    const data: MealsResponse = await response.json();
    return data.meals ?? [];
  },

  getIngredients: async (): Promise<Ingredient[]> => {
    const response = await fetch(`${BASE_URL}/list.php?i=list`);
    const data: IngredientsResponse = await response.json();
    return data.meals ?? [];
  },

  getAreas: async (): Promise<Area[]> => {
    const response = await fetch(`${BASE_URL}/list.php?a=list`);
    const data: AreasResponse = await response.json();
    return data.meals ?? [];
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${BASE_URL}/list.php?c=list`);
    const data: CategoriesResponse = await response.json();
    return data.meals ?? [];
  },

  getMealsByAreaCategoryIngredient: async (
    area: string,
    category: string,
    ingredient: string
  ): Promise<Meal[]> => {
    const response = await fetch(
      `${BASE_URL}/filter.php?a=${area}&c=${category}&i=${ingredient}`
    );
    const data: MealsResponse = await response.json();
    return data.meals ?? [];
  },
};

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealAlternate: any;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strImageSource: any;
  strCreativeCommonsConfirmed: any;
  dateModified: any;
}

export interface MealsResponse {
  meals: Meal[] | null;
}

export interface IngredientsResponse {
  meals: Ingredient[];
}

export interface Ingredient {
  idIngredient: string;
  strIngredient: string;
  strDescription?: string;
  strType?: string;
}

export interface AreasResponse {
  meals: Area[];
}

export interface Area {
  strArea: string;
}

export interface CategoriesResponse {
  meals: Category[];
}

export interface Category {
  strCategory: string;
}
