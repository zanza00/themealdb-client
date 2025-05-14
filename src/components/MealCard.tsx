import {
  Box,
  Image,
  VStack,
  Heading,
  Text,
  IconButton,
  Dialog,
  Portal,
} from "@chakra-ui/react";
import { Tooltip } from "./ui/tooltip";
import type { Meal } from "../schemas/meal";
import { NavLink } from "react-router";
import { LuHeart, LuHeartOff } from "react-icons/lu";
import { useFavouritesStore } from "../store/favouritesStore";
import { useState } from "react";

interface MealCardProps {
  meal: Meal;
}

export function MealCard({ meal }: MealCardProps) {
  const { isFavourite, addFavourite, removeFavourite } = useFavouritesStore();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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
    <NavLink to={`/meal/${meal.idMeal}`}>
      <Box
        data-testid="meal-card"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        _hover={{ shadow: "md" }}
        transition="all 0.2s"
        display="block"
        textDecoration="none"
        color="inherit"
        position="relative"
      >
        <Tooltip 
          content={isFavourite(meal.idMeal) ? "Remove from favorites" : "Add to favorites"} 
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
            size="sm"
            zIndex={1}
          >
            {isFavourite(meal.idMeal) ? <LuHeartOff /> : <LuHeart />}
          </IconButton>
        </Tooltip>

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
                    Are you sure you want to remove {meal.strMeal} from your favorites?
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
      </Box>
    </NavLink>
  );
}
