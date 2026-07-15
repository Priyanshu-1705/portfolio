import React from "react";
import { Briefcase, Trophy, GraduationCap, Star } from "lucide-react";
import { motion } from "motion/react";

export default function Timeline() {
  const events = [
    {
      date: "Aug 2024 — Ongoing",
      title: "Full Stack Web Development Internship",
      subtitle: "SmartED Innovations · Remote",
      type: "work",
      icon: Briefcase,
      bullets: [
        "Developing scalable server architecture and modular frontend interfaces using the MERN stack.",
        "Collaborating with team members to integrate API gateways, optimize page speed, and deploy product releases.",
      ],
    },
    {
      date: "September 2024",
      title: "Bharatiya Antariksh Hackathon 2024",
      subtitle: "Indian Space Research Organisation (ISRO)",
      type: "achievement",
      icon: Trophy,
      bullets: [
        "Participated at the national level, resolving geoinformatics or sat-imagery indexing problems.",
        "Designed real-time tracking pipelines and built secure visualization dashboards under strict performance guidelines.",
      ],
    },
    {
      date: "March 2024",
      title: "National Product Management Competition",
      subtitle: "Placed Nationally",
      type: "achievement",
      icon: Star,
      bullets: [
        "Competed with talent across India, proposing system architectures, roadmaps, and business solutions.",
        "Secured a national ranking through visual prototypes, market sizing, and strict system flow charts.",
      ],
    },
    {
      date: "Aug 2023 — May 2027",
      title: "B.Tech in Computer Science and Engineering",
      subtitle: "DIT University · Dehradun, India",
      type: "education",
      icon: GraduationCap,
      bullets: [
        "Gaining comprehensive mastery of Data Structures, Database Management, and Object-Oriented Design.",
        "Active member of tech clubs, promoting open-source contribution and hackathon participation.",
      ],
    },
  ];

  return (
    <section id="timeline" className="py-20 border-t border-brand-border/40">
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
            <span>// timeline</span>
            <span className="h-[1px] bg-brand-border flex-grow ml-4 max-w-xs"></span>
          </h2>
          <h3 className="font-mono text-3xl font-bold mt-2 text-white">
            Experience & Key Milestones
          </h3>
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative max-w-3xl mx-auto pl-6 sm:pl-8 border-l-2 border-brand-border/60 space-y-12">
          {events.map((event, index) => {
            const IconComponent = event.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-left group"
              >
                {/* Neon circular Bullet Node */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 p-1.5 rounded-full bg-brand-bg border-2 border-brand-border group-hover:border-brand-accent-teal group-hover:shadow-lg group-hover:shadow-brand-accent-teal/20 transition-all duration-300">
                  <div className="p-1 rounded-full bg-brand-secondary-panel">
                    <IconComponent className="h-4 w-4 text-brand-accent-amber group-hover:text-brand-accent-teal transition-colors duration-200" />
                  </div>
                </div>

                {/* Content Box */}
                <div className="bg-brand-panel/40 backdrop-blur-md border border-brand-border/60 rounded-xl p-6 hover:bg-brand-panel/55 hover:border-brand-accent-teal/50 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-semibold text-brand-accent-teal bg-brand-accent-teal/5 border border-brand-accent-teal/10 px-2.5 py-1 rounded-md">
                      {event.date}
                    </span>
                    <span className="font-mono text-[10px] text-brand-muted-slate uppercase tracking-wider">
                      // {event.type}
                    </span>
                  </div>

                  <h4 className="font-sans text-xl font-bold text-white mb-1 group-hover:text-brand-accent-amber transition-colors duration-200">
                    {event.title}
                  </h4>
                  <h5 className="font-mono text-xs text-brand-muted-slate mb-4">
                    {event.subtitle}
                  </h5>

                  <ul className="space-y-2.5">
                    {event.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="text-brand-accent-amber font-mono text-xs select-none mt-1">
                          ↳
                        </span>
                        <p className="font-sans text-sm text-slate-300 leading-relaxed">
                          {bullet}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
