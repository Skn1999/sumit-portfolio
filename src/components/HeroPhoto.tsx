import { useMotionValue, motion, useTransform, useSpring } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { useEffect, useRef } from "react";

const HeroPhoto = () => {
  const { mode } = useMode();
  const isDesigner = mode === "designer";

  // Mouse movement for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  // --- increased sensitivity: larger angle range ---
  // Transform mouse position into rotation (more sensitive)
  const rawRotateX = useTransform(mouseY, [-0.5, 0.5], ["14deg", "-14deg"]);
  const rawRotateY = useTransform(mouseX, [-0.5, 0.5], ["-16deg", "16deg"]);

  // --- snappier spring for more responsive feel ---
  const rotateX = useSpring(rawRotateX, {
    damping: 18,
    stiffness: 300,
    mass: 1,
  });
  const rotateY = useSpring(rawRotateY, {
    damping: 18,
    stiffness: 300,
    mass: 1,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();

      // Calculate relative mouse position (-0.5 to 0.5)
      const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

      mouseX.set(relativeX);
      mouseY.set(relativeY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      className={`hero-photo ${isDesigner ? "designer-frame" : ""}`}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        x: "-50%",
        y: "-50%",
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
      <div
        className="relative w-[420px] h-[420px] rounded-[20px] overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <motion.img
          src="/hero-photo.jpg"
          alt="Profile"
          className="w-full h-full object-cover"
          style={{
            scale: 1.08,
            willChange: "transform",
          }}
          draggable={false}
        />
      </div>
    </motion.div>
  );
};

export default HeroPhoto;
