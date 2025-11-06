import React from "react";
import SwirlText from "./SwirlText";
import { useMode } from "@/contexts/ModeContext";

const HeroWithSwirls: React.FC = () => {
  const { mode } = useMode();
  const isDesigner = mode === "designer";

  // layer definitions for each mode
  const designerLayers = [
    {
      radius: 420,
      count: 4,
      size: 68,
      speed: 0.18,
      outline: true,
      opacity: 0.35,
      clockwise: false,
      color: "#1a1a1a",
      z: 1,
    },
    {
      radius: 300,
      count: 5,
      size: 58,
      speed: 0.32,
      outline: true,
      opacity: 0.45,
      clockwise: true,
      color: "#2a2a2a",
      z: 2,
    },
    {
      radius: 180,
      count: 3,
      size: 48,
      speed: 0.55,
      outline: false,
      opacity: 0.65,
      clockwise: false,
      color: "#0f0f0f",
      z: 4,
    },
  ];

  const engineerLayers = [
    {
      radius: 380,
      count: 3,
      size: 64,
      speed: 0.15,
      outline: true,
      opacity: 0.4,
      clockwise: true,
      color: "#3a5a9a",
      z: 1,
    },
    {
      radius: 260,
      count: 5,
      size: 52,
      speed: 0.35,
      outline: false,
      opacity: 0.55,
      clockwise: false,
      color: "#2a4a8a",
      z: 2,
    },
  ];

  const layers = isDesigner ? designerLayers : engineerLayers;

  return (
    <section
      className="hero-outer"
      aria-label="Hero"
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Render swirl layers */}
      {layers.map((l, idx) => (
        <SwirlText
          key={idx}
          text="Sumit Knayyar"
          radius={l.radius}
          count={l.count}
          size={l.size}
          outline={l.outline}
          opacity={l.opacity}
          speed={l.speed}
          clockwise={l.clockwise}
          color={l.color}
          z={l.z}
        />
      ))}

      {/* centered photo */}
      <div
        className={`hero-photo ${isDesigner ? "designer-frame" : ""}`}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 420,
          height: 420,
          borderRadius: 20,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <img
          src="/images/hero.jpg"
          alt="Profile"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* centered content below */}
      {/* <div
        style={{
          position: "absolute",
          top: "80%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 12,
        }}
      >
        <div style={{ textAlign: "center", color: "#111" }}>
          <h1 style={{ fontSize: 40, margin: 0, fontWeight: 700 }}>
            Bridging logic and creativity
          </h1>
        </div>
      </div> */}
    </section>
  );
};

export default HeroWithSwirls;
