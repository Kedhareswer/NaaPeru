import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Download } from "lucide-react";

const Resume = () => {

  return (
    <div className="relative min-h-screen bg-[#1a1a1a]">
      <Navigation />

      <main className="relative z-10 flex items-center justify-center px-4 py-12 sm:py-24 md:py-32">
        {/* A4 Paper Container */}
        <div className="relative w-full max-w-full md:max-w-[210mm] bg-[#f5f5f0] text-[#1a1a1a] shadow-2xl p-4 sm:p-6 md:p-10 lg:p-12 md:min-h-[297mm] mx-auto">
          {/* Download Button - Top Right */}
          <div className="static md:absolute md:top-8 md:right-8 flex justify-end">
            <a 
              href="/Kedhareswer_AIEnginner.pdf" 
              download 
              className="flex items-center gap-2 border-2 border-[#ff0000] bg-transparent px-3 py-1.5 sm:px-4 sm:py-2 font-body text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#ff0000] hover:bg-[#ff0000] hover:text-white transition-all"
            >
              <Download className="h-4 w-4" />
              PDF
            </a>
          </div>

          {/* Header */}
          <div className="mb-8 border-b-2 border-[#1a1a1a] pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <div>
                <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#666]">[RESUME]</span>
              </div>
              <div className="text-left sm:text-right">
                <span className="font-body text-xs uppercase tracking-[0.2em] text-[#666]">AI ENGINEER</span>
              </div>
            </div>
            <h1 className="mt-4 font-heading text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#ff0000] leading-none">
              MARLAKUNTA<br />KEDHARESWER<br />NAIDU
            </h1>
            <div className="mt-4 flex flex-wrap gap-4 font-body text-xs text-[#666] break-words">
              <span>kedhareswer.12110626@gmail.com</span>
              <span>·</span>
              <span>linkedin.com/in/kedhareswernaidu</span>
              <span>·</span>
              <span>github.com/Kedhareswer</span>
            </div>
          </div>

          {/* Profile Summary */}
          <section className="mb-8">
            <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-[0.2em] text-[#ff0000]">Profile Summary</h2>
            <p className="font-body text-sm leading-relaxed text-[#333]">
              Passionate AI/ML and Data Science enthusiast with hands-on experience in machine learning, data analysis, and web development. Currently a final year student with expertise in building intelligent systems and optimizing machine learning workflows, with a focus on computer vision, NLP, and AI-driven automation. Skilled in transforming complex data challenges into clear, actionable insights that drive meaningful business results through innovative AI solutions and cutting-edge machine learning techniques.
            </p>
          </section>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 md:gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Skills */}
              <section>
                <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-[0.2em] text-[#ff0000]">Skills</h2>
                <ul className="space-y-1.5 font-body text-xs text-[#333]">
                  <li>• Python, SQL, JavaScript, TypeScript, R</li>
                  <li>• TensorFlow, PyTorch, Scikit-learn</li>
                  <li>• React, Next.js, FastAPI, Node.js</li>
                  <li>• Computer Vision, NLP, Deep Learning</li>
                  <li>• AWS, Azure, Vercel</li>
                  <li>• Tableau, Power BI, Data Visualization</li>
                  <li>• MySQL, Neon, Vector Databases</li>
                  <li>• Git, GitHub, CI/CD</li>
                </ul>
              </section>

              {/* Work Experience */}
              <section>
                <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-[0.2em] text-[#ff0000]">Work Experience</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading text-xs font-bold uppercase text-[#1a1a1a]">AI Engineer Intern</h3>
                    <p className="font-body text-[10px] uppercase tracking-[0.15em] text-[#666]">DiligenceVault · October 2025 - Present</p>
                    <ul className="mt-2 space-y-1 font-body text-xs leading-relaxed text-[#333]">
                      <li>• Working on AI-driven solutions for digital fund due diligence ecosystem</li>
                      <li>• Contributing to AI-engineered frameworks for structured dataset extraction</li>
                      <li>• Developing intelligent systems to support institutional investors</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-heading text-xs font-bold uppercase text-[#1a1a1a]">Research Intern</h3>
                    <p className="font-body text-[10px] uppercase tracking-[0.15em] text-[#666]">upGrad · January 2025 - April 2025</p>
                    <ul className="mt-2 space-y-1 font-body text-xs leading-relaxed text-[#333]">
                      <li>• Developed hybrid system combining Yara rules with ML for malware detection</li>
                      <li>• Collaborated on addressing real-world security threats through research</li>
                      <li>• Enhanced skills in Python, data analysis, and machine learning</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-heading text-xs font-bold uppercase text-[#1a1a1a]">Data Analyst Intern</h3>
                    <p className="font-body text-[10px] uppercase tracking-[0.15em] text-[#666]">Psyliq · January 2024 - February 2024</p>
                    <ul className="mt-2 space-y-1 font-body text-xs leading-relaxed text-[#333]">
                      <li>• Cleaned and stored HR data ensuring high-quality information</li>
                      <li>• Created visualizations with Power BI for stakeholder insights</li>
                      <li>• Leveraged MySQL and Python to streamline data processes</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Certifications */}
              <section>
                <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-[0.2em] text-[#ff0000]">Certifications</h2>
                <ul className="space-y-1.5 font-body text-xs text-[#333]">
                  <li>• Neo4j Certified Professional</li>
                  <li>• Python for Data Science - Infosys</li>
                  <li>• Build GANs and Diffusion Models</li>
                  <li>• PyTorch Essential Training</li>
                  <li>• Data Science Essentials - RF Academy</li>
                  <li>• AWS APAC Solutions Architecture</li>
                  <li>• Introduction to Responsible AI - Google</li>
                  <li>• Model Context Protocol - LLM Foundations</li>
                </ul>
              </section>

              {/* Education */}
              <section>
                <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-[0.2em] text-[#ff0000]">Education</h2>
                <div>
                  <h3 className="font-heading text-xs font-bold uppercase text-[#1a1a1a]">Bachelor of Technology in CSE</h3>
                  <p className="font-body text-[10px] uppercase tracking-[0.15em] text-[#666]">Data Science (AI & ML)</p>
                  <p className="mt-1 font-body text-xs text-[#333]">Lovely Professional University</p>
                  <p className="font-body text-[10px] text-[#666]">September 2021 - July 2025 · CGPA: 7.74</p>
                </div>
              </section>

              {/* Leadership */}
              <section>
                <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-[0.2em] text-[#ff0000]">Leadership</h2>
                <div className="space-y-2">
                  <div>
                    <h3 className="font-heading text-xs font-bold uppercase text-[#1a1a1a]">Senior Manager</h3>
                    <p className="font-body text-[10px] uppercase tracking-[0.15em] text-[#666]">AIESEC · Aug 2023 - Dec 2023</p>
                    <p className="font-body text-xs text-[#333]">Managed outbound professional exchange programs in OGT department</p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Creative Note */}
          <div className="mt-8 pt-6 border-t border-[#ddd]">
            <p className="font-body text-[10px] text-[#999] italic text-center">
              * This visual resume leverages creative freedom to express my professional journey. For a traditional format, download the PDF version.
            </p>
          </div>

        </div>
      </main>

      <Footer quote="Designed with intelligence. Built with precision." />
    </div>
  );
};

export default Resume;
