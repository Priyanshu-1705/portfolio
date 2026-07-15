import React, { useState, useEffect } from "react";
import { ExternalLink, Github, Layers, Info } from "lucide-react";
import { motion } from "motion/react";

const MOCK_PROJECTS = [
  {
    _id: "fallback-nexaai",
    name: "NexaAI",
    tag: "AI SaaS Platform",
    description: "An AI software-as-a-service application integrating OpenAI and Stripe for high-fidelity image, text, and chat generation with real-time customer support.",
    thumbnail: "", // Relative thumbnail gets prepended with VITE_API_BASE_URL, empty gracefully hides it
    screenshots: [],
    stack: ["React", "Node.js", "Express", "MongoDB", "OpenAI API", "Stripe", "Socket.IO", "ImageKit"],
    githubUrl: "https://github.com/Priyanshu-1705",
    liveUrl: "",
    featured: true,
    order: 1
  },
  {
    _id: "fallback-mission-academy",
    name: "Mission Academy CMS",
    tag: "School Management System",
    description: "A school content management system with 55+ RESTful APIs across 11 backend modules, JWT authentication, role-based access control, and Cloudinary-based media management, built on an MVC architecture with 11 MongoDB models.",
    thumbnail: "",
    screenshots: [],
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "RBAC", "Cloudinary", "MVC"],
    githubUrl: "https://github.com/Priyanshu-1705",
    liveUrl: "",
    featured: true,
    order: 2
  }
];

function ProjectCard({ project, index, getThumbnailUrl }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = ((y - centerY) / centerY) * -10; // Degrees
    const rY = ((x - centerX) / centerX) * 10;  // Degrees
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
        className="bg-brand-panel/40 backdrop-blur-md border border-brand-border/60 rounded-xl overflow-hidden flex flex-col text-left transition-colors duration-300 h-full group hover:bg-brand-panel/55 hover:shadow-2xl hover:shadow-brand-accent-teal/5"
      >
        {/* Project Thumbnail */}
        {project.thumbnail ? (
          <div className="h-52 w-full overflow-hidden bg-brand-secondary-panel relative border-b border-brand-border" style={{ transform: "translateZ(15px)" }}>
            <img
              src={getThumbnailUrl(project.thumbnail)}
              alt={project.name}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.target.style.display = "none";
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : null}

        {/* Card Content */}
        <div className="p-6 flex-grow flex flex-col justify-between space-y-6" style={{ transform: "translateZ(25px)" }}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-brand-accent-teal/10 border border-brand-accent-teal/20 text-brand-accent-teal">
                {project.tag}
              </span>
              {project.featured && (
                <span className="font-mono text-[10px] uppercase tracking-wider text-brand-accent-amber bg-brand-accent-amber/5 px-2 py-0.5 rounded border border-brand-accent-amber/10">
                  Featured
                </span>
              )}
            </div>
            <h4 className="font-sans text-2xl font-bold text-white group-hover:text-brand-accent-teal transition-colors duration-200">
              {project.name}
            </h4>
            <p className="font-sans text-sm text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Stack and Action Links */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[11px] px-2 py-0.5 rounded bg-brand-secondary-panel border border-brand-border text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-2 border-t border-brand-border/60">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-brand-muted-slate hover:text-brand-accent-amber flex items-center gap-1.5 transition-colors duration-200"
                >
                  <Github className="h-4 w-4" />
                  <span>github_repo</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-brand-accent-teal hover:text-brand-accent-amber flex items-center gap-1.5 transition-colors duration-200"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>live_demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    let active = true;

    async function fetchProjects() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${apiBaseUrl}/api/projects`);
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
        }
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const sorted = [...json.data].sort((a, b) => {
            const orderDiff = (a.order || 99) - (b.order || 99);
            return orderDiff !== 0 ? orderDiff : a.name.localeCompare(b.name);
          });
          if (active) {
            setProjects(sorted);
          }
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        console.warn("Could not load dynamic projects database, using fallback data. Details:", err);
        if (active) {
          setError(
            `Unable to connect to the live projects API at ${apiBaseUrl}. Showing offline pre-cached projects instead.`
          );
          setProjects(MOCK_PROJECTS);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchProjects();

    return () => {
      active = false;
    };
  }, [apiBaseUrl]);

  const getThumbnailUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${apiBaseUrl}${normalizedPath}`;
  };

  return (
    <section id="projects" className="py-20 border-t border-brand-border/40">
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
            <span>// projects</span>
            <span className="h-[1px] bg-brand-border flex-grow ml-4 max-w-xs"></span>
          </h2>
          <h3 className="font-mono text-3xl font-bold mt-2 text-white">
            Featured Systems & Applications
          </h3>
        </motion.div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((n) => (
              <div key={n} className="bg-brand-panel/30 backdrop-blur-md border border-brand-border/60 rounded-xl p-6 h-80 animate-pulse flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="h-4 bg-brand-border rounded w-1/4"></div>
                  <div className="h-8 bg-brand-border rounded w-3/4"></div>
                  <div className="h-16 bg-brand-border rounded w-full"></div>
                </div>
                <div className="h-6 bg-brand-border rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Subtle Friendly Fallback Banner if fetch failed but we loaded cache */}
        {!loading && error && (
          <div className="mb-8 p-4 bg-brand-panel/40 backdrop-blur-md border border-brand-accent-amber/30 rounded-xl text-left flex items-start gap-3 max-w-3xl">
            <Info className="h-5 w-5 text-brand-accent-amber flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-mono text-xs font-bold text-white">
                // system_status: offline_fallback_loaded
              </h4>
              <p className="font-sans text-xs text-brand-muted-slate leading-relaxed">
                Could not connect to the live MongoDB API at <code className="text-brand-accent-teal">{apiBaseUrl}/api/projects</code>.
                We have populated the grid below with Priyanshu's verified project cache so you can test and preview the interface seamlessly.
              </p>
            </div>
          </div>
        )}

        {/* Dynamic / Fallback Projects Grid */}
        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project._id}
                project={project}
                index={index}
                getThumbnailUrl={getThumbnailUrl}
              />
            ))}
          </div>
        )}

        {/* Real Dynamic Projects list was empty and there was no load error */}
        {!loading && !error && projects.length === 0 && (
          <div className="p-12 text-center bg-brand-panel/40 backdrop-blur-md border border-brand-border/60 rounded-xl">
            <Layers className="h-12 w-12 text-brand-muted-slate mx-auto mb-4" />
            <p className="font-sans text-lg text-slate-300">No projects found in the API database.</p>
          </div>
        )}
      </div>
    </section>
  );
}