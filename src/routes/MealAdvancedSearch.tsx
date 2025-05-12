import { useState } from "react";
import {
  Container,
  Select,
  VStack,
  Button,
  Box,
  Portal,
  createListCollection,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router";
import { mealService } from "../services/mealService";
import { useQuery } from "@tanstack/react-query";
import { MealGrid } from "../components/MealGrid";

interface MealFilters {
  category?: string[];
  area?: string[];
  ingredient?: string[];
}

export function MealAdvancedSearch() {
  const [filters, setFilters] = useState<MealFilters>({});

  const { categories, areas, ingredients } = useLoaderData<{
    categories: string[];
    areas: string[];
    ingredients: string[];
  }>();

  const categoriesCollection = createListCollection({
    items:
      categories?.map((category) => ({
        label: category,
        value: category,
      })) ?? [],
  });

  const areasCollection = createListCollection({
    items:
      areas?.map((area) => ({
        label: area,
        value: area,
      })) ?? [],
  });

  const ingredientsCollection = createListCollection({
    items:
      ingredients?.map((ingredient) => ({
        label: ingredient,
        value: ingredient,
      })) ?? [],
  });

  const mealsFilters = useQuery({
    queryKey: ["mealsFilters", filters],
    enabled: false, // disable initial fetch, using refetch on button click
    queryFn: () =>
      mealService.getMealsByAreaCategoryIngredient({
        area: filters.area?.[0],
        category: filters.category?.[0],
        ingredient: filters.ingredient?.[0],
      }),
  });

  const handleSearch = () => {
    mealsFilters.refetch();
  };

  return (
    <Container maxW="container.md">
      <VStack gap={6} align="stretch">
        <Select.Root
          collection={categoriesCollection}
          size="md"
          width="100%"
          value={filters.category}
          onValueChange={(value) => {
            setFilters({ ...filters, category: value.value });
          }}
        >
          <Select.HiddenSelect />
          <Select.Label>Category</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select category" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {categoriesCollection.items.map((category) => (
                  <Select.Item item={category} key={category.value}>
                    {category.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>

        <Select.Root
          collection={areasCollection}
          size="md"
          width="100%"
          value={filters.area}
          onValueChange={(value) => {
            setFilters({ ...filters, area: value.value });
          }}
        >
          <Select.HiddenSelect />
          <Select.Label>Area</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select area" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {areasCollection.items.map((area) => (
                  <Select.Item item={area} key={area.value}>
                    {area.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>

        <Select.Root
          collection={ingredientsCollection}
          size="md"
          width="100%"
          value={filters.ingredient}
          onValueChange={(value) => {
            setFilters({ ...filters, ingredient: value.value });
          }}
        >
          <Select.HiddenSelect />
          <Select.Label>Main Ingredient</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select ingredient" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {ingredientsCollection.items.map((ingredient) => (
                  <Select.Item item={ingredient} key={ingredient.value}>
                    {ingredient.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>

        <Box>
          <Button colorScheme="blue" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </VStack>
      <Box paddingTop={4}>
        <MealGrid meals={mealsFilters.data} />
      </Box>
    </Container>
  );
}
