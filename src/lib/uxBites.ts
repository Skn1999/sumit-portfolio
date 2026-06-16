import type React from "react";

export interface UxBiteImage {
  filename: string;
  alt: string;
}

export interface UxBitePrototype {
  url: string;
  label?: string;
}

export interface UxBiteMeta {
  slug: string;
  title: string;
  hook?: string;
  product?: string;
  surface?: string;
  date?: string;
  readingTime?: string;
  cover?: UxBiteImage;
  tags?: string[];
  findings?: number;
  draft?: boolean;
  prototype?: UxBitePrototype;
}

const modules = import.meta.glob("../content/ux-bites/*/index.mdx", {
  eager: true,
}) as Record<
  string,
  {
    default: React.ComponentType;
    frontmatter: UxBiteMeta;
  }
>;

export const bites = Object.entries(modules).map(([path, mod]) => {
  const fm = mod.frontmatter;
  const filename = path.split("/").slice(-2, -1)[0] || "";
  const slug = fm?.slug ?? filename;
  return {
    ...(fm ?? {}),
    slug,
    Component: mod.default,
  } as UxBiteMeta & { Component: React.ComponentType };
});

export const visibleBites = bites
  .filter((b) =>
    ["production", "staging"].includes(import.meta.env.MODE) ? !b.draft : true
  )
  .sort(
    (a, b) =>
      (new Date(b.date ?? 0).getTime() || 0) -
      (new Date(a.date ?? 0).getTime() || 0)
  );

export function getBiteBySlug(slug: string) {
  return bites.find((b) => b.slug === slug);
}

export default bites;
