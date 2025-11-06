import React from "react";
import SwirlText from "./SwirlText";
import { useMode } from "@/contexts/ModeContext";

const HeroWithSwirls: React.FC = () => {
  const { mode } = useMode();
  const isDesigner = mode === "designer";

  // layer definitions for each mode
  const designerLayers = [
    {
      radius: 480,
      count: 5,
      size: 120,
      speed: 0.15,
      outline: true,
      opacity: 0.28,
      clockwise: false,
      color: "#0b0b0b",
      z: 1,
    },
    {
      radius: 340,
      count: 7,
      size: 100,
      speed: 0.42,
      outline: true,
      opacity: 0.56,
      clockwise: true,
      color: "#0b0b0b",
      z: 2,
    },
    {
      radius: 200,
      count: 5,
      size: 86,
      speed: 0.9,
      outline: false,
      opacity: 0.22,
      clockwise: false,
      color: "rgba(255,255,255,0.92)",
      z: 4,
    },
  ];

  const engineerLayers = [
    {
      radius: 380,
      count: 3,
      size: 80,
      speed: 0.12,
      outline: false,
      opacity: 0.18,
      clockwise: true,
      color: "rgba(255,255,255,0.85)",
      z: 1,
    },
    {
      radius: 260,
      count: 6,
      size: 62,
      speed: 0.28,
      outline: true,
      opacity: 0.28,
      clockwise: false,
      color: "rgba(255,255,255,0.75)",
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
