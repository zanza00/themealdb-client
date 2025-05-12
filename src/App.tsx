import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MealSearch } from "./components/MealSearch";
import { Container, Flex, Heading } from "@chakra-ui/react";
import { Provider } from "./components/ui/provider";
import { ColorModeProvider, ColorModeButton } from "./components/ui/color-mode";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider>
      <ColorModeProvider>
        <QueryClientProvider client={queryClient}>
          <Container maxW="container.xl" centerContent>
            <Flex justifyContent="space-between" alignItems="center" w="100%">
              <Heading as="h1" size="xl" my={8}>
                The Meal DB Client
              </Heading>
              <ColorModeButton />
            </Flex>
            <Container maxW="container.xl" as="main" py={8}>
              <MealSearch />
            </Container>
          </Container>
        </QueryClientProvider>
      </ColorModeProvider>
    </Provider>
  );
}

export default App;
