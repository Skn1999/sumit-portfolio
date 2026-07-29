import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X, Download, Eye, Grab } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export const AcademicCohorts: React.FC = () => {
  const experiments = [
    {
      title: "Rapid Frontend LLM Sandbox",
      description:
        "Interface testing for streaming API responses, latency feedback indicators, and real-time state synchronization.",
      tags: ["React", "TypeScript", "LLM Streaming", "WebSockets"],
    },
    {
      title: "Design System Component Tokens Engine",
      description:
        "Automated processing scripts parsing raw design tokens into React CSS variables and Tailwind theme configurations.",
      tags: ["Node.js", "AST Parsing", "Tailwind CSS", "Design Systems"],
    },
  ];

  return (
    <div className="py-24 md:py-36 bg-paper-bg border-t border-paper-border">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)", y: 16 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <span className="font-mono text-xs tracking-widest text-ink-muted uppercase block mb-2">
            ACADEMIC RESEARCH &amp; PRACTICAL EXPERIMENTS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-primary tracking-tighter">
            Academic HCI Matrix &amp; Technical Sandbox
          </h2>
          <p className="font-body-narrative text-base md:text-lg text-ink-muted mt-4 max-w-2xl">
            Documenting Master's track evaluations at Aalto University &amp; University of Trento alongside hands-on frontend engineering experiments.
          </p>
        </motion.div>

        {/* Part 1: Academic & HCI Research Labs Matrix Table */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h3 className="font-mono text-xs font-semibold tracking-widest text-ink-primary uppercase mb-6">
            // Part 1: HCI &amp; Systems Research Labs (Aalto &amp; Trento Master's Track)
          </h3>
          <div className="overflow-x-auto border border-paper-border rounded-xl bg-paper-card">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-paper-border bg-paper-bg/50">
                  <th className="p-4 md:p-6 font-mono text-xs font-bold text-ink-primary uppercase tracking-wider w-1/3">
                    Usability Engineering
                  </th>
                  <th className="p-4 md:p-6 font-mono text-xs font-bold text-ink-primary uppercase tracking-wider w-1/3 border-l border-paper-border">
                    Ubiquitous Computing
                  </th>
                  <th className="p-4 md:p-6 font-mono text-xs font-bold text-ink-primary uppercase tracking-wider w-1/3 border-l border-paper-border">
                    Experimental HCI Methods
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paper-border font-body-narrative text-xs md:text-sm text-ink-muted">
                <tr>
                  <td className="p-4 md:p-6 align-top">
                    Heuristic evaluations, cognitive walkthroughs, and interface deficit audits for enterprise software.
                  </td>
                  <td className="p-4 md:p-6 align-top border-l border-paper-border">
                    IoT sensor data pipelines, environmental telemetry, and real-time web interface dashboards.
                  </td>
                  <td className="p-4 md:p-6 align-top border-l border-paper-border">
                    Quantitative user testing protocols, independent variable tracking, and statistical task analysis.
                  </td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 align-top font-mono text-[11px]">
                    Nielsen's 10 Heuristics • ISO 9241-11 • Task Efficiency Analysis
                  </td>
                  <td className="p-4 md:p-6 align-top font-mono text-[11px] border-l border-paper-border">
                    Sensor Telemetry • WebSocket Data Views • Low-Cognitive Load UI
                  </td>
                  <td className="p-4 md:p-6 align-top font-mono text-[11px] border-l border-paper-border">
                    A/B Trial Protocols • Task Completion Metrics • Error Rate Tracking
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Part 2: Practical Engineering Experiments List */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="font-mono text-xs font-semibold tracking-widest text-ink-primary uppercase mb-6">
            // Part 2: Practical Engineering Sandbox &amp; Experiments
          </h3>
          <div className="flex flex-col border-b border-paper-border">
            {experiments.map((exp, index) => (
              <div
                key={index}
                className="border-t border-paper-border py-6 md:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex flex-col gap-2 max-w-2xl">
                  <h4 className="text-lg md:text-xl font-bold font-display text-ink-primary">
                    {exp.title}
                  </h4>
                  <p className="font-body-narrative text-sm md:text-base text-ink-muted leading-relaxed">
                    {exp.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 self-start md:self-center">
                  {exp.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded bg-paper-card text-ink-muted border border-paper-border text-xs font-mono tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
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
  hasEntered: boolean;
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
  hasEntered,
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

  const startX = isMobile ? 350 : 850;
  const startY = isMobile ? 150 : 300;

  const hasImage = !!item.image;

  return (
    <motion.div
      initial={{ x: startX, y: startY, rotate: 35, opacity: 0 }}
      animate={
        hasEntered
          ? { x: targetX, y: targetY, rotate: targetRotate, opacity: 1 }
          : { x: startX, y: startY, rotate: 35, opacity: 0 }
      }
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 14,
        delay: index * 0.05,
      }}
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
          isActive
            ? "border-primary/80 ring-1 ring-primary/20"
            : "border-border/40"
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

export const ProfessionalCredentials: React.FC = () => {
  const [selectedCred, setSelectedCred] = useState<CredentialItem | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  const [hasEntered, setHasEntered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Track scroll position of the section to trigger the "jump in" entrance
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Trigger when the section top has crossed 60% from the bottom of the viewport
      if (rect.top < window.innerHeight * 0.6) {
        setHasEntered(true);
      } else {
        setHasEntered(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sequentially cycle active card details on slide-in sequence if not user-interacting
  useEffect(() => {
    if (hasEntered) {
      credentials.forEach((_, index) => {
        setTimeout(() => {
          if (!isInteracting.current) {
            setActiveCardIndex(index);
          }
        }, index * 100);
      });
    }
  }, [hasEntered]);

  // Lock background scroll when modal opens
  useEffect(() => {
    const win = window as unknown as { lenis?: { stop: () => void; start: () => void } };
    if (selectedCred) {
      document.body.style.overflow = "hidden";
      win.lenis?.stop();
    } else {
      document.body.style.overflow = "";
      win.lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      win.lenis?.start();
    };
  }, [selectedCred]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[680px] md:h-[900px] bg-background border-t border-border/40 py-12 md:py-16 overflow-hidden flex flex-col justify-between"
    >
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
            <span className="font-label text-[10px] tracking-widest text-[hsl(var(--primary))] uppercase font-semibold">
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
              hasEntered={hasEntered}
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
          <span>Scroll section into view to reveal certifications</span>
          <span className="animate-pulse flex items-center gap-1.5">
            <Grab className="w-3.5 h-3.5" /> Grab &amp; drag cards to inspect
          </span>
        </div>
      </div>

      {/* Lightbox Modal (wrapped in a React Portal to escape parent CSS filter translation boundaries) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedCred && selectedCred.image && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCred(null)}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
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
                  className="relative max-w-3xl w-full max-h-[90vh] md:max-h-[85vh] flex flex-col gap-3 justify-center items-center pointer-events-auto"
                >
                  {/* Image Container */}
                  <div className="relative w-full flex-1 min-h-0 rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black flex items-center justify-center">
                    <img
                      src={selectedCred.image!}
                      alt={selectedCred.scope}
                      className="max-w-full max-h-full object-contain pointer-events-none"
                    />
                  </div>

                  {/* Detail overlay panel */}
                  <div className="w-full p-4 md:p-5 bg-slate-900/90 backdrop-blur-md rounded-xl border border-white/10 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                    <div className="flex flex-col gap-0.5 max-w-xl text-left">
                      <span className="font-label text-[9px] tracking-widest text-[hsl(var(--primary))] uppercase font-semibold">
                        {selectedCred.authorizer}
                      </span>
                      <h4 className="font-display font-bold text-xs md:text-sm leading-tight">
                        {selectedCred.scope}
                      </h4>
                      <p className="text-[10px] md:text-xs text-slate-400 leading-relaxed">
                        {selectedCred.pillar}
                      </p>
                    </div>

                    <a
                      href={selectedCred.image!}
                      download={`${selectedCred.scope.replace(/\s+/g, "_")}.jpg`}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[hsl(var(--primary))] hover:opacity-90 text-white text-[10px] font-semibold uppercase tracking-wider font-label whitespace-nowrap transition-opacity self-start sm:self-center shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
};

export const LogisticsCleardown: React.FC = () => {
  return (
    <div className="py-16 bg-[hsl(var(--card))] border-t border-border/40">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="flex flex-col gap-4 border-b md:border-b-0 md:border-r border-border/40 pb-8 md:pb-0 md:pr-16">
            <span className="font-label text-xs tracking-widest text-slate-500 uppercase">
              CURRENT DEPLOYMENT STATUS
            </span>
            <p className="font-body-narrative text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Concluding Master's Thesis track at Aalto University. Ready for
              permanent on-site engineering team deployment in Helsinki.
            </p>
          </div>
          <div className="flex flex-col gap-4 pt-8 md:pt-0">
            <span className="font-label text-xs tracking-widest text-[hsl(var(--primary))] uppercase">
              WORK RIGHTS & LOGISTICS
            </span>
            <p className="font-body-narrative text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Possess immediate, valid Finnish work rights with post-study visa
              residency extension processing. Zero initial corporate visa
              sponsorship parameters required for onboarding loops.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
