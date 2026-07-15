import React, { useState } from "react";
import { Mail, Github, Linkedin, Send, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalMessage, setGeneralMessage] = useState(null);
  const [generalType, setGeneralType] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error when user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFieldErrors({});
    setGeneralMessage(null);
    setGeneralType(null);

    try {
      const res = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({ success: false }));

      if (res.status === 201) {
        setGeneralMessage(data.message || "Message sent successfully!");
        setGeneralType("success");
        setFormData({ name: "", email: "", message: "" });
      } else if (res.status === 400 && data.errors) {
        const errorsMap = {};
        data.errors.forEach((err) => {
          errorsMap[err.field] = err.message;
        });
        setFieldErrors(errorsMap);
        setGeneralMessage("Validation failed. Please correct the fields below.");
        setGeneralType("error");
      } else if (res.status === 429) {
        setGeneralMessage(data.message || "You are sending requests too quickly. Please try again later.");
        setGeneralType("notice");
      } else {
        setGeneralMessage(data.message || "Something went wrong. Please try again later.");
        setGeneralType("error");
      }
    } catch (err) {
      console.error("Contact Form Submission Error:", err);
      setGeneralMessage("Network error. Could not connect to the API server.");
      setGeneralType("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-brand-border/40">
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
            <span>// contact</span>
            <span className="h-[1px] bg-brand-border flex-grow ml-4 max-w-xs"></span>
          </h2>
          <h3 className="font-mono text-3xl font-bold mt-2 text-white">
            Get In Touch
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Quick Info (Col span 5) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8 text-left"
          >
            <div className="space-y-4">
              <p className="font-sans text-lg text-slate-300 leading-relaxed">
                Whether you have an internship opening, a freelance inquiry, or just want to
                chat about tech — feel free to drop me a message! I usually reply within
                a few hours.
              </p>
            </div>

            <div className="space-y-4 font-mono text-sm">
              <motion.a
                href="mailto:priyanshugangwar17@gmail.com"
                whileHover={{ y: -3, borderColor: "#4FD1C5" }}
                className="flex items-center gap-4 p-4 bg-brand-panel/40 backdrop-blur-md border border-brand-border/60 rounded-xl transition-all duration-300 group hover:bg-brand-panel/55"
              >
                <div className="p-2 bg-brand-secondary-panel rounded-lg border border-brand-border group-hover:border-brand-accent-teal/30 text-brand-accent-amber group-hover:text-brand-accent-teal transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs text-brand-muted-slate block">EMAIL</span>
                  <span className="text-slate-200 text-sm break-all font-sans">
                    priyanshugangwar17@gmail.com
                  </span>
                </div>
              </motion.a>

              <motion.a
                href="https://github.com/Priyanshu-1705"
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3, borderColor: "#4FD1C5" }}
                className="flex items-center gap-4 p-4 bg-brand-panel/40 backdrop-blur-md border border-brand-border/60 rounded-xl transition-all duration-300 group hover:bg-brand-panel/55"
              >
                <div className="p-2 bg-brand-secondary-panel rounded-lg border border-brand-border group-hover:border-brand-accent-teal/30 text-brand-accent-amber group-hover:text-brand-accent-teal transition-colors">
                  <Github className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs text-brand-muted-slate block">GITHUB</span>
                  <span className="text-slate-200 text-sm font-sans">github.com/Priyanshu-1705</span>
                </div>
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/priyanshu-gangwar-746520295"
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3, borderColor: "#4FD1C5" }}
                className="flex items-center gap-4 p-4 bg-brand-panel/40 backdrop-blur-md border border-brand-border/60 rounded-xl transition-all duration-300 group hover:bg-brand-panel/55"
              >
                <div className="p-2 bg-brand-secondary-panel rounded-lg border border-brand-border group-hover:border-brand-accent-teal/30 text-brand-accent-amber group-hover:text-brand-accent-teal transition-colors">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs text-brand-muted-slate block">LINKEDIN</span>
                  <span className="text-slate-200 text-sm font-sans">
                    linkedin.com/in/priyanshu-gangwar-746520295
                  </span>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Form Container (Col span 7) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="bg-brand-panel/40 backdrop-blur-md border border-brand-border/60 rounded-xl p-6 sm:p-8">
              <h4 className="font-mono text-base font-semibold text-white text-left mb-6">
                // send_message.sh
              </h4>

              {/* General Message Banners */}
              <AnimatePresence mode="wait">
                {generalMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-lg mb-6 flex items-start gap-3 text-left border ${
                      generalType === "success"
                        ? "bg-brand-accent-teal/5 border-brand-accent-teal/30 text-brand-accent-teal"
                        : generalType === "notice"
                        ? "bg-brand-accent-amber/5 border-brand-accent-amber/30 text-brand-accent-amber"
                        : "bg-red-500/5 border-red-500/20 text-red-400"
                    }`}
                  >
                    {generalType === "success" ? (
                      <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="font-sans text-sm">{generalMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                {/* Name field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-xs text-brand-muted-slate mb-1.5"
                  >
                    const name =
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='"Your Name"'
                    className={`w-full bg-brand-secondary-panel border rounded-md px-4 py-3 font-sans text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand-accent-teal transition-all duration-200 ${
                      fieldErrors.name ? "border-red-500/60 focus:border-red-500" : "border-brand-border"
                    }`}
                  />
                  {fieldErrors.name && (
                    <p className="mt-1 font-mono text-[11px] text-red-400">
                      ⚠ {fieldErrors.name}
                    </p>
                  )}
                </div>

                {/* Email field */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-xs text-brand-muted-slate mb-1.5"
                  >
                    const email =
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='"your.email@example.com"'
                    className={`w-full bg-brand-secondary-panel border rounded-md px-4 py-3 font-sans text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand-accent-teal transition-all duration-200 ${
                      fieldErrors.email ? "border-red-500/60 focus:border-red-500" : "border-brand-border"
                    }`}
                  />
                  {fieldErrors.email && (
                    <p className="mt-1 font-mono text-[11px] text-red-400">
                      ⚠ {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Message field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs text-brand-muted-slate mb-1.5"
                  >
                    const message =
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder='`Your message contents here...`'
                    className={`w-full bg-brand-secondary-panel border rounded-md px-4 py-3 font-sans text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand-accent-teal transition-all duration-200 resize-y ${
                      fieldErrors.message ? "border-red-500/60 focus:border-red-500" : "border-brand-border"
                    }`}
                  />
                  {fieldErrors.message && (
                    <p className="mt-1 font-mono text-[11px] text-red-400">
                      ⚠ {fieldErrors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileTap={{ scale: 0.98 }}
                  className="w-full font-mono text-sm py-3 px-6 rounded-md bg-brand-accent-amber text-brand-bg font-bold hover:bg-brand-accent-amber/90 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-brand-bg" />
                      <span>transmitting_data...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 text-brand-bg" />
                      <span>execute_send()</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
