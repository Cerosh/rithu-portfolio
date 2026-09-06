import { loadContent } from "./base";
import { timelineFileSchema, type TimelineFile } from "@/lib/schemas/content";

export function getTimeline(): TimelineFile {
  return loadContent("timeline.json", timelineFileSchema);
}
