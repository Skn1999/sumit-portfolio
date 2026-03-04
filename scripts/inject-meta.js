/**
 * Post-build script: generates static HTML files for each route with
 * correct <title>, <meta>, Open Graph, and Twitter Card tags baked in.
 *
 * Why: GitHub Pages is a static host. Social crawlers (LinkedIn, Twitter,
 * Facebook) and search-engine bots do NOT execute JavaScript, so they only
 * see what's in the raw HTML. react-helmet-async updates the DOM client-side,
 * which is invisible to crawlers. This script solves that by copying the
 * built index.html for every known route and injecting the right meta tags
 * directly into the HTML at build time.
 *
 * Usage:  node scripts/inject-meta.js          (auto-detects from dist/)
 *   Runs after `vite build`. Called via the `build` npm script.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import { globSync } from "glob";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ── Configuration ──────────────────────────────────────────────────────
const SITE_NAME = "Sumit Knayyar";
const SITE_URL = "https://sumit-portfolio-nine-xi.vercel.app"; // deployed URL
const DEFAULT_DESCRIPTION =
  "Full-stack Engineer & UX Designer with 4+ years of experience crafting delightful digital experiences. Masters in Human-Computer Interaction.";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

// Base path must match vite.config.ts (`base` option in production)
const BASE_PATH = "/";
const DIST = path.join(ROOT, "dist");

// ── Vite manifest (maps source files → hashed output) ─────────────────
let manifest = {};
const manifestPath = path.join(DIST, ".vite", "manifest.json");
if (fs.existsSync(manifestPath)) {
  manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  console.log(
    `📋 Loaded Vite manifest (${Object.keys(manifest).length} entries)`,
  );
} else {
  console.warn(
    "⚠️  No .vite/manifest.json found — OG images will use default.",
  );
}

/**
 * Look up the hashed output path for a source file via the Vite manifest.
 * Returns an absolute URL or null if not found.
 * @param {string} srcPath - relative to project root, e.g. "src/content/projects/super-ego-app/cover.jpg"
 */
function resolveAssetUrl(srcPath) {
  const entry = manifest[srcPath];
  if (entry?.file) {
    return `${SITE_URL}/${entry.file}`;
  }
  return null;
}

// ── Helpers ────────────────────────────────────────────────────────────

/** Read the built index.html as the template */
function getTemplate() {
  const indexPath = path.join(DIST, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.error("❌  dist/index.html not found. Run `vite build` first.");
    process.exit(1);
  }
  return fs.readFileSync(indexPath, "utf-8");
}

/** Replace meta tags in the HTML template */
function injectMeta(template, meta) {
  let html = template;

  const title = meta.title || `${SITE_NAME} — Engineer & Designer`;
  const description = meta.description || DEFAULT_DESCRIPTION;
  const ogImage = meta.ogImage || DEFAULT_OG_IMAGE;
  const url = meta.url || SITE_URL;
  const type = meta.type || "website";

  // <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

  // meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeAttr(description)}" />`,
  );

  // og:title
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
  );

  // og:description
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
  );

  // og:type
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:type" content="${escapeAttr(type)}" />`,
  );

  // og:image
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${escapeAttr(ogImage)}" />`,
  );

  // Add og:url if not present, or replace
  if (/<meta\s+property="og:url"/.test(html)) {
    html = html.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${escapeAttr(url)}" />`,
    );
  } else {
    html = html.replace(
      /<meta\s+property="og:site_name"/,
      `<meta property="og:url" content="${escapeAttr(url)}" />\n    <meta property="og:site_name"`,
    );
  }

  // twitter:title
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
  );

  // twitter:description
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
  );

  // twitter:image
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:image" content="${escapeAttr(ogImage)}" />`,
  );

  // Add canonical link
  const canonicalTag = `<link rel="canonical" href="${escapeAttr(url)}" />`;
  if (/<link\s+rel="canonical"/.test(html)) {
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      canonicalTag,
    );
  } else {
    html = html.replace("</head>", `    ${canonicalTag}\n  </head>`);
  }

  // Add article meta tags for projects
  if (meta.publishedDate) {
    const articleTags = [
      `<meta property="article:published_time" content="${escapeAttr(meta.publishedDate)}" />`,
      `<meta property="article:author" content="${escapeAttr(SITE_NAME)}" />`,
    ].join("\n    ");
    html = html.replace("</head>", `    ${articleTags}\n  </head>`);
  }

  // Add keywords if present
  if (meta.keywords && meta.keywords.length > 0) {
    const keywordsTag = `<meta name="keywords" content="${escapeAttr(meta.keywords.join(", "))}" />`;
    html = html.replace("</head>", `    ${keywordsTag}\n  </head>`);
  }

  return html;
}

function escapeAttr(str) {
  return str
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Write HTML to the correct path in dist/ */
function writePage(routePath, html) {
  // routePath like "/projects/my-slug" → dist/projects/my-slug/index.html
  const relPath = routePath === "/" ? "" : routePath.replace(/^\//, "");
  const dir = path.join(DIST, relPath);
  fs.mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, "index.html");
  // Don't overwrite the root index.html (it's our template and already correct for /)
  if (routePath === "/" && fs.existsSync(filePath)) {
    // Still inject meta into the root
    fs.writeFileSync(filePath, html, "utf-8");
    console.log(`  ✅  / → dist/index.html (updated)`);
    return;
  }
  fs.writeFileSync(filePath, html, "utf-8");
  console.log(`  ✅  ${routePath} → dist/${relPath}/index.html`);
}

// ── Collect routes ─────────────────────────────────────────────────────

function getProjectRoutes() {
  const mdxPattern = path.join(ROOT, "src/content/projects/*/index.mdx");
  const files = globSync(mdxPattern);

  return files
    .map((file) => {
      const raw = fs.readFileSync(file, "utf-8");
      const { data: fm } = matter(raw);

      // Skip drafts in production
      if (fm.draft && process.env.NODE_ENV !== "development") return null;

      const slug = fm.slug || path.basename(path.dirname(file));
      const projectDir = path.basename(path.dirname(file));
      const title = fm.title ? `${fm.title} | ${SITE_NAME}` : SITE_NAME;
      const description =
        fm.summary || fm.tagline || `${fm.title} — a project by ${SITE_NAME}`;
      const keywords = [
        ...(fm.tech || []),
        ...(fm.tags || []),
        fm.type === "engineering" ? "engineering" : "design",
      ];

      // Resolve cover image from Vite manifest
      const coverFilename = fm.cover?.filename;
      const coverSrcPath = coverFilename
        ? `src/content/projects/${projectDir}/${coverFilename}`
        : null;
      const ogImage =
        (coverSrcPath && resolveAssetUrl(coverSrcPath)) || DEFAULT_OG_IMAGE;

      return {
        route: `/projects/${slug}`,
        meta: {
          title,
          description,
          url: `${SITE_URL}/projects/${slug}`,
          type: "article",
          ogImage,
          publishedDate: fm.date || null,
          keywords,
        },
      };
    })
    .filter(Boolean);
}

function getStaticRoutes() {
  return [
    {
      route: "/",
      meta: {
        title: `${SITE_NAME} — Engineer & Designer`,
        description: DEFAULT_DESCRIPTION,
        url: SITE_URL,
        keywords: [
          "portfolio",
          "full-stack engineer",
          "UX designer",
          "HCI",
          "React",
          "product design",
        ],
      },
    },
    {
      route: "/resume",
      meta: {
        title: `Resume | ${SITE_NAME}`,
        description: `View or download ${SITE_NAME}'s resume — Full-stack Engineer & UX Designer.`,
        url: `${SITE_URL}/resume`,
      },
    },
    {
      route: "/projects",
      meta: {
        title: `Projects | ${SITE_NAME}`,
        description: `Explore engineering and design projects by ${SITE_NAME}.`,
        url: `${SITE_URL}/projects`,
      },
    },
  ];
}

// ── Main ───────────────────────────────────────────────────────────────

function main() {
  console.log("\n🔧 Injecting meta tags into static HTML…\n");

  const template = getTemplate();
  const routes = [...getStaticRoutes(), ...getProjectRoutes()];

  for (const { route, meta } of routes) {
    const html = injectMeta(template, meta);
    writePage(route, html);
  }

  // Also create a proper 404.html — a copy of the root page
  // (GitHub Pages returns 404.html content with a 404 status, crawlers
  // won't see it, but human visitors get the SPA which handles routing)
  const fallbackHtml = injectMeta(template, {
    title: `Page Not Found | ${SITE_NAME}`,
    description: "The page you are looking for does not exist.",
    url: SITE_URL,
  });
  const notFoundPath = path.join(DIST, "404.html");
  fs.writeFileSync(notFoundPath, fallbackHtml, "utf-8");
  console.log(`  ✅  404.html → dist/404.html`);

  console.log(`\n✨ Done! Generated ${routes.length + 1} pages.\n`);
}

main();
