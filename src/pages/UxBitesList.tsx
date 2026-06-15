import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import SEO from "@/components/SEO";
import BiteCardBackground from "@/components/uxBites/BiteCardBackground";
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
            No bites yet — stay tuned.
          </p>
        ) : (
          <div className="max-w-2xl mx-auto">
            {/* Card stack */}
            <div className="relative h-[480px] md:h-[440px]">
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
                    className="group block h-full rounded-3xl border border-border bg-card shadow-xl hover:shadow-2xl transition-shadow overflow-hidden"
                  >
                    {current.cover && (
                      <div className="h-40 md:h-48 overflow-hidden bg-muted">
                        <BiteImage
                          src={`${current.slug}/${current.cover.filename}`}
                          alt={current.cover.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          priority
                        />
                      </div>
                    )}
                    <div className="p-6 md:p-8 flex flex-col gap-4">
                      <div className="flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground">
                        <span>{current.product}</span>
                        {current.date && (
                          <span>
                            {new Date(current.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                            })}
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-semibold leading-tight group-hover:text-primary transition-colors">
                        {current.title}
                      </h2>
                      {current.hook && (
                        <p className="text-base text-muted-foreground leading-relaxed line-clamp-3">
                          {current.hook}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-2 mt-auto pt-2">
                        {current.tags?.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-1 rounded-full bg-muted text-foreground/80"
                          >
                            {t}
                          </span>
                        ))}
                        <span className="ml-auto text-xs text-muted-foreground">
                          {current.findings ? `${current.findings} findings` : ""}
                          {current.findings && current.readingTime ? " · " : ""}
                          {current.readingTime ?? ""}
                        </span>
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
