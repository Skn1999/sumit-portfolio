import { useState, useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface SubNavItem {
  to: string;
  label: string;
}

interface NavItem {
  label: string;
  subItems: SubNavItem[];
}

/* ── Navigation Items Hierarchy (from IA Vision) ── */
const NAV_HIERARCHY: NavItem[] = [
  {
    label: "Sumit Nayyar",
    subItems: [
      { to: "/#about", label: "About" },
      { to: "/#contact", label: "Contact" },
    ],
  },
  {
    label: "UX Design",
    subItems: [{ to: "/projects", label: "Projects" }],
  },
  {
    label: "Visual Design",
    subItems: [{ to: "/projects?category=visual-design", label: "Projects" }],
  },
  {
    label: "Writings",
    subItems: [
      { to: "/writings/publication", label: "Publication" },
      { to: "/writings/research", label: "Research" },
    ],
  },
];

/* ── Hamburger / X icon ── */
const MenuIcon = ({ open }: { open: boolean }) => (
  <div className="relative w-6 h-5 flex flex-col justify-between">
    <motion.span
      animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="block h-[2px] w-full bg-ink-primary rounded-full origin-center"
    />
    <motion.span
      animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.2 }}
      className="block h-[2px] w-full bg-ink-primary rounded-full"
    />
    <motion.span
      animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="block h-[2px] w-full bg-ink-primary rounded-full origin-center"
    />
  </div>
);

const blindsContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const slatVariant: Variants = {
  hidden: {
    rotateX: -90,
    opacity: 0,
    y: -20,
    scaleY: 0.6,
  },
  show: {
    rotateX: 0,
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      mass: 0.8,
    },
  },
  exit: {
    rotateX: 90,
    opacity: 0,
    y: -12,
    scaleY: 0.6,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="w-full border-b border-paper-border bg-paper-bg/90 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Navigation Spanning Full Width Equally (4 equal columns) */}
          <nav
            className="hidden md:grid grid-cols-4 w-full h-full items-center text-center divide-x divide-paper-border/60"
            aria-label="Primary navigation"
          >
            {NAV_HIERARCHY.map((item) => (
              <div
                key={item.label}
                className="relative h-full flex items-center justify-center"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === item.label ? null : item.label
                    )
                  }
                  className="w-full h-full flex items-center justify-center gap-1.5 font-mono text-xs tracking-widest font-semibold text-ink-muted hover:text-ink-primary transition-colors uppercase px-4"
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      activeDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 rounded-xl border border-paper-border bg-paper-card shadow-lg p-2 z-50 text-left"
                    >
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.to}
                          to={subItem.to}
                          onClick={() => setActiveDropdown(null)}
                          className="block px-3 py-2 rounded-lg text-xs font-mono tracking-wide text-ink-primary hover:bg-paper-bg transition-colors"
                        >
                          → {subItem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Mobile Viewport Bar */}
          <div className="flex md:hidden items-center justify-between w-full h-16">
            <span className="font-mono text-xs font-semibold tracking-widest text-ink-primary uppercase">
              NAVIGATION
            </span>

            <button
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="relative z-50 p-2 -mr-2 tap-highlight-transparent"
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile blinds menu with collapsible categories ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-16 z-40 md:hidden shadow-xl"
          >
            <motion.nav
              variants={blindsContainer}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col px-6 pt-6 pb-12 gap-6 bg-paper-bg h-[calc(100vh-4rem)] overflow-y-auto"
              aria-label="Mobile navigation"
            >
              {NAV_HIERARCHY.map((item, i) => (
                <motion.div key={item.label} variants={slatVariant}>
                  <div className="mb-2">
                    <span className="text-xs font-mono tracking-widest text-ink-muted uppercase block mb-1">
                      0{i + 1} // {item.label}
                    </span>
                    <div className="flex flex-col gap-1 pl-3 border-l-2 border-paper-border">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.to}
                          to={subItem.to}
                          onClick={() => setMenuOpen(false)}
                          className="py-2 text-base font-display font-semibold text-ink-primary hover:text-primary transition-colors flex items-center justify-between"
                        >
                          <span>{subItem.label}</span>
                          <span className="text-xs font-mono text-ink-muted">
                            →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
