import { useState } from 'react'
import { Box, Button, Container, Heading, Flex } from '@chakra-ui/react'
import { Provider } from './components/ui/provider'
import { ColorModeProvider, ColorModeButton } from './components/ui/color-mode'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider>
      <ColorModeProvider>
        <Container maxW="container.xl" centerContent>
          <Flex justifyContent="space-between" alignItems="center" w="100%">
            <Heading as="h1" size="xl" my={8}>
              The Meal DB Client
            </Heading>
            <ColorModeButton />
          </Flex>
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Button colorScheme="blue" onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </Button>
          </Box>
        </Container>
      </ColorModeProvider>
    </Provider>
  )
}

export default App
