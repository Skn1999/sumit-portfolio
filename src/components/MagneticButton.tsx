// Create src/components/ui/magnetic-button.tsx
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Button, type ButtonProps } from "./ui/button";

interface MagneticButtonProps extends ButtonProps {
  magneticStrength?: number; // 0-1, default 0.4
  magneticRadius?: number; // pixels, default 150
}

const MagneticButton = ({
  children,
  magneticStrength = 0.4,
  magneticRadius = 150,
  ...props
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  // Motion values for smooth animation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for natural movement
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    // Only apply effect within magnetic radius
    if (distance < magneticRadius) {
      const strength = magneticStrength * (1 - distance / magneticRadius);
      x.set(deltaX * strength);
      y.set(deltaY * strength);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block p-10"
    >
      <Button ref={ref} {...props}>
        {children}
      </Button>
    </motion.div>
  );
};

export default MagneticButton;
