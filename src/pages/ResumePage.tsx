import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Code,
  Layers,
  Info,
  MousePointer,
  Sparkles,
  FolderOpen,
  FileCode,
  Mail,
  Phone,
  MapPin,
  Link2,
  Linkedin,
  GraduationCap,
  Briefcase,
  Sliders,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import { useIsMobile } from "@/hooks/use-mobile";

// Define the Figma/IDE Structure
interface FrameData {
  id: string;
  sectionId: string;
  title: string;
  fileTitle: string;
  w: number;
  h: number;
  x: number;
  y: number;
}

interface SectionData {
  id: string;
  title: string;
  dirTitle: string;
  w: number;
  h: number;
  x: number;
  y: number;
  frames: FrameData[];
}

const figmaSections: SectionData[] = [
  {
    id: "identity-section",
    title: "Section: Identity & Credentials",
    dirTitle: "Directory: src/components/identity",
    x: 80,
    y: 120,
    w: 830,
    h: 680,
    frames: [
      {
        id: "profile-frame",
        sectionId: "identity-section",
        title: "Frame: Profile",
        fileTitle: "Bio.json",
        x: 40,
        y: 80,
        w: 420,
        h: 540,
      },
      {
        id: "skills-frame",
        sectionId: "identity-section",
        title: "Frame: Core Stack",
        fileTitle: "Stack.config.ts",
        x: 485,
        y: 80,
        w: 300,
        h: 540,
      },
    ],
  },
  {
    id: "experience-section",
    title: "Section: Work Experience",
    dirTitle: "Directory: src/components/experience",
    x: 970,
    y: 40,
    w: 960,
    h: 760,
    frames: [
      {
        id: "optmyzr-frame",
        sectionId: "experience-section",
        title: "Frame: Optmyzr (SDE-II)",
        fileTitle: "OptmyzrDashboard.tsx",
        x: 40,
        y: 80,
        w: 430,
        h: 620,
      },
      {
        id: "dedanext-frame",
        sectionId: "experience-section",
        title: "Frame: Deda Next (UX)",
        fileTitle: "EDIAQITelemetry.tsx",
        x: 490,
        y: 80,
        w: 430,
        h: 620,
      },
    ],
  },
  {
    id: "academics-section",
    title: "Section: Academics & Credentials",
    dirTitle: "Directory: src/components/academics",
    x: 1990,
    y: 180,
    w: 520,
    h: 980,
    frames: [
      {
        id: "edu-frame",
        sectionId: "academics-section",
        title: "Frame: Higher Education",
        fileTitle: "LatencyHCI.tsx",
        x: 40,
        y: 80,
        w: 440,
        h: 440,
      },
      {
        id: "certifications-frame",
        sectionId: "academics-section",
        title: "Frame: Certifications",
        fileTitle: "Credentials.json",
        x: 40,
        y: 560,
        w: 440,
        h: 360,
      },
    ],
  },
];

const ResumePage: React.FC = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const [pan, setPan] = useState({ x: 50, y: 50 });
  const [zoom, setZoom] = useState(0.85);
  const [isXRay, setIsXRay] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>("profile-frame");

  const dragStart = useRef({ x: 0, y: 0 });
  const clickStart = useRef({ x: 0, y: 0 });
  const pdfUrl = `${import.meta.env.BASE_URL}CV_2026.pdf`;

  // Monitor Window Size
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Center canvas on a specific frame (making it mobile-responsive)
  const centerOnFrame = useCallback((frame: FrameData) => {
    const section = figmaSections.find((s) => s.id === frame.sectionId);
    if (!section) return;

    const globalX = section.x + frame.x + frame.w / 2;
    const globalY = section.y + frame.y + frame.h / 2;

    const container = containerRef.current;
    if (!container) return;

    // Responsive Zoom Level: scales down on mobile to fit screen bounds
    const targetZoom = isMobile
      ? Math.min(0.9, (container.clientWidth - 48) / frame.w)
      : 0.95;

    setZoom(targetZoom);
    setPan({
      x: container.clientWidth / 2 - globalX * targetZoom,
      y: container.clientHeight / 2 - globalY * targetZoom,
    });
    setSelectedFrameId(frame.id);
  }, [isMobile]);

  // Center canvas on a specific section
  const centerOnSection = useCallback((section: SectionData) => {
    const globalX = section.x + section.w / 2;
    const globalY = section.y + section.h / 2;

    const container = containerRef.current;
    if (!container) return;

    // Responsive Zoom Level: fits section bounds cleanly
    const targetZoom = isMobile
      ? Math.min(0.8, (container.clientWidth - 48) / section.w)
      : 0.9;

    setZoom(targetZoom);
    setPan({
      x: container.clientWidth / 2 - globalX * targetZoom,
      y: container.clientHeight / 2 - globalY * targetZoom,
    });
    setSelectedFrameId(section.frames[0]?.id || null);
  }, [isMobile]);

  // Center canvas on Profile Frame on mount once container is ready
  useEffect(() => {
    const profileFrame = figmaSections[0].frames[0];
    const timer = setTimeout(() => {
      centerOnFrame(profileFrame);
    }, 150);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mouse wheel Zoom helper
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = 1.08;
    const zoomCenter = {
      x: e.clientX - pan.x,
      y: e.clientY - pan.y,
    };

    let nextZoom = zoom;
    if (e.deltaY < 0) {
      nextZoom = Math.min(2.0, zoom * zoomFactor);
    } else {
      nextZoom = Math.max(0.35, zoom / zoomFactor);
    }

    const scaleRatio = nextZoom / zoom;
    setPan({
      x: e.clientX - zoomCenter.x * scaleRatio,
      y: e.clientY - zoomCenter.y * scaleRatio,
    });
    setZoom(nextZoom);
  };

  // Pointer events handle both Touch & Mouse inputs out-of-the-box
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return; // Allow left-click only for mouse
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    clickStart.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  // Click handler to deselect frames if the click is directly on canvas elements
  const handleCanvasClick = (e: React.MouseEvent) => {
    const dx = Math.abs(e.clientX - clickStart.current.x);
    const dy = Math.abs(e.clientY - clickStart.current.y);
    if (dx < 6 && dy < 6) {
      setSelectedFrameId(null);
    }
  };

  // Keyboard Spacebar theme toggler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        setIsXRay(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsXRay(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Render Frame content based on Design / Code theme
  const renderFrameContent = (frameId: string) => {
    if (!isXRay) {
      // UX DESIGN SYSTEMS VIEW
      switch (frameId) {
        case "profile-frame":
          return (
            <div className="flex flex-col justify-between h-full p-6 text-slate-800 font-body select-none">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">
                      BIOGRAPHY &amp; PROFILE
                    </span>
                    <h3 className="text-2xl font-bold font-display tracking-tight text-slate-900 mt-2">
                      Sumit Nayyar
                    </h3>
                    <p className="text-xs font-semibold uppercase text-slate-400 mt-0.5">
                      UX Designer / Frontend Engineer
                    </p>
                  </div>
                  {/* Profile Picture Asset */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-slate-50 flex-shrink-0">
                    <img
                      src={`${import.meta.env.BASE_URL}images/about/hero.jpg`}
                      alt="Sumit profile pic"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mt-4 pt-4 border-t border-dashed border-slate-200">
                  UX Designer and Frontend Engineer with 4+ years building user-centric SaaS products. I design in Figma and ship in React and TypeScript, closing handoff gaps and turning data dense workflows into well-crafted, accessible interfaces. Backed by an HCI Master's from Aalto University. Based in the Helsinki metropolitan area and committed to building my long-term career and home in Finland.
                </p>

                <div className="mt-5 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary/70" />
                    <span>Helsinki, Finland</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-primary/70" />
                    <span>sknayyar.sk@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-primary/70" />
                    <span>+358 41 743 4861</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link2 className="w-3.5 h-3.5 text-primary/70" />
                    <span>skn1999.github.io/sumit-portfolio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-3.5 h-3.5 text-primary/70" />
                    <span>linkedin.com/in/sumitnayyar-ux</span>
                  </div>
                </div>
              </div>

              <div className="text-[9px] font-mono text-slate-400 border-t border-slate-100 pt-3">
                SYSTEM IDENT: FIGMA_WIRE_v1
              </div>
            </div>
          );

        case "skills-frame":
          return (
            <div className="flex flex-col justify-between h-full p-6 text-slate-800 font-body select-none">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">
                  SKILLS INVENTORY
                </span>
                <h3 className="text-lg font-bold font-display text-slate-900 mt-1">Core Stack</h3>
                <p className="text-[10px] uppercase text-slate-400">Design Systems &amp; Methods</p>

                <div className="mt-4 pt-4 border-t border-dashed border-slate-200 space-y-4 overflow-y-auto max-h-[380px] pr-1">
                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Design &amp; Strategy
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Information Architecture",
                        "User Workflows",
                        "Design Systems",
                        "Figma",
                        "Rapid Prototyping",
                        "Usability Testing",
                        "Accessibility",
                      ].map((s) => (
                        <span key={s} className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[10px] text-slate-650 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Frontend &amp; Architecture
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "React.js",
                        "TypeScript",
                        "JavaScript ES6+",
                        "Redux Toolkit",
                        "HTML5 / CSS3 / Sass",
                        "REST APIs",
                      ].map((s) => (
                        <span key={s} className="px-2 py-1 bg-primary/5 border border-primary/20 text-primary rounded text-[10px] font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Targeted Expertise
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Legacy stack migrations",
                        "UI/UX performance triage",
                        "Config-driven dashboards",
                        "Cognitive load optimization",
                        "Zero-handoff system specs",
                      ].map((s) => (
                        <span key={s} className="px-2 py-1 bg-emerald-50 border border-emerald-200/50 text-emerald-700 rounded text-[10px] font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[9px] font-mono text-slate-400 border-t border-slate-100 pt-3">
                SYSTEM DEPS: WCAG_AA
              </div>
            </div>
          );

        case "optmyzr-frame":
          return (
            <div className="flex flex-col justify-between h-full p-6 text-slate-800 font-body select-none">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">
                  PROFESSIONAL HIST
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900 mt-1">Optmyzr</h3>
                <p className="text-[10px] font-semibold uppercase text-slate-400">
                  Frontend Engineer (SDE-II) // May 2020 - Jul 2024
                </p>

                <div className="mt-4 pt-4 border-t border-dashed border-slate-200 space-y-3 text-xs leading-relaxed text-slate-650">
                  <p>
                    Progressed from intern to SDE-II on the Core team, owning the frontend migration of the platform's two highest-traffic, data-dense analytics applications (Account Dashboard and PPC Comparison Tool).
                  </p>
                  <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-slate-600">
                    <li>Designed runtime, metadata-driven component configuration engine.</li>
                    <li>Eliminated cascade rendering loops via isolated Redux slices.</li>
                    <li>Built progressive viewport-driven lazy-hydration pipeline.</li>
                    <li><strong>Impact:</strong> Reduced dashboard load TTI from 8-10s down to under 1s.</li>
                  </ul>
                </div>
              </div>

              <div className="text-[9px] font-mono text-slate-400 border-t border-slate-100 pt-3">
                PROJECT METRIC // PERFORMANCE_REDUCTION
              </div>
            </div>
          );

        case "dedanext-frame":
          return (
            <div className="flex flex-col justify-between h-full p-6 text-slate-800 font-body select-none">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">
                  PROFESSIONAL HIST
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900 mt-1">Deda Next</h3>
                <p className="text-[10px] font-semibold uppercase text-slate-400">
                  UX Designer &amp; Researcher // Mar 2026 - May 2026
                </p>

                <div className="mt-4 pt-4 border-t border-dashed border-slate-200 space-y-3 text-xs leading-relaxed text-slate-650">
                  <p>
                    Worked on EDIAQI, an EU Horizon Europe project, designing how indoor air quality data helps schools and public buildings make better facility decisions.
                  </p>
                  <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-slate-600">
                    <li>Researched user needs, mapped messy workflows, and delivered decision-support/reporting tool.</li>
                    <li>Translated high-volume sensor telemetry into clear, interactive visualizations.</li>
                    <li>Focused on reducing cognitive load for non-technical facility managers.</li>
                  </ul>
                </div>
              </div>

              <div className="text-[9px] font-mono text-slate-400 border-t border-slate-100 pt-3">
                EU_HORIZON_2020 // SENSORS_DASHBOARD
              </div>
            </div>
          );

        case "edu-frame":
          return (
            <div className="flex flex-col justify-between h-full p-6 text-slate-800 font-body select-none">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">
                  ACADEMIC MASTERS
                </span>
                <h3 className="text-lg font-bold font-display text-slate-900 mt-1">Higher Education</h3>
                <p className="text-[10px] uppercase text-slate-400">Dual Degree HCI &amp; Cognitive Science</p>

                <div className="mt-4 pt-4 border-t border-dashed border-slate-200 space-y-4 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-850">Aalto University (Espoo, Finland)</h4>
                    <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                      M.Sc. Human-Computer Interaction &amp; Design (Expected Aug 2026)
                      <br />
                      <strong>Focus:</strong> Usability engineering, information architecture, interactive systems.
                      <br />
                      <strong>Thesis:</strong> Translating complex indoor air quality sensor data into actionable insights for non-technical users.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-850">Università di Trento (Trento, Italy)</h4>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      M.Sc. Cognitive Science (Expected 2026)
                      <br />
                      <strong>Focus:</strong> Human heuristics, cognitive metrics, and mental workflows.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-[9px] font-mono text-slate-400 border-t border-slate-100 pt-3">
                ACAD_CREDENTIAL // DUAL_DEGREE_FI_IT
              </div>
            </div>
          );

        case "certifications-frame":
          return (
            <div className="flex flex-col justify-between h-full p-6 text-slate-800 font-body select-none">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">
                  CREDENTIALS &amp; CERTIFICATES
                </span>
                <h3 className="text-lg font-bold font-display text-slate-900 mt-1">Certifications</h3>
                <p className="text-[10px] uppercase text-slate-400">Industry Recognition</p>

                <div className="mt-4 pt-4 border-t border-dashed border-slate-200 space-y-3">
                  {[
                    { title: "Upbeat Summer School (28DIGITAL)", issuer: "EIT Digital Summer School", date: "Sep 2025" },
                    { title: "Design Rules: Principles + Practices for Great UI Design", issuer: "Udemy", date: "Jul 2023" },
                    { title: "Start the UX Design Process: Empathize, Define, Ideate", issuer: "Coursera", date: "May 2021" },
                    { title: "Foundations of User Experience (UX) Design", issuer: "Coursera", date: "Apr 2021" },
                  ].map((cert, index) => (
                    <div key={index} className="text-xs">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-bold text-slate-800 text-[11px] leading-tight">{cert.title}</span>
                        <span className="text-[9px] font-mono text-slate-550 whitespace-nowrap">{cert.date}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{cert.issuer}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[9px] font-mono text-slate-400 border-t border-slate-100 pt-3">
                CERTIFICATE_REGISTRY // VERIFIED_CREDENTIALS
              </div>
            </div>
          );

        default:
          return null;
      }
    } else {
      // CODE IDE / DEVELOPMENT SOURCE VIEW
      switch (frameId) {
        case "profile-frame":
          return (
            <div className="p-5 font-mono text-xs text-emerald-400 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-emerald-600">// Identity metadata file</span>
                <div className="bg-slate-950 border border-emerald-900/30 rounded p-3 text-[10px] text-slate-300 leading-relaxed mt-2">
                  <pre>{`{
  "developer": "Sumit Nayyar",
  "role": "UX Engineer",
  "tenure": "4+ Years SaaS Platform",
  "workRights": "Immediate (EU)",
  "location": "Helsinki, Finland",
  "contact": {
    "mail": "sknayyar.sk@gmail.com",
    "tel": "+358417434861",
    "web": "sumit-portfolio"
  }
}`}</pre>
                </div>
              </div>
              <div className="text-[9px] text-emerald-600">
                JSON_FILE // STACK_BOOTSTRAP_OK
              </div>
            </div>
          );

        case "skills-frame":
          return (
            <div className="p-5 font-mono text-xs text-emerald-400 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-emerald-600">// Dependency package configuration</span>
                <div className="bg-slate-950 border border-emerald-900/30 rounded p-3 text-[10.5px] text-slate-300 mt-2">
                  <pre>{`const STACK = {
  core: ["React", "TS", "Redux"],
  builders: ["Git", "Webpack"],
  designParity: ["Figma API", "WCAG", "IA"],
  expertise: ["Perf Triage", "Cognitive Load"]
};`}</pre>
                </div>
              </div>
              <div className="text-[9px] text-emerald-600">
                CONFIG_EXPORT // DEPS: 8 SECURE
              </div>
            </div>
          );

        case "optmyzr-frame":
          return (
            <div className="p-5 font-mono text-xs text-emerald-400 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-emerald-600">// lazy-hydration pipeline &amp; Redux selector optimization</span>
                <p className="text-[10px] text-slate-300 mt-1.5 leading-relaxed">
                  <span className="text-emerald-500 font-bold">// PERF OUTCOME:</span> Compressed grid telemetry loading latency from 8s to under 1s.
                </p>
                <div className="bg-slate-950 border border-emerald-900/30 rounded p-3 text-[9.5px] text-slate-300 leading-normal mt-2">
                  <pre>{`// Viewport dynamic hydrator grid wrapper
const LazyGridLoader = ({ children }) => {
  const [inView, ref] = useObserver({
    rootMargin: "100px",
    triggerOnce: true
  });
  return <div ref={ref}>
    {inView ? children : <LoadingGrid />}
  </div>;
}`}</pre>
                </div>
              </div>
              <div className="text-[9px] text-emerald-600">
                SRC: OptmyzrDashboard.tsx // HYDRATED: OK
              </div>
            </div>
          );

        case "dedanext-frame":
          return (
            <div className="p-5 font-mono text-xs text-emerald-400 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-emerald-600">// telemetric telemetry stream mapping</span>
                <div className="bg-slate-950 border border-emerald-900/30 rounded p-3 text-[9.5px] text-slate-300 leading-normal mt-2">
                  <pre>{`// Translate raw AQI data stream
const mapSensorVectors = (rawData) => {
  return rawData.map(node => ({
    x: scaleX(node.lat),
    y: scaleY(node.lng),
    aqi: Math.min(100, node.aqi)
  }));
};`}</pre>
                </div>
              </div>
              <div className="text-[9px] text-emerald-600">
                SRC: EDIAQITelemetry.tsx // ACTIVE_STREAM: OK
              </div>
            </div>
          );

        case "edu-frame":
          return (
            <div className="p-5 font-mono text-xs text-emerald-400 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-emerald-600">// Target selection latency (Fitts's Law)</span>
                <div className="bg-slate-950 border border-emerald-900/30 rounded p-3 text-[9.5px] text-slate-300 leading-normal mt-2">
                  <pre>{`// MT = a + b * log2(2D/W)
const calculateDifficulty = (dist, w) => {
  const ID = Math.log2((2 * dist) / w);
  return A_CONST + B_CONST * ID;
};`}</pre>
                </div>
              </div>
              <div className="text-[9px] text-emerald-600">
                SRC: LatencyHCI.tsx // HEURISTIC_ACCURACY: 99.8%
              </div>
            </div>
          );

        case "certifications-frame":
          return (
            <div className="p-5 font-mono text-xs text-emerald-400 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-emerald-600">// Professional credentials array</span>
                <div className="bg-slate-950 border border-emerald-900/30 rounded p-3 text-[9.5px] text-slate-300 leading-normal mt-2">
                  <pre>{`const CERTIFICATIONS = [
  {
    name: "EIT Digital Summer School",
    cohort: "28DIGITAL",
    date: "2025-09"
  },
  {
    name: "Great UI Design",
    provider: "Udemy",
    date: "2023-07"
  },
  {
    name: "UX Design Process",
    provider: "Coursera",
    date: "2021-05"
  }
];`}</pre>
                </div>
              </div>
              <div className="text-[9px] text-emerald-600">
                EXPORT_VALS // CERTIFICATES: 4 SIGNED
              </div>
            </div>
          );

        default:
          return null;
      }
    }
  };

  return (
    <Layout>
      <SEO
        title="Resume - Sumit Nayyar"
        description="Explore Sumit Nayyar's interactive portfolio resume blueprint."
        path="/resume"
      />

      {/* ────────────────── SCREEN CANVAS ────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="h-[calc(100vh-64px)] min-h-[calc(100vh-64px)] flex flex-col bg-background text-foreground overflow-hidden select-none print:hidden relative"
      >
        {/* Top Action Header */}
        <header className="absolute top-6 left-6 right-6 z-40 pointer-events-none flex justify-between items-center">
          <div className="pointer-events-auto">
            <Button
              variant="outline"
              size="xs"
              asChild
              className="bg-background/85 backdrop-blur-md border border-border/40 shadow-lg font-mono text-[10px] uppercase font-bold tracking-wider h-9 px-3 flex items-center gap-1.5"
            >
              <Link to="/">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Portfolio</span>
              </Link>
            </Button>
          </div>

          <div className="pointer-events-auto">
            <Button
              size="sm"
              className={`shadow-lg font-label text-xs tracking-wider uppercase font-semibold h-9 px-4 flex items-center gap-2 transition-all duration-300 ${
                isXRay
                  ? "bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold border-emerald-600"
                  : "bg-[#18a0fb] hover:bg-[#158edf] text-white border-[#18a0fb]"
              }`}
              asChild
            >
              <a href={pdfUrl} download="CV_2026.pdf">
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </Button>
          </div>
        </header>

        {/* Main Drag-Space Viewport */}
        <div
          ref={containerRef}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClick={handleCanvasClick}
          className={`flex-1 relative w-full h-full outline-none overflow-hidden transition-colors duration-700 grid-background-canvas ${
            isXRay ? "bg-[#0b0f0e]" : "bg-[#f3f1ed]"
          }`}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "none", // Prevent native mobile scrolling/gestures on canvas
          }}
        >
          {/* Infinite Grid Background dots with Zoom-aware Fading Opacity */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 grid-background-canvas"
            style={{
              backgroundImage: isXRay
                ? "radial-gradient(circle, #059669 1px, transparent 1px)"
                : "radial-gradient(circle, #94a3b8 1.2px, transparent 1.2px)",
              backgroundSize: `${32 * zoom}px ${32 * zoom}px`,
              backgroundPosition: `${pan.x}px ${pan.y}px`,
              opacity: isXRay
                ? Math.min(0.15, Math.max(0.02, 0.05 + (zoom - 0.35) * 0.08))
                : Math.min(0.35, Math.max(0.04, 0.10 + (zoom - 0.35) * 0.20)),
            }}
          />

          {/* Blueprint Canvas Stage (Transforms match pan & zoom) */}
          <div
            ref={canvasRef}
            className="absolute inset-0 origin-top-left pointer-events-none"
            style={{
              transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
              transition: isDragging ? "none" : "transform 0.15s ease-out",
            }}
          >
            {/* SVG Connector Guides with Pulsing Dash Animation */}
            <svg
              className="absolute inset-0 pointer-events-none"
              style={{
                width: "2600px",
                height: "980px",
                overflow: "visible",
              }}
            >
              {[
                { d: "M 540 470 C 552.5 470, 552.5 470, 565 470", key: "c1" },
                { d: "M 865 470 C 937.5 470, 937.5 430, 1010 430", key: "c2" },
                { d: "M 1440 430 C 1450 430, 1450 430, 1460 430", key: "c3" },
                { d: "M 1890 430 C 1960 430, 1960 480, 2030 480", key: "c4" },
                { d: "M 2250 700 C 2250 710, 2250 730, 2250 740", key: "c5" }
              ].map((path) => (
                <g key={path.key}>
                  {/* Background path line */}
                  <path
                    d={path.d}
                    fill="none"
                    stroke={isXRay ? "rgba(16, 185, 129, 0.12)" : "rgba(24, 160, 251, 0.12)"}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Animated flow pulse line */}
                  <path
                    d={path.d}
                    fill="none"
                    stroke={isXRay ? "#10b981" : "#18a0fb"}
                    strokeWidth="2"
                    strokeDasharray="8 16"
                    strokeLinecap="round"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="100;0"
                      dur="5s"
                      repeatCount="indefinite"
                    />
                  </path>
                </g>
              ))}
            </svg>

            {/* Render Figma/IDE Sections */}
            {figmaSections.map((section) => (
              <div
                key={section.id}
                className={`absolute rounded-xl border transition-all duration-700 pointer-events-auto ${
                  isXRay
                    ? "border-emerald-950 bg-slate-950/20 text-emerald-500 shadow-inner"
                    : "border-slate-300 bg-white/35 text-slate-800 shadow-[0_4px_16px_rgba(0,0,0,0.02)]"
                }`}
                style={{
                  left: `${section.x}px`,
                  top: `${section.y}px`,
                  width: `${section.w}px`,
                  height: `${section.h}px`,
                }}
              >
                {/* Section Tag (Top-left, outside bounds) */}
                <div className="absolute -top-7 left-0 flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider rounded-t select-none transition-colors duration-500">
                  {isXRay ? (
                    <>
                      <FolderOpen className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500 uppercase">{section.dirTitle}</span>
                    </>
                  ) : (
                    <>
                      <MousePointer className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-500 font-bold uppercase">{section.title}</span>
                    </>
                  )}
                </div>

                {/* Render Frames inside this Section */}
                {section.frames.map((frame) => {
                  const isSelected = selectedFrameId === frame.id;
                  return (
                    <div
                      key={frame.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        centerOnFrame(frame);
                      }}
                      className={`absolute rounded-lg border transition-all duration-500 cursor-pointer pointer-events-auto ${
                        isSelected
                          ? isXRay
                            ? "border-emerald-400 bg-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                            : "border-[#18a0fb] bg-white shadow-xl"
                          : isXRay
                          ? "border-emerald-900/50 bg-slate-950/40 opacity-75 hover:opacity-100 hover:border-emerald-800"
                          : "border-slate-200 bg-white opacity-85 hover:opacity-100 hover:border-slate-350"
                      }`}
                      style={{
                        left: `${frame.x}px`,
                        top: `${frame.y}px`,
                        width: `${frame.w}px`,
                        height: `${frame.h}px`,
                      }}
                    >
                      {/* Frame Tag (Top-left, outside frame border) */}
                      <div
                        className={`absolute -top-5.5 left-0 px-1.5 py-0.5 rounded-t text-[9px] font-mono font-bold uppercase transition-colors duration-300 ${
                          isSelected
                            ? isXRay
                              ? "bg-emerald-500 text-slate-950"
                              : "bg-[#18a0fb] text-white"
                            : isXRay
                            ? "text-emerald-600"
                            : "text-slate-400"
                        }`}
                      >
                        {isXRay ? (
                          <span className="flex items-center gap-1">
                            <FileCode className="w-3 h-3" />
                            {frame.fileTitle}
                          </span>
                        ) : (
                          <span>{frame.title}</span>
                        )}
                      </div>

                      {/* Nested Content */}
                      <div className="w-full h-full overflow-hidden">
                        {renderFrameContent(frame.id)}
                      </div>

                      {/* Figma Selection Coordinates details HUD */}
                      {isSelected && !isXRay && (
                        <>
                          {/* corner resizing node visuals */}
                          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-white border-2 border-[#18a0fb] rounded-sm pointer-events-none" />
                          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white border-2 border-[#18a0fb] rounded-sm pointer-events-none" />
                          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-white border-2 border-[#18a0fb] rounded-sm pointer-events-none" />
                          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-white border-2 border-[#18a0fb] rounded-sm pointer-events-none" />
                          {/* dimensions banner */}
                          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#18a0fb] text-white text-[8px] font-mono px-1 rounded-sm select-none font-bold">
                            W: {frame.w}px H: {frame.h}px
                          </div>
                        </>
                      )}

                      {/* IDE Selection details HUD */}
                      {isSelected && isXRay && (
                        <>
                          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-slate-950 border-2 border-emerald-400 rounded-sm pointer-events-none" />
                          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-slate-950 border-2 border-emerald-400 rounded-sm pointer-events-none" />
                          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-slate-950 border-2 border-emerald-400 rounded-sm pointer-events-none" />
                          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-slate-950 border-2 border-emerald-400 rounded-sm pointer-events-none" />
                          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[8px] font-mono px-1 rounded-sm select-none font-bold">
                            LOC: {frame.fileTitle} // SIZE: {Math.round(frame.w * 0.1)} lines
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Floating Blueprint HUD controls at bottom */}
        <footer className="absolute bottom-6 left-6 right-6 z-35 pointer-events-none flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Direct Navigation Steps */}
          <div className="bg-background/85 backdrop-blur-md border border-border/40 px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 pointer-events-auto">
            <span className="text-[10px] font-mono font-bold text-muted-foreground mr-2 uppercase">
              Fly To:
            </span>
            {/* Profile Tab */}
            <button
              onClick={() => centerOnFrame(figmaSections[0].frames[0])}
              className={`px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase transition-all duration-300 ${
                selectedFrameId === "profile-frame"
                  ? isXRay
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-[#18a0fb] text-white"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              profile
            </button>

            {/* Skills Tab */}
            <button
              onClick={() => centerOnFrame(figmaSections[0].frames[1])}
              className={`px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase transition-all duration-300 ${
                selectedFrameId === "skills-frame"
                  ? isXRay
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-[#18a0fb] text-white"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              skills
            </button>

            {/* Experience Tab */}
            <button
              onClick={() => centerOnSection(figmaSections[1])}
              className={`px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase transition-all duration-300 ${
                selectedFrameId === "optmyzr-frame" || selectedFrameId === "dedanext-frame"
                  ? isXRay
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-[#18a0fb] text-white"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              experience
            </button>

            {/* Education Tab */}
            <button
              onClick={() => centerOnSection(figmaSections[2])}
              className={`px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase transition-all duration-300 ${
                selectedFrameId === "edu-frame" || selectedFrameId === "certifications-frame"
                  ? isXRay
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-[#18a0fb] text-white"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              education
            </button>
          </div>

          {/* Action Hub (X-Ray controls only) */}
          <div className="bg-background/85 backdrop-blur-md border border-border/40 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 text-xs font-mono pointer-events-auto">
            <Button
              variant={isXRay ? "default" : "outline"}
              size="xs"
              onClick={() => setIsXRay(prev => !prev)}
              className={`text-[10px] uppercase font-bold tracking-wider h-6.5 transition-all duration-300 ${
                isXRay
                  ? "bg-emerald-600 hover:bg-emerald-500 text-slate-950 border-emerald-600"
                  : "hover:bg-muted"
              }`}
            >
              {isXRay ? "View Design" : "Toggle Code Mode"}
            </Button>
            <span className="text-muted-foreground hidden lg:inline">|</span>
            <span className="text-muted-foreground text-[10px] uppercase hidden lg:inline">
              Hold <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">Spacebar</kbd> for IDE
            </span>
          </div>
        </footer>
      </motion.div>

      {/* ────────────────── PRINT-ONLY DOCUMENT LAYOUT ────────────────── */}
      <div className="hidden print:block print:bg-white print:text-black w-full max-w-4xl mx-auto p-8 font-sans">
        {/* Header Block */}
        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Sumit Nayyar</h1>
            <p className="text-lg font-semibold text-slate-600 uppercase tracking-wider mt-1">
              UX Designer / Frontend Engineer
            </p>
          </div>
          <div className="text-right text-xs text-slate-700 space-y-1 font-mono">
            <div>Helsinki, Finland</div>
            <div>sknayyar.sk@gmail.com</div>
            <div>+358 41 743 4861</div>
            <div>skn1999.github.io/sumit-portfolio</div>
            <div>linkedin.com/in/sumitnayyar-ux</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Column (2/3 width) */}
          <div className="col-span-2 space-y-6">
            {/* Profile */}
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                Profile
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                UX Designer and Frontend Engineer with 4+ years building user-centric SaaS products. I design in Figma and ship in React and TypeScript, closing handoff gaps and turning data dense workflows into well-crafted, accessible interfaces. Backed by an HCI Master's from Aalto University. Based in the Helsinki metropolitan area and committed to building my long-term career and home in Finland.
              </p>
            </section>

            {/* Experience */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                Professional Experience
              </h2>

              {/* Deda Next */}
              <div>
                <div className="flex justify-between font-semibold text-sm">
                  <h3 className="text-slate-900 font-bold">Deda Next (Dedagroup)</h3>
                  <span className="text-xs font-mono text-slate-600">Mar 2026 - May 2026</span>
                </div>
                <div className="text-xs text-slate-600 italic">UX Designer &amp; Researcher — Trento, Italy</div>
                <ul className="list-disc pl-4 mt-2 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                  <li>Worked on EDIAQI, an EU Horizon Europe project, designing how indoor air quality data helps schools and public buildings make better facility decisions.</li>
                  <li>Researched user needs, mapped messy multi-stakeholder workflows, and delivered the first version of a decision-support and reporting experience.</li>
                  <li>Translated high-volume sensor data into clear, interactive visualizations built to reduce cognitive load for non-technical users.</li>
                </ul>
              </div>

              {/* Optmyzr */}
              <div>
                <div className="flex justify-between font-semibold text-sm">
                  <h3 className="text-slate-900 font-bold">Optmyzr</h3>
                  <span className="text-xs font-mono text-slate-600">May 2020 - Jul 2024</span>
                </div>
                <div className="text-xs text-slate-600 italic">Frontend Engineer (SDE-II) — Remote / Hyderabad</div>
                <ul className="list-disc pl-4 mt-2 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                  <li>Progressed from intern to SDE-II on the Core team, owning the frontend migration of the platform's two highest-traffic, data-dense analytics applications (Account Dashboard and PPC Comparison Tool).</li>
                  <li>Designed a runtime, metadata-driven configuration engine that parses JSON definitions to instantiate multi-platform UI components dynamically, cutting new ad network integration from a multi-day core rewrite to a configuration checklist.</li>
                  <li>Eliminated global cascade re-rendering loops across dense dashboard grids by isolating data domains into localized Redux slices with memoized selector filters.</li>
                  <li>Built a progressive, viewport-driven lazy-hydration pipeline that loads heavy plots and metric lists asynchronously as their containers enter the viewport.</li>
                  <li><strong>Impact:</strong> Reduced core dashboard load and time-to-interactive from 8 to 10 seconds down to under 1 second under enterprise production loads.</li>
                </ul>
              </div>
            </section>

            {/* Education */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                Education
              </h2>
              <div>
                <div className="flex justify-between font-semibold text-xs">
                  <h3 className="font-bold text-slate-900">Aalto University</h3>
                  <span className="font-mono text-slate-600">Expected Aug 2026</span>
                </div>
                <div className="text-xs text-slate-600 italic">M.Sc. Human-Computer Interaction &amp; Design — Espoo, Finland</div>
                <p className="text-[11px] text-slate-700 mt-1 leading-relaxed">
                  Focus: Usability engineering, information architecture, interactive systems.
                  <br />
                  Thesis: Translating complex indoor air quality sensor data into actionable insights for non-technical users.
                </p>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-xs">
                  <h3 className="font-bold text-slate-900">Università di Trento</h3>
                  <span className="font-mono text-slate-600">Expected 2026</span>
                </div>
                <div className="text-xs text-slate-600 italic">M.Sc. Cognitive Science (dual degree) — Trento, Italy</div>
              </div>
            </section>
          </div>

          {/* Sidebar Column (1/3 width) */}
          <div className="space-y-6">
            {/* Core Stack */}
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                Core Stack
              </h2>

              <div className="space-y-4 text-xs">
                <div>
                  <h3 className="font-bold text-slate-800 uppercase tracking-wide text-[10px] mb-1">
                    Design &amp; Strategy
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    Information Architecture, User Workflows, Design Systems, Figma, Rapid Prototyping, Usability Testing, Accessibility.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-800 uppercase tracking-wide text-[10px] mb-1">
                    Frontend &amp; Architecture
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    React.js, TypeScript, JavaScript ES6+, Redux Toolkit, HTML5 / CSS3 / Sass, REST APIs.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-800 uppercase tracking-wide text-[10px] mb-1">
                    Systems &amp; Operations
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    Git / GitHub, Firebase, Webpack, DevTools Profiling.
                  </p>
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                Certifications
              </h2>
              <div className="space-y-3 text-xs leading-normal">
                <div>
                  <div className="flex justify-between font-semibold">
                    <span>Upbeat Summer School (28DIGITAL)</span>
                    <span className="font-mono text-slate-600">Sep 2025</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">EIT Digital Summer School</div>
                </div>
                <div>
                  <div className="flex justify-between font-semibold">
                    <span>Design Rules: Principles + Practices for Great UI Design</span>
                    <span className="font-mono text-slate-650">Jul 2023</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">Udemy</div>
                </div>
                <div>
                  <div className="flex justify-between font-semibold">
                    <span>Start the UX Design Process: Empathize, Define, Ideate</span>
                    <span className="font-mono text-slate-650">May 2021</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">Coursera</div>
                </div>
                <div>
                  <div className="flex justify-between font-semibold">
                    <span>Foundations of User Experience (UX) Design</span>
                    <span className="font-mono text-slate-650">Apr 2021</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">Coursera</div>
                </div>
              </div>
            </section>

            {/* Print Instructions */}
            <div className="bg-slate-50 border border-slate-200 rounded p-4 text-[10px] text-slate-500 font-mono leading-relaxed print:hidden">
              <strong>PRINT GUIDELINE:</strong>
              <br />
              This page automatically renders as a clean two-column letter document when printed via your browser (Cmd + P) or saved as a PDF.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResumePage;
