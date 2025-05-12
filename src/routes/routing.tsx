import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { MealSearch } from "../components/MealSearch";

const basePath = import.meta.env.DEV ? '/' : '/themealdb-client/';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        Component: MealSearch,
      },
    ],
  },
], {
  basename: basePath
});

function ErrorElement() {
  return <div>Error</div>;
}
