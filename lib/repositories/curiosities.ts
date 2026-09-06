import { loadContent } from "./base";
import { curiositiesFileSchema, type CuriositiesFile } from "@/lib/schemas/content";

export function getCuriosities(): CuriositiesFile {
  return loadContent("curiosities.json", curiositiesFileSchema);
}
