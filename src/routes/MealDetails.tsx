import { Box, Image, VStack, Heading, Text } from "@chakra-ui/react";
import type { Meal } from "../services/mealService";
import { useLoaderData } from "react-router";



export function MealDetails() {
  const { meal } = useLoaderData() as { meal: Meal };

  return (
    <Box maxW="4xl" mx="auto" p={4}>
      <VStack gap={4} align="stretch">
        <Box position="relative">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            width="100%"
            height="400px"
            objectFit="cover"
            borderRadius="lg"
          />
        </Box>

        <VStack align="start" gap={4}>
          <Heading size="xl">{meal.strMeal}</Heading>
          
          <Box>
            <VStack align="start" gap={2}>
              {meal.strCategory && (
                <Text fontSize="md">
                  <Text as="span" fontWeight="bold">Category: </Text>
                  {meal.strCategory}
                </Text>
              )}
              {meal.strArea && (
                <Text fontSize="md">
                  <Text as="span" fontWeight="bold">Cuisine: </Text>
                  {meal.strArea}
                </Text>
              )}
            </VStack>
          </Box>

          {meal.strInstructions && (
            <Box>
              <Heading size="md" mb={2}>Instructions</Heading>
              <Text whiteSpace="pre-line">{meal.strInstructions}</Text>
            </Box>
          )}

          {meal.strTags && (
            <Box>
              <Heading size="md" mb={2}>Tags</Heading>
              <Text>{meal.strTags}</Text>
            </Box>
          )}
        </VStack>
      </VStack>
    </Box>
  );
}
