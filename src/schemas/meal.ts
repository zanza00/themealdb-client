import { z } from "zod";

export const mealSchema = z.object({
  idMeal: z.string(),
  strMeal: z.string(),
  strMealAlternate: z.any(),
  strCategory: z.string().optional(),
  strArea: z.string().optional(),
  strInstructions: z.string().optional(),
  strMealThumb: z.string(),
  strTags: z.string().nullable().optional(),
  strYoutube: z.string().optional(),
  strIngredient1: z.string().nullable().optional(),
  strIngredient2: z.string().nullable().optional(),
  strIngredient3: z.string().nullable().optional(),
  strIngredient4: z.string().nullable().optional(),
  strIngredient5: z.string().nullable().optional(),
  strIngredient6: z.string().nullable().optional(),
  strIngredient7: z.string().nullable().optional(),
  strIngredient8: z.string().nullable().optional(),
  strIngredient9: z.string().nullable().optional(),
  strIngredient10: z.string().nullable().optional(),
  strIngredient11: z.string().nullable().optional(),
  strIngredient12: z.string().nullable().optional(),
  strIngredient13: z.string().nullable().optional(),
  strIngredient14: z.string().nullable().optional(),
  strIngredient15: z.string().nullable().optional(),
  strIngredient16: z.string().nullable().optional(),
  strIngredient17: z.string().nullable().optional(),
  strIngredient18: z.string().nullable().optional(),
  strIngredient19: z.string().nullable().optional(),
  strIngredient20: z.string().nullable().optional(),
  strMeasure1: z.string().nullable().optional(),
  strMeasure2: z.string().nullable().optional(),
  strMeasure3: z.string().nullable().optional(),
  strMeasure4: z.string().nullable().optional(),
  strMeasure5: z.string().nullable().optional(),
  strMeasure6: z.string().nullable().optional(),
  strMeasure7: z.string().nullable().optional(),
  strMeasure8: z.string().nullable().optional(),
  strMeasure9: z.string().nullable().optional(),
  strMeasure10: z.string().nullable().optional(),
  strMeasure11: z.string().nullable().optional(),
  strMeasure12: z.string().nullable().optional(),
  strMeasure13: z.string().nullable().optional(),
  strMeasure14: z.string().nullable().optional(),
  strMeasure15: z.string().nullable().optional(),
  strMeasure16: z.string().nullable().optional(),
  strMeasure17: z.string().nullable().optional(),
  strMeasure18: z.string().nullable().optional(),
  strMeasure19: z.string().nullable().optional(),
  strMeasure20: z.string().nullable().optional(),
  strSource: z.string().nullable().optional(),
  strImageSource: z.any(),
  strCreativeCommonsConfirmed: z.any(),
  dateModified: z.any(),
});

export const mealsResponseSchema = z.object({
  meals: z.union([z.array(mealSchema), z.null(), z.string()]),
});

export const ingredientSchema = z.object({
  idIngredient: z.string(),
  strIngredient: z.string(),
  strDescription: z.string().nullable(),
  strType: z.string().nullable(),
});

export const ingredientsResponseSchema = z.object({
  meals: z.array(ingredientSchema),
});

export const areaSchema = z.object({
  strArea: z.string(),
});

export const areasResponseSchema = z.object({
  meals: z.array(areaSchema),
});

export const categorySchema = z.object({
  strCategory: z.string(),
});

export const categoriesResponseSchema = z.object({
  meals: z.array(categorySchema),
});

// Infer types from schemas
export type Meal = z.infer<typeof mealSchema>;
export type MealsResponse = z.infer<typeof mealsResponseSchema>;
export type Ingredient = z.infer<typeof ingredientSchema>;
export type IngredientsResponse = z.infer<typeof ingredientsResponseSchema>;
export type Area = z.infer<typeof areaSchema>;
export type AreasResponse = z.infer<typeof areasResponseSchema>;
export type Category = z.infer<typeof categorySchema>;
export type CategoriesResponse = z.infer<typeof categoriesResponseSchema>; 