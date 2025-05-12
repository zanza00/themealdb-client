import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import { NavLink, useRouteError, isRouteErrorResponse } from "react-router";

export function ErrorElement() {
  const error = useRouteError() as Error;

  let errorMessage = "";
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

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
          {errorMessage}
        </Text>
        <Button
          colorScheme="red"
          as={NavLink}
          //@ts-expect-error `to` is from NavLink but the type cant reconcile with `as`
          to="/"
        >
          Go back to home
        </Button>
      </Box>
    </Container>
  );
}
