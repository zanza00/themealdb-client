import { Grid } from "@chakra-ui/react";
import { MealCard } from "./MealCard";
import type { Meal } from "../services/mealService";

interface MealGridProps {
  meals?: Meal[];
}

export function MealGrid({ meals }: MealGridProps) {
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)", 
        lg: "repeat(3, 1fr)",
      }}
      gap={4}
    >
      {meals?.map((meal: Meal) => (
        <MealCard key={meal.idMeal} meal={meal} />
      ))}
    </Grid>
  );
}