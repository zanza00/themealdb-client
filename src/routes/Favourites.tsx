import { Box, Text, VStack } from "@chakra-ui/react";
import { useFavouritesStore } from "../store/favouritesStore";
import { MealGrid } from "../components/MealGrid";

export function Favourites() {
  const { favourites, getFavouritesCount } = useFavouritesStore();

  return (
    <Box p={4}>
      <VStack gap={6} align="stretch">
        <Text fontSize="xl" fontWeight="bold">
          Your favorites ({getFavouritesCount()})
        </Text>
        {favourites.length === 0 ? (
          <Text textAlign="center" color="gray.500">
            You haven't added any meals to your favorites yet
          </Text>
        ) : (
          <MealGrid meals={favourites} />
        )}
      </VStack>
    </Box>
  );
}
