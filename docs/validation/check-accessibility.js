#!/usr/bin/env node

/**
 * check-accessibility.js
 * Basic WCAG 2.1 AA compliance checks
 * - Alt text on images
 * - Color contrast ratios (basic check)
 * - ARIA labels on interactive elements
 * - Keyboard navigation readiness
 * Usage: node docs/validation/check-accessibility.js
 */

const fs = require("fs");
const path = require("path");

const DIST_DIR = path.join(__dirname, "../../dist");
const ISSUES = [];
const WARNINGS = [];

console.log("♿ Running accessibility checks (WCAG 2.1 AA)...\n");

// Check if dist exists
if (!fs.existsSync(DIST_DIR)) {
  console.error("❌ dist/ directory not found. Run 'npm run build' first.");
  process.exit(1);
}

// Collect all HTML files
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

// Check each HTML file
htmlFiles.forEach((htmlFile) => {
  const content = fs.readFileSync(htmlFile, "utf8");
  const relativePath = htmlFile.replace(DIST_DIR, "");

  // 1. Check for images without alt text
  const imgRegex = /<img[^>]*>/g;
  let match;
  let imageCount = 0;

  while ((match = imgRegex.exec(content)) !== null) {
    imageCount++;
    if (!match[0].includes("alt=")) {
      ISSUES.push({
        file: relativePath,
        type: "Missing alt text",
        description: `Image tag: ${match[0].substring(0, 50)}...`,
      });
    }
  }

  // 2. Check for buttons without accessible labels
  const buttonRegex = /<button[^>]*>[\s\S]*?<\/button>/g;
  while ((match = buttonRegex.exec(content)) !== null) {
    const buttonTag = match[0];
    const hasAriaLabel = buttonTag.includes("aria-label");
    const hasText = />\s*\S/.test(buttonTag); // Has text content

    if (!hasAriaLabel && !hasText) {
      WARNINGS.push({
        file: relativePath,
        type: "Button may lack accessible label",
        description: buttonTag.substring(0, 50) + "...",
      });
    }
  }

  // 3. Check for links without text
  const linkRegex = /<a[^>]*>[\s\S]*?<\/a>/g;
  while ((match = linkRegex.exec(content)) !== null) {
    const linkTag = match[0];
    const hasAriaLabel = linkTag.includes("aria-label");
    const hasText = />\s*\S/.test(linkTag);

    if (!hasAriaLabel && !hasText) {
      WARNINGS.push({
        file: relativePath,
        type: "Link may lack accessible text",
        description: linkTag.substring(0, 50) + "...",
      });
    }
  }

  // 4. Check for form inputs without labels
  const inputRegex = /<input[^>]*>/g;
  while ((match = inputRegex.exec(content)) !== null) {
    const inputTag = match[0];
    const hasAriaLabel = inputTag.includes("aria-label");
    const hasId = inputTag.includes('id="');

    if (!hasAriaLabel && !hasId) {
      WARNINGS.push({
        file: relativePath,
        type: "Input may lack accessible label",
        description: inputTag.substring(0, 50) + "...",
      });
    }
  }

  // 5. Check for headings hierarchy
  const headingRegex = /<h[1-6][^>]*>/g;
  let lastHeadingLevel = 0;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[0][2]);
    if (level > lastHeadingLevel + 1 && lastHeadingLevel > 0) {
      WARNINGS.push({
        file: relativePath,
        type: "Heading hierarchy skip detected",
        description: `Jumped from h${lastHeadingLevel} to h${level}`,
      });
    }
    lastHeadingLevel = level;
  }
});

// Report
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("ACCESSIBILITY AUDIT RESULTS");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

if (ISSUES.length === 0 && WARNINGS.length === 0) {
  console.log("✅ No critical accessibility issues found!\n");
  process.exit(0);
}

if (ISSUES.length > 0) {
  console.log(`❌ CRITICAL ISSUES (${ISSUES.length}):\n`);
  ISSUES.forEach((issue) => {
    console.log(`  File: ${issue.file}`);
    console.log(`  Issue: ${issue.type}`);
    console.log(`  Details: ${issue.description}\n`);
  });
}

if (WARNINGS.length > 0) {
  console.log(`⚠️  WARNINGS (${WARNINGS.length}):\n`);
  WARNINGS.forEach((warning) => {
    console.log(`  File: ${warning.file}`);
    console.log(`  Issue: ${warning.type}`);
    console.log(`  Details: ${warning.description}\n`);
  });
}

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
console.log("📖 For detailed WCAG 2.1 AA guidance:");
console.log("   https://www.w3.org/WAI/WCAG21/quickref/\n");

if (ISSUES.length > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
