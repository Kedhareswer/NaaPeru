import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatProvider } from "@/contexts/ChatContext";

const Work = lazy(() => import("./pages/Work"));
const Fun = lazy(() => import("./pages/Fun"));
const About = lazy(() => import("./pages/About"));
const Resume = lazy(() => import("./pages/Resume"));
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ChatProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Work />} />
              <Route path="/fun" element={<Fun />} />
              <Route path="/about" element={<About />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/case-study/quantumpdf" element={<CaseStudyQuantumPDF />} />
              <Route path="/case-study/thesisflow" element={<CaseStudyThesisFlow />} />
              <Route path="/case-study/data-notebook" element={<CaseStudyDataNotebook />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Suspense fallback={null}>
          <ChatBot />
        </Suspense>
      </ChatProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
