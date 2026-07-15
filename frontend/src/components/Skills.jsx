import React, { useState } from "react";
import { 
  Monitor, Cpu, Database, HardDrive, Terminal,
  Layout, Sliders, Link, Key, ShieldCheck, Webhook, Binary, Code 
} from "lucide-react";
import { motion } from "motion/react";

// Brand Logos Custom Vectors
const ReactLogo = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="h-4 w-4 text-[#61DAFB] fill-none animate-[spin_25s_linear_infinite]" stroke="currentColor" strokeWidth="1.2">
    <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
    <g>
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const JSLogo = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#F7DF1E]">
    <rect width="24" height="24" rx="4" />
    <path d="M12 18.2c-.6 0-1.1-.1-1.6-.4s-.8-.7-1-1.2l1.6-.9c.2.3.4.5.6.7s.5.2.8.2c.3 0 .6-.1.8-.3s.3-.4.3-.7v-5.6h1.9v5.6c0 .8-.3 1.5-.8 1.9s-1.3.7-2.6.7zm6.2 0c-1.1 0-2-.3-2.6-.9s-.9-1.4-.9-2.4l1.8-.2c.1.5.3.9.6 1.1s.7.3 1.1.3c.4 0 .7-.1.9-.3s.3-.4.3-.6c0-.2-.1-.4-.3-.5s-.6-.3-1.1-.4c-.7-.1-1.3-.3-1.7-.6s-.6-.8-.6-1.5c0-.6.3-1.2.8-1.6s1.2-.6 2.1-.6c.9 0 1.6.2 2.1.7s.8 1.1.9 1.9l-1.8.2c-.1-.4-.2-.7-.4-.9s-.5-.3-.9-.3c-.3 0-.6.1-.8.2s-.3.3-.3.5c0 .2.1.3.3.4s.5.2 1 .3c.8.1 1.4.3 1.8.6s.6.8.6 1.5c0 .7-.3 1.2-.8 1.6s-1.3.6-2.3.6z" fill="#000" />
  </svg>
);

const NodeLogo = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#339933]">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 14.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5v-3c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v3zm0-5.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5v-2C10 6.7 10.7 6 11.5 6s1.5.7 1.5 1.5v2z" />
  </svg>
);

const ExpressLogo = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-slate-300" strokeWidth="1.5">
    <rect width="20" height="20" x="2" y="2" rx="4" />
    <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontWeight="bold" fontSize="11" fontFamily="monospace" fill="white">ex</text>
  </svg>
);

const MongoDBLogo = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#47A248]">
    <path d="M12 1.5C11.5 1.5 6 6.5 6 12.5c0 4 2.5 7.5 6 9.5 3.5-2 6-5.5 6-9.5 0-6-5.5-11-6-11zm.5 18c-1.5-1-3-3-3-7 0-3.5 3-7 3-7s3 3.5 3 7c0 4-1.5 6-3 7z" />
  </svg>
);

const MongooseLogo = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#F04D35] fill-none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const SQLLogo = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-[#336791]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />
  </svg>
);

const MySQLLogo = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#00758F]">
    <path d="M12.115 2c-.156.002-.317.014-.48.037-2.118.293-3.66 1.83-4.664 3.652-.61 1.107-.947 2.378-1.026 3.64-.022.355-.173.684-.423.935-.853.856-1.87 1.252-2.973 1.554-.256.07-.393.364-.291.614.417 1.026 1.18 1.823 2.114 2.348.331.186.486.574.373.936-.347 1.114-.852 2.13-1.63 2.99a.294.294 0 0 0 .142.483c1.782.43 3.498.058 4.97-.936.242-.163.548-.2.822-.102 1.57.562 3.195.733 4.842.343.342-.08.647-.282.846-.575.986-1.448 1.492-3.08 1.545-4.82a14.28 14.28 0 0 0-.154-2.607c-.126-1.077-.424-2.138-.897-3.136-.597-1.26-1.472-2.316-2.64-3.104A4.31 4.31 0 0 0 12.115 2z" />
  </svg>
);

const DockerLogo = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#2496ED]">
    <path d="M13.983 8.871h-1.996V6.877h1.996v1.994zM16.41 8.871h-1.995V6.877H16.41v1.994zm-7.272 0H7.14V6.877h1.997v1.994zM11.42 8.871H9.423V6.877H11.42v1.994zm5.022-2.483h-1.995V4.396h1.995V6.39zm-2.457 0h-1.996V4.396h1.996V6.39zm-2.458 0H9.512V4.396h1.996V6.39zm-2.457 0H7.051V4.396h1.996V6.39zm12.15 6.386c-.524-.316-1.127-.47-1.745-.47H3.454c-.115 0-.226.046-.307.127s-.127.192-.127.307v.454c0 3.865 3.132 7.001 6.996 7.001 3.535 0 6.467-2.616 6.942-6.027 1.346-.145 2.502-.857 3.155-1.921-.397.168-.823.253-1.25.253-.332 0-.661-.052-.98-.153z"/>
  </svg>
);

const AWSLogo = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#FF9900] fill-none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17.5 19A3.5 3.5 0 0 0 13 15.7V17a4 4 0 0 1-8 0v-1a3.5 3.5 0 0 0-1.5-6.7c-.1 0-.2 0-.3.1A4.5 4.5 0 0 1 12 5a4.5 4.5 0 0 1 8.3 2.5 3.5 3.5 0 0 1-.8 11.5z" />
  </svg>
);

const LeetCodeLogo = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#FFA116]">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.432L7.116 6.226a1.09 1.09 0 0 0 0 1.504l.534.527a1.011 1.011 0 0 0 1.442 0L13.84 3.493a.208.208 0 0 1 .3 0l7.35 7.218a.204.204 0 0 1 0 .294l-7.35 7.218a.208.208 0 0 1-.3 0l-1.921-1.886a1.05 1.05 0 0 0-1.488 0l-.534.527a1.09 1.09 0 0 0 0 1.504l3.111 3.053a1.36 1.36 0 0 0 1.922 0l8.977-8.816a1.364 1.364 0 0 0 0-1.942L14.444.432A1.374 1.374 0 0 0 13.483 0zm-6.07 9.471a1.37 1.37 0 0 0-1.884-.04L1.085 13.38a1.364 1.364 0 0 0 0 1.942l4.444 4.359a1.374 1.374 0 0 0 1.922 0 .972.972 0 0 0 0-1.413l-3.482-3.417a.204.204 0 0 1 0-.294l3.482-3.417a.972.972 0 0 0-.04-1.668z" />
  </svg>
);

const CodeChefLogo = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#D3A27F] fill-none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 18c0-2 1-4 3-4h6c2 0 3 2 3 4M12 14V8M9 9a3 3 0 1 1 6 0" />
    <rect x="7" y="17" width="10" height="3" rx="1" fill="currentColor" />
  </svg>
);

// Map skill to logo
function getSkillIcon(skillName) {
  switch (skillName) {
    case "React":
      return <ReactLogo />;
    case "JavaScript":
      return <JSLogo />;
    case "Responsive UI":
      return <Layout className="h-4 w-4 text-brand-accent-teal" />;
    case "State Management":
      return <Sliders className="h-4 w-4 text-brand-accent-amber" />;
    case "Node.js":
    case "NodeJS":
      return <NodeLogo />;
    case "Express":
      return <ExpressLogo />;
    case "REST APIs":
      return <Link className="h-4 w-4 text-brand-accent-teal" />;
    case "Authentication":
      return <Key className="h-4 w-4 text-brand-accent-amber" />;
    case "Authorization":
      return <ShieldCheck className="h-4 w-4 text-brand-accent-teal" />;
    case "Webhooks":
      return <Webhook className="h-4 w-4 text-brand-accent-amber" />;
    case "MongoDB":
      return <MongoDBLogo />;
    case "Mongoose":
      return <MongooseLogo />;
    case "SQL":
      return <SQLLogo />;
    case "MySQL":
      return <MySQLLogo />;
    case "Docker":
      return <DockerLogo />;
    case "AWS EC2":
    case "AWS S3":
      return <AWSLogo />;
    case "LeetCode":
      return <LeetCodeLogo />;
    case "CodeChef":
      return <CodeChefLogo />;
    case "DSA":
      return <Binary className="h-4 w-4 text-brand-accent-amber" />;
    default:
      return <Code className="h-4 w-4 text-brand-muted-slate" />;
  }
}

function SkillCard({ category, index }) {
  const IconComponent = category.icon;
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = ((y - centerY) / centerY) * -12; // Degrees
    const rY = ((x - centerX) / centerX) * 12;  // Degrees
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        style={{ transformStyle: "preserve-3d" }}
        className="bg-brand-panel/40 backdrop-blur-md border border-brand-border/60 rounded-xl p-6 text-left transition-all duration-300 flex flex-col justify-between h-full group hover:bg-brand-panel/55 hover:shadow-xl hover:shadow-brand-accent-teal/5"
      >
        <div style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-brand-secondary-panel border border-brand-border group-hover:border-brand-accent-teal/30 transition-colors">
              <IconComponent className="h-5 w-5 text-brand-accent-amber group-hover:text-brand-accent-teal transition-colors" />
            </div>
            <span className="font-mono text-base font-semibold text-slate-100 group-hover:text-brand-accent-teal transition-colors">
              {category.title}()
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <motion.span
                key={skill}
                whileHover={{ scale: 1.05, y: -2, borderColor: "#4FD1C5" }}
                className="font-sans text-sm px-3 py-1.5 rounded-md bg-brand-secondary-panel border border-brand-border text-slate-300 hover:text-brand-accent-teal transition-all duration-200 cursor-default flex items-center gap-2"
              >
                {getSkillIcon(skill)}
                <span>{skill}</span>
              </motion.span>
            ))}
          </div>
        </div>

        <div className="mt-8 font-mono text-[10px] text-brand-muted-slate text-right" style={{ transform: "translateZ(10px)" }}>
          // {category.skills.length} items loaded
        </div>
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const categories = [
    {
      title: "frontend_dev",
      icon: Monitor,
      skills: ["React", "JavaScript", "Responsive UI", "State Management"],
    },
    {
      title: "backend_services",
      icon: Cpu,
      skills: [
        "Node.js",
        "Express",
        "REST APIs",
        "Authentication",
        "Authorization",
        "Webhooks",
      ],
    },
    {
      title: "database_storage",
      icon: Database,
      skills: ["MongoDB", "Mongoose", "SQL", "MySQL"],
    },
    {
      title: "familiar_with",
      icon: HardDrive,
      skills: ["Docker", "AWS EC2", "AWS S3"],
    },
    {
      title: "problem_solving",
      icon: Terminal,
      skills: ["LeetCode", "CodeChef", "DSA"],
    },
  ];

  return (
    <section id="skills" className="py-20 border-t border-brand-border/40">
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
            <span>// skills</span>
            <span className="h-[1px] bg-brand-border flex-grow ml-4 max-w-xs"></span>
          </h2>
          <h3 className="font-mono text-3xl font-bold mt-2 text-white">
            Technical Skillset Matrix
          </h3>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
