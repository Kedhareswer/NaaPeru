import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { About as AboutComponent } from "@/components/About";
import { Seo } from "@/components/Seo";

const About = () => {
  return (
    <div className="overflow-x-hidden">
      <Seo
        title="About Kedhar | AI Engineer and Product Builder"
        description="Learn about Kedhar's background, approach to AI product engineering, and focus on building practical, high-impact systems."
        path="/about"
        image="/og-about.png"
        imageAlt="About Kedhar AI engineer profile page"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: "About Kedhar",
          url: "https://kedhar.vercel.app/about",
          mainEntity: {
            "@type": "Person",
            name: "Kedhar",
            jobTitle: "AI Engineer and Developer",
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
