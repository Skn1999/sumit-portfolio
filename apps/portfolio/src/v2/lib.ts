import { useEffect, useState } from "react";

/** Path to a file in public/v2, respecting the app's base URL (e.g. /sumit-portfolio/). */
export const asset = (p: string) => `${import.meta.env.BASE_URL}v2/${p.replace(/^\//, "")}`;

export const reduceMotion = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Tracks the app theme (ThemeProvider toggles the `dark` class on <html>). */
export function useIsDark() {
  const get = () => typeof document !== "undefined" && document.documentElement.classList.contains("dark");
  const [dark, setDark] = useState(get);
  useEffect(() => {
    const mo = new MutationObserver(() => setDark(get()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);
  return dark;
}

/** Reader mode: the letter-style homepage. Remembered per viewer, overridable with ?mode=reader. */
export const READER_KEY = "v2-reader-mode";
export function useReaderMode(): [boolean, (v: boolean) => void] {
  const [on, setOn] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const q = new URLSearchParams(window.location.search).get("mode");
    if (q) return q === "reader";
    try { return localStorage.getItem(READER_KEY) === "1"; } catch { return false; }
  });
  const set = (v: boolean) => {
    setOn(v);
    try { localStorage.setItem(READER_KEY, v ? "1" : "0"); } catch { /* storage unavailable */ }
  };
  return [on, set];
}

export const SITE_URL = "https://skn1999.github.io/sumit-portfolio";
export const EMAIL = "sknayyar.sk@gmail.com";
/** The résumé PDF the dock, footer and case pages open in a new tab (files live in public/). */
export const RESUME_FILE = "Sumit_Nayyar_CV.pdf";
export const RESUME_URL = `${import.meta.env.BASE_URL}${RESUME_FILE}`;
export const LINKEDIN = "https://linkedin.com/in/sumitnayyar-ux";
export const GITHUB = "https://github.com/skn1999";
export const SUBSTACK_URL = "https://sumit6131.substack.com";

/** Quick actions (⌘K): the dock's key and anything else can open the palette by firing this event. */
export const QUICK_ACTIONS_EVENT = "v2:quick-actions";
export const openQuickActions = () => window.dispatchEvent(new Event(QUICK_ACTIONS_EVENT));
/** "⌘K" on Apple devices, "Ctrl K" elsewhere. */
export const shortcutLabel = () =>
  typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent) ? "⌘K" : "Ctrl K";
