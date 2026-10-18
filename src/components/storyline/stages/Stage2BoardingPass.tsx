import React, { useState, useRef } from "react";
import { Plane, Compass, Sparkles } from "lucide-react";

interface Stage2Props {
  isActive: boolean;
}

export const Stage2BoardingPass: React.FC<Stage2Props> = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [sheen, setSheen] = useState({ x: 50, y: 50, opacity: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -9; // Max 9 deg tilt
    const rotY = ((x - centerX) / centerX) * 9;

    setRotate({ x: rotX, y: rotY });
    setSheen({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setSheen((s) => ({ ...s, opacity: 0 }));
  };

  return (
    <div
      className="relative w-full max-w-[540px] h-[520px] flex items-center justify-center select-none"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-[500px] max-w-full rounded-2xl bg-paper-card border border-paper-border/90 shadow-2xl overflow-hidden transition-transform duration-200 ease-emil-out"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Specular Light Sheen Overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle 240px at ${sheen.x}% ${sheen.y}%, rgba(255, 255, 255, 0.25), transparent 70%)`,
            opacity: sheen.opacity,
          }}
        />

        {/* Top Header Strip */}
        <div className="px-5 py-3 bg-paper-bg/90 border-b border-paper-border/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-emerald-500/10 text-emerald-500">
              <Compass className="w-3.5 h-3.5" />
            </span>
            <span className="font-mono text-xs font-bold tracking-wider text-ink-primary uppercase">
              Nordic HCI Transit // Pass
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
            CONFIRMED
          </span>
        </div>

        {/* Main Body Grid: Flight Ticket & Perforated Stub */}
        <div className="relative grid grid-cols-[1fr_120px] bg-paper-card">
          {/* Main Flight Info */}
          <div className="p-5 pr-6">
            {/* Passenger Name & Class */}
            <div className="flex justify-between items-start mb-5">
              <div>
                <span className="font-mono text-[9px] text-ink-muted uppercase tracking-wider block">
                  Passenger
                </span>
                <span className="font-display text-base font-bold text-ink-primary tracking-tight">
                  SUMIT NAYYAR
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono text-[9px] text-ink-muted uppercase tracking-wider block">
                  Specialization
                </span>
                <span className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Double MSc HCI
                </span>
              </div>
            </div>

            {/* Flight Route Diagram: DEL -> TRN -> HEL */}
            <div className="p-3.5 rounded-xl bg-paper-bg/70 border border-paper-border/60 mb-5">
              <div className="flex items-center justify-between">
                {/* DEL */}
                <div className="text-left">
                  <span className="font-display text-2xl font-black text-ink-primary leading-none block">
                    DEL
                  </span>
                  <span className="font-mono text-[9px] text-ink-muted">New Delhi</span>
                </div>

                {/* Arrow to TRN */}
                <div className="flex flex-col items-center px-1">
                  <span className="font-mono text-[8px] text-ink-muted">CS Degree</span>
                  <div className="w-10 h-[1px] bg-paper-border relative my-1">
                    <Plane className="w-2.5 h-2.5 text-emerald-500 absolute -top-1.5 left-1/2 -translate-x-1/2 rotate-90" />
                  </div>
                </div>

                {/* TRN */}
                <div className="text-center">
                  <span className="font-display text-2xl font-black text-ink-primary leading-none block">
                    TRN
                  </span>
                  <span className="font-mono text-[9px] text-ink-muted">Trento, IT</span>
                </div>

                {/* Arrow to HEL */}
                <div className="flex flex-col items-center px-1">
                  <span className="font-mono text-[8px] text-ink-muted">Cognitive Sci</span>
                  <div className="w-10 h-[1px] bg-paper-border relative my-1">
                    <Plane className="w-2.5 h-2.5 text-emerald-500 absolute -top-1.5 left-1/2 -translate-x-1/2 rotate-90" />
                  </div>
                </div>

                {/* HEL */}
                <div className="text-right">
                  <span className="font-display text-2xl font-black text-emerald-600 dark:text-emerald-400 leading-none block">
                    HEL
                  </span>
                  <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    Helsinki, FI
                  </span>
                </div>
              </div>
            </div>

            {/* Gate, Flight, Seat details */}
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-paper-border/60 font-mono text-[10px]">
              <div>
                <span className="text-ink-muted block text-[8px] uppercase">Institutions</span>
                <span className="font-bold text-ink-primary">Aalto / UniTN</span>
              </div>
              <div>
                <span className="text-ink-muted block text-[8px] uppercase">Flight</span>
                <span className="font-bold text-ink-primary">AY-2021</span>
              </div>
              <div>
                <span className="text-ink-muted block text-[8px] uppercase">Seat</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">01A</span>
              </div>
            </div>
          </div>

          {/* Perforation Divider Line with Cutout Notches */}
          <div className="relative border-l border-dashed border-paper-border flex flex-col justify-between p-4 bg-paper-bg/40">
            {/* Top Cutout */}
            <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-paper-bg border border-paper-border/80 z-20" />
            {/* Bottom Cutout */}
            <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-paper-bg border border-paper-border/80 z-20" />

            {/* Stub Content */}
            <div className="space-y-3">
              <div>
                <span className="font-mono text-[8px] text-ink-muted block uppercase">Pass</span>
                <span className="font-display font-bold text-xs text-ink-primary">HEL STUB</span>
              </div>
              <div>
                <span className="font-mono text-[8px] text-ink-muted block uppercase">Zone</span>
                <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">NORDIC</span>
              </div>
            </div>

            {/* Barcode Graphic */}
            <div className="mt-4 pt-3 border-t border-paper-border/60">
              <div className="h-10 flex items-stretch gap-[2px] opacity-75 justify-center">
                <span className="w-[2px] bg-ink-primary" />
                <span className="w-[1px] bg-ink-primary" />
                <span className="w-[3px] bg-ink-primary" />
                <span className="w-[1px] bg-transparent" />
                <span className="w-[2px] bg-ink-primary" />
                <span className="w-[4px] bg-ink-primary" />
                <span className="w-[1px] bg-ink-primary" />
                <span className="w-[2px] bg-ink-primary" />
                <span className="w-[1px] bg-transparent" />
                <span className="w-[3px] bg-ink-primary" />
                <span className="w-[1px] bg-ink-primary" />
              </div>
              <span className="font-mono text-[7px] text-ink-muted text-center block mt-1 tracking-wider">
                HCI*EU*2021
              </span>
            </div>
          </div>
        </div>

        {/* Footer Tag */}
        <div className="px-5 py-2 bg-paper-bg/60 border-t border-paper-border/80 flex items-center justify-between font-mono text-[9px] text-ink-muted">
          <span>Curiosity-driven relocation</span>
          <span>Europe Double MSc Track</span>
        </div>
      </div>
    </div>
  );
};
