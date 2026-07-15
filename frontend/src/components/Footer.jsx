import React from "react";
import { Terminal } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-panel border-t border-brand-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-mono text-sm text-brand-muted-slate">
            <Terminal className="h-4 w-4 text-brand-accent-teal" />
            <span>priyanshu.dev</span>
            <span className="text-brand-border">|</span>
            <span>v1.0.0</span>
          </div>

          <div className="text-center md:text-right font-sans text-xs text-brand-muted-slate space-y-1">
            <p>© {currentYear} Priyanshu Gangwar. All rights reserved.</p>
            <p>
              Designed and developed with{" "}
              <span className="text-brand-accent-amber font-semibold">React</span> +{" "}
              <span className="text-brand-accent-teal font-semibold">Tailwind CSS</span>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
