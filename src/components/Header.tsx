import { useState, useCallback, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface SubNavItem {
  to: string;
  label: string;
  badge?: string;
}

interface NavItem {
  id: string;
  label: string;
  to: string;
  subItems?: SubNavItem[];
}

const NAV_STRUCTURE: NavItem[] = [
  {
    id: "about",
    label: "About",
    to: "/#about",
  },
  {
    id: "contact",
    label: "Contact",
    to: "/#contact",
  },
  {
    id: "ux-design",
    label: "UX Design",
    to: "/#projects",
    subItems: [
      { to: "/#projects", label: "Projects", badge: "Case Studies" },
    ],
  },
  {
    id: "visual-design",
    label: "Visual Design",
    to: "/#projects",
    subItems: [
      { to: "/#projects", label: "Projects", badge: "UI / 3D" },
    ],
  },
  {
    id: "writings",
    label: "Writings",
    to: "/ux-bites",
    subItems: [
      { to: "/ux-bites", label: "Publication", badge: "Articles" },
      { to: "/ux-bites#research", label: "Research", badge: "HCI Papers" },
    ],
  },
];

/* ── Hamburger / Close icon ── */
const MenuIcon = ({ open }: { open: boolean }) => (
  <div className="relative w-5 h-4 flex flex-col justify-between">
    <motion.span
      animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="block h-[2px] w-full bg-foreground rounded-full origin-center"
    />
    <motion.span
      animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.2 }}
      className="block h-[2px] w-full bg-foreground rounded-full"
    />
    <motion.span
      animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="block h-[2px] w-full bg-foreground rounded-full origin-center"
    />
  </div>
);

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  const handleMouseEnter = (itemId: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(itemId);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  // Close menu & dropdown on route/hash change
  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname, location.hash]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(9,10,15,0.75)] dark:bg-[rgba(9,10,15,0.75)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] transition-all duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo / Name */}
          <Link
            to="/"
            className="flex items-center gap-2 group text-foreground font-semibold tracking-tight transition-colors"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB000] shadow-[0_0_10px_#FFB000] group-hover:scale-125 transition-transform" />
            <span className="font-display text-sm md:text-base font-bold tracking-tight text-foreground group-hover:text-[#FFB000] transition-colors">
              Sumit Nayyar
            </span>
          </Link>

          {/* Desktop Navigation Hierarchy */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2"
            aria-label="Primary navigation"
          >
            {NAV_STRUCTURE.map((item) => {
              const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);
              const isOpen = activeDropdown === item.id;

              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => hasSubItems && handleMouseEnter(item.id)}
                  onMouseLeave={() => hasSubItems && handleMouseLeave()}
                >
                  <Link
                    to={item.to}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs lg:text-sm font-medium text-foreground/80 hover:text-[#FFB000] transition-colors rounded-lg hover:bg-white/5"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <span>{item.label}</span>
                    {hasSubItems && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#FFB000]" : "text-foreground/50"
                        }`}
                      />
                    )}
                  </Link>

                  {/* Desktop Sub-Items Dropdown */}
                  <AnimatePresence>
                    {hasSubItems && isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute left-0 top-full pt-2 w-48 z-50"
                      >
                        <div className="bg-[rgba(15,17,26,0.92)] backdrop-blur-2xl border border-[rgba(255,255,255,0.12)] rounded-xl shadow-2xl p-1.5">
                          {item.subItems?.map((sub) => (
                            <Link
                              key={sub.to + sub.label}
                              to={sub.to}
                              className="flex items-center justify-between px-3 py-2 text-xs font-medium text-foreground/90 hover:text-[#FFB000] hover:bg-white/5 rounded-lg transition-colors group/sub"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB000]/40 group-hover/sub:bg-[#FFB000] transition-colors" />
                                <span>{sub.label}</span>
                              </div>
                              {sub.badge && (
                                <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-foreground/50 group-hover/sub:text-[#FFB000]/80">
                                  {sub.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Controls: Theme Toggle & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <button
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="md:hidden p-2 text-foreground hover:text-[#FFB000] transition-colors rounded-lg bg-white/5 border border-white/10"
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-t border-[rgba(255,255,255,0.08)] bg-[rgba(9,10,15,0.95)] backdrop-blur-2xl overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-6 gap-2" aria-label="Mobile navigation">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 py-2 text-base font-bold text-[#FFB000]"
              >
                <span className="w-2 h-2 rounded-full bg-[#FFB000]" />
                Sumit Nayyar
              </Link>

              <div className="h-[1px] w-full bg-white/10 my-1" />

              {NAV_STRUCTURE.map((item) => (
                <div key={item.id} className="flex flex-col">
                  <Link
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="py-2.5 text-sm font-semibold text-foreground/90 hover:text-[#FFB000] transition-colors"
                  >
                    {item.label}
                  </Link>

                  {/* Mobile Sub-Items */}
                  {item.subItems && item.subItems.length > 0 && (
                    <div className="pl-4 flex flex-col gap-1 border-l-2 border-[#FFB000]/30 ml-1 my-1">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.to + sub.label}
                          to={sub.to}
                          onClick={() => setMenuOpen(false)}
                          className="py-1.5 px-2 text-xs font-medium text-foreground/70 hover:text-[#FFB000] flex items-center justify-between transition-colors"
                        >
                          <span>{sub.label}</span>
                          {sub.badge && (
                            <span className="text-[10px] font-mono text-foreground/40 uppercase">
                              {sub.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
