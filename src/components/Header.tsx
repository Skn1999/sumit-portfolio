import { Link } from "react-router-dom";
import ModeToggle from "./ModeToggle";
import { cn } from "@/lib/utils";

const NavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
  >
    {children}
  </Link>
);

const Header = () => {
  return (
    <header className="w-full border-b border-border bg-background/60 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-bold tracking-tight">
              <span className="sr-only">Home</span>
              <span className="font-designer">Sumit</span>
            </Link>

            <nav
              className="hidden md:flex items-center gap-4"
              aria-label="Primary navigation"
            >
              {/* <NavLink to="/">Home</NavLink> */}
              <NavLink to="#projects">Projects</NavLink>
              <NavLink to="#about">About</NavLink>
              <NavLink to="#contact">Contact</NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* small action area */}
            {/* <div className="hidden sm:block">
              <Link
                to="/projects"
                className="text-sm font-semibold px-3 py-1 rounded-md bg-primary text-primary-foreground hover:opacity-95 transition"
              >
                See Projects
              </Link>
            </div> */}

            {/* ModeToggle lives here for quick access */}
            <div className="ml-2">
              <ModeToggle inline />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
