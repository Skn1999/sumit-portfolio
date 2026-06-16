import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import SEO from "@/components/SEO";
import BiteCardBackground from "@/components/uxBites/BiteCardBackground";
import UxBitesSkin from "@/components/uxBites/UxBitesSkin";
import { visibleBites } from "@/lib/uxBites";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const UxBitesList: React.FC = () => {
  const bites = visibleBites;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const reduced = useReducedMotion();

  const total = bites.length;

  const go = useCallback(
    (delta: 1 | -1) => {
      if (total === 0) return;
      setDirection(delta);
      setIndex((i) => (i + delta + total) % total);
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const current = bites[index];

  return (
    <Layout>
      <SEO
        title="UX Bites"
        description="Short, bite-sized UX audits and joyful redesign proposals for real products."
        path="/ux-bites"
      />
      <main className="min-h-[calc(100vh-4rem)] container mx-auto px-4 md:px-6 py-12 md:py-20">
        <header className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
            A new series
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            UX Bites
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Small audits. Sharp observations. Joyful fixes.
          </p>
        </header>

        {total === 0 ? (
          <p className="text-center text-muted-foreground">
            No bites yet stay tuned.
          </p>
        ) : (
          <div className="max-w-md mx-auto">
            {/* Card stack */}
            <div className="relative h-[520px] md:h-[560px]">
              {/* Background ghost cards for stack effect */}
              {bites.length > 1 && (
                <>
                  <div
                    aria-hidden
                    className="absolute inset-x-6 top-6 bottom-0 rounded-3xl bg-card border border-border/40 shadow-sm"
                    style={{ transform: "translateY(20px) scale(0.95)", opacity: 0.5 }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-3 top-3 bottom-0 rounded-3xl bg-card border border-border/40 shadow-md"
                    style={{ transform: "translateY(10px) scale(0.975)", opacity: 0.75 }}
                  />
                </>
              )}

              <AnimatePresence mode="wait" custom={direction}>
                <motion.article
                  key={current.slug}
                  custom={direction}
                  initial={
                    reduced
                      ? { opacity: 0 }
                      : { opacity: 0, x: direction * 80, rotate: direction * 4, scale: 0.95 }
                  }
                  animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                  exit={
                    reduced
                      ? { opacity: 0 }
                      : { opacity: 0, x: -direction * 80, rotate: -direction * 4, scale: 0.95 }
                  }
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Link
                    to={`/ux-bites/${current.slug}`}
                    className="group relative block h-full rounded-3xl border border-border shadow-xl hover:shadow-2xl transition-shadow overflow-hidden"
                  >
                    <BiteCardBackground seed={current.slug} />

                    <div className="relative h-full p-8 md:p-10 flex flex-col">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                        <span>
                          {current.date
                            ? new Date(current.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                              })
                            : ""}
                        </span>
                        <span>{current.readingTime ?? ""}</span>
                      </div>

                      <div className="mt-10 md:mt-14">
                        <p className="text-xs uppercase tracking-[0.3em] text-foreground/80 mb-4">
                          {current.product}
                        </p>
                        <h2 className="text-3xl md:text-4xl font-semibold leading-[1.1] tracking-tight text-foreground group-hover:text-primary transition-colors">
                          {current.title}
                        </h2>
                      </div>

                      {current.hook && (
                        <p className="mt-6 text-sm md:text-base text-foreground/90 leading-relaxed line-clamp-3">
                          {current.hook}
                        </p>
                      )}

                      <div className="mt-auto pt-8 flex flex-wrap items-center gap-2">
                        {current.tags?.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-foreground/10 text-foreground backdrop-blur-sm"
                          >
                            {t}
                          </span>
                        ))}
                        {current.findings && (
                          <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">
                            {current.findings} findings
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.article>
              </AnimatePresence>
            </div>


            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => go(-1)}
                aria-label="Previous bite"
                disabled={total < 2}
                className={cn(
                  "h-11 w-11 rounded-full border border-border bg-background flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                )}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1.5" aria-hidden>
                {bites.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === index ? "bg-primary w-6" : "bg-border w-1.5"
                    )}
                  />
                ))}
              </div>

              <button
                onClick={() => go(1)}
                aria-label="Next bite"
                disabled={total < 2}
                className={cn(
                  "h-11 w-11 rounded-full border border-border bg-background flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                )}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-4">
              {index + 1} of {total} · use ← → keys to navigate
            </p>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default UxBitesList;
