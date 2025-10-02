import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectPage from "./pages/ProjectPage";
import { ParticlesBackground } from "./components/ParticlesBackground";
import { ThemeProvider } from "./contexts/ThemeContext";

const queryClient = new QueryClient();

const IndexWrapper = () => <Index />;

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexWrapper />,
  },
  {
    path: "/project/:projectId",
    element: <ProjectPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <ParticlesBackground />
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
