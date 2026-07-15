import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, Terminal, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  const scrolltoSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 3D Tilt State
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate rotation bounds
    const rX = ((y - centerY) / centerY) * -10; // degrees
    const rY = ((x - centerX) / centerX) * 10;  // degrees
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Terminal State
  const [terminalLogs, setTerminalLogs] = useState([
    {
      id: "init-input",
      type: "input",
      text: "curl -X GET https://api.priyanshu.dev/profile"
    },
    {
      id: "init-output",
      type: "output",
      content: (
        <div className="text-slate-300">
          <span className="text-brand-muted-slate">{"{"}</span>
          <div className="pl-4">
            <span className="text-brand-accent-teal">"name"</span>
            <span className="text-brand-muted-slate">:</span>{" "}
            <span className="text-brand-accent-amber">"Priyanshu Gangwar"</span>,
          </div>
          <div className="pl-4">
            <span className="text-brand-accent-teal">"role"</span>
            <span className="text-brand-muted-slate">:</span>{" "}
            <span className="text-brand-accent-amber">"Full-Stack Developer"</span>,
          </div>
          <div className="pl-4">
            <span className="text-brand-accent-teal">"location"</span>
            <span className="text-brand-muted-slate">:</span>{" "}
            <span className="text-brand-accent-amber">"Dehradun, India"</span>,
          </div>
          <div className="pl-4">
            <span className="text-brand-accent-teal">"education"</span>
            <span className="text-brand-muted-slate">:</span>{" "}
            <span className="text-brand-accent-amber">"B.Tech CSE, DIT University (2023 - 2027)"</span>,
          </div>
          <div className="pl-4">
            <span className="text-brand-accent-teal">"openForOpportunities"</span>
            <span className="text-brand-muted-slate">:</span>{" "}
            <span className="text-[#38BDF8]">true</span>,
          </div>
          <div className="pl-4">
            <span className="text-brand-accent-teal">"skills"</span>
            <span className="text-brand-muted-slate">:</span>{" "}
            <span className="text-brand-muted-slate">[</span>
            <span className="text-brand-accent-amber">"React"</span>,{" "}
            <span className="text-brand-accent-amber">"NodeJS"</span>,{" "}
            <span className="text-brand-accent-amber">"Express"</span>,{" "}
            <span className="text-brand-accent-amber">"MongoDB"</span>
            <span className="text-brand-muted-slate">]</span>
          </div>
          <span className="text-brand-muted-slate">{"}"}</span>
        </div>
      )
    }
  ]);

  const [inputVal, setInputVal] = useState("");
  const terminalEndRef = useRef(null);
  const terminalBodyRef = useRef(null);

  // Auto scroll terminal to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs]);

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const newLogs = [...terminalLogs, { id: Date.now() + "-in", type: "input", text: cmdStr }];
    const commandLower = trimmed.toLowerCase();
    let reply = null;

    if (commandLower === "help") {
      reply = (
        <div className="text-slate-300 space-y-1 text-left">
          <p className="text-brand-accent-teal font-semibold">Available Commands:</p>
          <p><span className="text-brand-accent-amber font-mono font-bold">about</span> - Summary of who Priyanshu is</p>
          <p><span className="text-brand-accent-amber font-mono font-bold">skills</span> - Display core technical skillset matrix</p>
          <p><span className="text-brand-accent-amber font-mono font-bold">projects</span> - View featured systems & software apps</p>
          <p><span className="text-brand-accent-amber font-mono font-bold">contact</span> - Retrieve secure contact credentials</p>
          <p><span className="text-brand-accent-amber font-mono font-bold">clear</span> - Clear the terminal log stream</p>
          <p><span className="text-brand-accent-amber font-mono font-bold">secret</span> - Unlock special system parameters</p>
        </div>
      );
    } else if (commandLower === "about") {
      reply = (
        <div className="text-slate-300 space-y-2 max-w-sm text-left">
          <p className="text-brand-accent-teal font-semibold">// system_brief.sh</p>
          <p className="leading-relaxed">
            I am a full-stack engineer from India, specializing in React, Node, Express, and MongoDB. Currently a CSE student at DIT University, passionate about building robust web architecture.
          </p>
        </div>
      );
    } else if (commandLower === "skills") {
      reply = (
        <div className="text-slate-300 space-y-2 text-left">
          <p className="text-brand-accent-teal font-semibold">// tech_stack.json</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {["React", "NodeJS", "Express", "MongoDB", "TypeScript", "JavaScript", "Docker", "AWS S3", "DSA"].map(s => (
              <span key={s} className="px-2 py-0.5 rounded bg-brand-secondary-panel border border-brand-border text-brand-accent-amber text-[10px] font-mono">
                {s}
              </span>
            ))}
          </div>
        </div>
      );
    } else if (commandLower === "projects") {
      reply = (
        <div className="text-slate-300 space-y-1.5 text-left">
          <p className="text-brand-accent-teal font-semibold">// projects_list</p>
          <p>1. <span className="text-brand-accent-amber font-bold">NexaAI</span> - AI SaaS Platform integrating OpenAI & Stripe.</p>
          <p>2. <span className="text-brand-accent-amber font-bold">DevConnect</span> - Developer Social Network with real-time sockets.</p>
          <p className="text-[11px] text-brand-muted-slate italic pt-1">Click "View Projects" or scroll down to view interactive components.</p>
        </div>
      );
    } else if (commandLower === "contact") {
      reply = (
        <div className="text-slate-300 space-y-1 text-left">
          <p className="text-brand-accent-teal font-semibold">// communications.py</p>
          <p>Email: <span className="text-brand-accent-amber">priyanshugangwar17@gmail.com</span></p>
          <p>LinkedIn: <span className="text-brand-accent-amber">priyanshu-gangwar-746520295</span></p>
          <p>GitHub: <span className="text-[#38BDF8]">github.com/Priyanshu-1705</span></p>
        </div>
      );
    } else if (commandLower === "clear") {
      setTerminalLogs([]);
      setInputVal("");
      return;
    } else if (commandLower === "secret") {
      reply = (
        <div className="text-green-400 font-mono space-y-1 text-xs leading-normal animate-pulse text-left">
          <p>Initializing Matrix Rain Protocol...</p>
          <p className="text-brand-accent-amber font-bold">Wake up, Neo...</p>
          <p className="text-brand-accent-teal font-bold">The Matrix has you.</p>
          <p>Follow the white rabbit. 🐇</p>
          <p className="text-brand-muted-slate">// easter_egg_unlocked: true</p>
        </div>
      );
    } else {
      reply = (
        <div className="text-red-400 text-left">
          bash: command not found: {trimmed}. Type <span className="text-brand-accent-teal font-bold underline select-all cursor-pointer" onClick={() => handleCommand("help")}>help</span> to view available operations.
        </div>
      );
    }

    setTerminalLogs([...newLogs, { id: Date.now() + "-out", type: "output", content: reply }]);
    setInputVal("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-28 pb-16 flex items-center justify-center relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-accent-teal/5 rounded-full filter blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brand-accent-amber/5 rounded-full filter blur-3xl pointer-events-none animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Information */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-accent-teal/30 bg-brand-accent-teal/5 text-brand-accent-teal"
            >
              <span className="w-2 h-2 rounded-full bg-brand-accent-teal animate-pulse"></span>
              <span className="font-mono text-xs tracking-wider">
                AVAILABLE FOR INTERNSHIPS 
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
            >
              Hi, I am <br />
              <span className="font-mono text-brand-accent-amber font-bold">
                Priyanshu Gangwar
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-mono text-lg sm:text-xl text-brand-accent-teal font-semibold"
            >
              MERN Stack Developer · B.Tech CSE, DIT University
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-sans text-base sm:text-lg text-brand-muted-slate max-w-2xl"
            >
              Building full-stack systems that actually ship. I specialize in the
              MERN ecosystem, crafting high-performance, robust, and secure web applications
              from design to production.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                id="hero-cta-projects"
                onClick={() => scrolltoSection("projects")}
                className="font-mono text-sm px-6 py-3 rounded-md bg-brand-accent-amber text-brand-bg font-bold hover:bg-brand-accent-amber/90 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg shadow-brand-accent-amber/10"
              >
                <span>View Projects</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                id="hero-cta-contact"
                onClick={() => scrolltoSection("contact")}
                className="font-mono text-sm px-6 py-3 rounded-md border border-brand-border bg-transparent text-white hover:bg-brand-border hover:border-brand-accent-teal hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                // Get In Touch
              </button>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-4 pt-4 text-brand-muted-slate"
            >
              <a
                href="https://github.com/Priyanshu-1705"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-accent-amber transition-colors duration-200"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/priyanshu-gangwar-746520295"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-accent-amber transition-colors duration-200"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:priyanshugangwar17@gmail.com"
                className="hover:text-brand-accent-amber transition-colors duration-200"
                aria-label="Email Address"
              >
                <Mail className="h-5 w-5" />
              </a>
            </motion.div>
          </div>

          {/* 3D Tilted Terminal Panel (lg:col-span-5) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 w-full text-left"
            style={{ perspective: 1200 }}
          >
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ rotateX, rotateY }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="w-full bg-brand-panel/45 backdrop-blur-md border border-brand-border/60 rounded-xl overflow-hidden shadow-2xl shadow-black/40 flex flex-col h-[420px] group hover:bg-brand-panel/55 transition-colors duration-300"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Terminal Title Bar */}
              <div
                className="bg-brand-secondary-panel/80 px-4 py-3 flex items-center justify-between border-b border-brand-border shrink-0"
                style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center gap-1.5" style={{ transform: "translateZ(10px)" }}>
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block"></span>
                </div>
                <div className="flex items-center gap-1.5 text-brand-muted-slate font-mono text-xs select-none" style={{ transform: "translateZ(15px)" }}>
                  <Terminal className="h-3.5 w-3.5" />
                  <span>bash — session.sh</span>
                </div>
                <div className="w-10"></div>
              </div>

              {/* Quick Action Commands Bar */}
              <div
                className="bg-brand-secondary-panel/40 px-4 py-2 border-b border-brand-border/40 flex items-center gap-1.5 flex-wrap shrink-0"
                style={{ transform: "translateZ(20px)" }}
              >
                <span className="font-mono text-[10px] text-brand-muted-slate mr-1">Quick:</span>
                {["help", "about", "skills", "projects", "secret"].map((c) => (
                  <button
                    key={c}
                    onClick={() => handleCommand(c)}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-brand-secondary-panel border border-brand-border/80 text-brand-accent-teal hover:border-brand-accent-teal/50 hover:text-brand-accent-amber transition-all cursor-pointer"
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Terminal Body */}
              <div
                ref={terminalBodyRef}
                className="p-5 font-mono text-xs sm:text-sm text-left leading-relaxed overflow-y-auto flex-grow space-y-4"
                style={{ transform: "translateZ(15px)" }}
              >
                {terminalLogs.map((log) => (
                  <div key={log.id} className="space-y-1">
                    {log.type === "input" ? (
                      <div className="flex items-center gap-2 text-brand-muted-slate select-none">
                        <span className="text-brand-accent-teal">~</span>
                        <span>$</span>
                        <span className="text-white">{log.text}</span>
                      </div>
                    ) : (
                      <div className="pl-4">{log.content}</div>
                    )}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Terminal Input Footer */}
              <form
                onSubmit={handleFormSubmit}
                className="bg-brand-secondary-panel/60 px-4 py-2.5 border-t border-brand-border flex items-center gap-2 shrink-0"
                style={{ transform: "translateZ(30px)" }}
              >
                <span className="text-brand-accent-teal font-mono text-xs sm:text-sm select-none">~ $</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Type commands here... (e.g. 'help')"
                  className="bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none flex-grow"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
                <button
                  type="submit"
                  className="font-mono text-[10px] uppercase px-2 py-1 rounded bg-brand-accent-teal/10 hover:bg-brand-accent-teal/20 text-brand-accent-teal border border-brand-accent-teal/20 transition-all cursor-pointer font-bold"
                >
                  Enter
                </button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
