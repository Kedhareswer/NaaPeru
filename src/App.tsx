import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatProvider } from "@/contexts/ChatContext";
import { ChatBot } from "@/components/ChatBot";
import Work from "./pages/Work";
import Fun from "./pages/Fun";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { CaseStudyQuantumPDF } from "./pages/CaseStudyQuantumPDF";
import { CaseStudyThesisFlow } from "./pages/CaseStudyThesisFlow";
import { CaseStudyDataNotebook } from "./pages/CaseStudyDataNotebook";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ChatProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Work />} />
            <Route path="/fun" element={<Fun />} />
            <Route path="/about" element={<About />} />
            <Route path="/case-study/quantumpdf" element={<CaseStudyQuantumPDF />} />
            <Route path="/case-study/thesisflow" element={<CaseStudyThesisFlow />} />
            <Route path="/case-study/data-notebook" element={<CaseStudyDataNotebook />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <ChatBot />
      </ChatProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
