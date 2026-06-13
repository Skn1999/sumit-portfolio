import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import SEO from "@/components/SEO";
import ReadingProgress from "@/components/ReadingProgress";
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

  return (
    <Layout>
      <SEO
        title={bite.title}
        description={bite.hook ?? `${bite.title} — a UX bite by Sumit Knayyar`}
        path={`/ux-bites/${bite.slug}`}
        type="article"
        keywords={bite.tags}
        publishedDate={bite.date}
      />
      <ReadingProgress />

      <article className="min-h-screen">
        {/* Compact hero */}
        <header className="container mx-auto px-4 md:px-6 pt-12 md:pt-20 pb-8 md:pb-12">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/ux-bites"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-3 h-3" /> UX Bites
            </Link>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              {bite.product}
              {bite.surface ? ` · ${bite.surface}` : ""}
            </p>
            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6"
            >
              {bite.title}
            </motion.h1>
            {bite.hook && (
              <motion.p
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
              >
                {bite.hook}
              </motion.p>
            )}
            <div className="flex items-center gap-4 mt-6 text-xs text-muted-foreground">
              {bite.date && (
                <time>
                  {new Date(bite.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </time>
              )}
              {bite.readingTime && <span>· {bite.readingTime} read</span>}
            </div>
          </div>
        </header>

        {/* MDX body */}
        <div className="container mx-auto px-4 md:px-6 pb-16 md:pb-24">
          <div className="prose prose-lg dark:prose-invert max-w-3xl mx-auto prose-headings:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
            {Component ? <Component /> : <p>{bite.hook}</p>}
          </div>
        </div>

        {/* More bites */}
        {(prev || next) && (
          <nav
            aria-label="More UX bites"
            className="border-t border-border/40 bg-muted/20"
          >
            <div className="container mx-auto px-4 md:px-6 py-10 md:py-14 max-w-3xl">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6 text-center">
                More UX Bites
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prev && (
                  <Link
                    to={`/ux-bites/${prev.slug}`}
                    className="group p-5 rounded-2xl border border-border bg-card hover:border-primary transition-colors"
                  >
                    <p className="text-xs text-muted-foreground inline-flex items-center gap-2 mb-2">
                      <ArrowLeft className="w-3 h-3" /> Previous
                    </p>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {prev.title}
                    </h3>
                  </Link>
                )}
                {next && (
                  <Link
                    to={`/ux-bites/${next.slug}`}
                    className="group p-5 rounded-2xl border border-border bg-card hover:border-primary transition-colors md:text-right md:ml-auto"
                  >
                    <p className="text-xs text-muted-foreground inline-flex items-center gap-2 mb-2 md:justify-end">
                      Next <ArrowRight className="w-3 h-3" />
                    </p>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {next.title}
                    </h3>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        )}
      </article>
    </Layout>
  );
};

export default UxBitePage;
