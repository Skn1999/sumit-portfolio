import { useMode } from "@/contexts/ModeContext";
import { Mail, Linkedin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import MagneticButton from "./MagneticButton";

const Contact = () => {
  const { mode } = useMode();
  const isEngineer = mode === "engineer";

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className={`text-4xl md:text-5xl font-bold mb-6 mode-transition ${
            isEngineer
              ? "font-engineer text-gradient-engineer"
              : "font-designer text-gradient-designer"
          }`}
        >
          {isEngineer ? "Coffee? Chat? Let's Talk." : "Your Project Needs This Energy"}
        </h2>

        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
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
                : "font-designer neubrutalism-button bg-[hsl(var(--designer-primary))] text-white hover:bg-[hsl(var(--designer-primary))/90]"
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
            <a href="#" download>
              <FileText className="w-5 h-5 mr-2" />
              Resume
            </a>
          </MagneticButton>
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
