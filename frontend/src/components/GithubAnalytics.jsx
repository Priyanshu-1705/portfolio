import React, { useState } from "react";
import { motion } from "motion/react";
import { Github, Terminal, ArrowUpRight, GitFork, Star, Eye } from "lucide-react";

export default function GithubAnalytics() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = ((y - centerY) / centerY) * -6; // Subtle angle
    const rY = ((x - centerX) / centerX) * 6;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const [statsError, setStatsError] = useState(false);
  const [langsError, setLangsError] = useState(false);

  const statsUrl = "https://github-readme-stats-delta-one-69.vercel.app/api?username=Priyanshu-1705&show_icons=true&theme=dark&hide_border=true&bg_color=0F172A&title_color=E8A33D&text_color=EDEEF2&icon_color=4FD1C5";
  const langsUrl = "https://github-readme-stats-delta-one-69.vercel.app/api/top-langs/?username=Priyanshu-1705&layout=compact&theme=dark&hide_border=true&bg_color=0F172A&title_color=E8A33D&text_color=EDEEF2";

  return (
    <section id="github" className="py-20 border-t border-brand-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-mono text-lg text-brand-muted-slate flex items-center gap-2">
            <span>// github_analytics</span>
            <span className="h-[1px] bg-brand-border flex-grow ml-4 max-w-xs"></span>
          </h2>
          <h3 className="font-mono text-3xl font-bold mt-2 text-white">
            Open-Source Activity & Stats
          </h3>
        </motion.div>

        {/* GitHub Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Visual Terminal Card (Col span 8) */}
          <div className="lg:col-span-8" style={{ perspective: 1000 }}>
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ rotateX, rotateY }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              style={{ transformStyle: "preserve-3d" }}
              className="w-full bg-brand-panel/40 backdrop-blur-md border border-brand-border/60 rounded-xl overflow-hidden shadow-2xl flex flex-col h-full group hover:bg-brand-panel/50 transition-colors duration-300"
            >
              {/* Terminal Title Bar */}
              <div 
                className="bg-brand-secondary-panel/80 px-4 py-3 flex items-center justify-between border-b border-brand-border/60"
                style={{ transform: "translateZ(30px)" }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block"></span>
                </div>
                <div className="flex items-center gap-1.5 text-brand-muted-slate font-mono text-xs select-none">
                  <Terminal className="h-3.5 w-3.5 text-brand-accent-teal" />
                  <span>bash — fetch_github_stats.sh</span>
                </div>
                <div className="w-10"></div>
              </div>

              {/* Terminal Content Panel */}
              <div 
                className="p-6 md:p-8 flex-grow flex flex-col justify-center space-y-6"
                style={{ transform: "translateZ(15px)" }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                  
                  {/* GitHub Readme Stats Card */}
                  <div className="bg-brand-secondary-panel/40 border border-brand-border/40 p-4 rounded-xl flex items-center justify-center min-h-[190px] overflow-hidden group-hover:border-brand-accent-teal/20 transition-all duration-300">
                    {statsError ? (
                      <div className="text-center p-4 space-y-2">
                        <p className="font-mono text-xs text-brand-accent-amber">// stats_card_load_failed</p>
                        <a 
                          href="https://github.com/Priyanshu-1705" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1 text-brand-accent-teal hover:underline text-xs font-mono"
                        >
                          <span>github.com/Priyanshu-1705</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    ) : (
                      <img 
                        src={statsUrl} 
                        alt="GitHub Stats" 
                        referrerPolicy="no-referrer"
                        className="w-full max-w-sm h-auto select-none rounded"
                        loading="lazy"
                        onError={() => setStatsError(true)}
                      />
                    )}
                  </div>

                  {/* GitHub Top Languages Card */}
                  <div className="bg-brand-secondary-panel/40 border border-brand-border/40 p-4 rounded-xl flex items-center justify-center min-h-[190px] overflow-hidden group-hover:border-brand-accent-teal/20 transition-all duration-300">
                    {langsError ? (
                      <div className="text-center p-4 space-y-2">
                        <p className="font-mono text-xs text-brand-accent-amber">// top_languages_card_load_failed</p>
                        <a 
                          href="https://github.com/Priyanshu-1705" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1 text-brand-accent-teal hover:underline text-xs font-mono"
                        >
                          <span>github.com/Priyanshu-1705</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    ) : (
                      <img 
                        src={langsUrl} 
                        alt="GitHub Top Languages" 
                        referrerPolicy="no-referrer"
                        className="w-full max-w-sm h-auto select-none rounded"
                        loading="lazy"
                        onError={() => setLangsError(true)}
                      />
                    )}
                  </div>

                </div>

                <div className="border-t border-brand-border/40 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-brand-muted-slate">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-brand-accent-teal animate-pulse"></span>
                    <span>Self-hosted SVGs injected via Vercel instance</span>
                  </div>
                  <div className="text-right">
                    // updated_automatically.py
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Call-to-action details card (Col span 4) */}
          <div className="lg:col-span-4 flex flex-col justify-between" style={{ perspective: 1000 }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-brand-panel/40 backdrop-blur-md border border-brand-border/60 rounded-xl p-6 md:p-8 text-left space-y-6 flex flex-col justify-between h-full hover:border-brand-accent-teal/30 hover:bg-brand-panel/50 transition-colors duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-brand-secondary-panel border border-brand-border text-brand-accent-teal">
                    <Github className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs text-brand-muted-slate">@Priyanshu-1705</span>
                </div>

                <h4 className="font-sans text-xl font-bold text-white tracking-tight">
                  Open-Source Contribution Engine
                </h4>

                <p className="font-sans text-sm text-brand-muted-slate leading-relaxed">
                  I believe codebases should be community-oriented, modular, and built to scale. 
                  My GitHub hub serves as a central registry for production-grade experiments, full-stack frameworks, 
                  and open libraries.
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between text-xs font-mono border-b border-brand-border/30 pb-2">
                    <span className="text-brand-muted-slate flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 text-brand-accent-amber" /> Starred Repos
                    </span>
                    <span className="text-slate-100 font-bold">Collaborative</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono border-b border-brand-border/30 pb-2">
                    <span className="text-brand-muted-slate flex items-center gap-1.5">
                      <GitFork className="h-3.5 w-3.5 text-brand-accent-teal" /> Forks Hosted
                    </span>
                    <span className="text-slate-100 font-bold">Contribution Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono pb-1">
                    <span className="text-brand-muted-slate flex items-center gap-1.5">
                      <Eye className="h-3.5 w-3.5 text-blue-400" /> Watch Status
                    </span>
                    <span className="text-brand-accent-teal font-bold animate-pulse">// Active</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href="https://github.com/Priyanshu-1705"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 font-mono text-xs py-3 px-4 rounded-lg bg-brand-accent-teal text-brand-bg font-bold hover:bg-brand-accent-teal/90 transition-all duration-200 group"
                >
                  <span>explore_github.sh</span>
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
