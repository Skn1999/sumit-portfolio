#!/usr/bin/env node

/**
 * check-links.js
 * Audits broken links, 404s, and file paths in the built portfolio
 * Run after: npm run build && npm run preview
 * Usage: node docs/validation/check-links.js
 */

const fs = require("fs");
const path = require("path");

const DIST_DIR = path.join(__dirname, "../../dist");
const ISSUES = [];
const WARNINGS = [];

// Check if dist exists
if (!fs.existsSync(DIST_DIR)) {
  console.error("❌ dist/ directory not found. Run 'npm run build' first.");
  process.exit(1);
}

console.log("🔍 Scanning for broken links in dist/...\n");

// HTML file paths to check
const htmlFiles = [];

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && file !== "node_modules") {
      walkDir(filePath);
    } else if (file.endsWith(".html")) {
      htmlFiles.push(filePath);
    }
  });
}

walkDir(DIST_DIR);

// Extract links from HTML
htmlFiles.forEach((htmlFile) => {
  const content = fs.readFileSync(htmlFile, "utf8");
  const linkRegex = /href=["']([^"']+)["']|src=["']([^"']+)["']/g;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const link = match[1] || match[2];

    // Skip external URLs
    if (link.startsWith("http://") || link.startsWith("https://")) {
      return;
    }

    // Skip hash fragments and anchors
    if (link.startsWith("#") || link === "/") {
      return;
    }

    // Build the file path
    const filePath = path.join(DIST_DIR, link.replace(/^\//, ""));
    const normalizedPath = path.normalize(filePath);

    // Check if file exists
    if (!fs.existsSync(normalizedPath)) {
      ISSUES.push({
        file: htmlFile.replace(DIST_DIR, ""),
        link,
        type: "Missing file",
      });
    }
  }
});

// Check specific common issues
console.log("📋 Checking common portfolio links...\n");

const criticalLinks = [
  "/index.html",
  "/404.html",
  "/portfolio/file.pdf",
  "/robots.txt",
];

criticalLinks.forEach((link) => {
  const filePath = path.join(DIST_DIR, link.replace(/^\//, ""));
  if (!fs.existsSync(filePath)) {
    if (link === "/portfolio/file.pdf") {
      WARNINGS.push({
        link,
        type: "Portfolio PDF not found (expected if intentionally removed)",
      });
    } else {
      ISSUES.push({
        link,
        type: "Critical file missing",
      });
    }
  }
});

// Report
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("LINK AUDIT RESULTS");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

if (ISSUES.length === 0 && WARNINGS.length === 0) {
  console.log("✅ All links are valid!\n");
  process.exit(0);
}

if (ISSUES.length > 0) {
  console.log(`❌ Found ${ISSUES.length} BROKEN LINK(S):\n`);
  ISSUES.forEach((issue) => {
    console.log(`  File: ${issue.file}`);
    console.log(`  Link: ${issue.link}`);
    console.log(`  Issue: ${issue.type}\n`);
  });
}

if (WARNINGS.length > 0) {
  console.log(`⚠️  ${WARNINGS.length} WARNING(S):\n`);
  WARNINGS.forEach((warning) => {
    console.log(`  Link: ${warning.link}`);
    console.log(`  Note: ${warning.type}\n`);
  });
}

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

if (ISSUES.length > 0) {
  console.log("❌ VALIDATION FAILED: Fix broken links before deploying.\n");
  process.exit(1);
} else {
  console.log("✅ VALIDATION PASSED: All critical links are working.\n");
  process.exit(0);
}
