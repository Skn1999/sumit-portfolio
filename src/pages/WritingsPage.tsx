import React from "react";
import { Layout } from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import SEO from "@/components/SEO";
import { UnsaidMoments, Footer } from "@/components/Contact";
import { visibleBites } from "@/lib/uxBites";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const UxBitesSection: React.FC = () => {
  return (
    <section
      id="ux-bites"
      className="py-20 md:py-32 bg-paper-bg border-t border-paper-border"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)", y: 16 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <span className="font-mono text-xs tracking-widest text-ink-muted uppercase block mb-2">
            // UX BITES &amp; AUDITS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-primary tracking-tighter">
            Short UX Audits &amp; Micro-Fixes
          </h2>
          <p className="font-body-narrative text-base md:text-lg text-ink-muted mt-3 max-w-xl">
            Bite-sized UX observations, interaction audits, and joyful redesign
            proposals for real-world products.
          </p>
        </motion.div>

        {visibleBites.length === 0 ? (
          <p className="font-mono text-sm text-ink-muted">
            No UX bites available yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleBites.map((bite, index) => (
              <motion.article
                key={bite.slug}
                initial={{ opacity: 0, filter: "blur(6px)", y: 20 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="p-6 md:p-8 rounded-2xl bg-paper-card border border-paper-border flex flex-col justify-between group hover:border-ink-primary/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px] text-ink-muted uppercase tracking-wider mb-4">
                    <span>{bite.product}</span>
                    <span>
                      {bite.date
                        ? new Date(bite.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                          })
                        : ""}
                    </span>
                  </div>

                  <Link
                    to={`/ux-bites/${bite.slug}`}
                    className="block group/link"
                  >
                    <h3 className="text-xl md:text-2xl font-bold font-display text-ink-primary group-hover/link:text-ink-primary/70 transition-colors leading-tight mb-3 flex items-start justify-between gap-3">
                      <span>{bite.title}</span>
                      <ArrowUpRight className="w-5 h-5 shrink-0 text-ink-muted group-hover/link:text-ink-primary transition-colors" />
                    </h3>
                  </Link>

                  {bite.hook && (
                    <p className="font-body-narrative text-sm text-ink-muted leading-relaxed mb-6 line-clamp-3">
                      {bite.hook}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-paper-border/60">
                  <div className="flex flex-wrap gap-1.5">
                    {bite.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-paper-bg text-ink-muted border border-paper-border text-[10px] font-mono tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {bite.findings && (
                    <span className="font-mono text-[10px] uppercase text-ink-muted">
                      {bite.findings} findings
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const WritingsPage: React.FC = () => {
  return (
    <Layout>
      <SEO
        title="Writings & UX Bites | Sumit Nayyar"
        description="Unsaid Moments publication newsletter embedding and short UX bites by Sumit Nayyar."
        path="/writings/publication"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="relative z-10 scroll-blur-content">
          {/* Section 1: Hero Section */}
          <HeroSection />

          {/* Section 2: Unsaid Moments Publication Newsletter */}

          {/* Section 3: Research & UX Bites */}
          <div id="research">
            <UxBitesSection />
          </div>
          <div id="publication">
            <UnsaidMoments />
          </div>

          {/* Section 4: Footer */}
          <Footer />
        </div>
      </motion.div>
    </Layout>
  );
};

export const PublicationPage = WritingsPage;
export const ResearchPage = WritingsPage;

export default WritingsPage;
