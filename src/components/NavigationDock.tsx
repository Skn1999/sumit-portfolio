import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Check,
  FileText,
  Github,
  Linkedin,
  MapPin,
  ExternalLink,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface NavItem {
  label: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "Work", path: "/work" },
  { label: "Build Together?", path: "/for-startups" },
];

export const NavigationDock: React.FC = () => {
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("sknayyar.sk@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isTabActive = (itemPath: string) => {
    if (itemPath === "/") {
      return location.pathname === "/";
    }
    if (itemPath === "/work") {
      return (
        location.pathname === "/work" ||
        location.pathname.startsWith("/projects") ||
        location.pathname === "/ux-design" ||
        location.pathname === "/data-engineering"
      );
    }
    if (itemPath === "/for-startups") {
      return location.pathname === "/for-startups";
    }
    return location.pathname.startsWith(itemPath);
  };

  return (
    <>
      {/* Subtle bottom gradient vignette to prevent content clashing with the dock */}
      <div
        className="fixed inset-x-0 bottom-0 z-[39] h-28 sm:h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, hsl(var(--paper-bg)) 0%, hsl(var(--paper-bg) / 0.75) 50%, transparent 100%)",
        }}
      />

      {/* Floating Center Dock */}
      <nav
        aria-label="Floating dock navigation"
        className="fixed bottom-6 sm:bottom-8 pb-[env(safe-area-inset-bottom)] left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
      >
        <div className="relative pointer-events-auto">
          {/* Dock Pill */}
          <div className="relative z-10 flex items-center gap-1 rounded-full bg-paper-card/90 backdrop-blur-md p-1.5 sm:p-2 border border-paper-border shadow-xl shadow-ink-primary/5">
            {/* Primary Navigation Tabs */}
            <div className="relative flex items-center">
              {NAV_ITEMS.map((item) => {
                const active = isTabActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative z-10 px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm transition-colors duration-150 rounded-full select-none ${
                      active
                        ? "text-ink-primary font-semibold"
                        : "text-ink-muted font-medium hover:text-ink-primary"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="dock-active-pill"
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 32,
                        }}
                        className="absolute inset-0 rounded-full bg-paper-bg border border-paper-border/70 -z-10 shadow-2xs"
                      />
                    )}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="mx-1 sm:mx-1.5 flex items-center">
              <div className="h-5 w-px bg-paper-border" />
            </div>

            {/* Avatar Profile / "Me" Popover Card */}
            <HoverCard openDelay={90} closeDelay={150}>
              <HoverCardTrigger asChild>
                <button
                  type="button"
                  aria-label="Open contact profile"
                  className="group relative size-8 sm:size-9 shrink-0 overflow-hidden rounded-full border-2 border-paper-border hover:border-emerald-500 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-95"
                >
                  {!imageError ? (
                    <img
                      src={`${import.meta.env.BASE_URL}images/about/hero.jpg`}
                      alt="Profile"
                      width={80}
                      height={80}
                      decoding="async"
                      className="h-full w-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-paper-bg font-mono text-[11px] font-bold text-ink-primary">
                      SN
                    </div>
                  )}
                </button>
              </HoverCardTrigger>
              <HoverCardContent
                side="top"
                align="end"
                sideOffset={16}
                className="w-84 sm:w-96 p-5 text-center"
              >
                {/* Header: Avatar, Name, Title */}
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="size-18 shrink-0 overflow-hidden rounded-full border-2 border-paper-border mb-3 shadow-sm bg-paper-bg">
                    {!imageError ? (
                      <img
                        src={`${import.meta.env.BASE_URL}images/about/hero.jpg`}
                        alt="Sumit Nayyar"
                        width={160}
                        height={160}
                        decoding="async"
                        className="h-full w-full object-cover"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-mono text-base font-bold text-ink-primary">
                        SN
                      </div>
                    )}
                  </div>

                  <h2 className="text-lg font-semibold font-sans text-ink-primary leading-tight">
                    Sumit Nayyar
                  </h2>
                  <p className="text-[15px] font-sans text-ink-muted mt-0.5">
                    Design Engineer &amp; Product Designer
                  </p>

                  <p className="text-base font-sans text-ink-muted leading-relaxed mt-2.5 max-w-[280px]">
                    Bridging HCI research and enterprise B2B SaaS execution.
                  </p>

                  {/* Location Badge */}
                  <div className="flex items-center gap-1.5 mt-2.5 text-sm font-sans text-ink-muted">
                    <MapPin className="size-3.5 text-emerald-500 shrink-0" />
                    <span>Helsinki, Finland</span>
                  </div>
                </div>

                {/* Horizontal Rule */}
                <div className="mb-4 h-px bg-paper-border/60" />

                {/* Quick Action Buttons Grid */}
                <div className="grid grid-cols-3 gap-2.5 font-sans">
                  {/* Copy Email */}
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="group flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-paper-bg transition-colors cursor-pointer select-none"
                    title="Copy Email Address"
                  >
                    <div className="flex items-center justify-center size-10 rounded-xl bg-paper-bg group-hover:bg-paper-card border border-paper-border text-ink-muted group-hover:text-ink-primary transition-all active:scale-95 shadow-2xs">
                      {copied ? (
                        <Check className="size-4 text-emerald-500" />
                      ) : (
                        <Mail className="size-4" />
                      )}
                    </div>
                    <span className="text-xs font-sans font-medium text-ink-muted group-hover:text-ink-primary">
                      {copied ? "Copied!" : "Email"}
                    </span>
                  </button>

                  {/* Download Resume PDF */}
                  <a
                    href={`${import.meta.env.BASE_URL}Resume-Design-Engineer.pdf`}
                    download="Sumit-Nayyar-Resume.pdf"
                    className="group flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-paper-bg transition-colors select-none"
                    title="Download Resume PDF"
                  >
                    <div className="flex items-center justify-center size-10 rounded-xl bg-paper-bg group-hover:bg-paper-card border border-paper-border text-ink-muted group-hover:text-ink-primary transition-all active:scale-95 shadow-2xs">
                      <FileText className="size-4" />
                    </div>
                    <span className="text-xs font-sans font-medium text-ink-muted group-hover:text-ink-primary">
                      Resume
                    </span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/sumitnayyar-ux/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-paper-bg transition-colors select-none"
                    title="Visit LinkedIn Profile"
                  >
                    <div className="flex items-center justify-center size-10 rounded-xl bg-paper-bg group-hover:bg-paper-card border border-paper-border text-ink-muted group-hover:text-ink-primary transition-all active:scale-95 shadow-2xs">
                      <Linkedin className="size-4" />
                    </div>
                    <span className="text-xs font-sans font-medium text-ink-muted group-hover:text-ink-primary">
                      LinkedIn
                    </span>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/Skn1999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-paper-bg transition-colors select-none"
                    title="Visit GitHub Profile"
                  >
                    <div className="flex items-center justify-center size-10 rounded-xl bg-paper-bg group-hover:bg-paper-card border border-paper-border text-ink-muted group-hover:text-ink-primary transition-all active:scale-95 shadow-2xs">
                      <Github className="size-4" />
                    </div>
                    <span className="text-xs font-sans font-medium text-ink-muted group-hover:text-ink-primary">
                      GitHub
                    </span>
                  </a>

                  {/* Behance */}
                  <a
                    href="https://www.behance.net/sumitnayyar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-paper-bg transition-colors select-none"
                    title="Visit Behance Showcase"
                  >
                    <div className="flex items-center justify-center size-10 rounded-xl bg-paper-bg group-hover:bg-paper-card border border-paper-border text-ink-muted group-hover:text-ink-primary transition-all active:scale-95 shadow-2xs">
                      <ExternalLink className="size-4" />
                    </div>
                    <span className="text-xs font-sans font-medium text-ink-muted group-hover:text-ink-primary">
                      Behance
                    </span>
                  </a>

                  {/* Interactive Resume Page Link */}
                  <Link
                    to="/resume"
                    className="group flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-paper-bg transition-colors select-none"
                    title="Open Interactive CV Canvas"
                  >
                    <div className="flex items-center justify-center size-10 rounded-xl bg-paper-bg group-hover:bg-paper-card border border-paper-border text-ink-muted group-hover:text-ink-primary transition-all active:scale-95 shadow-2xs">
                      <span className="font-mono text-xs font-bold text-ink-primary">
                        CV
                      </span>
                    </div>
                    <span className="text-xs font-sans font-medium text-ink-muted group-hover:text-ink-primary">
                      Web CV
                    </span>
                  </Link>
                </div>

                {/* Day / Night Theme Toggle */}
                <div className="mt-4 pt-3.5 border-t border-paper-border/60 flex items-center justify-between font-sans">
                  <span className="text-xs uppercase tracking-wider font-semibold text-ink-muted">
                    Theme
                  </span>
                  <ThemeToggle />
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationDock;
