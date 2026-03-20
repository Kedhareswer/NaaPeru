import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ChatProvider } from "@/contexts/ChatContext";
import { TransitionProvider } from "@/contexts/TransitionContext";
import { FilmShutterOverlay } from "@/components/FilmShutterOverlay";
import { PageTransition } from "@/components/PageTransition";

const Work = lazy(() => import("./pages/Work"));
const Fun = lazy(() => import("./pages/Fun"));
const About = lazy(() => import("./pages/About"));
const Poreia = lazy(() => import("./pages/Poreia"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ChatBot = lazy(() =>
  import("@/components/ChatBot").then((module) => ({
    default: module.ChatBot,
  })),
);
const CaseStudyQuantumPDF = lazy(() =>
  import("./pages/CaseStudyQuantumPDF").then((module) => ({
    default: module.CaseStudyQuantumPDF,
  })),
);
const CaseStudyThesisFlow = lazy(() =>
  import("./pages/CaseStudyThesisFlow").then((module) => ({
    default: module.CaseStudyThesisFlow,
  })),
);
const CaseStudyDataNotebook = lazy(() =>
  import("./pages/CaseStudyDataNotebook").then((module) => ({
    default: module.CaseStudyDataNotebook,
  })),
);
const RemotionDemo = lazy(() => import("./pages/RemotionDemo"));

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <TransitionProvider>
      <FilmShutterOverlay />
      <Suspense fallback={null}>
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Work />} />
            <Route path="/fun" element={<Fun />} />
            <Route path="/about" element={<About />} />
            <Route path="/poreia" element={<Poreia />} />
            <Route path="/case-study/quantumpdf" element={<CaseStudyQuantumPDF />} />
            <Route path="/case-study/thesisflow" element={<CaseStudyThesisFlow />} />
            <Route path="/case-study/data-notebook" element={<CaseStudyDataNotebook />} />
            <Route path="/remotion-demo" element={<RemotionDemo />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </Suspense>
    </TransitionProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ChatProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
        <Suspense fallback={null}>
          <ChatBot />
        </Suspense>
      </ChatProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
