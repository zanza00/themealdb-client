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
          set((state) => {
            if (
              state.favourites.some(
                (favourite) => favourite.idMeal === meal.idMeal
              )
            ) {
              return state;
            }
            return {
              favourites: [...state.favourites, meal],
            };
          }),
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
        onRehydrateStorage: () => (state) => validateStoredState(state),
      }
    )
  )
);

function validateStoredState(
  state: unknown
): { favourites: Meal[] } | undefined {
  if (state) {
    const result = favouritesStateSchema.safeParse(state);
    if (!result.success) {
      return undefined;
    }
    return result.data;
  }
}

// exported for testing, mocking the localstorage is a pain
export const exportedForTest = {
  validateStoredState,
}
