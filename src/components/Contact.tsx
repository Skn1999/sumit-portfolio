import React, { useState } from "react";
import { Mail, Linkedin, Github, ExternalLink } from "lucide-react";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const email = "sknayyar.sk@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inkFadeVariant = {
    hidden: { opacity: 0, filter: "blur(6px)", y: 20 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-32 bg-paper-bg border-t border-paper-border"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col text-left">
            <span className="font-mono text-xs tracking-widest text-ink-muted uppercase font-semibold mb-3">
              04 // CONTACT
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-primary tracking-tighter mb-4">
              Let's Connect &amp; Collaborate
            </h2>
            <p className="font-body-narrative text-base md:text-lg text-ink-muted leading-relaxed mb-6 max-w-lg">
              Whether you're building next-generation products or seeking UX
              design &amp; engineering leadership, I'm always open to discussing
              new opportunities.
            </p>
          </div>

          {/* Right Column: Contact Card */}
          <div className="lg:col-span-6">
            <div className="p-8 md:p-10 rounded-2xl bg-paper-card border border-paper-border shadow-sm flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs tracking-widest text-ink-muted uppercase">
                  Direct Email
                </span>
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-paper-border bg-paper-bg">
                  <span className="font-mono text-sm font-semibold text-ink-primary truncate">
                    {email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="px-3 py-1.5 rounded bg-paper-card border border-paper-border text-xs font-mono text-ink-primary hover:border-ink-primary transition-all shrink-0"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href="mailto:sknayyar.sk@gmail.com"
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-paper-border bg-paper-bg hover:border-ink-primary text-ink-primary font-mono text-xs uppercase tracking-wider font-semibold transition-all"
                >
                  <Mail className="w-4 h-4 text-ink-muted" />
                  <span>Email</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/sumitnayyar-ux/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-paper-border bg-paper-bg hover:border-ink-primary text-ink-primary font-mono text-xs uppercase tracking-wider font-semibold transition-all"
                >
                  <Linkedin className="w-4 h-4 text-ink-muted" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/Skn1999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-paper-border bg-paper-bg hover:border-ink-primary text-ink-primary font-mono text-xs uppercase tracking-wider font-semibold transition-all"
                >
                  <Github className="w-4 h-4 text-ink-muted" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.behance.net/sumitnayyar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-paper-border bg-paper-bg hover:border-ink-primary text-ink-primary font-mono text-xs uppercase tracking-wider font-semibold transition-all"
                >
                  <ExternalLink className="w-4 h-4 text-ink-muted" />
                  <span>Behance</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const UnsaidMoments = () => {
  return (
    <section
      id="unsaid-moments"
      className="py-16 md:py-24 text-center bg-paper-bg border-t border-paper-border"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-0">
        <span className="font-mono text-xs tracking-widest text-ink-muted uppercase font-semibold block mb-3">
          // PUBLICATION
        </span>
        <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-primary mb-4 tracking-tighter">
          Unsaid Moments
        </h2>
        <p className="text-sm md:text-base text-ink-muted mb-8 max-w-lg mx-auto font-body-narrative leading-relaxed">
          A publication where I explore writing about complex yet thoughtful
          design and human interactions.
        </p>
        <div className="mx-auto max-w-xl rounded-2xl overflow-hidden border border-paper-border shadow-sm bg-paper-card">
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
          Helsinki, FI // Available for new roles.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/sumitnayyar-ux/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink-primary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Skn1999"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink-primary transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.behance.net/sumitnayyar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink-primary transition-colors"
          >
            Behance
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
