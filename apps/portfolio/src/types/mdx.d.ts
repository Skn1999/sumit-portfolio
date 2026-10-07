declare module "*.mdx" {
  import type { ProjectMeta } from "../lib/projects";
  import type { ComponentType } from "react";

  const MDXComponent: ComponentType;
  export const frontmatter: ProjectMeta;
  export default MDXComponent;
}
