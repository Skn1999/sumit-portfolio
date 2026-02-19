import { useMode } from "@/contexts/ModeContext";
import { Mail, Linkedin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MagneticButton from "./MagneticButton";

const Contact = () => {
  const { mode } = useMode();
  const isEngineer = mode === "engineer";

  return (
    <section id="contact" className="py-12 md:py-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className={`heading-primary text-4xl md:text-5xl font-bold mb-6 mode-transition ${
            isEngineer ? "text-gradient-engineer" : "text-gradient-designer"
          }`}
        >
          {isEngineer
            ? "Coffee? Chat? Let's Talk."
            : "Your Project Needs This Energy"}
        </h2>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
          {isEngineer
            ? "I bring curiosity, code, and coffee. Let's build something you're proud of."
            : "I bring empathy, research, and imagination. Let's create experiences people love."}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <MagneticButton
            size="lg"
            className={`${
              isEngineer
                ? "font-engineer"
                : "font-designer neubrutalism-button bg-[hsl(var(--designer-primary))] text-white"
            }`}
            asChild
          >
            <a href="mailto:sknayyar.sk@gmail.com">
              <Mail className="w-5 h-5 mr-2" />
              Email Me
            </a>
          </MagneticButton>

          <MagneticButton
            size="lg"
            variant="outline"
            className={`${
              isEngineer ? "font-engineer" : "font-designer neubrutalism-button"
            }`}
            asChild
          >
            <a
              href="https://linkedin.com/in/sumit-knayyar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </a>
          </MagneticButton>

          <MagneticButton
            size="lg"
            variant="outline"
            className={`${
              isEngineer ? "font-engineer" : "font-designer neubrutalism-button"
            }`}
            asChild
          >
            <Link to="/resume">
              <FileText className="w-5 h-5 mr-2" />
              Resume
            </Link>
          </MagneticButton>
        </div>

        {/* ── Substack Subscribe ── */}
        <div className="mt-16 mx-auto text-center">
          {/* <p className="text-sm text-muted-foreground font-body mb-1">
            I also write about the quiet, unfiltered side of life.
          </p>
          <p className="text-base font-heading font-semibold text-foreground mb-4">
            awkward silences, unspoken kindnesses, and moments we replay in our
            heads.
          </p> */}
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
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

        <div className="mt-16 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            © 2025 Sumit Knayyar. Designed & Built with dual personality.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
