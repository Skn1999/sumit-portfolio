import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectPage from "./pages/ProjectPage";
import ProjectList from "./components/ProjectList";
import { TransitionProvider } from "./contexts/TransitionContext";
import { ModeProvider } from "./contexts/ModeContext";
import PageTransition from "./components/PageTransition";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <TransitionProvider>
        <ModeProvider>
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </ModeProvider>
      </TransitionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
