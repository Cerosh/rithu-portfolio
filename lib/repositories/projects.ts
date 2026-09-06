import { loadContent } from "./base";
import { projectsFileSchema, type ProjectsFile } from "@/lib/schemas/content";

export function getProjects(): ProjectsFile {
  return loadContent("projects.json", projectsFileSchema);
}
