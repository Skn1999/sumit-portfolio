import { useEffect, type ReactNode } from "react";
import Dock from "./Dock";
import "../v2.css";

type Props = { children: ReactNode; active?: string; reader?: { on: boolean; set: (v: boolean) => void } };

/** Page frame for every v2 page: token scope, dock, and the html class that fixes sticky positioning. */
export default function Shell({ children, active, reader }: Props) {
  useEffect(() => {
    const h = document.documentElement;
    h.classList.add("v2-root");
    return () => h.classList.remove("v2-root");
  }, []);
  return (
    <div className="v2" id="top">
      <a href="#main" className="v2-skip">Skip to content</a>
      <Dock active={active} reader={reader} />
      <main id="main">{children}</main>
    </div>
  );
}
