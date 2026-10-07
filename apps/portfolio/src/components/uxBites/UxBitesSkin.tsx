import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  /** Vertical tategaki marker text (right-edge) */
  marker?: string;
  className?: string;
}

/**
 * Scoped "Japanese zine" skin for the UX Bites surface.
 * - warm paper background with animated grain overlay
 * - mono typography via .ux-bites-skin scope
 * - vertical tategaki marker on the right edge (ambient)
 */
export const UxBitesSkin: React.FC<Props> = ({
  children,
  marker = "UX BITES · ISSUE 01",
  className,
}) => {
  return (
    <div className={cn("ux-bites-skin relative", className)}>
      <div className="bite-paper-grain" aria-hidden />
      <span className="bite-tategaki hidden md:block" aria-hidden>
        {marker}
      </span>
      <div className="relative z-[3]">{children}</div>
    </div>
  );
};

export default UxBitesSkin;
