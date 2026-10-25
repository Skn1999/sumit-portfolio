import { asset } from "../lib";

export type LabItem = {
  code: string;
  title: string;
  tag: string;
  kind: "browser" | "img" | "text";
  url?: string;
  img?: string;
  contain?: boolean;
  tone?: "paper" | "dark";
  quote?: string;
  href: string;
  blurb: string;
};

/** Lab projects shown in the bent 3D gallery (and its list view). Newest first. */
export const LAB_ITEMS: LabItem[] = [
  { code: "L-13", title: "Intent to Palette", tag: "AI tool · Lovable", kind: "browser", url: "intent-to-palette.lovable.app", href: "https://intent-to-palette.lovable.app/", blurb: "Say what it should feel like: describe the intent, add references, get a palette." },
  { code: "L-01", title: "ActAI", tag: "AI oversight · Vercel", kind: "browser", url: "temporary-brisk-agate-zgvse9l.vercel.app", href: "https://temporary-brisk-agate-zgvse9l.vercel.app/", blurb: "A review layer for AI agents doing real business tasks." },
  { code: "L-02", title: "Joy_ gifting flow", tag: "UX Bite · Lovable", kind: "browser", url: "giving-joy-glow.lovable.app", href: "https://giving-joy-glow.lovable.app", blurb: "Two moments worth redesigning in a gifting checkout." },
  { code: "L-03", title: "YOU", tag: "Behavioural design", kind: "img", img: asset("work/you.jpg"), href: "/projects/super-ego-app", blurb: "An OS-level assistant that nudges you back to what you meant to do." },
  { code: "L-04", title: "Hello, in four scripts", tag: "Shader experiment", kind: "img", contain: true, img: asset("hero-moi-still.webp"), href: "/#top", blurb: "The handwritten greeting from this site’s hero." },
  { code: "L-05", title: "Urakkamaailma pricing", tag: "UX Bite · Lovable", kind: "browser", url: "urakka-hinturi-fi.lovable.app", href: "https://urakka-hinturi-fi.lovable.app", blurb: "Where 132,000 price records get lost — and a faster way in." },
  { code: "L-06", title: "Sketchbook", tag: "Ink on paper", kind: "img", img: asset("work/sketchbook.jpg"), href: "#", blurb: "Flowers and leaves. No undo." },
  { code: "L-07", title: "Trackz", tag: "Visual design · Behance", kind: "img", img: asset("work/trackz.jpg"), href: "https://www.behance.net/gallery/115493957/Trackz-Music-Store-UIUX-Case-Study", blurb: "A digital music store." },
  { code: "L-08", title: "Remonttihintojen tutkija", tag: "Next.js tool", kind: "browser", url: "[add link]", href: "#", blurb: "A renovation-cost explorer for Finnish homeowners." },
  { code: "L-09", title: "No undo", tag: "Substack", kind: "text", tone: "paper", quote: "“In ink sketching, there is no undo — each stroke is a commitment.”", href: "#", blurb: "Essays on human relations." },
  { code: "L-10", title: "Playing Sims toolkit", tag: "Co-design game", kind: "img", img: asset("work/mesa-sims.jpg"), href: "#", blurb: "A board game for planning shared housing spaces." },
  { code: "L-11", title: "SusCo Finland", tag: "Identity design", kind: "text", tone: "dark", quote: "Visual identities for the Sustainability Community of Finland.", href: "#", blurb: "Identity work for a climate community." },
  { code: "L-12", title: "Re-Con", tag: "Mobile UI · Behance", kind: "img", img: asset("work/recon.jpg"), href: "https://www.behance.net/gallery/115970421/Rewards-Convertor-Mobile-App-Design", blurb: "Loyalty points into one wallet, in three steps." },
];
