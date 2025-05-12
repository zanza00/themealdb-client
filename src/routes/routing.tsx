import { createBrowserRouter, useRouteError } from "react-router";
import { Root } from "./Root";
import { MealSearch } from "./MealSearch";
import { MealDetails } from "./MealDetails";
import { mealService } from "../services/mealService";
import { queryClient } from "../App";
import { Box, Heading, Text, Container, Button } from "@chakra-ui/react";

const basePath = import.meta.env.DEV ? "/" : "/themealdb-client/";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Root,
      errorElement: <ErrorElement />,
      children: [
        {
          index: true,
          Component: MealSearch,
        },
        {
          path: "/meal/:id",
          loader: async ({ params }) => {
            if (!params.id) {
              throw new Error("No id");
            }
            const meal = await mealService.getMealById(params.id);
            return { meal };
          },
          Component: MealDetails,
        },
      ],
    },
  ],
  {
    basename: basePath,
  }
);

function ErrorElement() {
  const error = useRouteError() as Error;
  
  return (
    <Container maxW="container.md" py={10}>
      <Box
        p={8}
        borderWidth="1px"
        borderRadius="lg"
        bg="red.50"
        color="red.700"
      >
        <Heading as="h1" size="xl" mb={4}>
          Oops! Something went wrong
        </Heading>
        <Text fontSize="lg" mb={6}>
          {error.message}
        </Text>
        <Button
          colorScheme="red"
          onClick={() => window.location.href = "/"}
        >
          Go back to home
        </Button>
      </Box>
    </Container>
  );
}

export async function mealDetailsloader({ params }: { params: { id: string } }) {
  const data = await queryClient.ensureQueryData({
    queryKey: ["meal", params.id],
    queryFn: () => mealService.getMealById(params.id),
    staleTime: 1000 * 60 * 60, // cache per 1 hour
  });
  return data;
}