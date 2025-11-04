import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WorkHero } from "@/components/WorkHero";
import { InfiniteMarquee } from "@/components/InfiniteMarquee";
import { WorkProjects } from "@/components/WorkProjects";

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
