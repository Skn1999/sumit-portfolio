import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const AcademicCohorts: React.FC = () => {
  const cohorts = [
    {
      title: "EIT Digital Venture Lab Project",
      focus: "Scalable service prototyping, pan-European stakeholder alignment, and interface flow mapping for emerging digital ecosystems.",
      deliverable: "Interactive high-fidelity prototype and systemic venture architecture roadmap",
      link: null,
    },
    {
      title: "Selected Master's Curricular Systems Design",
      focus: "Applying advanced user-centered research methodologies, semantic layouts, and data visualizations to complex interactive domains.",
      deliverable: "Complete heuristic analysis documentation and user testing matrices",
      link: null,
    },
    {
      title: "UX Bites & Micro-Interactions Index",
      focus: "Rapid design exploration sandboxes validating transition curves, accessible typography tokens, and responsive frontend component behavior.",
      deliverable: "Production-ready asset sandboxes and motion choreography sketches",
      link: "/ux-bites",
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-background border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 lg:px-0">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span className="font-label text-xs tracking-widest text-slate-500 uppercase font-semibold">// ACADEMIC PORTFOLIO</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-foreground mt-2 tracking-tighter">
            Academic Case Cohorts &amp; UX Bites
          </h2>
        </div>

        {/* Rows Container */}
        <div className="border-t border-border/60">
          {cohorts.map((cohort, index) => (
            <div
              key={index}
              className="group border-b border-border/60 py-8 md:py-10 transition-colors duration-300 hover:bg-[hsl(var(--card))]/40 px-4 md:px-6 -mx-4 md:-mx-6 rounded-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                {/* Column 1: Title */}
                <div className="lg:col-span-4 flex flex-col gap-2">
                  <span className="font-label text-[10px] tracking-widest text-[hsl(var(--primary))] uppercase font-bold">
                    COHORT {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold font-display text-foreground group-hover:text-[hsl(var(--primary))] transition-colors duration-300 leading-tight">
                    {cohort.title}
                  </h3>
                </div>

                {/* Column 2: Context / Focus */}
                <div className="lg:col-span-5">
                  <p className="font-body-narrative text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                    {cohort.focus}
                  </p>
                </div>

                {/* Column 3: Deliverable */}
                <div className="lg:col-span-3 flex justify-start lg:justify-end">
                  {cohort.link ? (
                    <Link
                      to={cohort.link}
                      className="inline-flex items-center gap-2 font-label font-bold text-xs text-[hsl(var(--primary))] uppercase tracking-wider group/link hover:opacity-85 transition-opacity"
                    >
                      <span className="border-b border-[hsl(var(--primary))]/30 group-hover:border-[hsl(var(--primary))] pb-0.5">
                        {cohort.deliverable}
                      </span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  ) : (
                    <div className="font-engineer text-[10px] md:text-xs text-slate-600 dark:text-slate-400 border border-border/40 bg-[hsl(var(--card))] px-3 py-1.5 rounded-lg shadow-sm">
                      {cohort.deliverable}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ProfessionalCredentials: React.FC = () => {
  const credentials = [
    {
      scope: "Upbeat Summer School",
      authorizer: "EIT Digital Summer School",
      pillar: "European Tech Venture & Digital Ecosystems",
    },
    {
      scope: "DESIGN RULES: Principles + Practices for Great UI Design",
      authorizer: "Udemy",
      pillar: "Advanced Interface Systems & UI Visual Hierarchy",
    },
    {
      scope: "Front-End Web Development with React",
      authorizer: "Coursera",
      pillar: "Reusable Component Engineering & State Architecture",
    },
    {
      scope: "Foundations of User Experience (UX) Design",
      authorizer: "Coursera",
      pillar: "Interaction Frameworks & User-Centered Research",
    },
    {
      scope: "Start the UX Design Process: Empathize, Define, and Ideate",
      authorizer: "Coursera",
      pillar: "Structural Ideation & User Workflow Mapping",
    },
    {
      scope: "Visual Elements of User Interface Design",
      authorizer: "Coursera",
      pillar: "Core Typography, Color Layouts, & Interface Primitives",
    },
    {
      scope: "Introduction to Git and GitHub",
      authorizer: "Coursera",
      pillar: "Version Control, Distributed Code Management, & Workflows",
    },
    {
      scope: "Using Python to Interact with the Operating System",
      authorizer: "Coursera",
      pillar: "Scripting Systems, File Orchestration, & Process Automation",
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-background border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 lg:px-0">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span className="font-label text-xs tracking-widest text-slate-500 uppercase font-semibold">// CREDENTIAL REGISTRY</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-foreground mt-2 tracking-tighter">
            Verified Certifications
          </h2>
        </div>

        {/* High-density grid container */}
        <div className="border border-border/40 rounded-xl overflow-hidden bg-[hsl(var(--card))]/30 backdrop-blur-sm shadow-sm">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-12 gap-4 border-b border-border/40 bg-[hsl(var(--card))] px-6 py-4">
            <div className="col-span-5 font-label text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Credential Scope / Certification
            </div>
            <div className="col-span-3 font-label text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Authorizing Body
            </div>
            <div className="col-span-4 font-label text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Technical Core Focus Pillar
            </div>
          </div>

          {/* Body Rows */}
          <div className="divide-y divide-border/40">
            {credentials.map((cred, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 items-center hover:bg-[hsl(var(--card))]/60 transition-colors"
              >
                {/* Column 1: Scope */}
                <div className="col-span-12 md:col-span-5 flex flex-col gap-1">
                  <span className="md:hidden font-label text-[9px] uppercase tracking-wider text-slate-400">
                    Credential
                  </span>
                  <span className="font-display font-semibold text-sm md:text-base text-foreground leading-snug">
                    {cred.scope}
                  </span>
                </div>

                {/* Column 2: Authorizer */}
                <div className="col-span-12 md:col-span-3 flex flex-col gap-0.5">
                  <span className="md:hidden font-label text-[9px] uppercase tracking-wider text-slate-400">
                    Authority
                  </span>
                  <span className="font-body-narrative text-sm text-slate-500 dark:text-slate-400">
                    {cred.authorizer}
                  </span>
                </div>

                {/* Column 3: Pillar */}
                <div className="col-span-12 md:col-span-4 flex flex-col gap-0.5">
                  <span className="md:hidden font-label text-[9px] uppercase tracking-wider text-slate-400">
                    Core Focus
                  </span>
                  <span className="font-engineer text-xs text-[hsl(var(--primary))] font-semibold">
                    {cred.pillar}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const LogisticsCleardown: React.FC = () => {
  return (
    <div className="py-16 bg-[hsl(var(--card))] border-t border-border/40">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="flex flex-col gap-4 border-b md:border-b-0 md:border-r border-border/40 pb-8 md:pb-0 md:pr-16">
            <span className="font-label text-xs tracking-widest text-slate-500 uppercase">CURRENT DEPLOYMENT STATUS</span>
            <p className="font-body-narrative text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Concluding Master's Thesis track at Aalto University. Ready for permanent on-site engineering team deployment in Helsinki.
            </p>
          </div>
          <div className="flex flex-col gap-4 pt-8 md:pt-0">
            <span className="font-label text-xs tracking-widest text-[hsl(var(--primary))] uppercase">WORK RIGHTS & LOGISTICS</span>
            <p className="font-body-narrative text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Possess immediate, valid Finnish work rights with post-study visa residency extension processing. Zero initial corporate visa sponsorship parameters required for onboarding loops.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
