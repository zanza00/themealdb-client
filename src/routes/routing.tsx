import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { MealSearch } from "./MealSearch";
import { MealDetails } from "./MealDetails";
import { mealService, type Meal } from "../services/mealService";

const basePath = import.meta.env.DEV ? "/" : "/themealdb-client/";

export const router = createBrowserRouter(
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
            if (!params.id) {
              throw new Error("No id");
            }
            const meal = await mealService.getMealById(params.id);
            return { meal };
          },
          Component: MealDetails,
        },
      ],
    },
  ],
  {
    basename: basePath,
  }
);

function ErrorElement() {
  return <div>Error</div>;
}
