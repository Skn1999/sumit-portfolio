import React, { useState, useEffect, useRef } from "react";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HelsinkiSolarDial } from "./HelsinkiSolarDial";
import { TextReveal } from "@/components/arc/text-reveal/text-reveal";

gsap.registerPlugin(ScrollTrigger);

// Module-level flag to ensure hero text only animates on initial site load
let heroTextHasAnimated = false;

// Increase sensitivity for snappy, responsive playback across natural wrist/cursor movements
const SENSITIVITY = 2.2;

// Damping / lag factor: lower values (0.05 - 0.08) introduce a silky, weighted inertia
// where the video playback smoothly trails the cursor movement with gentle deceleration.
const DAMPING_FACTOR = 0.1;

// Interactive Em-Dash with Emil Kowalski pop-style tooltip ("Not written by AI")
const EmDash: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span
      className="relative inline-block cursor-help align-baseline group/emdash select-none"
      data-open={isOpen ? "true" : undefined}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape") setIsOpen(false);
      }}
      tabIndex={0}
      role="button"
      aria-label="Em-dash note: Not written by AI"
    >
      <span className="reveal-word inline-block transition-all duration-150 group-hover/emdash:text-emerald-500 dark:group-hover/emdash:text-emerald-400 group-hover/emdash:scale-110 group-active/emdash:scale-95 px-0.5">
        —
      </span>

      {/* Emil Kowalski pop tooltip */}
      <span
        role="tooltip"
        className="emdash-tooltip absolute bottom-full left-1/2 mb-2.5 px-3 py-1 rounded-full whitespace-nowrap z-50 bg-neutral-900 text-neutral-100 dark:bg-white dark:text-neutral-900 text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider uppercase shadow-xl shadow-black/30 border border-white/10 dark:border-black/10 select-none"
      >
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Not written by AI</span>
        </span>
        {/* Origin-anchored bottom caret */}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-neutral-900 dark:bg-white border-r border-b border-white/10 dark:border-black/10" />
      </span>
    </span>
  );
};

// Helper to wrap every individual word in a .reveal-word span for scroll scrubbing
const wrapWords = (node: React.ReactNode): React.ReactNode => {
  if (typeof node === "string") {
    // If the text contains em-dashes '—', break around them so every em-dash becomes an interactive EmDash component
    if (node.includes("—")) {
      const parts = node.split("—");
      const elements: React.ReactNode[] = [];
      parts.forEach((part, idx) => {
        if (part) {
          elements.push(wrapWords(part));
        }
        if (idx < parts.length - 1) {
          elements.push(<EmDash key={`emdash-${idx}`} />);
        }
      });
      return <React.Fragment>{elements}</React.Fragment>;
    }

    const words = node.split(" ");
    return words.map((word, i) => (
      <React.Fragment key={i}>
        {word && <span className="reveal-word inline-block">{word}</span>}
        {i < words.length - 1 && " "}
      </React.Fragment>
    ));
  }

  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    if (props && props.children) {
      return React.cloneElement(
        node,
        {},
        wrapWords(props.children)
      );
    }
    return node;
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => <React.Fragment key={i}>{wrapWords(child)}</React.Fragment>);
  }

  return node;
};

const Paragraph: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return <p className={`leading-[1.5] sm:leading-[1.55] md:leading-[1.5] tracking-tight ${className}`}>{wrapWords(children)}</p>;
};

const HeroSection: React.FC = () => {
  const [isInitialRender] = useState(!heroTextHasAnimated);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef<number>(0);
  const displayTimeRef = useRef<number>(0);
  const durationRef = useRef<number>(8.0);
  const rafIdRef = useRef<number | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    heroTextHasAnimated = true;
  }, []);

  // Video metadata and initial setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => {
      if (video.duration && !isNaN(video.duration)) {
        durationRef.current = video.duration;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
        const time = progress * video.duration;
        targetTimeRef.current = time;
        displayTimeRef.current = time;
        video.currentTime = time;
        ScrollTrigger.refresh();
      }
    };

    video.addEventListener("loadedmetadata", onMeta);

    if (video.readyState >= 1 && video.duration) {
      onMeta();
    }

    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  const handleSeeked = () => {
    const video = videoRef.current;
    if (video && !video.seeking) {
      const diff = Math.abs(video.currentTime - displayTimeRef.current);
      if (diff > 0.015) {
        video.currentTime = displayTimeRef.current;
      }
    }
  };

  // Butter-smooth RAF loop using Linear Interpolation (LERP)
  useEffect(() => {
    let isRunning = true;

    const updateScrub = () => {
      const video = videoRef.current;
      if (video && video.readyState >= 2) {
        const target = targetTimeRef.current;
        const current = displayTimeRef.current;
        const diff = target - current;

        // Smoothly glide towards target position with weighted inertia/lag
        if (Math.abs(diff) > 0.0005) {
          displayTimeRef.current += diff * DAMPING_FACTOR;

          // Frame-accurate seek on All-I video without dropped frame jumping
          if (!video.seeking) {
            const timeToSeek = displayTimeRef.current;
            if (Math.abs(video.currentTime - timeToSeek) > 0.01) {
              video.currentTime = timeToSeek;
            }
          }
        }
      }

      if (isRunning) {
        rafIdRef.current = requestAnimationFrame(updateScrub);
      }
    };

    rafIdRef.current = requestAnimationFrame(updateScrub);

    const video = videoRef.current;
    if (video) {
      video.addEventListener("seeked", handleSeeked);
    }

    return () => {
      isRunning = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (video) {
        video.removeEventListener("seeked", handleSeeked);
      }
    };
  }, []);

  // Preston Booth scroll-scrub word reveal animation + full scroll-height video scrub
  useEffect(() => {
    const container = textContainerRef.current;
    if (!container) return;

    // Direct scroll handler: calculates exact scroll progress from total document scrollHeight
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      const duration = durationRef.current || 8.0;
      targetTimeRef.current = Math.min(duration - 0.05, progress * duration);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    // Trigger initial calculation
    handleScroll();

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".home-text-reveal .reveal-word");
      if (words.length) {
        // Initialize all words at dimmed opacity (ghost text)
        gsap.set(words, { opacity: 0.18 });

        // Scrub timeline tied to editorial text: illuminates words one-by-one as the reader advances
        gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 72%",
            end: "bottom 92%",
            scrub: 0.5,
          },
        }).fromTo(
          words,
          { opacity: 0.18 },
          { opacity: 1, duration: 0.08, stagger: 0.015, ease: "none" }
        );
      }

      // Video playback: lasts until the end of the scroll, interpolated across full document scrollHeight
      ScrollTrigger.create({
        start: 0,
        end: "max",
        scrub: true,
        onUpdate: (self) => {
          const duration = durationRef.current || 8.0;
          targetTimeRef.current = Math.min(
            duration - 0.05,
            Math.max(0, self.progress * duration)
          );
        },
      });
    }, container);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* Background video FIXED across the entire scrolling storyline */}
      <video
        ref={videoRef}
        src={`${import.meta.env.BASE_URL}hero-video-2.mp4`}
        muted
        playsInline
        preload="auto"
        onSeeked={handleSeeked}
        className="fixed inset-0 w-full h-full object-cover pointer-events-none z-0"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          objectFit: "cover",
          objectPosition: "75% center",
        }}
      />

      <div className="relative z-10 w-full pt-32 md:pt-64 pb-44">
        <div className="mx-auto px-6 sm:px-10 md:px-12 w-full">
          {/* Constrained editorial content column: stays strictly on the left side of the viewport so the video character on the right is completely unobstructed */}
          <div className="max-w-lg md:max-w-xl lg:max-w-[520px] xl:max-w-[560px]">
            {/* Header Title with Preston-style rotated sticker tag and UI Arc TextReveal */}
            <div className="relative mb-10 sm:mb-12 md:mb-14">
              <div className="relative inline-block">
                <TextReveal
                  as="h1"
                  text="Sumit Nayyar"
                  delay={0.1}
                  className="font-display tracking-tight font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] text-ink-primary leading-[0.95]"
                />
                {/* Rotated pill badge like Preston Booth reference - perched over top-right of Nayyar */}
                <span className="hidden sm:inline-block absolute -top-4 -right-2 sm:-top-5 sm:-right-4 border-2 border-emerald-500 bg-paper-card/90 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] sm:text-xs font-semibold px-3 py-0.5 rounded-full uppercase tracking-wider -rotate-12 shadow-sm select-none pointer-events-none">
                  Design Engineer
                </span>
              </div>

              {/* Mobile badge */}
              <div className="sm:hidden mt-3">
                <span className="inline-block border border-emerald-500 bg-paper-card/90 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider -rotate-6">
                  Design Engineer
                </span>
              </div>

              {/* Sub-header status tag */}
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-widest text-ink-muted uppercase mt-5">
                <HelsinkiSolarDial direction="bottom" />
                <span className="hidden sm:inline-block">//</span>
                <span className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>OPEN FOR ROLES</span>
                </span>
              </div>
            </div>

            {/* Preston Booth style text reveal container: raw, high-impact typography without card boxes */}
            <div
              ref={textContainerRef}
              className="home-text-reveal space-y-10 sm:space-y-12 md:space-y-14 text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] font-medium text-ink-primary"
            >
              {/* Paragraph 1: Identity Anchor with UI Arc TextReveal */}
              <div>
                <TextReveal
                  as="p"
                  text={"I'm a Design Engineer working at the intersection of cognitive science, design craft, and production code. Sometimes I get identity crises and I keep switching between the three."}
                  delay={0.3}
                  className="leading-[1.5] sm:leading-[1.55] md:leading-[1.5] tracking-tight text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] font-medium text-ink-primary max-w-none"
                />
              </div>

              {/* Paragraph 2: Journey & Why Finland */}
              <Paragraph>
                After completing a Computer Science degree in India, I became obsessed with understanding the human mind behind the interface — why so much software feels frustrating or draining. That curiosity brought me to Europe for a double Master's in HCI and Cognitive Science between <strong className="text-ink-primary font-semibold">Aalto University</strong> and the <strong className="text-ink-primary font-semibold">University of Trento</strong> — studying mental models and user-centric design.
              </Paragraph>

              {/* Paragraph 3: Where I've Shipped */}
              <Paragraph>
                Over the past several years, I've brought that combination of human insight and frontend systems to high-impact products: spending 4+ years as a design engineer at <strong className="text-ink-primary font-semibold">Optmyzr</strong> scaling core analytics across 10,000+ accounts, researching semi-ambient sensor interfaces with 200+ users at <strong className="text-ink-primary font-semibold">Dedanext</strong> in Italy, and co-founded <strong className="text-ink-primary font-semibold">Groundwork</strong> in Finland to turn accessibility regulations into practical tools (awarded 2nd place at the EIT Jumpstarter Grand Final).
              </Paragraph>

              {/* Paragraph 4: Off the clock / What makes me "me" */}
              <Paragraph>
                When I'm not having an identity crisis, I design visual identities for the <strong className="text-ink-primary font-semibold">Sustainability Community of Finland</strong>, or just do random side-projects like <em className="italic text-ink-primary font-medium">YOU (Super Ego)</em> or contemplate about human relations on substack.
              </Paragraph>

              {/* Paragraph 5: Teams I care about & Craft closing */}
              <Paragraph>
                I care about working with fast-paced teams, who care about the craft as well as overall experience — where designers write production code, and software respects the user's attention instead of exploiting it. In a world where anyone can generate a feature in seconds, craft is the differentiator.
              </Paragraph>

              {/* Dual Pill Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3 not-italic">
                <Link
                  to="/resume"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-ink-primary text-paper-bg font-mono text-xs tracking-wider uppercase font-semibold hover:opacity-90 active:scale-[0.97] transition-all shadow-md"
                >
                  <FileText className="w-3.5 h-3.5" />
                  View Resume
                </Link>
                <a
                  href="mailto:sknayyar.sk@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-paper-border bg-paper-card text-ink-primary font-mono text-xs tracking-wider lowercase font-semibold hover:border-ink-primary active:scale-[0.97] transition-all shadow-sm"
                >
                  sknayyar.sk@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
