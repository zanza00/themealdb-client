import {
  Box,
  Image,
  VStack,
  Heading,
  Text,
  IconButton,
} from "@chakra-ui/react";
import type { Meal } from "../schemas/meal";
import { NavLink } from "react-router";
import { LuHeart, LuHeartOff } from "react-icons/lu";
import { useFavouritesStore } from "../store/favouritesStore";

interface MealCardProps {
  meal: Meal;
}

export function MealCard({ meal }: MealCardProps) {
  const { isFavourite, addFavourite, removeFavourite } = useFavouritesStore();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavourite(meal.idMeal)) {
      removeFavourite(meal.idMeal);
    } else {
      addFavourite(meal);
    }
  };

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
        position="relative"
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
          {isFavourite(meal.idMeal) ? <LuHeart /> : <LuHeartOff />}
        </IconButton>

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
