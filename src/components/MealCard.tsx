import { Box, Image, VStack, Heading, Text } from "@chakra-ui/react";
import type { Meal } from "../services/mealService";
import { NavLink } from "react-router";

interface MealCardProps {
  meal: Meal;
}

export function MealCard({ meal }: MealCardProps) {
  return (
    <NavLink to={`/meal/${meal.idMeal}`}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        _hover={{ shadow: "md" }}
        transition="all 0.2s"
        display="block"
        textDecoration="none"
        color="inherit"
      >
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          height="200px"
          width="100%"
          objectFit="cover"
        />
        <Box p={4}>
          <VStack align="start" gap={2}>
            <Heading size="md">{meal.strMeal}</Heading>
            {meal.strCategory && (
              <Text fontSize="sm">Categoria: {meal.strCategory}</Text>
            )}
            {meal.strArea && <Text fontSize="sm">Area: {meal.strArea}</Text>}
          </VStack>
        </Box>
      </Box>
    </NavLink>
  );
}
