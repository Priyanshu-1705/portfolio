import React, { useState } from "react";
import { motion } from "motion/react";
import { certificates } from "../data/certificates";
import { Award, Calendar, ExternalLink, Shield, FileText } from "lucide-react";

function CertificateCard({ cert }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = ((y - centerY) / centerY) * -10; // 10 degrees tilt max
    const rY = ((x - centerX) / centerX) * 10;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const certificateUrl = `/certificates/${cert.fileName}`;

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.a
        href={certificateUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        style={{ transformStyle: "preserve-3d" }}
        className="bg-brand-panel/40 backdrop-blur-md border border-brand-border/60 rounded-xl p-6 text-left transition-colors duration-300 flex flex-col justify-between h-full group hover:bg-brand-panel/55 hover:shadow-2xl hover:shadow-brand-accent-teal/5 block"
      >
        <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="space-y-4">
          
          {/* Top Bar inside Card */}
          <div className="flex items-center justify-between" style={{ transform: "translateZ(10px)" }}>
            <div className="p-3 rounded-lg bg-brand-secondary-panel border border-brand-border group-hover:border-brand-accent-teal/30 group-hover:bg-brand-accent-teal/5 transition-all duration-300 text-brand-accent-teal">
              <Award className="h-5 w-5" />
            </div>
            <span className="font-mono text-xs text-brand-muted-slate flex items-center gap-1 hover:text-brand-accent-teal transition-colors">
              <span>view_credential.bin</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Certificate Credentials */}
          <div className="space-y-2" style={{ transform: "translateZ(20px)" }}>
            <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-brand-accent-amber/10 border border-brand-accent-amber/20 text-brand-accent-amber">
              {cert.issuer}
            </span>
            <h4 className="font-sans text-lg font-bold text-white tracking-tight pt-1 group-hover:text-brand-accent-teal transition-colors">
              {cert.title}
            </h4>
          </div>

        </div>

        {/* Card Footer with Details */}
        <div 
          className="mt-6 pt-4 border-t border-brand-border/30 flex items-center justify-between font-mono text-xs text-brand-muted-slate"
          style={{ transform: "translateZ(15px)" }}
        >
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-brand-accent-teal" />
            <span>{cert.date}</span>
          </div>
          <span className="text-[10px] text-brand-accent-amber">// local_verification</span>
        </div>

      </motion.a>
    </div>
  );
}

export default function Certificates() {
  return (
    <section id="certificates" className="py-20 border-t border-brand-border/40">
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
            <span>// certificates_and_credentials</span>
            <span className="h-[1px] bg-brand-border flex-grow ml-4 max-w-xs"></span>
          </h2>
          <h3 className="font-mono text-3xl font-bold mt-2 text-white">
            Professional Certifications
          </h3>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {certificates.map((cert, idx) => (
            <CertificateCard key={idx} cert={cert} />
          ))}
        </div>

      </div>
    </section>
  );
}
