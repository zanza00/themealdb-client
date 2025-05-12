import { Box, Image, VStack, Heading, Text } from "@chakra-ui/react";
import type { Meal } from "../services/mealService";

interface MealCardProps {
  meal: Meal;
}

export const MealCard = ({ meal }: MealCardProps) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={{ shadow: "md" }}
      transition="all 0.2s"
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
  );
};
