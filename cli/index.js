#!/usr/bin/env node
import fs from "fs";
import path from "path";

const TARGET_NODE = "22";

console.log("🚀 Node Upgrade Agent starting...");

// Ensure running inside a Node project
const pkgPath = path.join(process.cwd(), "package.json");

if (!fs.existsSync(pkgPath)) {
  console.error("❌ package.json not found. Run inside a Node project.");
  process.exit(1);
}

// Update package.json
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

pkg.engines = pkg.engines || {};
pkg.engines.node = `>=${TARGET_NODE}`;

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log(`✅ package.json updated to Node >=${TARGET_NODE}`);

// Update .nvmrc if exists
const nvmrcPath = path.join(process.cwd(), ".nvmrc");
if (fs.existsSync(nvmrcPath)) {
  fs.writeFileSync(nvmrcPath, TARGET_NODE);
  console.log("✅ .nvmrc updated");
}

console.log("📦 Node upgrade changes applied");
console.log("➡️ Next: npm install && npm test");
