import { useState, useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ModeToggle from "./ModeToggle";
import { useMode } from "@/contexts/ModeContext";

/* ── Desktop nav link ── */
const NavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className="relative text-sm font-medium text-foreground/70 hover:text-foreground transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full"
  >
    {children}
  </Link>
);

/* ── Navigation items ── */
const NAV_ITEMS = [
  { to: "/#projects", label: "Projects" },
  { to: "/#about", label: "About" },
  { to: "/#contact", label: "Contact" },
];

/* ── Hamburger / X icon ── */
const MenuIcon = ({ open }: { open: boolean }) => (
  <div className="relative w-6 h-5 flex flex-col justify-between">
    <motion.span
      animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="block h-[2px] w-full bg-foreground rounded-full origin-center"
    />
    <motion.span
      animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.2 }}
      className="block h-[2px] w-full bg-foreground rounded-full"
    />
    <motion.span
      animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="block h-[2px] w-full bg-foreground rounded-full origin-center"
    />
  </div>
);

/* ── Blinds-slat animation variants ── */
const blindsContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const slatVariant = {
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
  const { mode } = useMode();
  const location = useLocation();
  const isDesigner = mode === "designer";
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40 mode-transition">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo + desktop nav */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`text-xl font-bold tracking-tight transition-all hover:scale-105 ${
                isDesigner ? "font-designer" : "font-engineer"
              }`}
            >
              <div className="w-12 md:w-16 h-auto">
                <img
                  className="w-full h-full"
                  src={`${import.meta.env.BASE_URL}images/logo.png`}
                  alt=""
                />
              </div>
            </Link>

            <nav
              className="hidden md:flex items-center gap-6"
              aria-label="Primary navigation"
            >
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.to} to={item.to}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right side: hamburger on mobile */}
          <div className="flex items-center gap-3">
            {/* Mode toggle hidden for now — defaulting to designer mode */}

            {/* Hamburger button – mobile only */}
            <button
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="md:hidden relative z-50 p-2 -mr-2 tap-highlight-transparent"
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile blinds menu ── */}
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
              className="flex flex-col px-6 pt-8 gap-1 bg-white"
              aria-label="Mobile navigation"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.to}
                  variants={slatVariant}
                  style={{ transformOrigin: "top center", perspective: 800 }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-4 text-lg font-semibold tracking-tight rounded-xl transition-colors
                      ${
                        isDesigner
                          ? "font-designer hover:bg-[hsl(var(--designer-primary)/0.08)]"
                          : "font-engineer hover:bg-primary/5"
                      }
                    `}
                  >
                    <span className="flex items-center justify-between">
                      <span>{item.label}</span>
                      <span className="text-xs font-normal text-muted-foreground uppercase tracking-widest">
                        0{i + 1}
                      </span>
                    </span>
                    {/* Slat divider line */}
                    <span
                      className={`block mt-4 h-[1px] w-full ${
                        isDesigner
                          ? "bg-[hsl(var(--designer-primary)/0.15)]"
                          : "bg-border"
                      }`}
                    />
                  </Link>
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
