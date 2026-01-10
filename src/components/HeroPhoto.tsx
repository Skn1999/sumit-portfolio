import { useMotionValue, motion, useTransform, useSpring } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { useEffect, useRef, useState } from "react";

const HeroPhoto = () => {
  const { mode } = useMode();
  const isDesigner = mode === "designer";

  // Mouse movement for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);

  // --- increased sensitivity: larger angle range ---
  // Transform mouse position into rotation (more sensitive)
  const rawRotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rawRotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);
  const rawPositionX = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const rawPositionY = useTransform(mouseY, [-0.5, 0.5], [-15, 15]);
  const shadowX = useTransform(mouseX, [-0.5, 0.5], ["15px", "-15px"]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], ["15px", "-15px"]);
  const shadowOpacity = useTransform(mouseY, [-0.5, 0, 0.5], [0.2, 0.15, 0.1]);

  // --- snappier spring for more responsive feel ---
  const rotateX = useSpring(rawRotateX, {
    damping: 20,
    stiffness: 150,
    mass: 2,
  });
  const rotateY = useSpring(rawRotateY, {
    damping: 20,
    stiffness: 150,
    mass: 2,
  });

  const positionX = useSpring(rawPositionX, {
    damping: 30,
    stiffness: 90,
    mass: 1,
  });

  const positionY = useSpring(rawPositionY, {
    damping: 30,
    stiffness: 90,
    mass: 1,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Intersection Observer for viewport detection
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
        // Reset to neutral when out of viewport
        if (!entry.isIntersecting) {
          mouseX.set(0);
          mouseY.set(0);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    // Mouse move handler with proximity detection
    const handleMouseMove = (e: MouseEvent) => {
      if (!element || !isInViewport) return;

      const rect = element.getBoundingClientRect();

      // Calculate distance from mouse to image center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // Proximity radius (pixels) - only react if mouse is within this distance
      const proximityRadius = 600;

      if (distance < proximityRadius) {
        // Calculate relative mouse position (-0.5 to 0.5)
        const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
        const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

        mouseX.set(relativeX);
        mouseY.set(relativeY);
      } else {
        // Reset to neutral position when mouse is far away
        mouseX.set(0);
        mouseY.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, [mouseX, mouseY, isInViewport]);

  return (
    <motion.div
      ref={ref}
      className={`hero-photo ${isDesigner ? "designer-frame" : ""}`}
      style={{
        position: "relative",
        rotateX,
        rotateY,
        perspective: 1000,
        willChange: "transform",
      }}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        duration: 0.6,
        bounce: 0.35,
      }}
    >
      <motion.div
        className="relative w-full aspect-[4/5] max-w-[480px] mx-auto rounded-[20px] overflow-hidden shadow-2xl"
        style={{
          transformStyle: "preserve-3d",
          x: positionX,
          y: positionY,
        }}
      >
        <motion.img
          src="/images/hero-without-bg.webp"
          alt="Profile"
          className="w-full h-full object-cover"
          style={{
            scale: 1.05,
            willChange: "transform",
          }}
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroPhoto;
