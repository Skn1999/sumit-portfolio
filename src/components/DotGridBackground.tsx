import React, { useEffect, useRef } from "react";

interface Dot {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const DotGridBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, isActive: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dots: Dot[] = [];
    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const GRID_SPACING = 36;
    const WARP_RADIUS = 200;
    const WARP_FORCE = 35; // Maximum repel distance
    const EASING = 0.08;   // Smooth spring back speed

    const initGrid = () => {
      width = container.clientWidth;
      height = container.clientHeight;

      // Adjust for high DPI screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      dots = [];
      const cols = Math.ceil(width / GRID_SPACING) + 1;
      const rows = Math.ceil(height / GRID_SPACING) + 1;

      // Center the grid slightly
      const offsetX = (width - (cols - 1) * GRID_SPACING) / 2;
      const offsetY = (height - (rows - 1) * GRID_SPACING) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * GRID_SPACING;
          const y = offsetY + r * GRID_SPACING;
          dots.push({
            originX: x,
            originY: y,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();
      
      // Default fallback color if custom HSL variable isn't parsed instantly
      const colorBase = primaryColor ? `hsl(${primaryColor} / ` : "rgba(124, 58, 237, ";

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        
        let targetX = dot.originX;
        let targetY = dot.originY;
        let opacity = 0.12;
        let size = 1.5;

        if (mouse.isActive) {
          const dx = mouse.x - dot.originX;
          const dy = mouse.y - dot.originY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < WARP_RADIUS) {
            // Stronger push as cursor gets closer (inverse linear mapping)
            const force = (WARP_RADIUS - distance) / WARP_RADIUS;
            
            // Normalize direction vector
            const dirX = distance > 0 ? dx / distance : 0;
            const dirY = distance > 0 ? dy / distance : 0;

            // Repel target coordinate
            targetX = dot.originX - dirX * force * WARP_FORCE;
            targetY = dot.originY - dirY * force * WARP_FORCE;

            // Highlight opacity and size on hover
            opacity = 0.12 + force * 0.4;
            size = 1.5 + force * 1.5;
          }
        }

        // Spring ease animation
        dot.x += (targetX - dot.x) * EASING;
        dot.y += (targetY - dot.y) * EASING;

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fillStyle = colorBase.startsWith("hsl") ? `${colorBase}${opacity})` : `${colorBase}${opacity})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize & bind events
    initGrid();
    animate();

    const handleResize = () => {
      initGrid();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.isActive = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleMouseEnter = () => {
      mouseRef.current.isActive = true;
    };

    const parent = container.parentElement || container;

    window.addEventListener("resize", handleResize);
    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);
    parent.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("resize", handleResize);
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
      parent.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  );
};

export default DotGridBackground;
