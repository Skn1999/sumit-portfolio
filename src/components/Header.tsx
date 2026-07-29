import { useState, useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface SubNavItem {
  to: string;
  label: string;
}

interface NavItem {
  label: string;
  mainRoute: string;
  subItems: SubNavItem[];
}

/* ── Navigation Items Hierarchy with Main Routes & Section Anchors ── */
const NAV_HIERARCHY: NavItem[] = [
  {
    label: "Sumit Nayyar",
    mainRoute: "/",
    subItems: [
      { to: "/#about", label: "About" },
      { to: "/#contact", label: "Contact" },
    ],
  },
  {
    label: "UX Design",
    mainRoute: "/projects",
    subItems: [{ to: "/projects", label: "Projects" }],
  },
  {
    label: "Visual Design",
    mainRoute: "/projects?category=visual-design",
    subItems: [{ to: "/projects?category=visual-design", label: "Projects" }],
  },
  {
    label: "Writings",
    mainRoute: "/writings/publication",
    subItems: [
      { to: "/writings/publication", label: "Publication" },
      { to: "/writings/research", label: "Research" },
    ],
  },
];

/* ── Hamburger / X icon for mobile ── */
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

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="w-full border-b border-paper-border bg-paper-bg/95 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-4 md:px-8">
        {/* Desktop Navigation: Left-aligned 4 Equal Viewport Columns */}
        <nav
          className="hidden md:grid grid-cols-4 w-full divide-x divide-paper-border/60"
          aria-label="Primary navigation"
        >
          {NAV_HIERARCHY.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-start justify-start py-3.5 px-6 text-left"
            >
              {/* Main Category Header acting as Main Route (Bold Monospace Uppercase) */}
              <Link
                to={item.mainRoute}
                className="font-mono text-xs font-bold tracking-widest text-ink-primary uppercase mb-1 hover:text-ink-primary/70 transition-colors"
              >
                {item.label}
              </Link>

              {/* Sub Nav Items Underneath acting as Sections within that route */}
              <div className="flex flex-col items-start font-mono text-[11px] tracking-wide text-ink-muted">
                {item.subItems.map((subItem, idx) => (
                  <span key={subItem.to} className="flex items-center">
                    <Link
                      to={subItem.to}
                      className="hover:text-ink-primary transition-colors hover:underline decoration-paper-border"
                    >
                      {subItem.label}
                    </Link>
                    {idx < item.subItems.length - 1 && (
                      <span className="text-paper-border text-[9px]">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Mobile Viewport Bar */}
        <div className="flex md:hidden items-center justify-between w-full h-16">
          <Link
            to="/"
            className="font-mono text-xs font-bold tracking-widest text-ink-primary uppercase"
          >
            SUMIT KNAYYAR
          </Link>

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
                    <Link
                      to={item.mainRoute}
                      onClick={() => setMenuOpen(false)}
                      className="text-xs font-mono tracking-widest text-ink-primary uppercase font-bold block mb-1 hover:underline"
                    >
                      0{i + 1} // {item.label}
                    </Link>
                    <div className="flex flex-col gap-1 pl-3 border-l-2 border-paper-border">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.to}
                          to={subItem.to}
                          onClick={() => setMenuOpen(false)}
                          className="py-2 text-base font-mono text-ink-muted hover:text-ink-primary transition-colors flex items-center justify-between"
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
