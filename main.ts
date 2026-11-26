import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Funniest Sign on a Haunted Server Room Door — make.fun bounty
// u-eager-stork-81-9647-funniest-sign-on-a-haunted-ab1d019a
// One line, at most 120 characters, written to /output/entry.txt.
const LINE =
  "HAUNTED: the ghost rearranges the cables every night. Yes, we tried labeling them.";

// Gate (mirrors the sealed scorer): 1-120 chars, not only whitespace,
// single line, clean to read aloud.
if (LINE.length < 1 || LINE.length > 120) {
  throw new Error(`entry length ${LINE.length} outside 1-120`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry is blank");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
// Create the output folder if missing; never delete it (the grader mounts it).
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
// Read back and verify the gate on what was actually written.
const written = readFileSync(outPath, "utf8");
const body = written.replace(/\n$/, "");
if (body !== LINE || body.length < 1 || body.length > 120) {
  throw new Error("written entry failed the gate check");
}
console.log(`wrote ${LINE.length}-char entry to ${outPath}`);
