import { Link, useLocation } from "react-router-dom";
import ModeToggle from "./ModeToggle";
import { useMode } from "@/contexts/ModeContext";

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

const Header = () => {
  const { mode } = useMode();
  const location = useLocation();
  const isDesigner = mode === "designer";
  const isHomePage = location.pathname === "/";

  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40 mode-transition">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
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
              <NavLink to="#projects">Projects</NavLink>
              <NavLink to="#about">About</NavLink>
              <NavLink to="#contact">Contact</NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {isHomePage && <ModeToggle inline />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
