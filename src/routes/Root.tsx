import { Outlet, NavLink } from "react-router";
import {
  Container,
  Flex,
  Heading,
  IconButton,
  Box,
  useBreakpointValue,
  VStack,
  HStack,
  Portal,
  CloseButton,
  Drawer,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { ColorModeButton } from "../components/ui/color-mode";
import { useState } from "react";
import { LuMenu } from "react-icons/lu";

export function Root() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [open, setOpen] = useState(false);

  const NavigationLinks = () => (
    <HStack gap={4}>
      <ChakraLink
        as={NavLink}
        //@ts-expect-error `to` is from NavLink but the type cant reconcile with `as`
        to="/"
      >
        Search
      </ChakraLink>
      <ChakraLink
        as={NavLink}
        //@ts-expect-error `to` is from NavLink but the type cant reconcile with `as`
        to="/advanced-search"
      >
        Advanced Search
      </ChakraLink>
      <ChakraLink
        as={NavLink}
        //@ts-expect-error `to` is from NavLink but the type cant reconcile with `as`
        to="/favourites"
      >
        Favorites
      </ChakraLink>
    </HStack>
  );

  const MobileMenu = () => (
    <>
      <IconButton
        variant="outline"
        aria-label="Menu"
        onClick={() => setOpen(true)}
        name="Menu"
      >
        <LuMenu />
      </IconButton>
      <Drawer.Root
        open={open}
        onOpenChange={(e: { open: boolean }) => setOpen(e.open)}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Menu</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <VStack gap={4} align="stretch">
                  <ChakraLink
                    as={NavLink}
                    //@ts-expect-error `to` is from NavLink but the type cant reconcile with `as`
                    to="/"
                    onClick={() => setOpen(false)}
                  >
                    Search
                  </ChakraLink>
                  <ChakraLink
                    as={NavLink}
                    //@ts-expect-error `to` is from NavLink but the type cant reconcile with `as`
                    to="/advanced-search"
                    onClick={() => setOpen(false)}
                  >
                    Advanced Search
                  </ChakraLink>
                  <ChakraLink
                    as={NavLink}
                    //@ts-expect-error `to` is from NavLink but the type cant reconcile with `as`
                    to="/favourites"
                    onClick={() => setOpen(false)}
                  >
                    Favorites
                  </ChakraLink>
                  <ColorModeButton />
                </VStack>
              </Drawer.Body>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );

  return (
    <Container maxW="container.xl" centerContent>
      <Flex justifyContent="space-between" alignItems="center" w="100%">
        <Heading as="h1" size="xl" my={8}>
          <NavLink to="/">The Meal DB Client</NavLink>
        </Heading>
        {isMobile ? <MobileMenu /> : <ColorModeButton />}
      </Flex>
      {!isMobile && (
        <Box w="100%" mb={8}>
          <NavigationLinks />
        </Box>
      )}
      <Container maxW="container.xl" as="main" py={8}>
        <Outlet />
      </Container>
    </Container>
  );
}
