import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";
import { ArrowLeft, Download, FileText, MapPin, Mail } from "lucide-react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import GithubAnalytics from "./components/GithubAnalytics";
import LeetCodeStats from "./components/LeetCodeStats";
import Certificates from "./components/Certificates";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Wrapper to handle scroll transitions when clicking hash anchors from other pages
function ScrollToHashElement() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // Wait a small amount for DOM rendering to complete
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return null;
}

// Main Page Single-Scroll View
function MainView() {
  return (
    <div className="bg-brand-bg min-h-screen text-slate-100 selection:bg-brand-accent-teal/30 selection:text-brand-accent-teal relative overflow-hidden">
      {/* Ambient Glowing Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-brand-accent-teal/8 blur-[120px] animate-pulse duration-[8000ms]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-brand-accent-amber/6 blur-[100px] animate-pulse duration-[12000ms]"></div>
        <div className="absolute top-[50%] left-[15%] w-[40vw] h-[40vw] max-w-[450px] max-h-[450px] rounded-full bg-blue-500/5 blur-[110px] animate-pulse duration-[10000ms]"></div>
        <div className="absolute bottom-[5%] left-[5%] w-[35vw] h-[35vw] max-w-[350px] max-h-[350px] rounded-full bg-brand-accent-teal/4 blur-[90px] animate-pulse duration-[9000ms]"></div>
      </div>

      <Nav />
      <ScrollToHashElement />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <GithubAnalytics />
        <LeetCodeStats />
        <Certificates />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

// Resume View Page
function ResumeView() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-brand-bg min-h-screen text-slate-100 selection:bg-brand-accent-teal/30 selection:text-brand-accent-teal pt-28 pb-16 relative overflow-hidden">
      {/* Ambient Glowing Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-brand-accent-teal/8 blur-[120px] animate-pulse duration-[8000ms]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-brand-accent-amber/6 blur-[100px] animate-pulse duration-[12000ms]"></div>
      </div>

      <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation / Header utilities */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="text-left">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-xs text-brand-accent-teal hover:text-brand-accent-amber transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>// back_to_home.sh</span>
            </Link>
            <h1 className="font-sans text-3xl font-extrabold text-white mt-1">
              Curriculum Vitae
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              download="Priyanshu_Gangwar_Resume.pdf"
              className="font-mono text-xs px-5 py-2.5 rounded-md bg-brand-accent-amber text-brand-bg font-bold hover:bg-brand-accent-amber/90 transition-all duration-200 flex items-center gap-2 shadow-md shadow-brand-accent-amber/10"
            >
              <Download className="h-4 w-4 text-brand-bg" />
              <span>download_resume.pdf</span>
            </a>
          </div>
        </div>

        {/* Layout Split: Interactive Fallback on Left, Actual PDF on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          {/* Interactive HTML Resume (Col span 5) */}
          <div className="lg:col-span-5 bg-brand-panel/40 backdrop-blur-md border border-brand-border/60 rounded-xl p-6 sm:p-8 text-left space-y-6">
            <div className="border-b border-brand-border/60 pb-6">
              <h2 className="font-sans text-2xl font-bold text-white">Priyanshu Gangwar</h2>
              <p className="font-mono text-xs text-brand-accent-teal mt-1">
                Full-Stack Developer (MERN Ecosystem)
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 text-xs text-brand-muted-slate font-mono">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-brand-accent-amber" />
                  <span>Dehradun, India</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-brand-accent-amber" />
                  <span>priyanshugangwar17@gmail.com</span>
                </span>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs text-brand-accent-amber font-semibold uppercase tracking-wider">
                🎓 EDUCATION()
              </h3>
              <div>
                <h4 className="font-sans text-sm font-bold text-slate-200">
                  B.Tech in Computer Science & Engineering
                </h4>
                <p className="font-sans text-xs text-brand-muted-slate mt-0.5">
                  DIT University, Dehradun (2023 - 2027)
                </p>
                <span className="inline-block mt-1.5 font-mono text-[10px] bg-brand-accent-teal/5 border border-brand-accent-teal/10 text-brand-accent-teal px-2 py-0.5 rounded">
                  Expected Graduation: May 2027
                </span>
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-brand-accent-amber font-semibold uppercase tracking-wider">
                💼 EXPERIENCE()
              </h3>
              <div className="border-l-2 border-brand-border pl-4 py-1 space-y-1">
                <h4 className="font-sans text-sm font-bold text-slate-200">
                  Full Stack Web Developer Intern
                </h4>
                <p className="font-sans text-xs text-brand-accent-teal">SmartED Innovations</p>
                <p className="font-mono text-[10px] text-brand-muted-slate">Aug 2024 — Ongoing (Remote)</p>
                <p className="font-sans text-xs text-slate-400 mt-2 leading-relaxed">
                  Building modular MERN services, integrating API controllers, and tuning client experiences.
                </p>
              </div>
            </div>

            {/* Core Stack */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs text-brand-accent-amber font-semibold uppercase tracking-wider">
                🛠 CORE_STACK[]
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "React",
                  "JavaScript",
                  "Node.js",
                  "Express",
                  "MongoDB",
                  "Mongoose",
                  "SQL",
                  "MySQL",
                  "Docker",
                  "AWS S3",
                  "DSA",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-brand-secondary-panel border border-brand-border text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Competition highlights */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs text-brand-accent-amber font-semibold uppercase tracking-wider">
                🏆 KEY_HONORS{"{}"}
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-brand-accent-teal font-mono">✓</span>
                  <span>
                    <strong>Bharatiya Antariksh Hackathon (ISRO)</strong> — National-level
                    participant crafting satellite visualization pipelines.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-accent-teal font-mono">✓</span>
                  <span>
                    <strong>Product Management Competition</strong> — Placed Nationally for system design mapping.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Embedded PDF Viewer Panel (Col span 7) */}
          <div className="lg:col-span-7 bg-brand-panel/40 backdrop-blur-md border border-brand-border/60 rounded-xl p-4 flex flex-col justify-between h-[650px] lg:h-[800px]">
            <div className="flex items-center justify-between border-b border-brand-border/60 pb-3 mb-4">
              <span className="font-mono text-xs text-brand-muted-slate flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-brand-accent-amber" />
                <span>embedded_pdf_viewer.bin</span>
              </span>
              <span className="font-mono text-[10px] text-brand-accent-teal bg-brand-accent-teal/5 px-2 py-0.5 rounded border border-brand-accent-teal/10">
                Interactive Preview
              </span>
            </div>

            <div className="flex-grow bg-brand-secondary-panel rounded-lg overflow-hidden relative border border-brand-border flex items-center justify-center">
              {/* PDF Viewer embedding */}
              <iframe
                src="/resume.pdf"
                title="Priyanshu Gangwar Resume"
                className="w-full h-full border-none"
              >
                <div className="p-8 text-center space-y-4">
                  <p className="font-sans text-sm text-brand-muted-slate">
                    Your browser does not support embedded PDFs.
                  </p>
                  <a
                    href="/resume.pdf"
                    download
                    className="font-mono text-xs px-4 py-2 bg-brand-accent-amber text-brand-bg rounded"
                  >
                    Download Resume PDF
                  </a>
                </div>
              </iframe>
            </div>

            <div className="pt-3 font-mono text-[10px] text-brand-muted-slate text-left">
              * Note: If the PDF does not load in your browser container sandbox, use the download button above.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/resume" element={<ResumeView />} />
        {/* Wildcard path falls back to Home */}
        <Route path="*" element={<MainView />} />
      </Routes>
    </Router>
  );
}
