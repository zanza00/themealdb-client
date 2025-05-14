import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "./components/ui/provider";
import { ColorModeProvider } from "./components/ui/color-mode";
import { RouterProvider } from "react-router";
import { createRouter } from "./routes/routing";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider>
      <ColorModeProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <RouterProvider router={createRouter(queryClient)} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ColorModeProvider>
    </Provider>
  );
}

export default App;
