import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "./components/ui/provider";
import { ColorModeProvider } from "./components/ui/color-mode";
import { RouterProvider } from "react-router";
import { router } from "./routes/routing";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider>
      <ColorModeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ColorModeProvider>
    </Provider>
  );
}

export default App;
