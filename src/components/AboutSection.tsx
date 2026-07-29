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
      className="pt-20 md:pt-32 bg-paper-bg border-t border-paper-border"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* 2-Column Layout with 40/60 split (lg:col-span-5 left, lg:col-span-7 right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (40% split): Heading & Tag */}
          <motion.div
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={inkFadeVariant}
            className="lg:col-span-5 flex flex-col"
          >
            <span className="font-mono text-xs tracking-widest text-ink-muted uppercase block mb-3">
              02 // ABOUT &amp; AI PHILOSOPHY
            </span>

            <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-primary tracking-tighter mb-4">
              Design Engineering &amp; Human-Computer Interaction
            </h2>
          </motion.div>

          {/* Right Column (60% split): Bio Description Narrative */}
          <motion.div
            custom={0.3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={inkFadeVariant}
            className="lg:col-span-7 flex flex-col justify-center pt-2 lg:pt-8"
          >
            <p className="font-body-narrative text-base md:text-lg text-ink-muted leading-[1.8]">
              I am an User Experience and Behavioural Design graduate from Aalto
              University, Finland and University of Trento, Italy. Recently, I
              collaborated with EU Horizon Project to work on Indoor Air Quality
              monitoring project. I focus on design engineering products. Having
              knowledge of both the frontend and the backend, I am able to craft
              the experience exactly as desired. Due to my background in Design,
              I bring a fresh, user-focused perspective to interaction design.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
