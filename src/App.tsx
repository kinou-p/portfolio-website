import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";

// Lazy load pages et composants lourds pour de meilleures performances
// Cela réduit la quantité de JavaScript chargé initialement
const Index = lazy(() => import("./pages/Index"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// ParticlesBackground est chargé en lazy car non critique pour le FCP/LCP
const ParticlesBackground = lazy(() => 
  import("./components/ParticlesBackground").then(m => ({ default: m.ParticlesBackground }))
);

// Configuration QueryClient optimisée
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Loading fallback component minimal
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
