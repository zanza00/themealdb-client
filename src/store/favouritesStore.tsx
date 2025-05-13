import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { devtools } from "zustand/middleware";
import { mealSchema, type Meal } from "../schemas/meal";
import { z } from "zod";

interface FavouritesState {
  favourites: Meal[];
  addFavourite: (meal: Meal) => void;
  removeFavourite: (mealId: string) => void;
  isFavourite: (mealId: string) => boolean;
  getFavouritesCount: () => number;
}

const favouritesStateSchema = z.object({
  favourites: z.array(mealSchema),
});

export const useFavouritesStore = create<FavouritesState>()(
  devtools(
    persist(
      (set, get) => ({
        favourites: [],
        addFavourite: (meal) =>
          set((state) => ({
            favourites: [...state.favourites, meal],
          })),
        removeFavourite: (mealId) =>
          set((state) => ({
            favourites: state.favourites.filter(
              (meal) => meal.idMeal !== mealId
            ),
          })),
        isFavourite: (mealId) =>
          get().favourites.some((meal) => meal.idMeal === mealId),
        getFavouritesCount: () => get().favourites.length,
      }),
      {
        name: "favourites-storage",
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => (state) => {
          if (state) {
            const result = favouritesStateSchema.safeParse(state);
            if (!result.success) {
              console.error("Invalid state rehydrated:", result.error, state);
              return { favourites: [] };
            }
            console.log("Favourites rehydrated:", JSON.stringify(result.data));
            return result.data;
          }
        },
      }
    )
  )
);
