import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import SEO from "@/components/SEO";
import { Footer } from "@/components/Contact";
import { motion } from "framer-motion";
import {
  Mail,
  Check,
  ArrowUpRight,
  Sparkles,
  Zap,
  Code2,
  Compass,
} from "lucide-react";

const PILLARS = [
  {
    icon: Zap,
    title: "0-to-1 MVP Sprints & Prototyping",
    description:
      "Rapid turnaround interactive prototypes in React, TypeScript, and modern web frameworks to de-risk product assumptions, validate user flows, and demo to investors.",
  },
  {
    icon: Compass,
    title: "UX Friction & Usability Audits",
    description:
      "In-depth heuristic teardowns of onboarding flows, complex tables, and core funnels to diagnose where users drop off and deliver high-impact micro-fixes.",
  },
  {
    icon: Code2,
    title: "Design Systems & Frontend Engineering",
    description:
      "Closing the gap between Figma and production code. Robust design tokens, accessible Tailwind/Radix components, and polished micro-interactions.",
  },
];

const ForStartupsPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = "sknayyar.sk@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Layout>
      <SEO
        title="For Startups & Founders | Collaboration & Advisory | Sumit Nayyar"
        description="Partnering with early-stage founders on 0-to-1 MVP builds, rapid UX audits, and design engineering systems."
        path="/for-startups"
      />

      <div className="relative pt-20 md:pt-32 pb-24 max-w-4xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)", y: 16 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-left mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-ink-muted uppercase mb-3">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>STARTUP COLLABORATION &amp; ADVISORY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-ink-primary tracking-tighter">
            Build Fast with Conviction.
          </h1>

          <p className="font-body-narrative text-base sm:text-xl text-ink-muted mt-4 max-w-2xl leading-relaxed">
            I partner with early-stage founders and lean teams to ship high-polish
            products, bridge design with code, and turn complex requirements into clear, intuitive software.
          </p>
        </motion.div>

        {/* Focused Collab Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="p-8 sm:p-12 rounded-3xl bg-paper-card border border-paper-border shadow-xl shadow-ink-primary/5 mb-16"
        >
          <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-paper-border">
            <div className="flex items-center gap-2.5">
              <Sparkles className="size-5 text-emerald-500" />
              <span className="font-mono text-xs uppercase tracking-wider font-semibold text-ink-primary">
                COLLABORATION OFFERINGS
              </span>
            </div>
            <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full font-semibold">
              Available for Q1 / Q2 Projects
            </span>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 my-8">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="flex flex-col">
                  <div className="flex items-center justify-center size-10 rounded-xl bg-paper-bg border border-paper-border mb-4 text-ink-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-display font-bold text-base text-ink-primary mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-body-narrative text-ink-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Direct CTA Box */}
          <div className="pt-8 border-t border-paper-border flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h4 className="font-display font-bold text-lg text-ink-primary">
                Have a product in flight?
              </h4>
              <p className="text-xs sm:text-sm text-ink-muted mt-1">
                Tell me about what you are building. Usually reply within 24 hours.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`mailto:${email}?subject=Startup%20Collaboration%20Inquiry%20-%20Sumit%20Nayyar`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink-primary text-paper-bg font-mono text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <span>Email to Collab</span>
                <ArrowUpRight className="size-3.5" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-paper-bg hover:bg-paper-card border border-paper-border text-ink-primary font-mono text-xs transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="size-3.5 text-ink-muted" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <Footer />
      </div>
    </Layout>
  );
};

export default ForStartupsPage;
