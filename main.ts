// news-image-20261122: a one-image front page summing up Sunday 22 November 2026.
// The image is entry.png beside this file (a JPEG by its first bytes, as the
// rules allow). The program copies it, byte for byte, to /output/entry.png.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const dest = join(outDir, 'entry.png');

mkdirSync(outDir, { recursive: true });
writeFileSync(dest, readFileSync(join(here, 'entry.png')));
