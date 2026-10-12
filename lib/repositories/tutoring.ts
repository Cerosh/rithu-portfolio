import { loadContent } from "./base";
import { tutoringFileSchema, type TutoringFile } from "@/lib/schemas/content";

export function getTutoring(): TutoringFile {
  return loadContent("tutoring.json", tutoringFileSchema);
}
