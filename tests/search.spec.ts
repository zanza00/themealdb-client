import { test, expect } from "@playwright/test";

test.describe("Meal Search Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should allow users to search for meals and display results", async ({
    page,
  }) => {
    const searchInput = page.getByPlaceholder("Search for a meal...");
    const mealGrid = page.getByTestId("meal-grid");

    await searchInput.fill("Arrabiata");

    await expect(mealGrid).toBeVisible();

    const mealCards = mealGrid.getByTestId("meal-card");
    await expect(mealCards.first()).toBeVisible({ timeout: 10000 });
    const count = await mealCards.count();
    expect(count).toBeGreaterThan(0);

    await expect(
      mealCards.filter({ hasText: /Arrabiata/i }).first()
    ).toBeVisible();
  });

  test('should display "No meals found" when search yields no results', async ({
    page,
  }) => {
    const searchInput = page.getByPlaceholder("Search for a meal...");

    const nonExistentMeal = "NonExistentMealIniPaecejfpoqjer12345";
    await searchInput.fill(nonExistentMeal);

    const noResultsMessage = page.getByText("No meals found");
    await expect(noResultsMessage).toBeVisible({ timeout: 10000 });
  });

  test('should handle empty search query correctly, showing "No meals found"', async ({
    page,
  }) => {
    const searchInput = page.getByPlaceholder("Search for a meal...");
    const mealGrid = page.getByTestId("meal-grid");

    await searchInput.fill("chicken");
    await expect(mealGrid.getByTestId("meal-card").first()).toBeVisible({
      timeout: 10000,
    });

    await searchInput.fill("");

    await expect(mealGrid.getByTestId("meal-card")).toHaveCount(0);
  });

  test("should display an error message if the API call fails", async ({
    page,
  }) => {
    await page.route("**/search.php?s=*", (route) => {
      route.abort("failed");
    });

    const searchInput = page.getByPlaceholder("Search for a meal...");
    await searchInput.fill("pasta");

    const errorMessage = page.getByText("An error occurred during the search");
    await expect(errorMessage).toBeVisible({ timeout: 10000 });
  });
});
