import { expect, test, beforeEach } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

import { render } from "../testing/render";
import { MealCard } from "./MealCard";
import { useFavouritesStore } from "../store/favouritesStore";

const meal = {
  idMeal: "52772",
  strMeal: "Teriyaki Chicken Casserole",
  strMealAlternate: null,
  strCategory: "Chicken",
  strArea: "Japanese",
  strInstructions:
    "Preheat oven to 350\u00b0 F. Spray a 9x13-inch baking pan with non-stick spray.\r\nCombine soy sauce, \u00bd cup water, brown sugar, ginger and garlic in a small saucepan and cover. Bring to a boil over medium heat. Remove lid and cook for one minute once boiling.\r\nMeanwhile, stir together the corn starch and 2 tablespoons of water in a separate dish until smooth. Once sauce is boiling, add mixture to the saucepan and stir to combine. Cook until the sauce starts to thicken then remove from heat.\r\nPlace the chicken breasts in the prepared pan. Pour one cup of the sauce over top of chicken. Place chicken in oven and bake 35 minutes or until cooked through. Remove from oven and shred chicken in the dish using two forks.\r\n*Meanwhile, steam or cook the vegetables according to package directions.\r\nAdd the cooked vegetables and rice to the casserole dish with the chicken. Add most of the remaining sauce, reserving a bit to drizzle over the top when serving. Gently toss everything together in the casserole dish until combined. Return to oven and cook 15 minutes. Remove from oven and let stand 5 minutes before serving. Drizzle each serving with remaining sauce. Enjoy!",
  strMealThumb:
    "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
  strTags: "Meat,Casserole",
  strYoutube: "https://www.youtube.com/watch?v=4aZr5hZXP_s",
  strIngredient1: "soy sauce",
  strIngredient2: "water",
  strIngredient3: "brown sugar",
  strIngredient4: "ground ginger",
  strIngredient5: "minced garlic",
  strIngredient6: "cornstarch",
  strIngredient7: "chicken breasts",
  strIngredient8: "stir-fry vegetables",
  strIngredient9: "brown rice",
  strIngredient10: "",
  strIngredient11: "",
  strIngredient12: "",
  strIngredient13: "",
  strIngredient14: "",
  strIngredient15: "",
  strIngredient16: null,
  strIngredient17: null,
  strIngredient18: null,
  strIngredient19: null,
  strIngredient20: null,
  strMeasure1: "3/4 cup",
  strMeasure2: "1/2 cup",
  strMeasure3: "1/4 cup",
  strMeasure4: "1/2 teaspoon",
  strMeasure5: "1/2 teaspoon",
  strMeasure6: "4 Tablespoons",
  strMeasure7: "2",
  strMeasure8: "1 (12 oz.)",
  strMeasure9: "3 cups",
  strMeasure10: "",
  strMeasure11: "",
  strMeasure12: "",
  strMeasure13: "",
  strMeasure14: "",
  strMeasure15: "",
  strMeasure16: null,
  strMeasure17: null,
  strMeasure18: null,
  strMeasure19: null,
  strMeasure20: null,
  strSource: null,
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
};

const meal2 = {
  idMeal: "52773",
  strMeal: "Honey Teriyaki Salmon",
  strMealAlternate: null,
  strCategory: "Seafood",
  strArea: "Japanese",
  strInstructions:
    "Mix all the ingredients in the Honey Teriyaki Glaze together. Whisk to blend well. Combine the salmon and the Glaze together.\r\n\r\nHeat up a skillet on medium-low heat. Add the oil, Pan-fry the salmon on both sides until it\u2019s completely cooked inside and the glaze thickens.\r\n\r\nGarnish with sesame and serve immediately.",
  strMealThumb:
    "https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg",
  strTags: "Fish,Breakfast,DateNight",
  strYoutube: "https://www.youtube.com/watch?v=4MpYuaJsvRw",
  strIngredient1: "Salmon",
  strIngredient2: "Olive oil",
  strIngredient3: "Soy Sauce",
  strIngredient4: "Sake",
  strIngredient5: "Sesame Seed",
  strIngredient6: "",
  strIngredient7: "",
  strIngredient8: "",
  strIngredient9: "",
  strIngredient10: "",
  strIngredient11: "",
  strIngredient12: "",
  strIngredient13: "",
  strIngredient14: "",
  strIngredient15: "",
  strIngredient16: null,
  strIngredient17: null,
  strIngredient18: null,
  strIngredient19: null,
  strIngredient20: null,
  strMeasure1: "1 lb",
  strMeasure2: "1 tablespoon",
  strMeasure3: "2 tablespoons",
  strMeasure4: "2 tablespoons",
  strMeasure5: "4 tablespoons",
  strMeasure6: "",
  strMeasure7: "",
  strMeasure8: "",
  strMeasure9: "",
  strMeasure10: "",
  strMeasure11: "",
  strMeasure12: "",
  strMeasure13: "",
  strMeasure14: "",
  strMeasure15: "",
  strMeasure16: null,
  strMeasure17: null,
  strMeasure18: null,
  strMeasure19: null,
  strMeasure20: null,
  strSource: null,
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
};

beforeEach(() => {
  useFavouritesStore.setState({ favourites: [] });
});

test("renders a mealcard", () => {
  render(
    <MemoryRouter>
      <MealCard meal={meal} />
    </MemoryRouter>
  );
  expect(screen.getByText("Teriyaki Chicken Casserole")).toBeInTheDocument();
});

test("renders the favorites button", () => {
  render(
    <MemoryRouter>
      <MealCard meal={meal} />
    </MemoryRouter>
  );
  expect(screen.getByLabelText("Add to favorites")).toBeInTheDocument();
});

test("renders 'Remove from favorites' button when meal is a favorite", () => {
  useFavouritesStore.getState().addFavourite(meal);

  render(
    <MemoryRouter>
      <MealCard meal={meal} />
    </MemoryRouter>
  );
  expect(screen.getByLabelText("Remove from favorites")).toBeInTheDocument();
});

test("renders 'Add to favorites' button when meal is not a favorite", () => {
  useFavouritesStore.getState().addFavourite(meal2);

  render(
    <MemoryRouter>
      <MealCard meal={meal} />
    </MemoryRouter>
  );
  expect(screen.getByLabelText("Add to favorites")).toBeInTheDocument();
});

test("toggles favorite button from 'Add to favorites' to 'Remove from favorites' on click", async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <MealCard meal={meal} />
    </MemoryRouter>
  );

  const addButton = screen.getByLabelText("Add to favorites");
  expect(addButton).toBeInTheDocument();

  await user.click(addButton);

  expect(screen.getByLabelText("Remove from favorites")).toBeInTheDocument();
  expect(screen.queryByLabelText("Add to favorites")).not.toBeInTheDocument();
});

test("toggles favorite button from 'Remove from favorites' to 'Add to favorites' on click and confirmation", async () => {
  const user = userEvent.setup();

  useFavouritesStore.getState().addFavourite(meal);

  render(
    <MemoryRouter>
      <MealCard meal={meal} />
    </MemoryRouter>
  );

  const removeButtonOnCard = screen.getByLabelText("Remove from favorites");
  expect(removeButtonOnCard).toBeInTheDocument();

  await user.click(removeButtonOnCard);

  const dialog = screen.getByRole("dialog", { name: /remove from favorites/i });
  expect(dialog).toBeInTheDocument();

  // ensure that we have a confirm button in the dialog and not the component because there is still the remove button on the card
  const confirmRemoveButtonInDialog = within(dialog).getByRole("button", {
    name: /remove/i,
  });
  expect(confirmRemoveButtonInDialog).toBeInTheDocument();

  await user.click(confirmRemoveButtonInDialog);

  // removed from the favorites, the add button should be present
  expect(screen.getByLabelText("Add to favorites")).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "Remove from favorites" })
  ).not.toBeInTheDocument();
});
