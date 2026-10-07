#!/usr/bin/env node
/**
 * Lab Project Scaffolder
 *
 * Scaffolds an isolated lab experiment workspace under apps/labs/<slug>,
 * connects @portfolio/ui and @portfolio/tailwind-config, sets up standalone
 * dev harness, creates MDX case study entry, and registers the portfolio route.
 *
 * Usage:
 *   node scripts/create-lab.js <slug> [--title="Title"] [--description="Desc"] [--dry-run]
 *   npm run new-lab <slug>
 */

import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function toPascalCase(str) {
  return str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function parseArgs() {
  const args = process.argv.slice(2);
  let slug = "";
  let title = "";
  let description = "";
  let dryRun = false;

  for (const arg of args) {
    if (arg.startsWith("--title=")) {
      title = arg.replace("--title=", "").replace(/^["']|["']$/g, "");
    } else if (arg.startsWith("--description=")) {
      description = arg.replace("--description=", "").replace(/^["']|["']$/g, "");
    } else if (arg === "--dry-run") {
      dryRun = true;
    } else if (!arg.startsWith("--") && !slug) {
      slug = arg;
    }
  }

  return { slug, title, description, dryRun };
}

async function main() {
  const { slug: rawSlug, title: customTitle, description: customDesc, dryRun } = parseArgs();

  if (!rawSlug) {
    console.error(chalk.red("Error: Lab slug is required."));
    console.log(chalk.yellow("Usage: npm run new-lab <slug> -- --title=\"Lab Title\""));
    process.exit(1);
  }

  const slug = rawSlug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");
  const pascalName = toPascalCase(slug);
  const title = customTitle || `${pascalName} Interactive Experiment`;
  const description = customDesc || `An interactive creative coding and engineering experiment.`;

  const labDir = path.join(ROOT, "apps", "labs", slug);
  const portfolioSrc = path.join(ROOT, "apps", "portfolio", "src");
  const mdxDir = path.join(portfolioSrc, "content", "labs", slug);
  const pageFile = path.join(portfolioSrc, "pages", "labs", `${pascalName}Page.tsx`);
  const appTsxFile = path.join(portfolioSrc, "App.tsx");

  console.log(chalk.cyan(`\n🧪 Scaffolding Lab Experiment: ${chalk.bold(slug)}`));
  console.log(chalk.gray(`  Title: ${title}`));
  console.log(chalk.gray(`  Target Directory: ${labDir}`));
  console.log(chalk.gray(`  Mode: ${dryRun ? "DRY RUN (no changes)" : "EXECUTE"}\n`));

  if (fsSync.existsSync(labDir)) {
    console.error(chalk.red(`Error: Lab directory already exists: ${labDir}`));
    process.exit(1);
  }

  const filesToCreate = [
    // 1. apps/labs/<slug>/package.json
    {
      filePath: path.join(labDir, "package.json"),
      content: JSON.stringify(
        {
          name: `@labs/${slug}`,
          version: "0.0.0",
          private: true,
          type: "module",
          main: "./src/index.ts",
          types: "./src/index.ts",
          exports: {
            ".": "./src/index.ts",
          },
          scripts: {
            dev: "vite --port 8090",
            build: "tsc && vite build",
            preview: "vite preview --port 8090",
            test: "vitest run",
          },
          dependencies: {
            "@portfolio/tailwind-config": "*",
            "@portfolio/ui": "*",
            "framer-motion": "^12.23.24",
            "lucide-react": "^0.462.0",
            react: "^18.3.1",
            "react-dom": "^18.3.1",
          },
          devDependencies: {
            "@portfolio/tsconfig": "*",
            "@types/react": "^18.3.23",
            "@types/react-dom": "^18.3.7",
            "@vitejs/plugin-react-swc": "^3.11.0",
            typescript: "^5.8.3",
            vite: "^5.4.19",
            vitest: "^3.2.7",
          },
        },
        null,
        2
      ) + "\n",
    },
    // 2. apps/labs/<slug>/tsconfig.json
    {
      filePath: path.join(labDir, "tsconfig.json"),
      content: JSON.stringify(
        {
          extends: "@portfolio/tsconfig/react-app.json",
          compilerOptions: {
            baseUrl: ".",
            paths: {
              "@/*": ["./src/*"],
            },
          },
          include: ["src", "tests"],
        },
        null,
        2
      ) + "\n",
    },
    // 3. apps/labs/<slug>/vite.config.ts
    {
      filePath: path.join(labDir, "vite.config.ts"),
      content: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8090,
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
`,
    },
    // 4. apps/labs/<slug>/tailwind.config.ts
    {
      filePath: path.join(labDir, "tailwind.config.ts"),
      content: `import type { Config } from "tailwindcss";
import { sharedPreset } from "@portfolio/tailwind-config";

export default {
  presets: [sharedPreset],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
} satisfies Config;
`,
    },
    // 5. apps/labs/<slug>/postcss.config.js
    {
      filePath: path.join(labDir, "postcss.config.js"),
      content: `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`,
    },
    // 6. apps/labs/<slug>/index.html
    {
      filePath: path.join(labDir, "index.html"),
      content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title} — Standalone Lab</title>
  </head>
  <body class="bg-[#0B0B0A] text-[#E9E4D8]">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
    },
    // 7. apps/labs/<slug>/src/Experience.tsx
    {
      filePath: path.join(labDir, "src", "Experience.tsx"),
      content: `import React from "react";
import { Button } from "@portfolio/ui";
import { Sparkles, ArrowRight } from "lucide-react";

export const ${pascalName}Experience: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#0e0e0e] to-[#050505] text-[#ECE7DE]">
      <div className="max-w-xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-primary/10 text-primary border border-primary/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Labs / ${slug}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display">
          ${title}
        </h1>

        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          ${description}
        </p>

        <div className="pt-4 flex items-center justify-center gap-4">
          <Button variant="default" className="gap-2">
            <span>Explore Canvas</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ${pascalName}Experience;
`,
    },
    // 8. apps/labs/<slug>/src/index.ts
    {
      filePath: path.join(labDir, "src", "index.ts"),
      content: `export * from "./Experience";
export { default } from "./Experience";
`,
    },
    // 9. apps/labs/<slug>/src/App.tsx
    {
      filePath: path.join(labDir, "src", "App.tsx"),
      content: `import React from "react";
import { ${pascalName}Experience } from "./Experience";

export const App: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen">
      <header className="fixed top-4 right-4 z-50">
        <div className="px-3 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase bg-black/70 border border-white/20 text-white/80 backdrop-blur-md">
          Sandbox Mode: ${slug}
        </div>
      </header>
      <${pascalName}Experience />
    </main>
  );
};

export default App;
`,
    },
    // 10. apps/labs/<slug>/src/main.tsx
    {
      filePath: path.join(labDir, "src", "main.tsx"),
      content: `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@portfolio/tailwind-config/tokens.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
`,
    },
    // 11. apps/portfolio/src/pages/labs/<PascalName>Page.tsx
    {
      filePath: pageFile,
      content: `import React from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { ${pascalName}Experience } from "@labs/${slug}";
import { ArrowLeft } from "lucide-react";

export const ${pascalName}Page: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-background text-foreground">
      <SEO
        title="${title} — Labs | Sumit Nayyar"
        rawTitle
        description="${description}"
        path="/labs/${slug}"
      />

      <div className="fixed top-5 left-5 z-[60] pointer-events-auto">
        <Link
          to="/labs"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-widest text-foreground/80 hover:text-foreground bg-background/60 hover:bg-background/90 backdrop-blur-md border border-border transition-all shadow-lg group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Labs</span>
        </Link>
      </div>

      <${pascalName}Experience />
    </div>
  );
};

export default ${pascalName}Page;
`,
    },
    // 12. apps/portfolio/src/content/labs/<slug>/index.mdx
    {
      filePath: path.join(mdxDir, "index.mdx"),
      content: `---
slug: "${slug}"
title: "${title}"
tagline: "${description}"
date: "${new Date().toISOString().split("T")[0]}"
type: "engineering"
subCategory: "labs"
featured: false
links:
  live: "/labs/${slug}"
summary: "${description}"
roles:
  - "Creative Technologist"
order: 99
draft: true
---

## Overview

${description}

## Interactive Experience

- [**Launch Interactive Experience**](/labs/${slug})
`,
    },
  ];

  for (const item of filesToCreate) {
    console.log(chalk.green(`  + ${path.relative(ROOT, item.filePath)}`));
    if (!dryRun) {
      await fs.mkdir(path.dirname(item.filePath), { recursive: true });
      await fs.writeFile(item.filePath, item.content, "utf-8");
    }
  }

  // Update apps/portfolio/package.json dependencies if not present
  const portfolioPkgPath = path.join(ROOT, "apps", "portfolio", "package.json");
  if (fsSync.existsSync(portfolioPkgPath)) {
    const pkg = JSON.parse(await fs.readFile(portfolioPkgPath, "utf-8"));
    if (!pkg.dependencies[`@labs/${slug}`]) {
      pkg.dependencies[`@labs/${slug}`] = "*";
      console.log(chalk.yellow(`  ~ Updated apps/portfolio/package.json to depend on @labs/${slug}`));
      if (!dryRun) {
        await fs.writeFile(portfolioPkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf-8");
      }
    }
  }

  console.log(chalk.green(`\n✨ Successfully scaffolded lab: @labs/${slug}`));
  console.log(chalk.white(`Next steps:`));
  console.log(chalk.cyan(`  1. Run \`npm install\` to link workspace`));
  console.log(chalk.cyan(`  2. Run \`npm run dev --workspace=@labs/${slug}\` for standalone sandbox`));
  console.log(chalk.cyan(`  3. Mount route \`/labs/${slug}\` in apps/portfolio/src/App.tsx when ready`));
}

main().catch((err) => {
  console.error(chalk.red("Error creating lab:"), err);
  process.exit(1);
});
