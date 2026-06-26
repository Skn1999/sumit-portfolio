import React, { useState } from "react";
import { Linkedin } from "lucide-react";
import MagneticButton from "./MagneticButton";

const Contact = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isOverInteractive, setIsOverInteractive] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleSectionClick = () => {
    if (!isOverInteractive) {
      window.location.href = "mailto:sknayyar.sk@gmail.com";
    }
  };

  return (
    <section
      id="contact"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleSectionClick}
      className={`py-16 md:py-24 relative overflow-hidden border border-border/40 select-none transition-colors duration-300 hover:bg-[hsl(var(--card))]/35 bg-[hsl(var(--card))]/10 rounded-[24px] px-6 md:px-10 ${
        isHovered && !isOverInteractive ? "cursor-none" : ""
      }`}
    >
      {/* Custom hover cursor follow */}
      {isHovered && !isOverInteractive && (
        <div
          className="pointer-events-none absolute z-50 w-24 h-24 rounded-full bg-[hsl(var(--primary))] text-primary-foreground text-[10px] font-label font-bold uppercase tracking-widest flex items-center justify-center text-center p-2 shadow-2xl select-none -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        >
          Reach out
        </div>
      )}

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column: Heading & Subheading */}
          <div className="lg:col-span-8 flex flex-col text-left">
            <span className="font-label text-[10px] md:text-xs tracking-widest text-slate-500 uppercase font-semibold mb-3">
              // CONNECT
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-4 tracking-tighter">
              Coffee? Chat? Let's Talk.
            </h2>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-body-narrative leading-relaxed max-w-xl">
              I bring curiosity, code, and coffee. Let's build something we're proud of. Click anywhere in this block to send me an email.
            </p>
          </div>

          {/* Right Column: Social Links */}
          <div
            className="lg:col-span-4 flex flex-row lg:justify-end gap-4 w-full pointer-events-auto"
            onMouseEnter={() => setIsOverInteractive(true)}
            onMouseLeave={() => setIsOverInteractive(false)}
          >
            <MagneticButton
              size="icon"
              variant="outline"
              className="rounded-full w-12 h-12 border-border/80 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10 flex items-center justify-center shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                window.open("https://www.linkedin.com/in/sumitnayyar-ux/", "_blank", "noopener,noreferrer");
              }}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </MagneticButton>

            <MagneticButton
              size="icon"
              variant="outline"
              className="rounded-full w-12 h-12 border-border/80 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10 flex items-center justify-center shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                window.open("https://www.behance.net/desman_designer", "_blank", "noopener,noreferrer");
              }}
              aria-label="Behance"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
              </svg>
            </MagneticButton>
          </div>
        </div>
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
          Weekly thoughts on design systems, human-computer interaction, and building things that matter.
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
    <footer className="py-8 border-t border-border/20 text-center">
      <p className="text-xs md:text-sm text-slate-400 font-label tracking-wider uppercase">
        © 2026 Sumit Knayyar. Designed with intention, built with care.
      </p>
    </footer>
  );
};

export default Contact;
