import { loadContent } from "./base";
import { beyondFileSchema, type BeyondFile } from "@/lib/schemas/content";

export function getBeyond(): BeyondFile {
  return loadContent("beyond.json", beyondFileSchema);
}
