import { loadContent } from "./base";
import { musicFileSchema, type MusicFile } from "@/lib/schemas/content";

export function getMusic(): MusicFile {
  return loadContent("music.json", musicFileSchema);
}
