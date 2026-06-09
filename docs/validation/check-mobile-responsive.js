#!/usr/bin/env node

/**
 * check-mobile-responsive.js
 * Validates responsive breakpoints and mobile usability
 * - Checks for viewport meta tag
 * - Validates CSS media queries
 * - Tests that key content is accessible on mobile viewports
 * Usage: node docs/validation/check-mobile-responsive.js
 */

const fs = require("fs");
const path = require("path");

const DIST_DIR = path.join(__dirname, "../../dist");
const ISSUES = [];
const WARNINGS = [];

console.log("📱 Running mobile responsiveness checks...\n");

// Check if dist exists
if (!fs.existsSync(DIST_DIR)) {
  console.error("❌ dist/ directory not found. Run 'npm run build' first.");
  process.exit(1);
}

// Check index.html for viewport meta tag
const indexPath = path.join(DIST_DIR, "index.html");
if (!fs.existsSync(indexPath)) {
  console.error("❌ index.html not found in dist/");
  process.exit(1);
}

const htmlContent = fs.readFileSync(indexPath, "utf8");

// 1. Check for viewport meta tag
console.log("🔍 Checking viewport configuration...\n");
if (htmlContent.includes('name="viewport"')) {
  console.log("✅ Viewport meta tag found");
  if (htmlContent.includes("width=device-width")) {
    console.log("✅ Width set to device-width");
  } else {
    ISSUES.push({
      check: "Viewport width",
      issue: "Missing 'width=device-width'",
    });
  }

  if (htmlContent.includes("initial-scale=1")) {
    console.log("✅ Initial scale set to 1");
  } else {
    WARNINGS.push({
      check: "Viewport scale",
      issue: "Missing 'initial-scale=1'",
    });
  }
} else {
  ISSUES.push({
    check: "Viewport meta tag",
    issue: "Missing <meta name='viewport'>",
  });
}

// 2. Check CSS for media queries
console.log("\n🔍 Checking CSS media queries...\n");

// Look for style tags and CSS files
const cssFileRegex = /<link[^>]*href="([^"]*\.css)"[^>]*>/g;
let cssFileMatch;
let cssFileCount = 0;
let mediaQueryCount = 0;

while ((cssFileMatch = cssFileRegex.exec(htmlContent)) !== null) {
  cssFileCount++;
  const cssPath = cssFileMatch[1];
  const fullPath = path.join(DIST_DIR, cssPath.replace(/^\/?/, ""));

  if (fs.existsSync(fullPath)) {
    const cssContent = fs.readFileSync(fullPath, "utf8");
    const mediaQueryMatches = cssContent.match(/@media/g);
    if (mediaQueryMatches) {
      mediaQueryCount += mediaQueryMatches.length;
    }
  }
}

console.log(`✅ Found ${cssFileCount} CSS file(s)`);
console.log(`✅ Found ${mediaQueryCount} media query(ies)`);

if (mediaQueryCount === 0) {
  WARNINGS.push({
    check: "Media queries",
    issue: "No CSS media queries found (may not be responsive)",
  });
}

// 3. Check for Tailwind breakpoint classes (common in React projects)
console.log("\n🔍 Checking for responsive classes...\n");

const tailwindBreakpointRegex = /(sm:|md:|lg:|xl:|2xl:)/g;
const tailwindMatches = htmlContent.match(tailwindBreakpointRegex);

if (tailwindMatches && tailwindMatches.length > 0) {
  console.log(`✅ Found ${tailwindMatches.length} Tailwind responsive classes`);
} else {
  WARNINGS.push({
    check: "Responsive classes",
    issue: "No Tailwind breakpoint classes found",
  });
}

// 4. Check for touch-friendly sizing (minimum tap target is 44x44px = ~11px in CSS)
console.log("\n🔍 Checking button/link sizing...\n");

// Extract button and link styles
const buttonRegex = /<button[^>]*class="([^"]*)"[^>]*>/g;
let buttonMatch;
let smallButtonCount = 0;

// This is a heuristic: look for classes with explicit pixel sizes or padding
const smallSizePattern = /(p-[01]|p-2|h-\d|h-\[1[0-5]\]|w-\d|w-\[1[0-5]\])/;

while ((buttonMatch = buttonRegex.exec(htmlContent)) !== null) {
  const classes = buttonMatch[1];
  if (smallSizePattern.test(classes)) {
    smallButtonCount++;
  }
}

if (smallButtonCount === 0) {
  console.log("✅ Button sizing appears adequate (no tiny buttons detected)");
} else {
  WARNINGS.push({
    check: "Touch targets",
    issue: `${smallButtonCount} potential tiny buttons/links (should be ≥44px)`,
  });
}

// Report
console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("MOBILE RESPONSIVENESS AUDIT");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

if (ISSUES.length === 0 && WARNINGS.length === 0) {
  console.log("✅ Mobile responsiveness looks good!\n");
  process.exit(0);
}

if (ISSUES.length > 0) {
  console.log(`❌ CRITICAL ISSUES (${ISSUES.length}):\n`);
  ISSUES.forEach((issue) => {
    console.log(`  Check: ${issue.check}`);
    console.log(`  Issue: ${issue.issue}\n`);
  });
}

if (WARNINGS.length > 0) {
  console.log(`⚠️  WARNINGS (${WARNINGS.length}):\n`);
  WARNINGS.forEach((warning) => {
    console.log(`  Check: ${warning.check}`);
    console.log(`  Issue: ${warning.issue}\n`);
  });
}

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
console.log("💡 MANUAL TESTING:");
console.log("   1. Open in Chrome DevTools (Ctrl+Shift+I / Cmd+Option+I)");
console.log("   2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)");
console.log("   3. Test: iPhone 12, iPad, Android device");
console.log(
  "   4. Check: text readability, button tap targets, no horizontal scroll\n",
);

if (ISSUES.length > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
