import { Grid, Text } from "@chakra-ui/react";
import { MealCard } from "./MealCard";
import type { Meal } from "../schemas/meal";

interface MealGridProps {
  meals?: Meal[];
}

export function MealGrid({ meals }: MealGridProps) {
  return (
    <Grid
      data-testid="meal-grid"
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)", 
        lg: "repeat(3, 1fr)",
      }}
      gap={4}
    >
      {meals?.length === 0 ? (
        <Text textAlign="center" color="gray.500" gridColumn="1/-1">
          No meals found
        </Text>
      ) : (
        meals?.map((meal: Meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))
      )}
    </Grid>
  );
}