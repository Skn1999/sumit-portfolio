import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectPage from "./pages/ProjectPage";
import ResumePage from "./pages/ResumePage";
import UxBitePage from "./pages/UxBitePage";
import UxDesignPage from "./pages/UxDesignPage";
import VisualDesignPage from "./pages/VisualDesignPage";
import WritingsPage from "./pages/WritingsPage";
import DataEngineeringPage from "./pages/DataEngineeringPage";
import DesignEngineeringPage from "./pages/DesignEngineeringPage";
import SiloPage from "./pages/labs/SiloPage";
import FlowPage from "./pages/labs/FlowPage";
import { NavIntentProvider } from "./contexts/NavIntentContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TransitionProvider } from "./contexts/TransitionContext";
import { AnimatePresence } from "framer-motion";
import SmoothScroll from "./components/SmoothScroll";
import { useParams } from "react-router-dom";
import { V2_CASE_SLUGS } from "./v2/slugs";

// v2 "Industrial Index" pages (code-split: they bring three.js and their own styles).
const HomeV2 = lazy(() => import("./v2/pages/HomeV2"));
const CaseStudyV2 = lazy(() => import("./v2/pages/CaseStudyV2"));
const V2Fallback = () => <div style={{ minHeight: "100vh", background: "var(--v2-boot-bg, #F6F7F9)" }} />;

/** The six rebuilt case studies use the v2 template; every other project keeps the classic page. */
const ProjectRoute = () => {
  const { slug } = useParams();
  if (slug && V2_CASE_SLUGS.has(slug)) {
    return (
      <Suspense fallback={<V2Fallback />}>
        <CaseStudyV2 slug={slug} />
      </Suspense>
    );
  }
  return <ProjectPage />;
};

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
        <Route path="/" element={<Suspense fallback={<V2Fallback />}><HomeV2 /></Suspense>} />
        <Route path="/classic" element={<Index />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/design" element={<UxDesignPage />} />
        <Route path="/ux-design" element={<UxDesignPage />} />
        <Route path="/design-engineering" element={<DesignEngineeringPage />} />
        <Route path="/data-engineering" element={<DesignEngineeringPage />} />
        <Route path="/labs/silo" element={<SiloPage />} />
        <Route path="/labs/flow" element={<Navigate to="/labs/tack" replace />} />
        <Route path="/labs/tack" element={<FlowPage />} />
        <Route path="/projects" element={<UxDesignPage />} />
        <Route path="/projects/ai" element={<Navigate to="/projects/actai" replace />} />
        <Route path="/projects/act-ai" element={<Navigate to="/projects/actai" replace />} />
        <Route path="/projects/:slug" element={<ProjectRoute />} />
        <Route path="/visual-design" element={<UxDesignPage />} />
        <Route path="/writings/publication" element={<WritingsPage />} />
        <Route path="/writings/research" element={<WritingsPage />} />
        <Route path="/ux-bites" element={<WritingsPage />} />
        <Route path="/ux-bites/:slug" element={<UxBitePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const basename = import.meta.env.BASE_URL;

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Sonner />
          <ThemeProvider>
            <TransitionProvider>
              <BrowserRouter basename={basename}>
                <NavIntentProvider>
                  <ScrollToHash />
                  <SmoothScroll />
                  <AnimatedRoutes />
                </NavIntentProvider>
              </BrowserRouter>
            </TransitionProvider>
          </ThemeProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
