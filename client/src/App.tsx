import { Switch, Route } from "wouter";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "sonner";
import Home from "./pages/home";
import Setup from "./pages/setup";
import Demo from "./pages/demo";
import TicketmasterDemo from "./pages/ticketmaster-demo";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/setup/:partnerId?" component={Setup} />
        <Route path="/demo/ticketmaster" component={TicketmasterDemo} />
        <Route path="/demo" component={Demo} />
        <Route>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-semibold mb-2">404</h1>
              <p className="text-muted-foreground">Page not found</p>
            </div>
          </div>
        </Route>
      </Switch>
      <Toaster position="bottom-right" />
    </QueryClientProvider>
  );
}
