import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import { NavLink } from "react-router";

export function NotFound() {
  return (
    <Container maxW="container.md" py={10}>
      <Box
        p={8}
        borderWidth="1px"
        borderRadius="lg"
      >
        <Heading as="h1" size="xl" mb={4}>
          404 - Page Not Found
        </Heading>
        <Text fontSize="lg" mb={6}>
          The page you are looking for does not exist.
        </Text>
        <Button
          colorScheme="blue"
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
 