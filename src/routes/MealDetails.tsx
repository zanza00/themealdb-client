import {
  Box,
  Image,
  VStack,
  Heading,
  Text,
  IconButton,
  Dialog,
  Portal,
  Table,
} from "@chakra-ui/react";
import { type Meal } from "../schemas/meal";
import { useLoaderData } from "react-router";
import { LuHeart, LuHeartOff } from "react-icons/lu";
import { useFavouritesStore } from "../store/favouritesStore";
import { useState } from "react";
import { Tooltip } from "../components/ui/tooltip";

export function MealDetails() {
  const { meal } = useLoaderData<{ meal: Meal | undefined }>();
  const { isFavourite, addFavourite, removeFavourite } = useFavouritesStore();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  if (!meal) {
    return <div>Meal not found</div>;
  }

  const ingredients = getIngredients(meal);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavourite(meal.idMeal)) {
      setIsConfirmOpen(true);
    } else {
      addFavourite(meal);
    }
  };

  const handleConfirmRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    removeFavourite(meal.idMeal);
    setIsConfirmOpen(false);
  };

  return (
    <Box maxW="4xl" mx="auto" p={4}>
      <VStack gap={4} align="stretch">
        <Box position="relative">
          <Tooltip
            content={
              isFavourite(meal.idMeal)
                ? "Remove from favorites"
                : "Add to favorites"
            }
            openDelay={200}
          >
            <IconButton
              aria-label={
                isFavourite(meal.idMeal)
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
              position="absolute"
              top={2}
              right={2}
              onClick={handleFavoriteClick}
              colorScheme={isFavourite(meal.idMeal) ? "red" : "gray"}
              size="md"
              zIndex={1}
            >
              {isFavourite(meal.idMeal) ? <LuHeartOff /> : <LuHeart />}
            </IconButton>
          </Tooltip>
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
                  <Text as="span" fontWeight="bold">
                    Category:{" "}
                  </Text>
                  {meal.strCategory}
                </Text>
              )}
              {meal.strArea && (
                <Text fontSize="md">
                  <Text as="span" fontWeight="bold">
                    Cuisine:{" "}
                  </Text>
                  {meal.strArea}
                </Text>
              )}
            </VStack>
          </Box>

          {ingredients.length > 0 && (
            <Box w="100%">
              <Heading size="md" mb={2}>
                Ingredients
              </Heading>
              <Table.Root size="md">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Ingredient</Table.ColumnHeader>
                    <Table.ColumnHeader>Measure</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {ingredients.map((item, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{item.ingredient}</Table.Cell>
                      <Table.Cell>{item.measure}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>
          )}

          {meal.strInstructions && (
            <Box>
              <Heading size="md" mb={2}>
                Instructions
              </Heading>
              <Text whiteSpace="pre-line">{meal.strInstructions}</Text>
            </Box>
          )}

          {meal.strTags && (
            <Box>
              <Heading size="md" mb={2}>
                Tags
              </Heading>
              <Text>{meal.strTags}</Text>
            </Box>
          )}
        </VStack>

        <Dialog.Root
          open={isConfirmOpen}
          onOpenChange={(details) => setIsConfirmOpen(details.open)}
        >
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Remove from favorites</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Dialog.Description>
                    Are you sure you want to remove {meal.strMeal} from your
                    favorites?
                  </Dialog.Description>
                </Dialog.Body>
                <Dialog.Footer>
                  <IconButton
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsConfirmOpen(false);
                    }}
                    aria-label="Cancel"
                    mr={2}
                  >
                    Cancel
                  </IconButton>
                  <IconButton
                    colorPalette="red"
                    onClick={handleConfirmRemove}
                    aria-label="Remove"
                  >
                    Remove
                  </IconButton>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </VStack>
    </Box>
  );
}

function getIngredients(meal: Meal) {
  // ugly implementatin, I'm sure there is a better way to do this
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof Meal] as string;
    const measure = meal[`strMeasure${i}` as keyof Meal] as string;
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure: measure ?? "" });
    }
  }
  return ingredients;
}

export const exportedForTest = {
  getIngredients,
};
