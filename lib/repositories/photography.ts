import { loadContent } from "./base";
import { photographyFileSchema, type PhotographyFile } from "@/lib/schemas/content";

export function getPhotography(): PhotographyFile {
  return loadContent("photography.json", photographyFileSchema);
}
