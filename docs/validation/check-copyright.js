#!/usr/bin/env node

/**
 * check-copyright.js
 * Verifies that copyright year matches the current year
 * Usage: node docs/validation/check-copyright.js
 */

const fs = require("fs");
const path = require("path");

const currentYear = new Date().getFullYear();
const DIST_DIR = path.join(__dirname, "../../dist");
const ISSUES = [];

console.log(`📅 Checking copyright year (current: ${currentYear})...\n`);

// Check dist index.html
const indexPath = path.join(DIST_DIR, "index.html");
if (fs.existsSync(indexPath)) {
  const content = fs.readFileSync(indexPath, "utf8");
  const copyrightRegex = /©\s*(\d{4})/g;
  let match;

  while ((match = copyrightRegex.exec(content)) !== null) {
    const year = parseInt(match[1]);
    if (year !== currentYear) {
      ISSUES.push({
        found: year,
        expected: currentYear,
        location: "index.html footer",
      });
    }
  }
}

// Check source files (in case not built yet)
const srcFiles = [
  path.join(__dirname, "../../src/App.tsx"),
  path.join(__dirname, "../../src/components/Layout.tsx"),
  path.join(__dirname, "../../src/pages/Index.tsx"),
];

srcFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, "utf8");
    const copyrightRegex = /©\s*(\d{4})/g;
    let match;

    while ((match = copyrightRegex.exec(content)) !== null) {
      const year = parseInt(match[1]);
      if (year !== currentYear) {
        ISSUES.push({
          found: year,
          expected: currentYear,
          location: path.relative(path.join(__dirname, "../../"), file),
        });
      }
    }
  }
});

// Report
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("COPYRIGHT AUDIT RESULTS");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

if (ISSUES.length === 0) {
  console.log("✅ Copyright year is correct!\n");
  process.exit(0);
}

console.log(`❌ Found ${ISSUES.length} COPYRIGHT ISSUE(S):\n`);
ISSUES.forEach((issue) => {
  console.log(`  Location: ${issue.location}`);
  console.log(`  Found: © ${issue.found}`);
  console.log(`  Expected: © ${issue.expected}\n`);
});

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
console.log("⚠️  ACTION: Update copyright year to", currentYear, "\n");
process.exit(1);
