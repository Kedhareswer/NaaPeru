import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { About as AboutComponent } from "@/components/About";
import { Seo } from "@/components/Seo";

const About = () => {
  return (
    <div className="overflow-x-hidden">
      <Seo
        title="About Kedhar (Kedhareswer Naidu) | AI Engineer from India"
        description="Marlakunta Kedhareswer Naidu (Kedhar) is an AI Engineer from Andhra Pradesh, India. B.Tech in CS (Data Science) from LPU. Works at DiligenceVault building AI document processing systems."
        path="/about"
        image="/og-about.png"
        imageAlt="About Kedhar Kedhareswer Naidu AI Engineer profile"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: "About Marlakunta Kedhareswer Naidu (Kedhar)",
          url: "https://kedhar.vercel.app/about",
          mainEntity: {
            "@type": "Person",
            name: "Marlakunta Kedhareswer Naidu",
            alternateName: ["Kedhar", "Kedhareswer"],
            jobTitle: "AI Engineer",
            description:
              "AI Engineer and Full-Stack Developer from Andhra Pradesh, India. Specializes in LLMs, RAG systems, computer vision, and NLP.",
            worksFor: {
              "@type": "Organization",
              name: "DiligenceVault",
            },
            alumniOf: {
              "@type": "CollegeOrUniversity",
              name: "Lovely Professional University",
            },
            sameAs: [
              "https://github.com/Kedhareswer",
              "https://www.linkedin.com/in/kedhareswernaidu/",
              "https://www.kaggle.com/kedhareswernaidu",
            ],
          },
        }}
      />
      <Navigation />
      <main className="overflow-x-hidden">
        <Hero />
        <AboutComponent />
      </main>
      <Footer quote="Curious about people, disciplined about craft." />
    </div>
  );
};

export default About;
