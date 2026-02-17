import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectPage from "./pages/ProjectPage";
import ResumePage from "./pages/ResumePage";
import ProjectList from "./components/ProjectList";
import { TransitionProvider } from "./contexts/TransitionContext";
import { ModeProvider } from "./contexts/ModeContext";
import PageTransition from "./components/PageTransition";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

/** Scrolls to the element matching the URL hash after navigation. */
const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;
    // Small delay so the target page has time to render its DOM
    const timer = setTimeout(() => {
      const id = hash.replace("#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timer);
  }, [hash, pathname]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const basename = import.meta.env.BASE_URL;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <TransitionProvider>
          <ModeProvider>
            <BrowserRouter basename={basename}>
              <ScrollToHash />
              <AnimatedRoutes />
            </BrowserRouter>
          </ModeProvider>
        </TransitionProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
