import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { z } from "zod";

const CONTENT_DIR = join(process.cwd(), "content");

// The only function allowed to read content/*.json directly. Every read is
// schema-validated, so editing a JSON file incorrectly fails immediately
// (dev server, build, or `npm run validate:content`) instead of silently
// shipping broken or missing content.
export function loadContent<T>(fileName: string, schema: z.ZodType<T>): T {
  const filePath = join(CONTENT_DIR, fileName);
  const raw = readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(raw);
  const result = schema.safeParse(parsed);

  if (!result.success) {
    throw new Error(
      `Invalid content in content/${fileName}:\n${result.error.issues
        .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
        .join("\n")}`,
    );
  }

  return result.data;
}
