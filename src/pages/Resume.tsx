import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Download } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Seo } from "@/components/Seo";

const Resume = () => {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const A4_WIDTH_MM = 210;
  const A4_HEIGHT_MM = 297;
  const A4_WIDTH_PX = 794; // approx 96 DPI
  const A4_HEIGHT_PX = 1123;

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 16, y: 96 }); // default right side
  const dragOffset = useRef({ x: 0, y: 0 });

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="relative min-h-screen bg-[#1a1a1a] flex flex-col overflow-x-hidden">
      <Seo
        title="Resume | Kedhar - AI Engineer and Software Developer"
        description="View and download Kedhar's resume, including experience in AI engineering, software development, and data systems."
        path="/resume"
        image="/og-resume.png"
        imageAlt="Resume page for Kedhar"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Resume - Kedhar",
          url: "https://kedhar.vercel.app/resume",
        }}
      />
      <Navigation />

      <main className="relative z-10 flex-grow flex flex-col items-center pt-8 pb-12 w-full overflow-hidden">
        {/* Scale Wrapper */}
        <div
          style={{
            width: `${A4_WIDTH_PX}px`,
            height: `${A4_HEIGHT_PX}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            // Compensate for the space lost by scaling down
            // Add a bit of bottom margin to ensure it's not cut off
            marginBottom: `-${A4_HEIGHT_PX * (1 - scale)}px`
          }}
          className="relative shadow-2xl transition-transform duration-200 ease-out origin-top shrink-0"
        >
          {/* A4 Paper Container - Fixed Dimensions */}
          <div className="w-full h-full bg-[#f5f5f0] text-[#1a1a1a] p-8 sm:p-10 relative overflow-hidden">

            {/* Download Button - Fixed position for better accessibility */}
            <a
              href="/Kedhareswer_AIEnginner.pdf"
              download
              className="fixed top-24 sm:top-32 right-4 sm:right-8 z-50 flex items-center gap-2 border-2 border-[#ff0000] bg-white/90 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 font-body text-xs sm:text-sm uppercase tracking-[0.15em] text-[#ff0000] hover:bg-[#ff0000] hover:text-white transition-all rounded-md shadow-lg cursor-pointer"
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">PDF</span>
              <span className="sm:hidden">PDF</span>
            </a>

            {/* Header */}
            <div className="mb-6 border-b-2 border-[#1a1a1a] pb-5">
              <div className="flex flex-row items-baseline justify-between gap-2">
                <div className="text-right">
                  <span className="font-body text-xs uppercase tracking-[0.2em] text-[#666]">Software Developer</span>
                </div>
              </div>
              <h1 className="mt-3 font-heading text-4xl font-bold uppercase tracking-tight text-[#ff0000] leading-none">
                MARLAKUNTA KEDHARESWER NAIDU
              </h1>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-body text-xs text-[#666]">
                <a href="mailto:kedhareswer.12110626@gmail.com" className="hover:text-[#ff0000] transition-colors">kedhareswer.12110626@gmail.com</a>
                <span>·</span>
                <a href="https://linkedin.com/in/kedhareswernaidu" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff0000] transition-colors">linkedin.com/in/kedhareswernaidu</a>
                <span>·</span>
                <a href="https://github.com/Kedhareswer" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff0000] transition-colors">github.com/Kedhareswer</a>
              </div>
            </div>

            {/* Profile Summary */}
            <section className="mb-6">
              <h2 className="mb-2 font-heading text-sm font-bold uppercase tracking-[0.2em] text-[#ff0000]">Profile Summary</h2>
              <p className="font-body text-xs leading-relaxed text-[#333] text-justify">
                Software developer with a background in AI and machine learning. Has built web applications, worked on document processing systems, and created data tools during internships. Likes solving problems with code and is always learning something new. Believes in building things that actually work rather than just talking about them.
              </p>
            </section>

            {/* Two Column Layout - Fixed Grid */}
            <div className="grid grid-cols-[1.4fr_1fr] gap-8 h-full">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Skills */}
                <section>
                  <h2 className="mb-2 font-heading text-sm font-bold uppercase tracking-[0.2em] text-[#ff0000]">Skills</h2>
                  <ul className="space-y-1 font-body text-xs text-[#333]">
                    <li>• Python, SQL, JavaScript, TypeScript, R</li>
                    <li>• React, Next.js, FastAPI, Node.js</li>
                    <li>• Computer Vision, NLP, Deep Learning</li>
                    <li>• Tableau, Power BI, Data Visualization</li>
                    <li>• MySQL, Neon, Vector Databases</li>
                  </ul>
                </section>

                {/* Work Experience */}
                <section>
                  <h2 className="mb-2 font-heading text-sm font-bold uppercase tracking-[0.2em] text-[#ff0000]">Work Experience</h2>
                  <div className="space-y-4">
                    {/* DiligenceVault */}
                    <div>
                      <h3 className="font-heading text-xs font-bold uppercase text-[#1a1a1a]">DiligenceVault</h3>
                      <div className="mt-1 space-y-2">
                        <div>
                          <p className="font-body text-[10px] uppercase tracking-[0.15em] text-[#666]">Software Developer · Jan 2026 - Present</p>
                          <p className="font-body text-[10px] text-[#666]">Bengaluru, Karnataka, India</p>
                          <ul className="mt-1 space-y-0.5 font-body text-[11px] leading-relaxed text-[#333]">
                            <li className="pl-2 indent-[-6px]">• Building scalable web applications and AI-powered features for enterprise platform</li>
                            <li className="pl-2 indent-[-6px]">• Developing full-stack solutions using React, Next.js, and modern web technologies</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-body text-[10px] uppercase tracking-[0.15em] text-[#666]">AI Engineer Intern · Oct 2025 - Dec 2025</p>
                          <p className="font-body text-[10px] text-[#666]">India</p>
                          <ul className="mt-1 space-y-0.5 font-body text-[11px] leading-relaxed text-[#333]">
                            <li className="pl-2 indent-[-6px]">• Worked on AI-driven solutions for digital fund due diligence ecosystem</li>
                            <li className="pl-2 indent-[-6px]">• Contributed to AI-engineered frameworks for structured data extraction and analysis</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* upGrad */}
                    <div>
                      <h3 className="font-heading text-xs font-bold uppercase text-[#1a1a1a]">upGrad</h3>
                      <p className="font-body text-[10px] uppercase tracking-[0.15em] text-[#666] mt-0.5">Research Intern · Jan 2025 - Apr 2025</p>
                      <p className="font-body text-[10px] text-[#666]">Bengaluru, Karnataka, India</p>
                      <ul className="mt-1 space-y-0.5 font-body text-[11px] leading-relaxed text-[#333]">
                        <li className="pl-2 indent-[-6px]">• Developed hybrid system combining Yara rules with ML for malware detection</li>
                      </ul>
                    </div>

                    {/* Psyliq */}
                    <div>
                      <h3 className="font-heading text-xs font-bold uppercase text-[#1a1a1a]">Psyliq</h3>
                      <p className="font-body text-[10px] uppercase tracking-[0.15em] text-[#666] mt-0.5">Data Analyst Intern · Jan 2024 - Feb 2024</p>
                      <p className="font-body text-[10px] text-[#666]">Hyderabad, Telangana, India</p>
                      <ul className="mt-1 space-y-0.5 font-body text-[11px] leading-relaxed text-[#333]">
                        <li className="pl-2 indent-[-6px]">• Created data visualizations with Power BI for stakeholder insights</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Certifications */}
                <section>
                  <h2 className="mb-2 font-heading text-sm font-bold uppercase tracking-[0.2em] text-[#ff0000]">Certifications</h2>
                  <ul className="space-y-1.5 font-body text-[11px] text-[#333]">
                    <li>• Neo4j Certified Professional</li>
                    <li>• AWS APAC Solutions Architecture</li>
                    <li>• Model Context Protocol - LLM Foundations</li>
                  </ul>
                </section>

                {/* Education */}
                <section>
                  <h2 className="mb-2 font-heading text-sm font-bold uppercase tracking-[0.2em] text-[#ff0000]">Education</h2>
                  <div className="space-y-3">
                    {/* Lovely Professional University */}
                    <div>
                      <h3 className="font-heading text-xs font-bold uppercase text-[#1a1a1a]">Lovely Professional University</h3>
                      <p className="font-body text-[10px] uppercase tracking-[0.15em] text-[#666] mt-0.5">CSE · Sep 2021 - Jul 2025</p>
                      <p className="font-body text-[10px] text-[#666]">Phagwara, Punjab, India</p>
                      <p className="font-body text-[10px] text-[#333] mt-1">Data Science (AI & ML)</p>
                      <p className="font-body text-[10px] text-[#666]">CGPA: 7.74</p>
                    </div>

                    {/* Sri Siddhartha Junior College */}
                    <div>
                      <h3 className="font-heading text-xs font-bold uppercase text-[#1a1a1a]">Sri Siddhartha Junior College</h3>
                      <p className="font-body text-[10px] uppercase tracking-[0.15em] text-[#666] mt-0.5">Intermediate · Jul 2019 - Jun 2021</p>
                      <p className="font-body text-[10px] text-[#666]">Madanapalli, Andhra Pradesh, India</p>
                      <p className="font-body text-[10px] text-[#333] mt-1">Science Stream</p>
                      <p className="font-body text-[10px] text-[#666]">Marks: 889</p>
                    </div>

                    {/* Vijaya Bharathi English Medium High School */}
                    <div>
                      <h3 className="font-heading text-xs font-bold uppercase text-[#1a1a1a]">Vijaya Bharathi English Medium High School</h3>
                      <p className="font-body text-[10px] uppercase tracking-[0.15em] text-[#666] mt-0.5">Matriculation · Jun 2018 - Mar 2019</p>
                      <p className="font-body text-[10px] text-[#666]">Madanapalli, Andhra Pradesh, India</p>
                      <p className="font-body text-[10px] text-[#333] mt-1">General Studies</p>
                      <p className="font-body text-[10px] text-[#666]">GPA: 9.5</p>
                    </div>
                  </div>
                </section>

                {/* Leadership */}
                <section>
                  <h2 className="mb-2 font-heading text-sm font-bold uppercase tracking-[0.2em] text-[#ff0000]">Leadership</h2>
                  <div className="space-y-3">
                    {/* AIESEC */}
                    <div>
                      <h3 className="font-heading text-xs font-bold uppercase text-[#1a1a1a]">AIESEC</h3>
                      <div className="mt-1 space-y-2">
                        <div>
                          <p className="font-body text-[10px] uppercase tracking-[0.15em] text-[#666]">Senior Manager · Aug 2023 - Dec 2023</p>
                          <p className="font-body text-[10px] text-[#666]">Phagwara, Punjab, India</p>
                          <p className="font-body text-[11px] text-[#333] mt-1">Managed outbound professional exchange programs in OGT department</p>
                        </div>
                        <div>
                          <p className="font-body text-[10px] uppercase tracking-[0.15em] text-[#666]">Junior Manager · May 2023 - Aug 2023</p>
                          <p className="font-body text-[10px] text-[#666]">Phagwara, Punjab, India</p>
                          <p className="font-body text-[11px] text-[#333] mt-1">Engaged potential candidates through outreach, created marketing content using Canva</p>
                        </div>
                        <div>
                          <p className="font-body text-[10px] uppercase tracking-[0.15em] text-[#666]">Member · Jan 2023 - May 2023</p>
                          <p className="font-body text-[10px] text-[#666]">Phagwara, Punjab, India</p>
                          <p className="font-body text-[11px] text-[#333] mt-1">Developed communication skills through team collaboration and conferences</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Footer - Full width */}
            <div className="absolute bottom-6 left-0 right-0 text-center px-8">
              <p className="font-body text-[9px] text-[#999] italic leading-tight">
                * This visual resume leverages creative freedom to express my professional journey. For a traditional format, download the PDF version.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer quote="Designed with intelligence. Built with precision." />
    </div>
  );
};

export default Resume;
