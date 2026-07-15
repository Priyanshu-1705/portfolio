import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, FileText, Code } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const mainLinks = [
    { label: "// home", href: "home" },
    { label: "// about", href: "about" },
    { label: "// projects", href: "projects" },
    { label: "// skills", href: "skills" },
    { label: "// timeline", href: "timeline" },
    { label: "// contact", href: "contact" },
  ];

  const moreLinks = [
    { label: "// github", href: "github" },
    { label: "// leetcode", href: "leetcode" },
    { label: "// certificates", href: "certificates" },
  ];

  // Combined links for mobile menu
  const allLinks = [...mainLinks, ...moreLinks];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate(`/#${href}`);
    } else {
      const element = document.getElementById(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      id="nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-bg/60 backdrop-blur-md border-b border-brand-border/40 py-4 shadow-lg shadow-black/20"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-8 flex-nowrap">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link
              to="/"
              className="font-mono text-lg font-bold tracking-tight text-brand-accent-amber hover:text-brand-accent-teal transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
            >
              <Code className="h-5 w-5" />
              <span>priyanshu.dev</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4 xl:space-x-5 flex-nowrap shrink-0">
            {mainLinks.map((link) => (
              <a
                key={link.href}
                href={`#${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-mono text-xs lg:text-sm font-medium text-brand-muted-slate hover:text-brand-accent-teal transition-colors duration-200 whitespace-nowrap tracking-tight"
              >
                {link.label}
              </a>
            ))}

            {/* Dropdown for More Links */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                className="font-mono text-xs lg:text-sm font-medium text-brand-muted-slate hover:text-brand-accent-teal transition-colors duration-200 flex items-center gap-1 focus:outline-none whitespace-nowrap tracking-tight py-2"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                <span>// more</span>
                <span className={`transition-transform duration-200 text-[10px] ${isDropdownOpen ? "rotate-180" : ""}`}>▾</span>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1 w-44 bg-brand-panel/95 backdrop-blur-md border border-brand-border/60 rounded-lg shadow-xl py-2 flex flex-col z-50"
                  >
                    {moreLinks.map((link) => (
                      <a
                        key={link.href}
                        href={`#${link.href}`}
                        onClick={(e) => {
                          handleNavClick(e, link.href);
                          setIsDropdownOpen(false);
                        }}
                        className="font-mono text-xs font-medium text-brand-muted-slate hover:text-brand-accent-teal hover:bg-white/5 px-4 py-2.5 transition-colors duration-200 text-left whitespace-nowrap"
                      >
                        {link.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/resume"
              className={`font-mono text-xs px-3 py-1.5 lg:px-4 lg:py-2 border rounded-md flex items-center gap-1.5 lg:gap-2 transition-all duration-300 shrink-0 whitespace-nowrap ${
                location.pathname === "/resume"
                  ? "bg-brand-accent-teal/10 border-brand-accent-teal text-brand-accent-teal"
                  : "border-brand-accent-amber/50 text-brand-accent-amber hover:bg-brand-accent-amber/10 hover:border-brand-accent-amber"
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Resume</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <Link
              to="/resume"
              className={`font-mono text-xs px-3 py-1.5 border rounded-md flex items-center gap-1.5 transition-all duration-200 ${
                location.pathname === "/resume"
                  ? "bg-brand-accent-teal/10 border-brand-accent-teal text-brand-accent-teal"
                  : "border-brand-accent-amber/50 text-brand-accent-amber"
              }`}
            >
              <FileText className="h-3 w-3" />
              <span>Resume</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-muted-slate hover:text-brand-accent-amber p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" id="menu-icon-close" />
              ) : (
                <Menu className="h-6 w-6" id="menu-icon-open" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-brand-panel/85 backdrop-blur-lg border-b border-brand-border/60"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 shadow-inner">
              {allLinks.map((link) => (
                <a
                  key={link.href}
                  href={`#${link.href}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block font-mono text-base font-medium text-brand-muted-slate hover:text-brand-accent-teal py-2"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
