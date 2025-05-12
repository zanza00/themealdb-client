import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { MealSearch } from "../components/MealSearch";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: MealSearch,
      },
    ],
  },
]);
