import React from "react";
import { Section1Identity } from "./storyline/sections/Section1Identity";
import { Section2Journey } from "./storyline/sections/Section2Journey";
import { Section3ShippedImpact } from "./storyline/sections/Section3ShippedImpact";
import { Section4OffTheClock } from "./storyline/sections/Section4OffTheClock";
import { Section5CraftManifesto } from "./storyline/sections/Section5CraftManifesto";

const HeroSection: React.FC = () => {
  return (
    <div className="relative z-10 w-full">
      {/* Section 01: Hybrid Identity (Avatar + Multiplayer Figma Cursors) */}
      <Section1Identity />

      {/* Section 02: The Journey (Double MSc HCI Boarding Pass with 3D Paper Physics) */}
      <Section2Journey />

      {/* Section 03: Shipped Impact (Jitter Blur Swirl Vortex of 8 Project Covers) */}
      <Section3ShippedImpact />

      {/* Section 04: Off the Clock (3D Isometric Folder with Tucked Pocket Occlusion) */}
      <Section4OffTheClock />

      {/* Section 05: Craft as Differentiator (Craft vs Slop Interactive Sandbox) */}
      <Section5CraftManifesto />
    </div>
  );
};

export { EmDash } from "./EmDash";
export default HeroSection;
