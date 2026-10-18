import { cp, readdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const framerUrl =
  /(?:framerusercontent\.com|framerstatic\.com|framer\.com|framer\.website|framercanvas\.com|events\.framer\.com)/i;
const textFile = /\.(?:html|css|js|xml|txt|svg|json|mjs)$/i;

await rm(dist, { recursive: true, force: true });
await cp(path.join(root, "site"), dist, { recursive: true });

const hits = [];

async function scan(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await scan(full);
      continue;
    }
    if (!textFile.test(entry.name)) continue;
    const text = await readFile(full, "utf8");
    if (framerUrl.test(text)) hits.push(path.relative(dist, full));
  }
}

await scan(dist);

const home = await readFile(path.join(dist, "index.html"), "utf8");
const stylishCount = home.split("https://stylish.sunsup.me/").length - 1;
if (stylishCount !== 1) {
  console.error(`Expected exactly one Stylish site link, found ${stylishCount}`);
  process.exit(1);
}

if (hits.length > 0) {
  console.error("Framer URLs remain in the build output:");
  for (const hit of hits) console.error(`  ${hit}`);
  process.exit(1);
}

console.log("Built dist/ with no Framer URLs.");
