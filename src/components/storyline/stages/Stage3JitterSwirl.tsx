import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// Direct Vite imports for optimal bundling and asset hashing
import coverOptmyzrOnboarding from "@/content/projects/optmyzr-onboarding-experience/cover.png";
import coverOptmyzrDashboard from "@/content/projects/optmyzr-dashboard-migration/cover.png";
import coverEdiaqi from "@/content/projects/ediaqi-decision-support-system/cover.png";
import coverGroundwork from "@/content/projects/groundwork/cover.svg";
import coverSuperEgo from "@/content/projects/super-ego-app/cover.jpg";
import coverGostaLabs from "@/content/projects/gosta-labs/cover.svg";
import coverSocialIntegration from "@/content/projects/social-integration-pd/cover.jpg";
import coverSpatialDesign from "@/content/projects/spatial-design-restaurant/cover.jpg";

interface Stage3Props {
  isActive: boolean;
  spotlightCompany?: "optmyzr" | "dedanext" | "groundwork" | null;
}

interface ProjectCardData {
  id: string;
  title: string;
  tag: string;
  company: "optmyzr" | "dedanext" | "groundwork" | "other";
  href: string;
  image: string;
  nodeClass: string;
  style: React.CSSProperties;
}

const PROJECTS: ProjectCardData[] = [
  {
    id: "optmyzr-onboarding",
    title: "Optmyzr • Onboarding Experience",
    tag: "Fixing Onboarding Churn",
    company: "optmyzr",
    href: "/projects/optmyzr-onboarding-experience",
    image: coverOptmyzrOnboarding,
    nodeClass: "w-[170px] h-[108px] z-20",
    style: {
      left: "335px",
      top: "300px",
      transform: "rotate(16deg)",
      filter: "blur(0px)",
      opacity: 1.0,
    },
  },
  {
    id: "optmyzr-dashboard",
    title: "Optmyzr • Dashboard Migration",
    tag: "10,000+ Accounts Core UI",
    company: "optmyzr",
    href: "/projects/optmyzr-dashboard-migration",
    image: coverOptmyzrDashboard,
    nodeClass: "w-[156px] h-[98px] z-[18]",
    style: {
      left: "73px",
      top: "325px",
      transform: "rotate(-18deg)",
      filter: "blur(0px)",
      opacity: 1.0,
    },
  },
  {
    id: "ediaqi-dss",
    title: "Dedanext • EDIAQI System",
    tag: "200+ User Decision Support",
    company: "dedanext",
    href: "/projects/ediaqi-decision-support-system",
    image: coverEdiaqi,
    nodeClass: "w-[140px] h-[88px] z-[16]",
    style: {
      left: "31px",
      top: "102px",
      transform: "rotate(22deg)",
      filter: "blur(0.8px)",
      opacity: 0.94,
    },
  },
  {
    id: "groundwork",
    title: "Groundwork • Accessibility Studio",
    tag: "Co-founded • EIT Finalist",
    company: "groundwork",
    href: "/projects/groundwork",
    image: coverGroundwork,
    nodeClass: "w-[124px] h-[78px] z-[14]",
    style: {
      left: "266px",
      top: "36px",
      transform: "rotate(-20deg)",
      filter: "blur(1.6px)",
      opacity: 0.88,
    },
  },
  {
    id: "super-ego",
    title: "YOU (Super Ego) • Habit Orbit",
    tag: "Behavioral State Engine",
    company: "other",
    href: "/projects/super-ego-app",
    image: coverSuperEgo,
    nodeClass: "w-[108px] h-[68px] z-[12]",
    style: {
      left: "337px",
      top: "234px",
      transform: "rotate(28deg)",
      filter: "blur(2.5px)",
      opacity: 0.78,
    },
  },
  {
    id: "gosta-labs",
    title: "Gösta Labs • Brand & Systems",
    tag: "Spatial Computing Research",
    company: "other",
    href: "/projects/gosta-labs",
    image: coverGostaLabs,
    nodeClass: "w-[94px] h-[58px] z-[10]",
    style: {
      left: "192px",
      top: "309px",
      transform: "rotate(-28deg)",
      filter: "blur(3.6px)",
      opacity: 0.65,
    },
  },
  {
    id: "social-integration",
    title: "Social Integration PD",
    tag: "Co-Design Toolkit",
    company: "other",
    href: "/projects/social-integration-pd",
    image: coverSocialIntegration,
    nodeClass: "w-[80px] h-[50px] z-[8]",
    style: {
      left: "120px",
      top: "195px",
      transform: "rotate(36deg)",
      filter: "blur(4.8px)",
      opacity: 0.50,
    },
  },
  {
    id: "spatial-design",
    title: "Spatial Restaurant Architecture",
    tag: "Physical & Ambient Space",
    company: "other",
    href: "/projects/spatial-design-restaurant",
    image: coverSpatialDesign,
    nodeClass: "w-[66px] h-[42px] z-[6]",
    style: {
      left: "213px",
      top: "120px",
      transform: "rotate(-14deg)",
      filter: "blur(5.8px)",
      opacity: 0.38,
    },
  },
];

export const Stage3JitterSwirl: React.FC<Stage3Props> = ({
  spotlightCompany: propSpotlight,
}) => {
  const [internalSpotlight, setInternalSpotlight] = useState<
    "optmyzr" | "dedanext" | "groundwork" | null
  >(propSpotlight || null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  const activeSpotlight = propSpotlight !== undefined ? propSpotlight : internalSpotlight;

  useEffect(() => {
    const handleSpotlight = (e: Event) => {
      const customEvent = e as CustomEvent<"optmyzr" | "dedanext" | "groundwork" | null>;
      setInternalSpotlight(customEvent.detail || null);
    };

    window.addEventListener("storyline-spotlight", handleSpotlight);
    return () => window.removeEventListener("storyline-spotlight", handleSpotlight);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (y / (rect.height / 2)) * -6,
      y: (x / (rect.width / 2)) * 6,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative w-full max-w-[580px] h-[520px] flex items-center justify-center select-none"
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Interactive Swirl Wrapper */}
      <div
        ref={wrapperRef}
        className="relative w-[520px] h-[440px] transition-transform duration-250 ease-emil-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Revolving Spiral Disc (Open Central Vortex Eye) */}
        <div
          className="absolute inset-0 group"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "260px 220px",
            animation: "vortexGalaxySpin 42s linear infinite",
          }}
        >
          {PROJECTS.map((proj) => {
            const isHighlighted = activeSpotlight && proj.company === activeSpotlight;
            const isDimmed = activeSpotlight && proj.company !== activeSpotlight;

            let cardTransform = proj.style.transform;
            let cardFilter = proj.style.filter;
            let cardOpacity = proj.style.opacity;
            let cardZIndex = undefined;

            if (isHighlighted) {
              cardTransform = `${proj.style.transform} scale(1.18) translateZ(40px)`;
              cardFilter = "blur(0px) brightness(1.2)";
              cardOpacity = 1;
              cardZIndex = 99;
            } else if (isDimmed) {
              cardTransform = `${proj.style.transform} scale(0.88)`;
              cardFilter = "blur(8px) grayscale(80%)";
              cardOpacity = 0.16;
            }

            return (
              <Link
                key={proj.id}
                to={proj.href}
                className={`absolute rounded-xl overflow-hidden border bg-paper-card shadow-xl cursor-pointer block transition-all duration-200 ease-emil-out hover:scale-115 hover:z-[100] hover:blur-0 hover:brightness-110 hover:border-emerald-500 hover:shadow-2xl ${proj.nodeClass} ${
                  isHighlighted
                    ? "border-emerald-500 ring-2 ring-emerald-500 shadow-2xl"
                    : "border-paper-border/80"
                }`}
                style={{
                  ...proj.style,
                  transform: cardTransform,
                  filter: cardFilter,
                  opacity: cardOpacity,
                  zIndex: cardZIndex,
                  transformOrigin: "center center",
                }}
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover block pointer-events-none"
                  loading="eager"
                />

                {/* Subtle Hover Tooltip */}
                <div className="absolute bottom-1 inset-x-1 py-1 px-1.5 rounded bg-black/85 backdrop-blur-xs text-white opacity-0 hover:opacity-100 transition-opacity duration-150 pointer-events-none text-center">
                  <span className="font-mono text-[9px] font-bold block truncate text-emerald-400">
                    {proj.tag}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes vortexGalaxySpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (hover: hover) and (pointer: fine) {
          .group:hover {
            animation-play-state: paused !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .group {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
