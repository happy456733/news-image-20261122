// news-image-20261122: a one-image front page summing up Sunday 22 November 2026.
// The image is entry.png beside this file (a JPEG by its first bytes, as the
// rules allow). The program copies it, byte for byte, to /output/entry.png.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const src = join(here, 'entry.png');
const dest = join(outDir, 'entry.png');

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

if (!existsSync(src)) {
  fail(`source image not found: ${src}`);
}
if (!statSync(src).isFile()) {
  fail(`source image is not a regular file: ${src}`);
}

mkdirSync(outDir, { recursive: true });

const bytes = readFileSync(src);
if (bytes.length === 0) {
  fail(`source image is empty: ${src}`);
}
writeFileSync(dest, bytes);

// Read the output back and verify it is byte-identical to the source, so a
// truncated or partial write is caught loudly instead of silently shipping.
const written = readFileSync(dest);
if (!written.equals(bytes)) {
  fail(
    `output verification failed: ${dest} (${written.length} bytes) ` +
      `differs from ${src} (${bytes.length} bytes)`,
  );
}

console.log(`wrote ${dest} (${bytes.length} bytes, verified)`);
