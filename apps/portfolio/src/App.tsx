import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "./pages/NotFound";
import ResumePage from "./pages/ResumePage";
import SiloPage from "./pages/labs/SiloPage";
import FlowPage from "./pages/labs/FlowPage";
import { NavIntentProvider } from "./contexts/NavIntentContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TransitionProvider } from "./contexts/TransitionContext";
import { AnimatePresence } from "framer-motion";
import SmoothScroll from "./components/SmoothScroll";
import { useParams } from "react-router-dom";
import { V2_CASE_SLUGS } from "./v2/slugs";
import { SUBSTACK_URL } from "./v2/lib";

// v2 "Industrial Index" pages (code-split: they bring three.js and their own styles).
const HomeV2 = lazy(() => import("./v2/pages/HomeV2"));
const CaseStudyV2 = lazy(() => import("./v2/pages/CaseStudyV2"));
const V2Fallback = () => <div style={{ minHeight: "100vh", background: "var(--v2-boot-bg, #F6F7F9)" }} />;

/** Redirects external destinations (e.g. Substack) seamlessly. */
const ExternalRedirect = ({ to }: { to: string }) => {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
};

/** Only the active v2 case studies are exposed; legacy layout projects are hidden for now. */
const ProjectRoute = () => {
  const { slug } = useParams();
  if (slug && V2_CASE_SLUGS.has(slug)) {
    return (
      <Suspense fallback={<V2Fallback />}>
        <CaseStudyV2 slug={slug} />
      </Suspense>
    );
  }
  return <Navigate to="/" replace />;
};

const queryClient = new QueryClient();

/** Scrolls to the element matching the URL hash after navigation, retrying as lazy-loaded components mount. */
const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (attempts < 10) {
        attempts++;
        timer = setTimeout(scroll, 80);
      }
    };
    timer = setTimeout(scroll, 60);
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
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/design" element={<Navigate to="/#work" replace />} />
        <Route path="/ux-design" element={<Navigate to="/#work" replace />} />
        <Route path="/design-engineering" element={<Navigate to="/#work" replace />} />
        <Route path="/data-engineering" element={<Navigate to="/#work" replace />} />
        <Route path="/projects" element={<Navigate to="/#work" replace />} />
        <Route path="/visual-design" element={<Navigate to="/#work" replace />} />
        <Route path="/labs" element={<Navigate to="/labs/tack" replace />} />
        <Route path="/labs/silo" element={<SiloPage />} />
        <Route path="/labs/flow" element={<Navigate to="/labs/tack" replace />} />
        <Route path="/labs/tack" element={<FlowPage />} />
        <Route path="/projects/ai" element={<Navigate to="/" replace />} />
        <Route path="/projects/act-ai" element={<Navigate to="/" replace />} />
        <Route path="/projects/:slug" element={<ProjectRoute />} />
        <Route path="/publication" element={<ExternalRedirect to={SUBSTACK_URL} />} />
        <Route path="/writings" element={<ExternalRedirect to={SUBSTACK_URL} />} />
        <Route path="/writings/publication" element={<ExternalRedirect to={SUBSTACK_URL} />} />
        <Route path="/writings/research" element={<ExternalRedirect to={SUBSTACK_URL} />} />
        <Route path="/ux-bites" element={<Navigate to="/" replace />} />
        <Route path="/ux-bites/*" element={<Navigate to="/" replace />} />
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
