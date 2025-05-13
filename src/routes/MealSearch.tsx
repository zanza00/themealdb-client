import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Input, Grid, Skeleton, Flex } from "@chakra-ui/react";

import { mealService } from "../services/mealService";
import { useSearchParams } from "react-router";
import { MealGrid } from "../components/MealGrid";

export function MealSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = useMemo(
    () => searchParams.get("q") ?? "",
    [searchParams]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams(value ? { q: value } : {});
  };

  const {
    data: meals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["meals", searchQuery],
    queryFn: () => mealService.searchMeals(searchQuery),
    enabled: searchQuery.length > 0,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return (
    <Box p={4}>
      <Box mb={6}>
        <Input
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a meal..."
          size="lg"
        />
      </Box>

      {isLoading && (
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={4}
        >
          {[1, 2, 3].map((i) => (
            <Box key={i} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Skeleton height="200px" />
              <Box p={4}>
                <Skeleton height="20px" mb={4} />
                <Skeleton height="16px" width="60%" />
              </Box>
            </Box>
          ))}
        </Grid>
      )}

      {error && (
        <Flex
          bg="red.50"
          color="red.500"
          p={4}
          borderRadius="md"
          alignItems="center"
          justifyContent="center"
        >
          An error occurred during the search
        </Flex>
      )}

      <MealGrid meals={meals} />
    </Box>
  );
}
