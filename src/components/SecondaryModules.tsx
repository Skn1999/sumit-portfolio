import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X, Download, Eye, Grab, Move } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

export const AcademicCohorts: React.FC = () => {
  const cohorts = [
    {
      title: "EIT Digital Venture Lab Project",
      focus: "Scalable service prototyping, pan-European stakeholder alignment, and interface flow mapping for emerging digital ecosystems.",
      deliverable: "Interactive high-fidelity prototype and systemic venture architecture roadmap",
      link: null,
    },
    {
      title: "Selected Master's Curricular Systems Design",
      focus: "Applying advanced user-centered research methodologies, semantic layouts, and data visualizations to complex interactive domains.",
      deliverable: "Complete heuristic analysis documentation and user testing matrices",
      link: null,
    },
    {
      title: "UX Bites & Micro-Interactions Index",
      focus: "Rapid design exploration sandboxes validating transition curves, accessible typography tokens, and responsive frontend component behavior.",
      deliverable: "Production-ready asset sandboxes and motion choreography sketches",
      link: "/ux-bites",
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-background border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 lg:px-0">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span className="font-label text-xs tracking-widest text-slate-500 uppercase font-semibold">// ACADEMIC PORTFOLIO</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-foreground mt-2 tracking-tighter">
            Academic Case Cohorts &amp; UX Bites
          </h2>
        </div>

        {/* Rows Container */}
        <div className="border-t border-border/60">
          {cohorts.map((cohort, index) => (
            <div
              key={index}
              className="group border-b border-border/60 py-8 md:py-10 transition-colors duration-300 hover:bg-[hsl(var(--card))]/40 px-4 md:px-6 -mx-4 md:-mx-6 rounded-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                {/* Column 1: Title */}
                <div className="lg:col-span-4 flex flex-col gap-2">
                  <span className="font-label text-[10px] tracking-widest text-[hsl(var(--primary))] uppercase font-bold">
                    COHORT {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold font-display text-foreground group-hover:text-[hsl(var(--primary))] transition-colors duration-300 leading-tight">
                    {cohort.title}
                  </h3>
                </div>

                {/* Column 2: Context / Focus */}
                <div className="lg:col-span-5">
                  <p className="font-body-narrative text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                    {cohort.focus}
                  </p>
                </div>

                {/* Column 3: Deliverable */}
                <div className="lg:col-span-3 flex justify-start lg:justify-end">
                  {cohort.link ? (
                    <Link
                      to={cohort.link}
                      className="inline-flex items-center gap-2 font-label font-bold text-xs text-[hsl(var(--primary))] uppercase tracking-wider group/link hover:opacity-85 transition-opacity"
                    >
                      <span className="border-b border-[hsl(var(--primary))]/30 group-hover:border-[hsl(var(--primary))] pb-0.5">
                        {cohort.deliverable}
                      </span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  ) : (
                    <div className="font-engineer text-[10px] md:text-xs text-slate-600 dark:text-slate-400 border border-border/40 bg-[hsl(var(--card))] px-3 py-1.5 rounded-lg shadow-sm">
                      {cohort.deliverable}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface CredentialItem {
  scope: string;
  authorizer: string;
  pillar: string;
  image: string | null;
}

interface CardProps {
  item: CredentialItem;
  index: number;
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
  constraintsRef: React.RefObject<HTMLDivElement>;
  isActive: boolean;
  onSelect: () => void;
  onInteractingStart: () => void;
  onInteractingEnd: () => void;
}

const Card: React.FC<CardProps> = ({
  item,
  index,
  scrollYProgress,
  isMobile,
  constraintsRef,
  isActive,
  onSelect,
  onInteractingStart,
  onInteractingEnd,
}) => {
  // Base coordinates for fanned out layout in the center of the canvas
  const basePositionsX = [-300, -140, 0, 140, 300, -220, 80, 220];
  const basePositionsY = [-60, 40, -40, 60, -30, 100, -100, 80];
  const baseRotates = [-12, -6, -2, 4, 10, -5, -8, 6];

  const targetX = basePositionsX[index] * (isMobile ? 0.45 : 1.0);
  const targetY = basePositionsY[index] * (isMobile ? 0.45 : 1.0);
  const targetRotate = baseRotates[index];

  const startScroll = index * 0.08;
  const endScroll = Math.min(startScroll + 0.15, 0.95);

  const startX = isMobile ? 350 : 850;
  const startY = isMobile ? 150 : 300;

  // Scroll-driven transforms
  const xRaw = useTransform(scrollYProgress, [0, startScroll, endScroll], [startX, startX, targetX]);
  const yRaw = useTransform(scrollYProgress, [0, startScroll, endScroll], [startY, startY, targetY]);
  const rotateRaw = useTransform(scrollYProgress, [0, startScroll, endScroll], [35, 35, targetRotate]);
  const opacityRaw = useTransform(scrollYProgress, [0, startScroll, endScroll], [0, 0, 1]);

  // Spring settings for satisfying fluid motion
  const x = useSpring(xRaw, { stiffness: 60, damping: 15 });
  const y = useSpring(yRaw, { stiffness: 60, damping: 15 });
  const rotate = useSpring(rotateRaw, { stiffness: 60, damping: 15 });
  const opacity = useSpring(opacityRaw, { stiffness: 60, damping: 15 });

  const hasImage = !!item.image;

  return (
    <motion.div
      style={{ x, y, rotate, opacity }}
      className="absolute left-1/2 top-1/2 pointer-events-auto -ml-[95px] -mt-[125px] md:-ml-[130px] md:-mt-[175px]"
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.15}
        whileDrag={{ scale: 1.05, rotate: 0, zIndex: 100 }}
        onDragStart={onInteractingStart}
        onDragEnd={onInteractingEnd}
        onHoverStart={onInteractingStart}
        onHoverEnd={onInteractingEnd}
        onTap={onSelect}
        className={`w-[190px] h-[250px] md:w-[260px] md:h-[350px] flex flex-col justify-between border rounded-xl bg-[hsl(var(--card))] overflow-hidden transition-shadow duration-300 shadow-sm active:shadow-2xl hover:shadow-lg select-none cursor-grab active:cursor-grabbing ${
          isActive ? "border-primary/80 ring-1 ring-primary/20" : "border-border/40"
        } ${!hasImage ? "border-dashed" : ""}`}
      >
        {/* Card Header / Image Preview */}
        <div className="h-[110px] md:h-[180px] overflow-hidden bg-slate-50 dark:bg-slate-900 border-b border-border/20 relative flex items-center justify-center pointer-events-none">
          {hasImage ? (
            <>
              <img
                src={item.image!}
                alt={item.scope}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <Eye className="w-5 h-5 text-white opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            </>
          ) : (
            <div className="p-3 text-center flex flex-col items-center justify-center h-full">
              <div className="w-7 h-7 rounded-lg bg-[hsl(var(--primary))]/5 flex items-center justify-center mb-1 md:mb-2">
                <span className="font-engineer text-[10px] font-bold text-[hsl(var(--primary))]">
                  {item.authorizer.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="font-label text-[7px] md:text-[8px] tracking-widest text-slate-400 uppercase">
                VERIFIED RECORD
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-3 md:p-4 flex-1 flex flex-col gap-1 pointer-events-none">
          <span className="font-label text-[8px] md:text-[9px] tracking-widest text-[hsl(var(--primary))] uppercase font-semibold">
            {item.authorizer}
          </span>
          <h4 className="font-display font-bold text-xs md:text-sm text-foreground leading-snug line-clamp-2">
            {item.scope}
          </h4>
          <p className="font-body-narrative text-[9px] md:text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-auto pt-1 md:pt-2 border-t border-border/10">
            {item.pillar}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ProfessionalCredentials: React.FC = () => {
  const [selectedCred, setSelectedCred] = useState<CredentialItem | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef<boolean>(false);

  // Track window resizing for responsive coordinate scaling
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  // Set up scroll tracking for pinning progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const BASE_URL = import.meta.env.BASE_URL || "/";

  const credentials: CredentialItem[] = [
    {
      scope: "Upbeat Summer School",
      authorizer: "EIT Digital Summer School",
      pillar: "European Tech Venture & Digital Ecosystems",
      image: null,
    },
    {
      scope: "DESIGN RULES: Principles + Practices for Great UI Design",
      authorizer: "Udemy",
      pillar: "Advanced Interface Systems & UI Visual Hierarchy",
      image: `${BASE_URL}images/certificates/udemy.jpg`,
    },
    {
      scope: "Front-End Web Development with React",
      authorizer: "Coursera",
      pillar: "Reusable Component Engineering & State Architecture",
      image: null,
    },
    {
      scope: "Foundations of User Experience (UX) Design",
      authorizer: "Coursera",
      pillar: "Interaction Frameworks & User-Centered Research",
      image: `${BASE_URL}images/certificates/foundations-ux.jpg`,
    },
    {
      scope: "Start the UX Design Process: Empathize, Define, and Ideate",
      authorizer: "Coursera",
      pillar: "Structural Ideation & User Workflow Mapping",
      image: `${BASE_URL}images/certificates/start-ux.jpg`,
    },
    {
      scope: "Visual Elements of User Interface Design",
      authorizer: "Coursera",
      pillar: "Core Typography, Color Layouts, & Interface Primitives",
      image: `${BASE_URL}images/certificates/visual-elements-ui-design.jpeg`,
    },
    {
      scope: "Introduction to Git and GitHub",
      authorizer: "Coursera",
      pillar: "Version Control, Distributed Code Management, & Workflows",
      image: `${BASE_URL}images/certificates/intro-github.jpg`,
    },
    {
      scope: "Using Python to Interact with the Operating System",
      authorizer: "Coursera",
      pillar: "Scripting Systems, File Orchestration, & Process Automation",
      image: null,
    },
  ];

  // Dynamically calculate active card based on scroll progress if not user-interacting
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (isInteracting.current) return;
      const zoneSize = 0.95 / credentials.length;
      const calculatedIndex = Math.max(
        0,
        Math.min(
          Math.floor(latest / zoneSize),
          credentials.length - 1
        )
      );
      setActiveCardIndex(calculatedIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress, credentials.length]);

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full bg-background border-t border-border/40">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-12 md:py-16">
        <div className="max-w-6xl mx-auto w-full px-4 lg:px-0 flex-1 flex flex-col justify-between">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-border/40 pb-6 w-full">
            {/* Left side: Section Title */}
            <div>
              <span className="font-label text-[10px] md:text-xs tracking-widest text-slate-500 uppercase font-semibold">
                // CREDENTIAL REGISTRY
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-display text-foreground mt-1 tracking-tighter">
                Verified Certifications
              </h2>
            </div>

            {/* Right side: Dynamic active certificate metadata */}
            <div className="md:text-right max-w-md flex flex-col gap-1 min-h-[80px] justify-center">
              <span className="font-label text-[10px] tracking-widest text-[hsl(var(--primary))] uppercase font-bold">
                {credentials[activeCardIndex].authorizer}
              </span>
              <h3 className="font-display font-bold text-sm md:text-base text-foreground leading-tight">
                {credentials[activeCardIndex].scope}
              </h3>
              <p className="font-body-narrative text-xs text-slate-500 dark:text-slate-400">
                {credentials[activeCardIndex].pillar}
              </p>
            </div>
          </div>

          {/* Interactive Draggable Canvas Container */}
          <div
            ref={constraintsRef}
            className="relative flex-1 w-full h-full min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden bg-background pointer-events-none"
          >
            {credentials.map((cred, index) => (
              <Card
                key={index}
                item={cred}
                index={index}
                scrollYProgress={scrollYProgress}
                isMobile={isMobile}
                constraintsRef={constraintsRef}
                isActive={activeCardIndex === index}
                onSelect={() => cred.image && setSelectedCred(cred)}
                onInteractingStart={() => {
                  isInteracting.current = true;
                  setActiveCardIndex(index);
                }}
                onInteractingEnd={() => {
                  isInteracting.current = false;
                }}
              />
            ))}
          </div>

          {/* Bottom Metabar Instruction */}
          <div className="flex justify-between items-center text-[10px] font-label text-slate-400 uppercase tracking-widest border-t border-border/40 pt-4 w-full">
            <span>Scroll to pull cards into canvas</span>
            <span className="animate-pulse flex items-center gap-1.5">
              <Grab className="w-3.5 h-3.5" /> Grab &amp; drag cards to inspect
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCred && selectedCred.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCred(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCred(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-55"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] w-full flex flex-col gap-4"
            >
              <div className="relative w-full aspect-[4/3] max-h-[75vh] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <img
                  src={selectedCred.image!}
                  alt={selectedCred.scope}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Detail overlay panel */}
              <div className="p-4 md:p-6 bg-slate-900/90 backdrop-blur-md rounded-xl border border-white/10 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1 max-w-2xl text-left">
                  <span className="font-label text-[10px] tracking-widest text-[hsl(var(--primary))] uppercase font-semibold">
                    {selectedCred.authorizer}
                  </span>
                  <h4 className="font-display font-bold text-sm md:text-base">
                    {selectedCred.scope}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedCred.pillar}
                  </p>
                </div>

                <a
                  href={selectedCred.image!}
                  download={`${selectedCred.scope.replace(/\s+/g, "_")}.jpg`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[hsl(var(--primary))] hover:opacity-90 text-white text-xs font-semibold uppercase tracking-wider font-label whitespace-nowrap transition-opacity self-start md:self-center"
                >
                  <Download className="w-4 h-4" /> Download Certificate
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const LogisticsCleardown: React.FC = () => {
  return (
    <div className="py-16 bg-[hsl(var(--card))] border-t border-border/40">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="flex flex-col gap-4 border-b md:border-b-0 md:border-r border-border/40 pb-8 md:pb-0 md:pr-16">
            <span className="font-label text-xs tracking-widest text-slate-500 uppercase">CURRENT DEPLOYMENT STATUS</span>
            <p className="font-body-narrative text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Concluding Master's Thesis track at Aalto University. Ready for permanent on-site engineering team deployment in Helsinki.
            </p>
          </div>
          <div className="flex flex-col gap-4 pt-8 md:pt-0">
            <span className="font-label text-xs tracking-widest text-[hsl(var(--primary))] uppercase">WORK RIGHTS & LOGISTICS</span>
            <p className="font-body-narrative text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Possess immediate, valid Finnish work rights with post-study visa residency extension processing. Zero initial corporate visa sponsorship parameters required for onboarding loops.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
