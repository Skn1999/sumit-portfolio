import React from "react";
import { motion } from "framer-motion";

const AboutSection: React.FC = () => {
  const inkFadeVariant = {
    hidden: { opacity: 0, filter: "blur(6px)", y: 20 },
    visible: (customDelay: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        delay: customDelay,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section
      id="about-philosophy"
      className="py-20 md:py-32 bg-paper-bg border-t border-paper-border"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="max-w-4xl">
          <motion.span
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={inkFadeVariant}
            className="font-mono text-xs tracking-widest text-ink-muted uppercase block mb-4"
          >
            02 // ABOUT &amp; AI PHILOSOPHY
          </motion.span>

          <motion.h2
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={inkFadeVariant}
            className="text-2xl md:text-4xl font-bold font-display text-ink-primary tracking-tighter mb-8"
          >
            Design Engineering &amp; Human-Computer Interaction
          </motion.h2>

          <motion.div
            custom={0.3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={inkFadeVariant}
            className="p-8 md:p-12 rounded-2xl bg-paper-card border border-paper-border shadow-sm"
          >
            <p className="font-body-narrative text-base md:text-xl text-ink-primary leading-relaxed">
              I am an User Experience and Behavioural Design graduate from Aalto
              University, Finland and University of Trento, Italy. Recently, I
              collaborated with EU Horizon Project to work on Indoor Air Quality
              monitoring project. I focus on design engineering products.
              Having knowledge of both the frontend and the backend, I am able to
              craft the experience exactly as desired. Due to my background in
              Design, I bring a fresh, user-focused perspective to interaction
              design.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
