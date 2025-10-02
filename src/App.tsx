import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";

// Lazy load pages and heavy components for better performance
const Index = lazy(() => import("./pages/Index"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ParticlesBackground = lazy(() => import("./components/ParticlesBackground").then(m => ({ default: m.ParticlesBackground })));

const queryClient = new QueryClient();

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

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
        <Suspense fallback={null}>
          <ParticlesBackground />
        </Suspense>
        <Toaster />
        <Sonner />
        <Suspense fallback={<PageLoader />}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
