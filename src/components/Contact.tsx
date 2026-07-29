import React, { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, Github } from "lucide-react";

const Contact = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <section
      id="contact"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-24 md:py-36 relative overflow-hidden bg-paper-bg border-t border-paper-border"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-paper-border bg-paper-card p-8 md:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left Column: Heading & Subheading */}
            <div className="lg:col-span-8 flex flex-col text-left">
              <span className="font-mono text-xs tracking-widest text-ink-muted uppercase font-semibold mb-3">
                04. CONTACT // GET IN TOUCH
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-primary mb-4 tracking-tighter">
                Need Human Oversight in Your AI &amp; Product Pipeline?
              </h2>
              <p className="text-sm md:text-base text-ink-muted font-body-narrative leading-relaxed max-w-xl">
                Whether you're building next-gen AI tools or scaling complex enterprise
                interfaces, I ensure your product delivers velocity without sacrificing UX
                rigor or code quality.
              </p>
            </div>

            {/* Right Column: Direct Contact Links */}
            <div className="lg:col-span-4 flex flex-col gap-4 w-full">
              <a
                href="mailto:sknayyar.sk@gmail.com"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl border border-paper-border bg-paper-bg hover:border-ink-primary text-ink-primary font-mono text-xs uppercase tracking-wider font-semibold transition-all"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </a>
              <a
                href="https://www.linkedin.com/in/sumitnayyar-ux/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl border border-paper-border bg-paper-bg hover:border-ink-primary text-ink-primary font-mono text-xs uppercase tracking-wider font-semibold transition-all"
              >
                <Linkedin className="w-4 h-4" />
                Connect on LinkedIn
              </a>
              <a
                href="https://github.com/Skn1999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl border border-paper-border bg-paper-bg hover:border-ink-primary text-ink-primary font-mono text-xs uppercase tracking-wider font-semibold transition-all"
              >
                <Github className="w-4 h-4" />
                GitHub Profile
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const UnsaidMoments = () => {
  return (
    <section id="unsaid-moments" className="py-16 md:py-24 text-center">
      <div className="max-w-4xl mx-auto px-4 md:px-0">
        <span className="font-label text-[10px] md:text-xs tracking-widest text-slate-500 uppercase font-semibold block mb-3">
          // MY NEWSLETTER
        </span>
        <h2 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-4 tracking-tighter">
          Unsaid Moments
        </h2>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mb-8 max-w-lg mx-auto font-body-narrative leading-relaxed">
          A small publication where I explore my passion for writing about
          complex yet thoughtful moments.
        </p>
        <div className="mx-auto max-w-xl rounded-2xl overflow-hidden border border-border/60 shadow-sm bg-white dark:bg-white">
          <iframe
            src="https://sumit6131.substack.com/embed"
            width="100%"
            height="320"
            style={{ border: "none", background: "white" }}
            frameBorder="0"
            scrolling="no"
            title="Subscribe to Unsaid Moments on Substack"
          />
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="py-8 md:py-12 border-t border-paper-border bg-paper-bg text-ink-muted text-xs font-mono">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-center md:text-left tracking-wide">
          Helsinki, FI // Concluding Master's Thesis at Aalto University. Available for team deployment.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="mailto:sknayyar.sk@gmail.com"
            className="hover:text-ink-primary transition-colors tracking-widest uppercase"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/sumitnayyar-ux/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink-primary transition-colors tracking-widest uppercase"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Skn1999"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink-primary transition-colors tracking-widest uppercase"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
