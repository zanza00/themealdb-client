import {
  mealsResponseSchema,
  ingredientsResponseSchema,
  areasResponseSchema,
  categoriesResponseSchema,
  type Meal,
  type MealsResponse,
  type Ingredient,
  type Area,
  type Category,
} from "../schemas/meal";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const mealService = {
  searchMeals: async (query: string): Promise<Meal[]> => {
    const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
    const data = await response.json();
    const validatedData = mealsResponseSchema.parse(data);
    const meals = returnOrThrow(validatedData);
    return meals;
  },

  getMealById: async (id: string): Promise<Meal> => {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    const validatedData = mealsResponseSchema.parse(data);
    const meal = returnOrThrow(validatedData);
    return meal[0];
  },

  getRandomMeal: async (): Promise<Meal> => {
    const response = await fetch(`${BASE_URL}/random.php`);
    const data = await response.json();
    const validatedData = mealsResponseSchema.parse(data);
    const meal = returnOrThrow(validatedData);
    return meal[0];
  },

  getMealsByCategory: async (category: string): Promise<Meal[]> => {
    const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    const data = await response.json();
    const validatedData = mealsResponseSchema.parse(data);
    const meals = returnOrThrow(validatedData);
    return meals;
  },

  getMealsByArea: async (area: string): Promise<Meal[]> => {
    const response = await fetch(`${BASE_URL}/filter.php?a=${area}`);
    const data = await response.json();
    const validatedData = mealsResponseSchema.parse(data);
    const meals = returnOrThrow(validatedData);
    return meals;
  },

  getMealsByIngredient: async (ingredient: string): Promise<Meal[]> => {
    const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
    const data = await response.json();
    const validatedData = mealsResponseSchema.parse(data);
    const meals = returnOrThrow(validatedData);
    return meals;
  },

  getIngredients: async (): Promise<Ingredient[]> => {
    const response = await fetch(`${BASE_URL}/list.php?i=list`);
    const data = await response.json();
    const validatedData = ingredientsResponseSchema.parse(data);
    return validatedData.meals;
  },

  getAreas: async (): Promise<Area[]> => {
    const response = await fetch(`${BASE_URL}/list.php?a=list`);
    const data = await response.json();
    const validatedData = areasResponseSchema.parse(data);
    return validatedData.meals;
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${BASE_URL}/list.php?c=list`);
    const data = await response.json();
    const validatedData = categoriesResponseSchema.parse(data);
    return validatedData.meals;
  },

  getMealsByAreaCategoryIngredient: async (filters: {
    area?: string;
    category?: string;
    ingredient?: string;
  }): Promise<Meal[]> => {
    const searchParams = new URLSearchParams();
    if (filters.area) searchParams.set("a", filters.area);
    if (filters.category) searchParams.set("c", filters.category);
    if (filters.ingredient) searchParams.set("i", filters.ingredient);

    const response = await fetch(
      `${BASE_URL}/filter.php?${searchParams.toString()}`
    );
    const data = await response.json();
    const validatedData = mealsResponseSchema.parse(data);
    const meals = returnOrThrow(validatedData);
    return meals;
  },
};

function returnOrThrow(data: MealsResponse): Meal[] {
  if (data.meals === null) {
    return [];
  }
  if (typeof data.meals === "string") {
    throw new Error(data.meals);
  }
  return data.meals;
}
