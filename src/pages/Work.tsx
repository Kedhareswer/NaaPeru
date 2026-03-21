import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WorkHero } from "@/components/WorkHero";
import { InfiniteMarquee } from "@/components/InfiniteMarquee";
import { WorkProjects } from "@/components/WorkProjects";
import { Seo } from "@/components/Seo";

const Work = () => {
  const [loading, setLoading] = useState(() => {
    // Check if user has already seen the loading screen in this session
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');
    return !hasSeenLoading;
  });

  useEffect(() => {
    // Prevent scroll during loading
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  const handleLoadingComplete = () => {
    setLoading(false);
    // Mark that user has seen the loading screen in this session
    sessionStorage.setItem('hasSeenLoading', 'true');
  };

  return (
    <>
      <Seo
        title="Kedhar (Kedhareswer) | AI Engineer Portfolio &amp; Case Studies"
        description="Portfolio of Marlakunta Kedhareswer Naidu (Kedhar), AI Engineer from India. Featuring case studies on ThesisFlow AI, QuantumPDF RAG system, and 10+ AI-powered projects."
        path="/"
        image="/og-work.png"
        imageAlt="Kedhar Kedhareswer Naidu AI Engineer portfolio and case studies"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Marlakunta Kedhareswer Naidu",
          alternateName: ["Kedhar", "Kedhareswer"],
          url: "https://kedhar.vercel.app/",
          jobTitle: "AI Engineer",
          description:
            "AI Engineer and Full-Stack Developer from India specializing in LLMs, RAG systems, computer vision, and human-centered AI products.",
          knowsAbout: [
            "Artificial Intelligence",
            "Machine Learning",
            "LLMs",
            "RAG Systems",
            "Computer Vision",
            "NLP",
            "Deep Learning",
            "React",
            "Python",
            "TypeScript",
          ],
          sameAs: [
            "https://github.com/Kedhareswer",
            "https://www.linkedin.com/in/kedhareswernaidu/",
            "https://www.kaggle.com/kedhareswernaidu",
            "https://21st.dev/community/kedhar",
          ],
        }}
      />
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <div className={loading ? "hidden" : "block overflow-x-hidden"}>
        <Navigation />
        <main className="overflow-x-hidden">
          <WorkHero />
          <InfiniteMarquee />
          <WorkProjects />
        </main>
        <Footer quote="Design with intent. Engineer with care." />
      </div>
    </>
  );
};

export default Work;
