export interface ProjectImage {
  filename: string;
  alt: string;
  caption?: string;
}

export type ProjectMeta = {
  slug: string;
  title: string;
  tagline?: string;
  date?: string;
  type?: "engineering" | "design";
  featured?: boolean;
  cover?: ProjectImage;
  gallery?: ProjectImage[];
  tech?: string[];
  metric?: string;
  links?: Record<string, string>;
  summary?: string;
  roles?: string[];
  order?: number;
  draft?: boolean;
  tags?: string[];
};

type ProjectModule = {
  default: any;
  frontmatter?: Partial<ProjectMeta>;
};

// load MDX project modules
const modules = import.meta.glob("../content/projects/*/index.mdx", {
  eager: true,
}) as Record<
  string,
  {
    default: React.ComponentType;
    frontmatter: ProjectMeta;
  }
>;

export const projects = Object.entries(modules).map(([path, mod]) => {
  const fm = mod.frontmatter;
  const filename = path.split("/").pop() || "";
  const slug = fm?.slug ?? filename.replace(/\.(mdx|md)$/, "");
  return {
    ...(fm ?? {}),
    slug,
    Component: mod.default,
  } as ProjectMeta & { Component: React.ComponentType };
});

export const visibleProjects = projects
  .filter((p) =>
    ["production", "staging"].includes(process.env.NODE_ENV) ? !p.draft : true
  )
  .sort((a, b) => {
    // featured first
    if ((b.featured ? 1 : 0) - (a.featured ? 1 : 0))
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    // then order
    const ao = a.order ?? 9999;
    const bo = b.order ?? 9999;
    if (ao !== bo) return ao - bo;
    // then date desc
    return (
      (new Date(b.date ?? 0).getTime() || 0) -
      (new Date(a.date ?? 0).getTime() || 0)
    );
  });

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByType(type: ProjectMeta["type"]) {
  return visibleProjects.filter((p) => p.type === type);
}

export const engineeringProjects = getProjectsByType("engineering");
export const designProjects = getProjectsByType("design");

export default projects;
