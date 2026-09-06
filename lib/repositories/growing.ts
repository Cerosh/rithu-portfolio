import { loadContent } from "./base";
import { growingFileSchema, type GrowingFile } from "@/lib/schemas/content";

export function getGrowing(): GrowingFile {
  return loadContent("growing.json", growingFileSchema);
}
