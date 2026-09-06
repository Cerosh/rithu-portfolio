import { loadContent } from "./base";
import { leadershipFileSchema, type LeadershipFile } from "@/lib/schemas/content";

export function getLeadership(): LeadershipFile {
  return loadContent("leadership.json", leadershipFileSchema);
}
