import { test, expect } from "@playwright/test";

test.describe("Favourites Functionality", () => {
  test.beforeEach(async ({ page }) => {});

  test("should allow adding a meal to favourites and viewing it on the favourites page", async ({
    page,
  }) => {
    const TEST_MEAL_ID = "52861";
    const TEST_MEAL_NAME = "Peanut Butter Cheesecake";
    await page.goto(`/meal/${TEST_MEAL_ID}`);

    const addToFavouritesButton = page.getByRole("button", {
      name: /add to favorites/i,
    });
    await expect(addToFavouritesButton).toBeVisible();

    const isInitiallyFavourite = await page
      .getByRole("button", { name: /remove from favorites/i })
      .isVisible();
    if (isInitiallyFavourite) {
      await page
        .getByRole("button", { name: /remove from favorites/i })
        .click();
      await expect(addToFavouritesButton).toBeVisible();
    }

    await addToFavouritesButton.click();

    const removeFromFavouritesButton = page.getByRole("button", {
      name: /remove from favorites/i,
    });
    await expect(removeFromFavouritesButton).toBeVisible();

    await page.goto("/favourites");

    await expect(page.getByText(`Your favorites (1)`)).toBeVisible();

    const mealGrid = page.getByTestId("meal-grid");
    await expect(mealGrid).toBeVisible();

    const favouriteMealCard = mealGrid
      .getByTestId("meal-card")
      .filter({ hasText: TEST_MEAL_NAME });
    await expect(favouriteMealCard).toBeVisible();
    await expect(favouriteMealCard).toHaveCount(1);

    await page.goto(`/meal/${TEST_MEAL_ID}`);
    await expect(removeFromFavouritesButton).toBeVisible();
    await removeFromFavouritesButton.click();

    await page.getByRole("button", { name: "Remove" }).click();
    await expect(addToFavouritesButton).toBeVisible();
  });

  test("should display a message when no meals are in favourites", async ({
    page,
  }) => {
    await page.goto("/favourites");
    await expect(
      page.getByText("You haven't added any meals to your favorites yet")
    ).toBeVisible();
    await expect(page.getByText("Your favorites (0)")).toBeVisible();
  });

  test("should correctly load and display favourites from localStorage", async ({
    page,
  }) => {
    const mealData = {
      idMeal: "53063",
      strMeal: "Chivito uruguayo",
      strMealAlternate: null,
      strCategory: "Beef",
      strArea: "Uruguayan",
      strInstructions:
        "Crush the meat so that it is finite and we put it on a griddle to brown. Put the eggs, bacon and ham to fry.\r\nCut the bread in half, put the beef brisket, the fried eggs, the bacon, the ham, the mozzarella, the tomato and the lettuce. Cover with the other half of the bread and serve.",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/n7qnkb1630444129.jpg",
      strTags: null,
      strYoutube:
        "https://www.youtube.com/watch?v=0PXbbL1QdaA&ab_channel=D%C3%ADadeCocina",
      strIngredient1: "Beef Brisket",
      strIngredient2: "Bread",
      strIngredient3: "Lettuce",
      strIngredient4: "Tomato",
      strIngredient5: "Ham",
      strIngredient6: "Mozzarella",
      strIngredient7: "Bacon",
      strIngredient8: "Egg",
      strIngredient9: "Onion",
      strIngredient10: "Pepper",
      strIngredient11: "",
      strIngredient12: "",
      strIngredient13: "",
      strIngredient14: "",
      strIngredient15: "",
      strIngredient16: "",
      strIngredient17: "",
      strIngredient18: "",
      strIngredient19: "",
      strIngredient20: "",
      strMeasure1: "2",
      strMeasure2: "2",
      strMeasure3: "1",
      strMeasure4: "1",
      strMeasure5: "100g ",
      strMeasure6: "100g ",
      strMeasure7: "100g ",
      strMeasure8: "1",
      strMeasure9: "1",
      strMeasure10: "1",
      strMeasure11: " ",
      strMeasure12: " ",
      strMeasure13: " ",
      strMeasure14: " ",
      strMeasure15: " ",
      strMeasure16: " ",
      strMeasure17: " ",
      strMeasure18: " ",
      strMeasure19: " ",
      strMeasure20: " ",
      strSource: "https://cookpad.com/uy/recetas/116102-chivito-uruguayo",
      strImageSource: null,
      strCreativeCommonsConfirmed: null,
      dateModified: null,
    };

    const localStorageKey = "favourites-storage";
    const localStorageState = {
      state: {
        favourites: [mealData],
      },
      version: 0,
    };
    // ensure that we are in a page with access to localStorage
    await page.goto("/");

    await page.evaluate(
      ({ key, value }) => {
        localStorage.setItem(key, JSON.stringify(value));
      },
      { key: localStorageKey, value: localStorageState }
    );

    await page.goto("/favourites");

    await expect(page.getByText("Your favorites (1)")).toBeVisible();

    const mealGrid = page.getByTestId("meal-grid");
    await expect(mealGrid).toBeVisible();

    const favouriteMealCard = mealGrid
      .getByTestId("meal-card")
      .filter({ hasText: mealData.strMeal });
    await expect(favouriteMealCard).toBeVisible();
    await expect(favouriteMealCard).toHaveCount(1);

    // Just in case
    await page.evaluate((key) => {
      localStorage.removeItem(key);
    }, localStorageKey);
  });
});
