import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { About as AboutComponent } from "@/components/About";

const About = () => {
  return (
    <div className="overflow-x-hidden">
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
