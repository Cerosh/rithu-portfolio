import { loadContent } from "./base";
import { resumeSchema, type Resume } from "@/lib/schemas/content";

export function getResume(): Resume {
  return loadContent("resume.json", resumeSchema);
}
