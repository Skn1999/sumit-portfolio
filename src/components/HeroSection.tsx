import React, { useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { HelsinkiSolarDial } from "./HelsinkiSolarDial";
import { TextReveal } from "@/components/arc/text-reveal/text-reveal";
import { InViewTextReveal } from "@/components/arc/text-reveal/in-view-text-reveal";

// Increase sensitivity for snappy, responsive playback across natural wrist/cursor movements
const SENSITIVITY = 2.2;

// Damping / lag factor: lower values (0.05 - 0.08) introduce a silky, weighted inertia
// where the video playback smoothly trails the cursor movement with gentle deceleration.
const DAMPING_FACTOR = 0.1;

const PARAGRAPH_CLASS =
  "leading-[1.5] sm:leading-[1.55] md:leading-[1.5] tracking-tight text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] font-normal text-ink-primary max-w-none";

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef<number>(2.0);
  const displayTimeRef = useRef<number>(2.0);
  const prevXRef = useRef<number | null>(null);
  const durationRef = useRef<number>(4.0);
  const rafIdRef = useRef<number | null>(null);

  // Only load and render the background video on large screens (lg breakpoint: >= 1024px)
  // This completely eliminates loading 3.7MB+ video bandwidth and decoding overhead on mobile and small devices
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(min-width: 1024px)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsLargeScreen(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Video metadata and initial setup
  useEffect(() => {
    if (!isLargeScreen) return;
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => {
      if (video.duration && !isNaN(video.duration)) {
        durationRef.current = video.duration;
        const midTime = video.duration * 0.5;
        targetTimeRef.current = midTime;
        displayTimeRef.current = midTime;
        video.currentTime = midTime;
      }
    };

    video.addEventListener("loadedmetadata", onMeta);

    if (video.readyState >= 1 && video.duration) {
      onMeta();
    }

    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [isLargeScreen]);

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
    if (!isLargeScreen) return;
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
  }, [isLargeScreen]);

  // Horizontal mouse movement scrubbing listener on window
  useEffect(() => {
    if (!isLargeScreen) return;

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const video = videoRef.current;
      const duration = video?.duration || durationRef.current || 4.0;
      if (!duration || isNaN(duration)) return;

      // Negate time offset so interactions align with video movement:
      // moving cursor left turns puppet left (t -> 4), moving right turns puppet front/right (t -> 0)
      const timeOffset = -((delta / window.innerWidth) * SENSITIVITY * duration);
      const nextTarget = Math.max(0, Math.min(duration, targetTimeRef.current + timeOffset));
      targetTimeRef.current = nextTarget;
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isLargeScreen]);

  return (
    <>
      {/* Background video FIXED across the entire scrolling storyline (only loaded & rendered on lg+ screens) */}
      {isLargeScreen && (
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}hero-video.mp4`}
          muted
          playsInline
          preload="auto"
          onSeeked={handleSeeked}
          className="hidden lg:block fixed inset-0 w-full h-full object-cover pointer-events-none z-0"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            objectFit: "cover",
            objectPosition: "75% center",
          }}
        />
      )}

      <div className="relative z-10 w-full pt-32 md:pt-64 pb-36">
        <div className="mx-auto px-6 sm:px-10 md:px-12 w-full">
          {/* Constrained editorial content column: stays on left side of viewport with max-width up to 720px on xl screens */}
          <div className="max-w-lg md:max-w-xl lg:max-w-[520px] xl:max-w-[720px]">
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

            {/* Paragraph 1: Identity Anchor (Animates on initial mount above the fold) */}
            <div className="pb-32 sm:pb-44 md:pb-52">
              <TextReveal
                as="p"
                text={
                  "I'm a **Design Engineer** working at the intersection of cognitive science, design craft, and production code. Sometimes I get [[trilemma:identity crises]] and I keep switching between the three."
                }
                delay={0.3}
                className={PARAGRAPH_CLASS}
              />
            </div>

            {/* Paragraph 2: Journey & Why Finland (Animates with blur-reveal only as user scrolls into view) */}
            <div className="min-h-[42vh] sm:min-h-[50vh] flex flex-col justify-center py-16 sm:py-24">
              <InViewTextReveal
                as="p"
                text={
                  "After completing a Computer Science degree in India, I became obsessed with understanding the human mind behind the interface — why so much software feels frustrating or draining. That curiosity [[journey:brought me to Europe]] for a double Master's in HCI and Cognitive Science between [[aalto:Aalto University]] and the [[unitn:University of Trento]] — studying mental models and user-centric design."
                }
                delay={0.05}
                className={PARAGRAPH_CLASS}
              />
            </div>

            {/* Paragraph 3: Where I've Shipped (Animates with blur-reveal only as user scrolls into view) */}
            <div className="min-h-[42vh] sm:min-h-[50vh] flex flex-col justify-center py-16 sm:py-24">
              <InViewTextReveal
                as="p"
                text={
                  "Over the past several years, I've brought that combination of human insight and frontend systems to high-impact products: spending 4+ years as a design engineer at [[optmyzr:Optmyzr]] scaling core analytics across 10,000+ accounts, researching semi-ambient sensor interfaces with 200+ users at [[dedanext:Dedanext]] in Italy, and co-founded [[groundwork:Groundwork]] in Finland to turn accessibility regulations into practical tools [[eit-jumpstarter:(awarded 2nd place at the EIT Jumpstarter Grand Final)]]."
                }
                delay={0.05}
                className={PARAGRAPH_CLASS}
              />
            </div>

            {/* Paragraph 4: Off the clock / What makes me 'me' (Animates with blur-reveal only as user scrolls into view) */}
            <div className="min-h-[42vh] sm:min-h-[50vh] flex flex-col justify-center py-16 sm:py-24">
              <InViewTextReveal
                as="p"
                text={
                  "When I'm not having an identity crisis, I design visual identities for the [[susco:Sustainability Community of Finland]], or just do random side-projects like [[super-ego:YOU (Super Ego)]] or contemplate about human relations on [[substack:substack]]."
                }
                delay={0.05}
                className={PARAGRAPH_CLASS}
              />
            </div>

            {/* Paragraph 5: Teams I care about & Craft closing (Animates with blur-reveal only as user scrolls into view) */}
            <div className="min-h-[42vh] sm:min-h-[50vh] flex flex-col justify-center py-16 sm:py-24">
              <InViewTextReveal
                as="p"
                text={
                  "I care about working with fast-paced teams, who care about the craft as well as overall experience — where designers write production code, and software respects the user's attention instead of exploiting it. In a world where anyone can generate a feature in seconds, [[craft:craft is the differentiator]]."
                }
                delay={0.05}
                className={PARAGRAPH_CLASS}
              />

              {/* Dual Pill Action Buttons */}
              <div className="pt-8 flex flex-wrap items-center gap-3 not-italic">
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

export { EmDash } from "./EmDash";
export default HeroSection;
