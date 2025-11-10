#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import prompts from "prompts";
import chalk from "chalk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECTS_DIR = path.join(__dirname, "..", "src", "content", "projects");

async function createProjectStructure() {
  const response = await prompts([
    {
      type: "text",
      name: "slug",
      message: "Project slug (e.g., social-integration-pd):",
      validate: (value) =>
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ||
        "Please enter a valid slug (lowercase, numbers, hyphens)",
    },
    {
      type: "text",
      name: "title",
      message: "Project title:",
      validate: (value) => value.length > 0 || "Title is required",
    },
    {
      type: "select",
      name: "type",
      message: "Project type:",
      choices: [
        { title: "Engineering", value: "engineering" },
        { title: "Design", value: "design" },
      ],
    },
    {
      type: "text",
      name: "tagline",
      message: "Project tagline (optional):",
    },
    {
      type: "confirm",
      name: "featured",
      message: "Is this a featured project?",
      initial: false,
    },
  ]);

  if (!response.slug) {
    console.log(chalk.yellow("Project creation cancelled"));
    return;
  }

  const projectDir = path.join(PROJECTS_DIR, response.slug);
  const date = new Date().toISOString().split("T")[0];

  try {
    // Create project directory
    await fs.mkdir(projectDir, { recursive: true });

    // Create MDX file with frontmatter
    const mdxContent = `---
slug: "${response.slug}"
title: "${response.title}"
${response.tagline ? `tagline: "${response.tagline}"` : `tagline: ""`}
date: "${date}"
type: "${response.type}"
featured: ${response.featured}
cover:
  filename: "cover.jpg"
  alt: "${response.title} cover image"
gallery: []
tech: []
metric: ""
links: []
summary: ""
roles: []
order: 
draft: true
---

## Overview

[Add project overview here]

## Challenge

[Describe the main challenges and objectives]

## Solution

[Explain your approach and implementation]

## Outcome

[Share the results and impact]

## Learnings

[Discuss key takeaways and lessons learned]
`;

    await fs.writeFile(path.join(projectDir, "index.mdx"), mdxContent);

    //     // Create a README to help with image placement
    //     const readmeContent = `# ${response.title}

    // ## Image Guidelines

    // Place your project images in this directory:

    // - All images should be in JPG or PNG format
    // - Recommended sizes:
    //   - Cover image: 1920x1080px
    //   - Gallery images: 1600x1200px
    //   - Minimum width: 800px

    // ## Required Images

    // 1. cover.jpg - Main project cover image
    // 2. Add additional images as needed

    // ## Using Images in MDX

    // Update the frontmatter in index.mdx:

    // \`\`\`yaml
    // cover:
    //   filename: "cover.jpg"
    //   alt: "Descriptive alt text"
    // gallery:
    //   - filename: "image1.jpg"
    //     alt: "Image description"
    //     caption: "Optional caption"
    // \`\`\`
    // `;

    // await fs.writeFile(path.join(projectDir, "README.md"), readmeContent);

    console.log(chalk.green("\n✓ Project structure created successfully!\n"));
    console.log(chalk.blue("Project location:"));
    console.log(projectDir);
    console.log(chalk.blue("\nNext steps:"));
    console.log("1. Add your cover.jpg to the project directory");
    console.log("2. Update the project content in index.mdx");
    console.log("3. Add additional images as needed");
    console.log("4. Set draft: false when ready to publish\n");
  } catch (error) {
    console.error(chalk.red("Error creating project:"), error);
    process.exit(1);
  }
}

createProjectStructure().catch(console.error);
