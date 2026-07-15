import React from "react";
import { GraduationCap, Award, MapPin, Search } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="about" className="py-20 border-t border-brand-border/40">
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
            <span>// about</span>
            <span className="h-[1px] bg-brand-border flex-grow ml-4 max-w-xs"></span>
          </h2>
          <h3 className="font-mono text-3xl font-bold mt-2 text-white">
            Who is Priyanshu?
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Story (Col span 7) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <p className="font-sans text-lg text-slate-300 leading-relaxed">
              I am a passionate software engineer focused on designing and building
              end-to-end full-stack systems. Currently pursuing my B.Tech in Computer
              Science and Engineering at DIT University, Dehradun, I spend most of my time
              architecting scalable backend APIs, optimizing web performance, and writing clean,
              reusable frontend interfaces.
            </p>
            <p className="font-sans text-base text-brand-muted-slate leading-relaxed">
              My core technology stack centers around the MERN ecosystem (MongoDB, Express,
              React, Node.js) paired with JavaScript. I believe in architectural integrity,
              robust state management, and crafting frictionless user journeys. I am highly
              motivated to solve real-world engineering challenges and eagerly seeking
              opportunities to collaborate in modern engineering teams.
            </p>

            <div className="pt-4 border-t border-brand-border grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-accent-teal mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-mono text-xs text-brand-muted-slate">LOCATION</h4>
                  <p className="font-sans text-sm text-slate-200">Dehradun, India</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Search className="h-5 w-5 text-brand-accent-teal mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-mono text-xs text-brand-muted-slate">CURRENTLY SEEKING</h4>
                  <p className="font-sans text-sm text-slate-200">
                    SDE Internships / Entry-Level Roles
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Key Highlights Cards (Col span 5) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 space-y-4"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4, borderColor: "#4FD1C5" }}
              className="p-6 bg-brand-panel/40 backdrop-blur-md border border-brand-border/60 rounded-xl text-left transition-all duration-300 group hover:bg-brand-panel/55"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-brand-secondary-panel border border-brand-border group-hover:border-brand-accent-teal/30 group-hover:bg-brand-accent-teal/5 transition-all duration-300">
                  <GraduationCap className="h-6 w-6 text-brand-accent-amber" />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-brand-muted-slate">EDUCATION</h4>
                  <h5 className="font-sans text-base font-semibold text-white">
                    B.Tech in Computer Science
                  </h5>
                </div>
              </div>
              <p className="font-sans text-sm text-brand-muted-slate">
                Pursuing CSE at <span className="text-slate-200 font-medium">DIT University</span>.
                Deeply immersed in Data Structures, Algorithms, DBMS, and Web Architecture.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-brand-accent-teal">
                <span>Expected Graduation: May 2027</span>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4, borderColor: "#4FD1C5" }}
              className="p-6 bg-brand-panel/40 backdrop-blur-md border border-brand-border/60 rounded-xl text-left transition-all duration-300 group hover:bg-brand-panel/55"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-brand-secondary-panel border border-brand-border group-hover:border-brand-accent-teal/30 group-hover:bg-brand-accent-teal/5 transition-all duration-300">
                  <Award className="h-6 w-6 text-brand-accent-teal" />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-brand-muted-slate">EXPERIENCE</h4>
                  <h5 className="font-sans text-base font-semibold text-white">
                    Full Stack Web Intern
                  </h5>
                </div>
              </div>
              <p className="font-sans text-sm text-brand-muted-slate">
                Collaborating at <span className="text-slate-200 font-medium">SmartED Innovations</span> (ongoing, remote). Writing high-quality MERN modules and shipping live production updates.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-brand-accent-amber">
                <span>Active & Remote</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
