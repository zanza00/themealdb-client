import { test, expect } from "@playwright/test";

test.describe("Meal Advanced Search Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/advanced-search");
    await expect(page.getByTestId("category-select-trigger")).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByTestId("area-select-trigger")).toBeVisible();
    await expect(page.getByTestId("ingredient-select-trigger")).toBeVisible();
    await expect(page.getByRole("button", { name: "Search" })).toBeVisible();
  });

  test("should allow users to filter by category and display results", async ({
    page,
  }) => {
    const mealGrid = page.getByTestId("meal-grid");
    const categoryTrigger = page.getByTestId("category-select-trigger");

    await categoryTrigger.click();
    await page.getByRole("option", { name: "Seafood" }).click();

    await expect(
      categoryTrigger.getByText("Seafood", { exact: true })
    ).toBeVisible();

    await page.getByRole("button", { name: "Search" }).click();

    await expect(mealGrid).toBeVisible();
    const mealCards = mealGrid.getByTestId("meal-card");
    await expect(mealCards.first()).toBeVisible({ timeout: 15000 });
    const count = await mealCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should display a warning toast when clicking search without any filters selected", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Search" }).click();

    const toastTitle = page.getByText("Invalid Search", { exact: true });
    const toastDescription = page.getByText(
      "Please select at least one filter before searching.",
      { exact: true }
    );

    await expect(toastTitle).toBeVisible({ timeout: 5000 });
    await expect(toastDescription).toBeVisible();
  });

  test("should allow filtering by a combination of filters (Area and Ingredient)", async ({
    page,
  }) => {
    const areaTrigger = page.getByTestId("area-select-trigger");
    const ingredientTrigger = page.getByTestId("ingredient-select-trigger");

    await areaTrigger.click();
    await page.getByRole("option", { name: "Italian" }).click();
    await expect(areaTrigger.getByText("Italian", { exact: true })).toBeVisible();

    await ingredientTrigger.click();
    await page.getByRole("option", { name: "Salmon", exact: true }).click();
    await expect(ingredientTrigger.getByText("Salmon", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "Search" }).click();

    const mealGrid = page.getByTestId("meal-grid");
    const mealCards = mealGrid.getByTestId("meal-card");
    await expect(mealCards.first()).toBeVisible({ timeout: 15000 });
    const count = await mealCards.count();
    expect(count).toBeGreaterThan(0);
  });
});
