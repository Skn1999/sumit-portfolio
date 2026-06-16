import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import SEO from "@/components/SEO";
import ReadingProgress from "@/components/ReadingProgress";
import MagneticButton from "@/components/MagneticButton";
import UxBitesSkin from "@/components/uxBites/UxBitesSkin";
import PrototypeChip from "@/components/uxBites/PrototypeChip";

import { getBiteBySlug, visibleBites } from "@/lib/uxBites";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const UxBitePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const bite = getBiteBySlug(slug || "");
  const reduced = useReducedMotion();

  if (!bite) {
    return (
      <Layout>
        <main className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold mb-3">Bite not found</h1>
            <Link to="/ux-bites" className="text-primary hover:underline">
              ← Back to UX Bites
            </Link>
          </div>
        </main>
      </Layout>
    );
  }

  const idx = visibleBites.findIndex((b) => b.slug === bite.slug);
  const prev = idx > 0 ? visibleBites[idx - 1] : null;
  const next = idx >= 0 && idx < visibleBites.length - 1 ? visibleBites[idx + 1] : null;

  const Component = bite.Component;
  const issueNumber = String(idx + 1).padStart(2, "0");

  return (
    <Layout>
      <SEO
        title={bite.title}
        description={bite.hook ?? `${bite.title} a UX bite by Sumit Knayyar`}
        path={`/ux-bites/${bite.slug}`}
        type="article"
        keywords={bite.tags}
        publishedDate={bite.date}
      />
      <ReadingProgress />

      <UxBitesSkin marker={`UX BITE · No. ${issueNumber} · ${bite.product ?? ""}`}>
        {/* Sticky prototype chip — appears once user scrolls past hero */}
        {bite.prototype?.url && (
          <PrototypeChip
            variant="sticky"
            url={bite.prototype.url}
            label={bite.prototype.label}
          />
        )}

        <article className="min-h-screen">
          <div className="mx-auto w-full max-w-3xl px-5 md:px-6">
            {/* Hero */}
            <header className="pt-10 md:pt-16 pb-8 md:pb-12">
              <div className="mb-10">
                <Link
                  to="/ux-bites"
                  className="inline-flex items-center gap-2 font-bite-display text-[11px] uppercase tracking-[0.28em] bite-ink-soft hover:text-[hsl(var(--bite-accent))] transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" /> UX Bites
                </Link>
              </div>

              {/* Issue marker line */}
              <div className="flex items-center gap-3 mb-6 font-bite-display text-[11px] uppercase tracking-[0.28em] bite-ink-soft">
                <span className="bite-accent">No. {issueNumber}</span>
                <span aria-hidden className="flex-1 border-t bite-rule" />
                {bite.date && (
                  <time>
                    {new Date(bite.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  </time>
                )}
              </div>

              <p className="font-bite-display text-[11px] uppercase tracking-[0.28em] bite-ink-soft mb-4">
                {bite.product}
                {bite.surface ? ` · ${bite.surface}` : ""}
              </p>

              <motion.h1
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight mb-6"
              >
                {bite.title}
              </motion.h1>

              {bite.hook && (
                <motion.p
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="font-bite-body text-lg md:text-xl bite-ink-soft leading-relaxed"
                >
                  {bite.hook}
                </motion.p>
              )}

              {/* Inline meta + prototype chip */}
              <div className="mt-8 pt-6 border-t bite-rule flex flex-wrap items-center gap-4 font-bite-display text-[11px] uppercase tracking-[0.22em] bite-ink-soft">
                {bite.readingTime && <span>{bite.readingTime} read</span>}
                {bite.findings && (
                  <span>· {bite.findings} finding{bite.findings === 1 ? "" : "s"}</span>
                )}
                {bite.prototype?.url && (
                  <span className="ml-auto">
                    <PrototypeChip
                      variant="inline"
                      url={bite.prototype.url}
                      label={bite.prototype.label}
                    />
                  </span>
                )}
              </div>
            </header>

            {/* MDX body */}
            <div className="prose prose-lg dark:prose-invert max-w-none font-bite-body prose-headings:font-bite-display prose-headings:font-semibold prose-a:text-[hsl(var(--bite-accent))] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl pb-10 md:pb-14">
              {Component ? <Component /> : <p>{bite.hook}</p>}
            </div>

            {/* Back to all CTA */}
            <div className="pb-12 md:pb-16 flex justify-center">
              <MagneticButton asChild variant="outline" size="lg" className="rounded-full font-bite-display tracking-[0.18em] uppercase text-xs">
                <Link to="/ux-bites">
                  <ArrowLeft className="w-4 h-4 mr-2" /> All UX Bites
                </Link>
              </MagneticButton>
            </div>
          </div>

          {/* More bites */}
          {(prev || next) && (
            <nav
              aria-label="More UX bites"
              className="border-t bite-rule"
            >
              <div className="container mx-auto px-4 md:px-6 py-10 md:py-14 max-w-3xl">
                <p className="font-bite-display text-[11px] uppercase tracking-[0.28em] bite-ink-soft mb-6 text-center">
                  More UX Bites
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {prev && (
                    <Link
                      to={`/ux-bites/${prev.slug}`}
                      className="group p-5 rounded-2xl border bite-rule hover:border-[hsl(var(--bite-accent))] transition-colors"
                    >
                      <p className="font-bite-display text-[10px] uppercase tracking-[0.28em] bite-ink-soft inline-flex items-center gap-2 mb-2">
                        <ArrowLeft className="w-3 h-3" /> Previous
                      </p>
                      <h3 className="font-bite-display font-semibold group-hover:text-[hsl(var(--bite-accent))] transition-colors">
                        {prev.title}
                      </h3>
                    </Link>
                  )}
                  {next && (
                    <Link
                      to={`/ux-bites/${next.slug}`}
                      className="group p-5 rounded-2xl border bite-rule hover:border-[hsl(var(--bite-accent))] transition-colors md:text-right md:ml-auto"
                    >
                      <p className="font-bite-display text-[10px] uppercase tracking-[0.28em] bite-ink-soft inline-flex items-center gap-2 mb-2 md:justify-end">
                        Next <ArrowRight className="w-3 h-3" />
                      </p>
                      <h3 className="font-bite-display font-semibold group-hover:text-[hsl(var(--bite-accent))] transition-colors">
                        {next.title}
                      </h3>
                    </Link>
                  )}
                </div>
              </div>
            </nav>
          )}
        </article>
      </UxBitesSkin>
    </Layout>
  );
};

export default UxBitePage;
