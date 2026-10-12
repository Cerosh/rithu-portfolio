import { loadContent } from "./base";
import {
  libraryMonitorProjectsFileSchema,
  type LibraryMonitorProjectsFile,
} from "@/lib/schemas/content";

export function getLibraryMonitorProjects(): LibraryMonitorProjectsFile {
  return loadContent("library-monitor-projects.json", libraryMonitorProjectsFileSchema);
}
