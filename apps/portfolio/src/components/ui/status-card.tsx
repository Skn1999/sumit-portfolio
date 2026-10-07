import * as React from "react";

import { cn } from "@/lib/utils";

type StatusCardVariant = "success" | "compromise" | "failure";

const variantClasses: Record<StatusCardVariant, string> = {
  success: "bg-emerald-500/10 text-emerald-600",
  compromise: "bg-amber-500/10 text-amber-600",
  failure: "bg-rose-500/10 text-rose-600",
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
    <div className={cn("rounded-xl border border-paper-border bg-paper-card p-4", className)} {...props}>
      {badgeLabel ? (
        <span
          className={cn(
            "mb-3 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
            variantClasses[resolvedVariant],
          )}
        >
          {badgeLabel}
        </span>
      ) : null}
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
      {children}
    </div>
  );
}

export default StatusCard;
