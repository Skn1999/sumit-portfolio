import React from "react";
import { Stage1HybridIdentity } from "./stages/Stage1HybridIdentity";
import { Stage2BoardingPass } from "./stages/Stage2BoardingPass";
import { Stage3JitterSwirl } from "./stages/Stage3JitterSwirl";
import { Stage4DossierFolder } from "./stages/Stage4DossierFolder";
import { Stage5CraftManifesto } from "./stages/Stage5CraftManifesto";

interface CuratorStageProps {
  activeStage: number; // 1 to 5
  spotlightCompany?: "optmyzr" | "dedanext" | "groundwork" | null;
}

export const CuratorStage: React.FC<CuratorStageProps> = ({
  activeStage,
  spotlightCompany,
}) => {
  return (
    <div className="relative w-full h-[560px] flex items-center justify-center">
      {/* Stage 1: Hybrid Identity Avatar with 3 multiplayer Figma cursors (Frameless) */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-280 ease-emil-out ${
          activeStage === 1
            ? "opacity-100 transform translate-y-0 scale-100 pointer-events-auto visible z-20"
            : "opacity-0 transform translate-y-3 scale-[0.96] pointer-events-none invisible z-10"
        }`}
      >
        <Stage1HybridIdentity isActive={activeStage === 1} />
      </div>

      {/* Stage 2: The Journey Boarding Pass (DEL -> TRN -> HEL) */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-280 ease-emil-out ${
          activeStage === 2
            ? "opacity-100 transform translate-y-0 scale-100 pointer-events-auto visible z-20"
            : "opacity-0 transform translate-y-3 scale-[0.96] pointer-events-none invisible z-10"
        }`}
      >
        <Stage2BoardingPass isActive={activeStage === 2} />
      </div>

      {/* Stage 3: Shipped Impact Jitter Blur Swirl Vortex */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-280 ease-emil-out ${
          activeStage === 3
            ? "opacity-100 transform translate-y-0 scale-100 pointer-events-auto visible z-20"
            : "opacity-0 transform translate-y-3 scale-[0.96] pointer-events-none invisible z-10"
        }`}
      >
        <Stage3JitterSwirl
          isActive={activeStage === 3}
          spotlightCompany={spotlightCompany}
        />
      </div>

      {/* Stage 4: Off the Clock 3D Dossier Folder */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-280 ease-emil-out ${
          activeStage === 4
            ? "opacity-100 transform translate-y-0 scale-100 pointer-events-auto visible z-20"
            : "opacity-0 transform translate-y-3 scale-[0.96] pointer-events-none invisible z-10"
        }`}
      >
        <Stage4DossierFolder isActive={activeStage === 4} />
      </div>

      {/* Stage 5: Craft Manifesto Comparison Sandbox */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-280 ease-emil-out ${
          activeStage === 5
            ? "opacity-100 transform translate-y-0 scale-100 pointer-events-auto visible z-20"
            : "opacity-0 transform translate-y-3 scale-[0.96] pointer-events-none invisible z-10"
        }`}
      >
        <Stage5CraftManifesto isActive={activeStage === 5} />
      </div>
    </div>
  );
};

export default CuratorStage;
