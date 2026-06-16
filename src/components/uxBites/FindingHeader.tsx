import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow: string;
  title: string;
  tone?: "primary" | "muted";
  as?: "h2" | "h3";
  className?: string;
}

/**
 * Renders an eyebrow + animated heading as a single component.
 * Avoids MDX whitespace parsing issues that occur when mixing block JSX
 * with inline children (like <Reveal>'s span) across blank lines.
 */
export const FindingHeader: React.FC<Props> = ({
  eyebrow,
  title,
  tone = "primary",
  as: Tag = "h2",
  className,
}) => {
  const eyebrowColor =
    tone === "muted"
      ? "text-[hsl(var(--bite-ink-soft,var(--muted-foreground)))]"
      : "text-[hsl(var(--bite-accent,var(--primary)))]";
  const headingSize =
    Tag === "h2"
      ? "text-3xl md:text-5xl font-semibold leading-tight"
      : "text-2xl md:text-3xl font-semibold leading-tight";

  return (
    <header className={cn("mb-4", className)}>
      <p className={cn("flex items-center gap-2 font-bite-display text-[11px] uppercase tracking-[0.28em] mb-3", eyebrowColor)}>
        <span className="bite-dot" aria-hidden />
        <span>{eyebrow}</span>
      </p>
      <Tag className={headingSize}>
        <Reveal>{title}</Reveal>
      </Tag>
    </header>
  );
};

export default FindingHeader;
