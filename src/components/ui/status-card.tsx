import * as React from "react";

import { cn } from "@/lib/utils";

type StatusCardVariant = "success" | "compromise" | "failure";

const variantClasses: Record<StatusCardVariant, string> = {
  success: "bg-ink-primary text-paper-card border border-ink-primary",
  compromise: "bg-paper-bg text-ink-primary border border-paper-border",
  failure: "bg-destructive/10 text-destructive border border-destructive/30",
};

const variantLabelPattern: Array<[RegExp, StatusCardVariant]> = [
  [/(success|validated)/i, "success"],
  [/(compromise|tradeoff)/i, "compromise"],
  [/(failure|bottleneck|friction)/i, "failure"],
];

const getVariant = (variant?: string, status?: string): StatusCardVariant => {
  const normalized = variant?.toLowerCase();
  if (normalized === "success" || normalized === "compromise" || normalized === "failure") {
    return normalized;
  }

  for (const [pattern, mappedVariant] of variantLabelPattern) {
    if (pattern.test(status ?? "")) {
      return mappedVariant;
    }
  }

  return "success";
};

export interface StatusCardProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  description?: React.ReactNode;
  status?: string;
  title: React.ReactNode;
  variant?: StatusCardVariant | string;
}

export function StatusCard({
  badge,
  className,
  description,
  status,
  title,
  variant,
  children,
  ...props
}: StatusCardProps) {
  const resolvedVariant = getVariant(variant, status ?? badge);
  const badgeLabel = badge ?? status;

  return (
    <div
      className={cn(
        "rounded-xl border border-paper-border bg-paper-card p-5 flex flex-col items-start",
        className,
      )}
      {...props}
    >
      {badgeLabel ? (
        <span
          className={cn(
            "mb-3 inline-flex rounded-md px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest",
            variantClasses[resolvedVariant],
          )}
        >
          {badgeLabel}
        </span>
      ) : null}
      <h3 className="font-display text-base font-bold text-ink-primary tracking-tight leading-[28px]">{title}</h3>
      {description ? (
        <p className="mt-2 font-body-narrative text-sm text-ink-muted leading-relaxed">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}

export default StatusCard;
