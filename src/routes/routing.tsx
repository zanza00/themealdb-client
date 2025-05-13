import { createBrowserRouter } from "react-router";
import type { QueryClient } from "@tanstack/react-query";

import { Root } from "./Root";
import { MealSearch } from "./MealSearch";
import { MealDetails } from "./MealDetails";
import { mealService } from "../services/mealService";
import { ErrorElement } from "../components/ErrorElement";
import { NotFound } from "./NotFound";
import { MealAdvancedSearch } from "./MealAdvancedSearch";
import { Favourites } from "./Favourites";

const basePath = import.meta.env.DEV ? "/" : "/themealdb-client/";

export const createRouter = (queryClient: QueryClient) =>
  createBrowserRouter(
    [
      {
        path: "/",
        Component: Root,
        errorElement: <ErrorElement />,
        children: [
          {
            index: true,
            Component: MealSearch,
          },
          {
            path: "/meal/:id",
            loader: async ({ params }) => {
              const id = params.id;
              if (!id) {
                throw new Error("No id");
              }
              const data = await queryClient.ensureQueryData({
                queryKey: ["meal", id],
                queryFn: () => mealService.getMealById(id),
                staleTime: 1000 * 60 * 60, // cache per 1 hour
              });

              return { meal: data };
            },
            Component: MealDetails,
          },
          {
            path: "/advanced-search",
            loader: async () => {
              const categories = await queryClient.ensureQueryData({
                queryKey: ["categories"],
                queryFn: mealService.getCategories,
              });

              const areas = await queryClient.ensureQueryData({
                queryKey: ["areas"],
                queryFn: mealService.getAreas,
              });

              const ingredients = await queryClient.ensureQueryData({
                queryKey: ["ingredients"],
                queryFn: mealService.getIngredients,
              });

              return {
                categories: categories.map((category) => category.strCategory),
                areas: areas.map((area) => area.strArea),
                ingredients: ingredients.map(
                  (ingredient) => ingredient.strIngredient
                ),
              };
            },
            Component: MealAdvancedSearch,
          },
          {
            path: "/favourites",
            Component: Favourites,
          },
          {
            path: "*",
            Component: NotFound,
          },
        ],
      },
    ],
    {
      basename: basePath,
    }
  );
