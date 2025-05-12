import { Outlet } from "react-router";
import { Container, Flex, Heading } from "@chakra-ui/react";
import { ColorModeButton } from "../components/ui/color-mode";

export function Root() {
  return (
    <Container maxW="container.xl" centerContent>
      <Flex justifyContent="space-between" alignItems="center" w="100%">
        <Heading as="h1" size="xl" my={8}>
          The Meal DB Client
        </Heading>
        <ColorModeButton />
      </Flex>
      <Container maxW="container.xl" as="main" py={8}>
        <Outlet />
      </Container>
    </Container>
  );
}
