#!/usr/bin/env node

/**
 * check-header-clarity.js
 * Validates that the portfolio header clearly communicates what you do in <30 seconds
 * Extracts: headline, tagline/subtitle, About preview
 * Usage: node docs/validation/check-header-clarity.js
 */

const fs = require("fs");
const path = require("path");

const DIST_DIR = path.join(__dirname, "../../dist");
const CHECKS = [];

console.log(
  "🎯 Checking header/positioning clarity (30-second skim test)...\n",
);

// Check if dist exists
if (!fs.existsSync(DIST_DIR)) {
  console.error("❌ dist/ directory not found. Run 'npm run build' first.");
  process.exit(1);
}

// Extract from index.html
const indexPath = path.join(DIST_DIR, "index.html");
if (!fs.existsSync(indexPath)) {
  console.error("❌ index.html not found in dist/");
  process.exit(1);
}

const htmlContent = fs.readFileSync(indexPath, "utf8");

// Parse HTML to extract key sections (simple regex-based)
const titleMatch = htmlContent.match(/<title>([^<]+)<\/title>/);
const metaDescMatch = htmlContent.match(
  /<meta\s+name="description"\s+content="([^"]+)"/,
);

const headline = titleMatch ? titleMatch[1] : "NOT FOUND";
const metaDesc = metaDescMatch ? metaDescMatch[1] : "NOT FOUND";

console.log("📋 HEADER CLARITY AUDIT\n");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

console.log("🏷️  Page Title (from <title>):");
console.log(`   "${headline}"\n`);

console.log("📝 Meta Description:");
console.log(`   "${metaDesc}"\n`);

// Check for key positioning words
const designerKeywords = [
  "designer",
  "product designer",
  "ux designer",
  "ux strategist",
  "design",
];
const engineerKeywords = ["engineer", "builder", "developer", "front-end"];

const titleLower = headline.toLowerCase();
const descLower = metaDesc.toLowerCase();
const combined = titleLower + " " + descLower;

const designerMatches = designerKeywords.filter((kw) => combined.includes(kw));
const engineerMatches = engineerKeywords.filter((kw) => combined.includes(kw));

console.log("🎯 POSITIONING ANALYSIS:");
console.log(
  `   Designer keywords found: ${designerMatches.length} (${designerMatches.join(", ") || "none"})`,
);
console.log(
  `   Engineer keywords found: ${engineerMatches.length} (${engineerMatches.join(", ") || "none"})`,
);
console.log();

// Validation checks
console.log("✓ VALIDATION CHECKS:\n");

if (designerMatches.length >= engineerMatches.length) {
  console.log("✅ Primary positioning is DESIGN-forward");
  CHECKS.push(true);
} else {
  console.log(
    "❌ Primary positioning is ENGINEER-forward (should be DESIGN-first)",
  );
  CHECKS.push(false);
}

if (headline.length < 80) {
  console.log("✅ Headline is concise (<80 chars)");
  CHECKS.push(true);
} else {
  console.log("⚠️  Headline is long (>80 chars; consider shortening)");
  CHECKS.push(false);
}

if (designerMatches.length + engineerMatches.length > 0) {
  console.log("✅ Discipline is clearly stated");
  CHECKS.push(true);
} else {
  console.log(
    "❌ Discipline keywords missing (add 'Designer' or 'Product Designer')",
  );
  CHECKS.push(false);
}

// Summary
console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

const passCount = CHECKS.filter((c) => c).length;
const totalCount = CHECKS.length;

console.log(`SCORE: ${passCount}/${totalCount} checks passed\n`);

if (passCount === totalCount) {
  console.log("✅ HEADER POSITIONING IS CLEAR\n");
  console.log("💡 Manual Review Prompt for 5 People:");
  console.log(
    "   Show your portfolio header for 30 seconds. Ask: 'What does this person do?'",
  );
  console.log(
    "   Expected answer: 'Designer' or 'Product/UX Designer'. If 4-5/5 say this, you're good!\n",
  );
  process.exit(0);
} else {
  console.log("⚠️  HEADER POSITIONING NEEDS WORK\n");
  console.log("💡 ACTION ITEMS:");
  console.log(
    "   1. Make 'Designer' or 'Product Designer' visible in title/tagline",
  );
  console.log(
    "   2. Defer 'Engineer' / 'Builder' to secondary copy (About section)",
  );
  console.log("   3. Keep headline under 80 characters\n");
  process.exit(1);
}
