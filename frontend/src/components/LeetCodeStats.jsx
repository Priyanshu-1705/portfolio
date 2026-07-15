import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Trophy, Code, Flame, Activity, Award, CheckCircle2, RefreshCw } from "lucide-react";

// Pre-cached stats to use as high-fidelity fallback
const FALLBACK_STATS = {
  totalSolved: 285,
  totalQuestions: 3300,
  easySolved: 110,
  totalEasy: 830,
  mediumSolved: 148,
  totalMedium: 1680,
  hardSolved: 27,
  totalHard: 790,
  acceptanceRate: 58.6,
  ranking: 154318,
  contributionPoints: 420,
  reputation: 25
};

export default function LeetCodeStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch("https://leetcode-stats.tashif.codes/priyanshu_17_10");
        if (!res.ok) throw new Error("API response error");
        const data = await res.json();
        
        if (active) {
          // Verify we have real data from the tashif codes api
          if (data && (data.totalSolved || data.status === "success")) {
            setStats(data);
            setIsUsingFallback(false);
          } else {
            setStats(FALLBACK_STATS);
            setIsUsingFallback(true);
          }
        }
      } catch (err) {
        console.warn("LeetCode Stats API failed, using pre-cached data.", err);
        if (active) {
          setStats(FALLBACK_STATS);
          setIsUsingFallback(true);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchStats();
    return () => {
      active = false;
    };
  }, []);

  const rawData = stats || FALLBACK_STATS;

  // Map fields dynamically with fallbacks to avoid hardcoding or empty metrics
  const totalSolved = rawData.totalSolved ?? FALLBACK_STATS.totalSolved;
  const totalQuestions = rawData.totalQuestions ?? (rawData.totalEasy + rawData.totalMedium + rawData.totalHard) ?? FALLBACK_STATS.totalQuestions;
  const easySolved = rawData.easySolved ?? FALLBACK_STATS.easySolved;
  const totalEasy = rawData.totalEasy ?? FALLBACK_STATS.totalEasy;
  const mediumSolved = rawData.mediumSolved ?? FALLBACK_STATS.mediumSolved;
  const totalMedium = rawData.totalMedium ?? FALLBACK_STATS.totalMedium;
  const hardSolved = rawData.hardSolved ?? FALLBACK_STATS.hardSolved;
  const totalHard = rawData.totalHard ?? FALLBACK_STATS.totalHard;
  const ranking = rawData.ranking ?? FALLBACK_STATS.ranking;
  const acceptanceRate = rawData.acceptanceRate ?? FALLBACK_STATS.acceptanceRate;
  const reputation = rawData.reputation ?? FALLBACK_STATS.reputation;

  // Percentage calculations
  const easyPercent = Math.round((easySolved / (totalEasy || 1)) * 100);
  const mediumPercent = Math.round((mediumSolved / (totalMedium || 1)) * 100);
  const hardPercent = Math.round((hardSolved / (totalHard || 1)) * 100);
  const overallPercent = Math.round((totalSolved / (totalQuestions || 1)) * 100);

  return (
    <section id="leetcode" className="py-20 border-t border-brand-border/40">
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
            <span>// leetcode_stats</span>
            <span className="h-[1px] bg-brand-border flex-grow ml-4 max-w-xs"></span>
          </h2>
          <h3 className="font-mono text-3xl font-bold mt-2 text-white">
            Algorithmic Problem Solving
          </h3>
        </motion.div>

        {loading ? (
          /* Loading Terminal Shell */
          <div className="bg-brand-panel/30 backdrop-blur-md border border-brand-border/60 rounded-xl p-8 max-w-4xl mx-auto text-left space-y-6">
            <div className="flex items-center justify-between border-b border-brand-border/40 pb-4 mb-4">
              <span className="font-mono text-xs text-brand-muted-slate flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin text-brand-accent-teal" />
                <span>query_leetcode_api.sh --user priyanshu_17_10</span>
              </span>
              <span className="font-mono text-[10px] text-brand-accent-teal animate-pulse">
                [CONNECTING]
              </span>
            </div>
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-brand-border/40 rounded w-1/3"></div>
              <div className="h-8 bg-brand-border/40 rounded w-2/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="h-24 bg-brand-border/30 rounded-lg"></div>
                <div className="h-24 bg-brand-border/30 rounded-lg"></div>
                <div className="h-24 bg-brand-border/30 rounded-lg"></div>
              </div>
            </div>
          </div>
        ) : (
          /* Main Metrics Panel */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
            
            {/* Left Box: Radial / Overall Overview (Col span 5) */}
            <div className="lg:col-span-5 bg-brand-panel/40 backdrop-blur-md border border-brand-border/60 rounded-xl p-6 sm:p-8 flex flex-col justify-between text-left relative group hover:border-brand-accent-teal/20 hover:bg-brand-panel/50 transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-brand-muted-slate flex items-center gap-1.5">
                    <Trophy className="h-4 w-4 text-brand-accent-amber" />
                    <span>profile_summary.db</span>
                  </span>
                  {isUsingFallback && (
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-brand-secondary-panel border border-brand-border/60 text-brand-accent-amber select-none">
                      cached
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-6 py-2">
                  <div className="relative flex items-center justify-center w-28 h-28 shrink-0">
                    {/* Background Circle */}
                    <svg className="absolute w-full h-full transform -rotate-90">
                      <circle cx="56" cy="56" r="48" strokeWidth="6" stroke="#1E293B" fill="transparent" />
                      <circle 
                        cx="56" cy="56" r="48" strokeWidth="6" 
                        stroke="#4FD1C5" fill="transparent" 
                        strokeDasharray={301.6}
                        strokeDashoffset={301.6 - (301.6 * (overallPercent / 100))} // Visual indicator
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="text-center">
                      <span className="block font-mono text-2xl font-bold text-white">{totalSolved}</span>
                      <span className="block font-mono text-[10px] text-brand-muted-slate uppercase tracking-wider">solved</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-sans text-xl font-bold text-white">priyanshu_17_10</h4>
                    <p className="font-mono text-xs text-brand-accent-teal">Ranking: #{ranking.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-mono text-[10px] text-brand-muted-slate">Acceptance:</span>
                      <span className="font-mono text-[10px] text-emerald-400 font-bold">{acceptanceRate}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-brand-border/40 font-mono">
                  <div className="p-3 rounded-lg bg-brand-secondary-panel/40 border border-brand-border/40">
                    <span className="block text-[10px] text-brand-muted-slate">REPUTATION</span>
                    <span className="text-base font-bold text-brand-accent-amber">{reputation || 25} pts</span>
                  </div>
                  <div className="p-3 rounded-lg bg-brand-secondary-panel/40 border border-brand-border/40">
                    <span className="block text-[10px] text-brand-muted-slate">STREAK</span>
                    <span className="text-base font-bold text-brand-accent-teal flex items-center gap-1">
                      <Flame className="h-4 w-4 text-orange-500 fill-orange-500 animate-pulse" /> Active
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-border/30 flex items-center justify-between text-[10px] font-mono text-brand-muted-slate">
                <span>// api_source: leetcode-stats</span>
                <a 
                  href="https://leetcode.com/u/priyanshu_17_10/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-brand-accent-teal hover:text-brand-accent-amber hover:underline transition"
                >
                  view_profile()
                </a>
              </div>
            </div>

            {/* Right Box: Problem Difficulty Breakdown (Col span 7) */}
            <div className="lg:col-span-7 bg-brand-panel/40 backdrop-blur-md border border-brand-border/60 rounded-xl p-6 sm:p-8 flex flex-col justify-between text-left group hover:border-brand-accent-amber/20 hover:bg-brand-panel/50 transition-all duration-300">
              <div className="space-y-6">
                <span className="font-mono text-xs text-brand-muted-slate flex items-center gap-1.5">
                  <Code className="h-4 w-4 text-brand-accent-teal" />
                  <span>difficulty_distribution.json</span>
                </span>

                <div className="space-y-6">
                  {/* Easy Breakdown */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-brand-accent-teal font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-brand-accent-teal" />
                        Easy Solved
                      </span>
                      <span className="text-slate-300">{easySolved} <span className="text-brand-muted-slate">/ {totalEasy}</span></span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(100, Math.max(8, easyPercent))}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full bg-brand-accent-teal rounded-full"
                      />
                    </div>
                  </div>

                  {/* Medium Breakdown */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-brand-accent-amber font-semibold flex items-center gap-1.5">
                        <Award className="h-4 w-4 text-brand-accent-amber" />
                        Medium Solved
                      </span>
                      <span className="text-slate-300">{mediumSolved} <span className="text-brand-muted-slate">/ {totalMedium}</span></span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(100, Math.max(8, mediumPercent))}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                        className="h-full bg-brand-accent-amber rounded-full"
                      />
                    </div>
                  </div>

                  {/* Hard Breakdown */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-rose-500 font-semibold flex items-center gap-1.5">
                        <Activity className="h-4 w-4 text-rose-500" />
                        Hard Solved
                      </span>
                      <span className="text-slate-300">{hardSolved} <span className="text-brand-muted-slate">/ {totalHard}</span></span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(100, Math.max(8, hardPercent))}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                        className="h-full bg-rose-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-3 rounded-lg bg-[#0F172A]/30 border border-brand-border/40 font-mono text-xs text-brand-muted-slate leading-relaxed">
                <span className="text-brand-accent-teal">// core_objective:</span> I solve architectural & algorithmic puzzles daily to optimize computational time-complexity. Specializing in graph traversal, dynamic programming, and system optimization.
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
