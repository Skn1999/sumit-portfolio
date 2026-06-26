import { Mail, Linkedin, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import MagneticButton from "./MagneticButton";

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-32">
      <div className="max-w-4xl mx-auto text-center px-4 md:px-0">
        <h2 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-6">
          Coffee? Chat? Let's Talk.
        </h2>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-body-narrative">
          I bring curiosity, code, and coffee. Let's build something we're proud of.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <MagneticButton
            size="lg"
            className="font-label text-xs tracking-wider uppercase font-semibold"
            asChild
          >
            <a href="mailto:sknayyar.sk@gmail.com">
              <Mail className="w-4 h-4 mr-2" />
              Email Me
            </a>
          </MagneticButton>

          <MagneticButton
            size="lg"
            variant="outline"
            className="font-label text-xs tracking-wider uppercase font-semibold"
            asChild
          >
            <a
              href="https://www.linkedin.com/in/sumitnayyar-ux/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </a>
          </MagneticButton>

          <MagneticButton
            size="lg"
            variant="outline"
            className="font-label text-xs tracking-wider uppercase font-semibold"
            asChild
          >
            <Link to="/resume">
              <FileText className="w-4 h-4 mr-2" />
              Resume
            </Link>
          </MagneticButton>
        </div>

        {/* ── Substack Subscribe ── */}
        <div className="mt-16 mx-auto text-center max-w-xl">
          <div className="rounded-2xl overflow-hidden border border-border/60 shadow-sm">
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

        <div className="mt-20 pt-8 border-t border-border/20">
          <p className="text-sm text-muted-foreground">
            © 2026 Sumit Knayyar. Designed with intention, built with care.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
