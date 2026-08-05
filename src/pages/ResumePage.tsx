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
    w: 1410,
    h: 760,
    frames: [
      {
        id: "groundwork-frame",
        sectionId: "experience-section",
        title: "Frame: Groundwork",
        fileTitle: "GroundworkDesign.tsx",
        x: 40,
        y: 80,
        w: 420,
        h: 620,
      },
      {
        id: "dedanext-frame",
        sectionId: "experience-section",
        title: "Frame: Dedanext S.p.a",
        fileTitle: "EDIAQIPlatform.tsx",
        x: 485,
        y: 80,
        w: 420,
        h: 620,
      },
      {
        id: "optmyzr-frame",
        sectionId: "experience-section",
        title: "Frame: Optmyzr Inc.",
        fileTitle: "CoreSystemsDesign.tsx",
        x: 930,
        y: 80,
        w: 420,
        h: 620,
      },
    ],
  },
  {
    id: "academics-section",
    title: "Section: Education & Projects",
    dirTitle: "Directory: src/components/academics",
    x: 2440,
    y: 40,
    w: 880,
    h: 760,
    frames: [
      {
        id: "edu-frame",
        sectionId: "academics-section",
        title: "Frame: Higher Education",
        fileTitle: "MScHCI.tsx",
        x: 40,
        y: 80,
        w: 390,
        h: 620,
      },
      {
        id: "projects-frame",
        sectionId: "academics-section",
        title: "Frame: Key Projects",
        fileTitle: "Prototypes.json",
        x: 450,
        y: 80,
        w: 390,
        h: 620,
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
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(
    "profile-frame",
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  const dragStart = useRef({ x: 0, y: 0 });
  const clickStart = useRef({ x: 0, y: 0 });
  const pdfUrl = `${import.meta.env.BASE_URL}Resume-Product-Designer.pdf`;

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
  const centerOnFrame = useCallback(
    (frame: FrameData) => {
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
    },
    [isMobile],
  );

  // Center canvas on a specific section
  const centerOnSection = useCallback(
    (section: SectionData) => {
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
    },
    [isMobile],
  );

  // Center canvas on Identity & Credentials Section on mount once container is ready
  useEffect(() => {
    const identitySection = figmaSections[0];
    const timer = setTimeout(() => {
      centerOnSection(identitySection);
    }, 150);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Native Wheel Event Handler: Figma-style Trackpad 2-finger Pan & Pinch-to-Zoom
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheelNative = (e: WheelEvent) => {
      e.preventDefault();

      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (e.ctrlKey || e.metaKey) {
        // Pinch-to-zoom on trackpad or Ctrl/Cmd + wheel scroll
        const zoomFactor = Math.pow(1.005, -e.deltaY);
        setZoom((prevZoom) => {
          const nextZoom = Math.min(3.0, Math.max(0.25, prevZoom * zoomFactor));
          const scaleRatio = nextZoom / prevZoom;

          setPan((prevPan) => ({
            x: mouseX - (mouseX - prevPan.x) * scaleRatio,
            y: mouseY - (mouseY - prevPan.y) * scaleRatio,
          }));

          return nextZoom;
        });
      } else {
        // Figma trackpad pan (two-finger scroll or wheel scroll)
        const deltaX = e.shiftKey ? e.deltaY : e.deltaX;
        const deltaY = e.shiftKey ? 0 : e.deltaY;

        setPan((prevPan) => ({
          x: prevPan.x - deltaX,
          y: prevPan.y - deltaY,
        }));
      }
    };

    container.addEventListener("wheel", handleWheelNative, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheelNative);
    };
  }, []);

  // Multi-Touch & Pointer Gesture tracking (Pan & Touch Pinch-to-Zoom)
  const activePointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const initialPinchDist = useRef<number | null>(null);
  const initialPinchZoom = useRef<number>(1);
  const initialPinchPan = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const initialPinchCenter = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    // Allow left-click (0) or middle-click (1) or touch/pen
    if (e.pointerType === "mouse" && e.button !== 0 && e.button !== 1) return;

    activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    if (activePointers.current.size === 1) {
      setIsDragging(true);
      dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
      clickStart.current = { x: e.clientX, y: e.clientY };
    } else if (activePointers.current.size === 2) {
      // 2-finger touch gesture started
      setIsDragging(false);
      const points = Array.from(activePointers.current.values());
      const dist = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      const container = containerRef.current;
      const rect = container ? container.getBoundingClientRect() : { left: 0, top: 0 };
      const center = {
        x: (points[0].x + points[1].x) / 2 - rect.left,
        y: (points[0].y + points[1].y) / 2 - rect.top,
      };

      initialPinchDist.current = dist;
      initialPinchZoom.current = zoom;
      initialPinchPan.current = { ...pan };
      initialPinchCenter.current = center;
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activePointers.current.has(e.pointerId)) return;
    activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePointers.current.size === 1 && isDragging) {
      // Single pointer pan
      setPan({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    } else if (
      activePointers.current.size === 2 &&
      initialPinchDist.current !== null &&
      initialPinchDist.current > 0
    ) {
      // 2-finger touch pinch-zoom & pan
      const points = Array.from(activePointers.current.values());
      const currentDist = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      const container = containerRef.current;
      const rect = container ? container.getBoundingClientRect() : { left: 0, top: 0 };
      const currentCenter = {
        x: (points[0].x + points[1].x) / 2 - rect.left,
        y: (points[0].y + points[1].y) / 2 - rect.top,
      };

      const scale = currentDist / initialPinchDist.current;
      const nextZoom = Math.min(3.0, Math.max(0.25, initialPinchZoom.current * scale));

      const scaleRatio = nextZoom / initialPinchZoom.current;

      const center0 = initialPinchCenter.current;
      const pan0 = initialPinchPan.current;

      const nextPanX = currentCenter.x - (center0.x - pan0.x) * scaleRatio;
      const nextPanY = currentCenter.y - (center0.y - pan0.y) * scaleRatio;

      setZoom(nextZoom);
      setPan({ x: nextPanX, y: nextPanY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    activePointers.current.delete(e.pointerId);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    if (activePointers.current.size < 2) {
      initialPinchDist.current = null;
    }
    if (activePointers.current.size === 0) {
      setIsDragging(false);
    } else if (activePointers.current.size === 1) {
      const remaining = Array.from(activePointers.current.values())[0];
      setIsDragging(true);
      dragStart.current = { x: remaining.x - pan.x, y: remaining.y - pan.y };
    }
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
                      Product Designer
                    </p>
                  </div>
                  {/* Profile Picture Asset */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-slate-50 flex-shrink-0">
                    <img
                      src={`${import.meta.env.BASE_URL}images/about/hero.jpg`}
                      alt="Sumit profile pic"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mt-4 pt-4 border-t border-dashed border-slate-200">
                  Product Designer with experience building SaaS products across engineering and UX. After shipping production software, I pursued a double Master's in Human-Computer Interaction to build my expertise in user-centred design, research, and product thinking. I combine systems thinking, user research, and usability testing to design user-friendly products that simplify complex problems.
                </p>

                <div className="mt-5 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary/70" />
                    <span>Finland / Italy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-primary/70" />
                    <span>sknayyar.sk@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-primary/70" />
                    <span>+358 417434861</span>
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
                <h3 className="text-lg font-bold font-display text-slate-900 mt-1">
                  Core Stack
                </h3>
                <p className="text-[10px] uppercase text-slate-400">
                  Design, Research &amp; Engineering
                </p>

                <div className="mt-4 pt-4 border-t border-dashed border-slate-200 space-y-4 overflow-y-auto max-h-[380px] pr-1">
                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Design
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Product Design",
                        "User Research",
                        "Interaction Design",
                        "Information Architecture",
                        "Accessibility (WCAG)",
                        "Prototyping",
                      ].map((s) => (
                        <span
                          key={s}
                          className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[10px] text-slate-650 font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Research &amp; Strategy
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Usability Testing",
                        "Facilitation",
                        "Design Thinking",
                        "Systems Thinking",
                        "Participatory Design",
                      ].map((s) => (
                        <span
                          key={s}
                          className="px-2 py-1 bg-emerald-50 border border-emerald-200/50 text-emerald-700 rounded text-[10px] font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Technical Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Figma",
                        "React",
                        "TypeScript",
                        "Next.js",
                        "Node.js",
                        "Design Tokens",
                        "Git",
                        "AI-Augmented Workflows",
                      ].map((s) => (
                        <span
                          key={s}
                          className="px-2 py-1 bg-primary/5 border border-primary/20 text-primary rounded text-[10px] font-medium"
                        >
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

        case "groundwork-frame":
          return (
            <div className="flex flex-col justify-between h-full p-6 text-slate-800 font-body select-none">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">
                  EXPERIENCE // CURRENT
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900 mt-1">
                  Groundwork
                </h3>
                <p className="text-[10px] font-semibold uppercase text-slate-400">
                  UX &amp; Accessibility Designer // June 2025 – Present (Remote)
                </p>

                <div className="mt-4 pt-4 border-t border-dashed border-slate-200 space-y-3 text-xs leading-relaxed text-slate-650">
                  <ul className="list-disc pl-4 space-y-2 text-[11px] text-slate-600">
                    <li>
                      Led end-to-end product design for an early-stage consultancy, defining service offerings, workshops, and facilitation methods for regulated digital products.
                    </li>
                    <li>
                      Defined design and facilitation exercises, co-designed workshops with disabled community, translating accessibility requirements into practical design guidelines.
                    </li>
                    <li>
                      Led value-proposition validation and secured 2nd place at the EIT Jumpstarter (New European Bauhaus), strengthening the venture's funding readiness.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-[9px] font-mono text-slate-400 border-t border-slate-100 pt-3">
                RECOGNITION // EIT_JUMPSTARTER_2ND_PLACE
              </div>
            </div>
          );

        case "dedanext-frame":
          return (
            <div className="flex flex-col justify-between h-full p-6 text-slate-800 font-body select-none">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">
                  EXPERIENCE // INTERNSHIP
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900 mt-1">
                  Dedanext S.p.a
                </h3>
                <p className="text-[10px] font-semibold uppercase text-slate-400">
                  Product Design Intern // Mar 2026 – May 2026 (Trento, Italy)
                </p>
                <p className="text-[10px] font-mono text-primary mt-0.5">
                  EDIAQI EU-Horizon Collaboration
                </p>

                <div className="mt-4 pt-4 border-t border-dashed border-slate-200 space-y-3 text-xs leading-relaxed text-slate-650">
                  <ul className="list-disc pl-4 space-y-2 text-[11px] text-slate-600">
                    <li>
                      Conducted qualitative research to understand user mental models, converting complex environmental data into information architectures for a multi-stakeholder platform.
                    </li>
                    <li>
                      Evaluated 6 interactive display concepts across 4 data modalities with 200 participants, defining layout density guidelines that improved ambient data comprehension speed by ~30%.
                    </li>
                    <li>
                      Developed a reusable design framework for ambient digital displays to build consistent and scalable interface design.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-[9px] font-mono text-slate-400 border-t border-slate-100 pt-3">
                EU_HORIZON_EDIAQI // AMBIENT_UI_FRAMEWORK
              </div>
            </div>
          );

        case "optmyzr-frame":
          return (
            <div className="flex flex-col justify-between h-full p-6 text-slate-800 font-body select-none">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">
                  EXPERIENCE // FULL-TIME
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900 mt-1">
                  Optmyzr Inc.
                </h3>
                <p className="text-[10px] font-semibold uppercase text-slate-400">
                  Design Engineer (Core Systems) // May 2020 – July 2024 (Hyderabad, India)
                </p>

                <div className="mt-4 pt-4 border-t border-dashed border-slate-200 space-y-3 text-xs leading-relaxed text-slate-650">
                  <ul className="list-disc pl-4 space-y-2 text-[11px] text-slate-600">
                    <li>
                      Redesigned the onboarding experience by creating a 5-step configuration wizard, reducing onboarding drop-offs by ~25% and improving setup during periods of high backend load.
                    </li>
                    <li>
                      Co-developed a design system comprising 30+ reusable React components, standardising UI patterns across multiple SaaS products and improving feature development time.
                    </li>
                    <li>
                      Redesigned high-density data interfaces to improve readability and navigation, enabling users to quickly analyse dense ad metrics for multiple accounts.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-[9px] font-mono text-slate-400 border-t border-slate-100 pt-3">
                CORE_SYSTEMS // REACT_DESIGN_SYSTEM
              </div>
            </div>
          );

        case "edu-frame":
          return (
            <div className="flex flex-col justify-between h-full p-6 text-slate-800 font-body select-none">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">
                  HIGHER EDUCATION
                </span>
                <h3 className="text-lg font-bold font-display text-slate-900 mt-1">
                  Double-degree M.Sc.
                </h3>
                <p className="text-[10px] uppercase text-slate-400 font-semibold">
                  Human-Computer Interaction &amp; Design (2024–2026)
                </p>

                <div className="mt-4 pt-4 border-t border-dashed border-slate-200 space-y-4 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-850">
                      Aalto University, Finland
                    </h4>
                    <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">
                      <strong>Core Focus:</strong> User-Centered Design, Interface Engineering, User Interface Construction, Usability Testing.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-850">
                      University of Trento, Italy
                    </h4>
                    <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">
                      <strong>Cognitive Sciences:</strong> Social Cognition, Decision-making, Digital Nudging, Participatory Design, Affective Computing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-[9px] font-mono text-slate-400 border-t border-slate-100 pt-3">
                ACAD_CREDENTIAL // DOUBLE_DEGREE_HCI
              </div>
            </div>
          );

        case "projects-frame":
          return (
            <div className="flex flex-col justify-between h-full p-6 text-slate-800 font-body select-none">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">
                  PROTOTYPES &amp; SHIPPED
                </span>
                <h3 className="text-lg font-bold font-display text-slate-900 mt-1">
                  Featured Projects
                </h3>
                <p className="text-[10px] uppercase text-slate-400">
                  UX &amp; Web Applications
                </p>

                <div className="mt-4 pt-4 border-t border-dashed border-slate-200 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-xs">
                        EDIAQI – In-room Ambient Display
                      </h4>
                      <span className="px-1.5 py-0.5 text-[9px] font-mono bg-primary/10 text-primary rounded font-medium">
                        Display Prototype
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Designed and developed an ambient display that converts complex indoor air quality data into actionable insights for non-expert occupants.
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-xs">
                        Renovation Insights
                      </h4>
                      <span className="px-1.5 py-0.5 text-[9px] font-mono bg-emerald-100 text-emerald-800 rounded font-medium">
                        Live Prototype
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 italic">
                      "Remonttihintojen tutkija"
                    </p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Designed and built a localised web application that transforms complex home renovation cost data into interactive visualisations, helping Finnish homeowners make informed financial decisions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-[9px] font-mono text-slate-400 border-t border-slate-100 pt-3">
                PROJECT_REGISTRY // 2_VERIFIED_PROTOTYPES
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
                <span className="text-[10px] text-emerald-600">
                  // Identity metadata file
                </span>
                <div className="bg-slate-950 border border-emerald-900/30 rounded p-3 text-[10px] text-slate-300 leading-relaxed mt-2">
                  <pre>{`{
  "name": "Sumit Nayyar",
  "title": "Product Designer",
  "education": "Double-degree M.Sc. HCI & Design",
  "contact": {
    "email": "sknayyar.sk@gmail.com",
    "phone": "+358417434861",
    "linkedin": "linkedin.com/in/sumitnayyar-ux",
    "portfolio": "skn1999.github.io/sumit-portfolio"
  }
}`}</pre>
                </div>
              </div>
              <div className="text-[9px] text-emerald-600">
                JSON_FILE // BIO_VALIDATED
              </div>
            </div>
          );

        case "skills-frame":
          return (
            <div className="p-5 font-mono text-xs text-emerald-400 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-emerald-600">
                  // Dependency package configuration
                </span>
                <div className="bg-slate-950 border border-emerald-900/30 rounded p-3 text-[10px] text-slate-300 mt-2">
                  <pre>{`const SKILLS = {
  design: ["Product Design", "User Research", "WCAG", "IA"],
  strategy: ["Usability Testing", "Facilitation", "Systems Thinking"],
  techStack: ["Figma", "React", "TypeScript", "Next.js", "AI Workflows"]
};`}</pre>
                </div>
              </div>
              <div className="text-[9px] text-emerald-600">
                CONFIG_EXPORT // DEPS: SECURE
              </div>
            </div>
          );

        case "groundwork-frame":
          return (
            <div className="p-5 font-mono text-xs text-emerald-400 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-emerald-600">
                  // UX &amp; Accessibility Design Work
                </span>
                <div className="bg-slate-950 border border-emerald-900/30 rounded p-3 text-[9.5px] text-slate-300 leading-normal mt-2">
                  <pre>{`// Groundwork - UX & Accessibility Designer
const GroundworkDesign = () => (
  <ConsultancySuite
    accessibility="Co-designed with disabled community"
    guidelines="WCAG AA/AAA standards"
    award="2nd place @ EIT Jumpstarter (NEB)"
  />
);`}</pre>
                </div>
              </div>
              <div className="text-[9px] text-emerald-600">
                SRC: GroundworkDesign.tsx // ACTIVE
              </div>
            </div>
          );

        case "dedanext-frame":
          return (
            <div className="p-5 font-mono text-xs text-emerald-400 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-emerald-600">
                  // EDIAQI EU-Horizon Collaboration
                </span>
                <div className="bg-slate-950 border border-emerald-900/30 rounded p-3 text-[9.5px] text-slate-300 leading-normal mt-2">
                  <pre>{`// Dedanext S.p.a - Product Design Intern
const EDIAQIPlatform = () => (
  <AmbientDisplayStudy
    testedConcepts={6}
    participants={200}
    comprehensionSpeed="+30%"
    designFramework="Reusable Ambient UI"
  />
);`}</pre>
                </div>
              </div>
              <div className="text-[9px] text-emerald-600">
                SRC: EDIAQIPlatform.tsx // OK
              </div>
            </div>
          );

        case "optmyzr-frame":
          return (
            <div className="p-5 font-mono text-xs text-emerald-400 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-emerald-600">
                  // Optmyzr Core Systems Design
                </span>
                <div className="bg-slate-950 border border-emerald-900/30 rounded p-3 text-[9.5px] text-slate-300 leading-normal mt-2">
                  <pre>{`// Optmyzr Inc. - Design Engineer
const CoreSystemsDesign = () => (
  <DesignSystemEngine
    wizardSteps={5} // drop-off -25%
    components={30} // React UI library
    dataDensity="High-Density Analytics"
  />
);`}</pre>
                </div>
              </div>
              <div className="text-[9px] text-emerald-600">
                SRC: CoreSystemsDesign.tsx // OK
              </div>
            </div>
          );

        case "edu-frame":
          return (
            <div className="p-5 font-mono text-xs text-emerald-400 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-emerald-600">
                  // Dual Degree Curriculum
                </span>
                <div className="bg-slate-950 border border-emerald-900/30 rounded p-3 text-[9.5px] text-slate-300 leading-normal mt-2">
                  <pre>{`const DEGREE = {
  aalto: "M.Sc. Human-Computer Interaction & Design",
  trento: "M.Sc. Cognitive Science",
  period: "2024 - 2026"
};`}</pre>
                </div>
              </div>
              <div className="text-[9px] text-emerald-600">
                SRC: MScHCI.tsx // DEGREE_VERIFIED
              </div>
            </div>
          );

        case "projects-frame":
          return (
            <div className="p-5 font-mono text-xs text-emerald-400 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-emerald-600">
                  // Prototypes Registry
                </span>
                <div className="bg-slate-950 border border-emerald-900/30 rounded p-3 text-[9.5px] text-slate-300 leading-normal mt-2">
                  <pre>{`[
  {
    name: "EDIAQI Ambient Display",
    type: "Display Prototype"
  },
  {
    name: "Renovation Insights",
    type: "Live Prototype"
  }
]`}</pre>
                </div>
              </div>
              <div className="text-[9px] text-emerald-600">
                EXPORT_VALS // PROTOTYPES: 2
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
        className="mt-[64px] md:mt-[96px] h-[calc(100vh-64px)] md:h-[calc(100vh-96px)] flex flex-col bg-background text-foreground overflow-hidden select-none print:hidden relative"
      >
        {/* Top Action Header */}
        <header className="absolute top-4 left-4 right-4 z-40 pointer-events-none flex justify-between items-center">
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
              <a href={pdfUrl} download="Resume-Product-Designer.pdf">
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </Button>
          </div>
        </header>

        {/* Toggle Sidebar Button (shown if sidebar is closed) */}
        {!isSidebarOpen && (
          <div className="absolute left-4 top-16 z-30 pointer-events-auto">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsSidebarOpen(true)}
              className="bg-background/85 backdrop-blur-md border border-border/40 shadow-lg h-9 w-9 px-0 flex items-center justify-center rounded-xl"
              title="Open Layers Sidebar"
            >
              <Layers className="w-4 h-4 text-foreground" />
            </Button>
          </div>
        )}

        {/* Figma Layers Sidebar on the Left */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-4 top-16 bottom-4 z-30 w-64 bg-background/85 backdrop-blur-md border border-border/40 rounded-xl shadow-lg flex flex-col pointer-events-auto overflow-hidden"
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-border/40 flex items-center justify-between bg-muted/30 select-none">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-primary/70" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Layers
                  </span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors font-mono text-[16px]"
                  title="Collapse Sidebar"
                >
                  ✕
                </button>
              </div>

              {/* Tree Navigation List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 font-mono text-[11px]">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-muted-foreground px-2 py-1 select-none font-bold text-[10px] uppercase tracking-wider">
                    <span>CV Blueprint</span>
                  </div>

                  <div className="space-y-2 pl-1 border-l border-border/40 ml-2 mt-1">
                    {figmaSections.map((section) => {
                      const isSectionSelected = section.frames.some(
                        (f) => f.id === selectedFrameId,
                      );
                      return (
                        <div key={section.id} className="space-y-1">
                          {/* Section Item */}
                          <button
                            onClick={() => centerOnSection(section)}
                            className={`w-full flex items-center gap-1.5 px-2 py-1 rounded text-left font-bold transition-colors ${
                              isSectionSelected
                                ? isXRay
                                  ? "bg-emerald-950/40 text-emerald-400"
                                  : "bg-blue-50 text-[#18a0fb]"
                                : "hover:bg-muted text-foreground/80 hover:text-foreground"
                            }`}
                          >
                            <FolderOpen className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate">
                              {isXRay
                                ? section.dirTitle.replace("Directory: ", "")
                                : section.title.replace("Section: ", "")}
                            </span>
                          </button>

                          {/* Frames (Indented under Section) */}
                          <div className="space-y-0.5 pl-3.5 mt-0.5">
                            {section.frames.map((frame) => {
                              const isFrameSelected =
                                selectedFrameId === frame.id;
                              return (
                                <button
                                  key={frame.id}
                                  onClick={() => centerOnFrame(frame)}
                                  className={`w-full flex items-center gap-1.5 px-2 py-0.5 rounded text-left transition-colors ${
                                    isFrameSelected
                                      ? isXRay
                                        ? "bg-emerald-500 text-slate-950 font-bold"
                                        : "bg-[#18a0fb] text-white font-bold"
                                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                  }`}
                                >
                                  <FileCode className="w-3 h-3 flex-shrink-0" />
                                  <span className="truncate">
                                    {isXRay
                                      ? frame.fileTitle
                                      : frame.title.replace("Frame: ", "")}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sidebar Footer info */}
              <div className="px-4 py-2 border-t border-border/40 text-[9px] font-mono text-muted-foreground/60 select-none bg-muted/10">
                {selectedFrameId
                  ? `Focused: ${selectedFrameId.replace("-frame", "")}`
                  : "No active selection"}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Drag-Space Viewport */}
        <div
          ref={containerRef}
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
                : Math.min(0.35, Math.max(0.04, 0.1 + (zoom - 0.35) * 0.2)),
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
                width: "3500px",
                height: "980px",
                overflow: "visible",
              }}
            >
              {[
                { d: "M 500 450 L 565 450", key: "c1" },
                { d: "M 865 450 C 920 450, 950 430, 1010 430", key: "c2" },
                { d: "M 1430 430 L 1455 430", key: "c3" },
                { d: "M 1875 430 L 1900 430", key: "c4" },
                { d: "M 2320 430 C 2380 430, 2410 430, 2480 430", key: "c5" },
                { d: "M 2870 430 L 2890 430", key: "c6" },
              ].map((path) => (
                <g key={path.key}>
                  {/* Background path line */}
                  <path
                    d={path.d}
                    fill="none"
                    stroke={
                      isXRay
                        ? "rgba(16, 185, 129, 0.12)"
                        : "rgba(24, 160, 251, 0.12)"
                    }
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
                      <span className="text-emerald-500 uppercase">
                        {section.dirTitle}
                      </span>
                    </>
                  ) : (
                    <>
                      <MousePointer className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-500 font-bold uppercase">
                        {section.title}
                      </span>
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
                            LOC: {frame.fileTitle} // SIZE:{" "}
                            {Math.round(frame.w * 0.1)} lines
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

        {/* Floating Action HUD controls at bottom */}
        <footer className="absolute bottom-6 right-6 z-35 pointer-events-none flex justify-end items-center pointer-events-auto">
          {/* Action Hub (X-Ray controls only) */}
          <div className="bg-background/85 backdrop-blur-md border border-border/40 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 text-xs font-mono">
            <Button
              variant={isXRay ? "default" : "outline"}
              size="xs"
              onClick={() => setIsXRay((prev) => !prev)}
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
              Hold{" "}
              <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">
                Spacebar
              </kbd>{" "}
              for IDE
            </span>
          </div>
        </footer>
      </motion.div>

      {/* ────────────────── PRINT-ONLY DOCUMENT LAYOUT ────────────────── */}
      <div className="hidden print:block print:bg-white print:text-black w-full max-w-4xl mx-auto p-8 font-sans">
        {/* Header Block */}
        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Sumit Nayyar
            </h1>
            <p className="text-lg font-semibold text-slate-600 uppercase tracking-wider mt-1">
              Product Designer
            </p>
          </div>
          <div className="text-right text-xs text-slate-700 space-y-1 font-mono">
            <div>sknayyar.sk@gmail.com</div>
            <div>+358 417434861</div>
            <div>linkedin.com/sumitnayyar-ux</div>
            <div>skn1999.github.io/sumit-portfolio</div>
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
                Product Designer with experience building SaaS products across engineering and UX. After shipping production software, I pursued a double Master's in Human-Computer Interaction to build my expertise in user-centred design, research, and product thinking. I combine systems thinking, user research, and usability testing to design user-friendly products that simplify complex problems.
              </p>
            </section>

            {/* Experience */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                Experience
              </h2>

              {/* Groundwork */}
              <div>
                <div className="flex justify-between font-semibold text-sm">
                  <h3 className="text-slate-900 font-bold">
                    UX &amp; Accessibility Designer @ Groundwork
                  </h3>
                  <span className="text-xs font-mono text-slate-600">
                    June 2025 – Present
                  </span>
                </div>
                <div className="text-xs text-slate-600 italic">Remote</div>
                <ul className="list-disc pl-4 mt-2 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                  <li>
                    Led end-to-end product design for an early-stage consultancy, defining service offerings, workshops, and facilitation methods for regulated digital products.
                  </li>
                  <li>
                    Defined design and facilitation exercises, co-designed workshops with disabled community, translating accessibility requirements into practical design guidelines.
                  </li>
                  <li>
                    Led value-proposition validation and secured 2nd place at the EIT Jumpstarter (New European Bauhaus), strengthening the venture's funding readiness.
                  </li>
                </ul>
              </div>

              {/* Dedanext S.p.a */}
              <div>
                <div className="flex justify-between font-semibold text-sm">
                  <h3 className="text-slate-900 font-bold">
                    Product Design Intern @ Dedanext S.p.a
                  </h3>
                  <span className="text-xs font-mono text-slate-600">
                    Mar 2026 – May 2026
                  </span>
                </div>
                <div className="text-xs text-slate-600 italic">
                  EDIAQI EU-Horizon Collaboration — Trento, Italy
                </div>
                <ul className="list-disc pl-4 mt-2 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                  <li>
                    Conducted qualitative research to understand user mental models, converting complex environmental data into information architectures for a multi-stakeholder platform.
                  </li>
                  <li>
                    Evaluated 6 interactive display concepts across 4 data modalities with 200 participants, defining layout density guidelines that improved ambient data comprehension speed by ~30%.
                  </li>
                  <li>
                    Developed a reusable design framework for ambient digital displays to build consistent and scalable interface design.
                  </li>
                </ul>
              </div>

              {/* Optmyzr */}
              <div>
                <div className="flex justify-between font-semibold text-sm">
                  <h3 className="text-slate-900 font-bold">
                    Design Engineer (Core Systems) @ Optmyzr Inc.
                  </h3>
                  <span className="text-xs font-mono text-slate-600">
                    May 2020 – July 2024
                  </span>
                </div>
                <div className="text-xs text-slate-600 italic">
                  Hyderabad, India
                </div>
                <ul className="list-disc pl-4 mt-2 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                  <li>
                    Redesigned the onboarding experience by creating a 5-step configuration wizard, reducing onboarding drop-offs by ~25% and improving setup during periods of high backend load.
                  </li>
                  <li>
                    Co-developed a design system comprising 30+ reusable React components, standardising UI patterns across multiple SaaS products and improving feature development time.
                  </li>
                  <li>
                    Redesigned high-density data interfaces to improve readability and navigation, enabling users to quickly analyse dense ad metrics for multiple accounts.
                  </li>
                </ul>
              </div>
            </section>

            {/* Projects */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                Projects
              </h2>

              <div>
                <div className="flex justify-between font-semibold text-xs">
                  <h3 className="font-bold text-slate-900">
                    EDIAQI – In-room Ambient Display
                  </h3>
                  <span className="font-mono text-slate-600">Display Prototype</span>
                </div>
                <p className="text-[11px] text-slate-700 mt-1 leading-relaxed">
                  Designed and developed an ambient display that converts complex indoor air quality data into actionable insights for non-expert occupants.
                </p>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-xs">
                  <h3 className="font-bold text-slate-900">
                    Renovation Insights ("Remonttihintojen tutkija")
                  </h3>
                  <span className="font-mono text-slate-600">Live Prototype</span>
                </div>
                <p className="text-[11px] text-slate-700 mt-1 leading-relaxed">
                  Designed and built a localised web application that transforms complex home renovation cost data into interactive visualisations, helping Finnish homeowners make informed financial decisions.
                </p>
              </div>
            </section>

            {/* Education */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                Education
              </h2>
              <div>
                <div className="flex justify-between font-semibold text-xs">
                  <h3 className="font-bold text-slate-900">
                    Double-degree M.Sc. Human-Computer Interaction &amp; Design
                  </h3>
                  <span className="font-mono text-slate-600">2024–2026</span>
                </div>
                <div className="text-xs text-slate-600 italic">
                  Aalto University, Finland | University of Trento, Italy
                </div>
                <ul className="list-disc pl-4 mt-1 text-[11px] text-slate-700 space-y-1 leading-relaxed">
                  <li>
                    <strong>Core Focus:</strong> User-Centered Design, Interface Engineering, User Interface Construction, Usability Testing.
                  </li>
                  <li>
                    <strong>Cognitive Sciences:</strong> Social Cognition, Decision-making, Digital Nudging, Participatory Design, Affective Computing.
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar Column (1/3 width) */}
          <div className="space-y-6">
            {/* Technical Skills */}
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                Technical Skills
              </h2>

              <div className="space-y-4 text-xs">
                <div>
                  <h3 className="font-bold text-slate-800 uppercase tracking-wide text-[10px] mb-1">
                    Design
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    Product Design, User Research, Interaction Design, Information Architecture, Accessibility (WCAG), Prototyping
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-800 uppercase tracking-wide text-[10px] mb-1">
                    Research &amp; Strategy
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    Usability Testing, Facilitation, Design Thinking, Systems Thinking, Participatory Design
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-800 uppercase tracking-wide text-[10px] mb-1">
                    Technical Stack
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    Figma, React, TypeScript, Next.js, Node.js, Design Tokens, Git, AI-Augmented Workflows
                  </p>
                </div>
              </div>
            </section>

            {/* Print Instructions */}
            <div className="bg-slate-50 border border-slate-200 rounded p-4 text-[10px] text-slate-500 font-mono leading-relaxed print:hidden">
              <strong>PRINT GUIDELINE:</strong>
              <br />
              This page automatically renders as a clean document when printed via your browser (Cmd + P) or saved as a PDF.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResumePage;
