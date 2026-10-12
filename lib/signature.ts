// Generates real SVG path data for a piece of text, letter by letter, using
// the actual Dancing Script font outlines (via opentype.js) — so the
// "writing" animation on the Hero traces each letter's real pen strokes
// instead of faking it with CSS opacity/transform tricks.
//
// Each glyph's path is generated at its own local origin (x=0) and
// positioned afterwards via an SVG `transform`, rather than asking
// opentype.js to bake a non-zero x position into the path itself — doing
// that directly produced NaN control points for several letters in this
// particular font file (a library/font quirk, not a font-wide issue: every
// individual glyph's own outline parses cleanly on its own).
//
// Server-only (reads a font file from disk + opentype.js's Node APIs) — see
// components/common/HandwrittenSignature.tsx for where this is used.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parse, type Font, type Glyph } from "opentype.js";

const FONT_PATH = join(process.cwd(), "lib", "fonts", "DancingScript-Regular.ttf");

export interface SignatureLetter {
  char: string;
  /** SVG path "d" data for this letter's outline, at local origin (0,0) —
   * position it with the paired `x` via a transform. Empty for whitespace. */
  d: string;
  x: number;
}

export interface Signature {
  letters: SignatureLetter[];
  /** Ready to drop straight into an <svg viewBox="..."> */
  viewBox: string;
}

let cachedFont: Font | null = null;

function getFont(): Font {
  // opentype.loadSync() is deprecated in favour of reading the file
  // ourselves and parsing the buffer directly.
  cachedFont ??= parse(readFileSync(FONT_PATH));
  return cachedFont;
}

// Reference size in font design units — arbitrary; the SVG scales to fit
// its container via the viewBox regardless of the number chosen here.
const FONT_SIZE = 200;

export function getSignature(text: string): Signature {
  const font = getFont();
  const scale = FONT_SIZE / font.unitsPerEm;

  let cursorX = 0;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let previousGlyph: Glyph | null = null;

  const letters: SignatureLetter[] = Array.from(text).map((char) => {
    const glyph = font.charToGlyph(char);
    const path = glyph.getPath(0, 0, FONT_SIZE, undefined, font);
    const d = path.toPathData(2);

    if (d) {
      const box = path.getBoundingBox();
      minX = Math.min(minX, box.x1 + cursorX);
      minY = Math.min(minY, box.y1);
      maxX = Math.max(maxX, box.x2 + cursorX);
      maxY = Math.max(maxY, box.y2);
    }

    const letterX = cursorX;

    const kerning = previousGlyph ? font.getKerningValue(previousGlyph, glyph) * scale : 0;
    cursorX += (glyph.advanceWidth ?? 0) * scale + (Number.isFinite(kerning) ? kerning : 0);
    previousGlyph = glyph;

    return { char, d, x: letterX };
  });

  const hasInk = Number.isFinite(minX);
  const padding = FONT_SIZE * 0.06;
  const left = (hasInk ? minX : 0) - padding;
  const top = (hasInk ? minY : -FONT_SIZE * 0.8) - padding;
  const width = (hasInk ? maxX : cursorX) - (hasInk ? minX : 0) + padding * 2;
  const height = (hasInk ? maxY : FONT_SIZE * 0.3) - (hasInk ? minY : -FONT_SIZE * 0.8) + padding * 2;

  return {
    letters,
    viewBox: `${left} ${top} ${width} ${height}`,
  };
}
