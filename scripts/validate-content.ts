// Validates every content/*.json file against its Zod schema, and checks
// that any referenced image/resume file actually exists on disk. Run this
// after editing content — it's the mechanical guardrail that keeps the site
// honest (no fabricated content, no dead file references) as it grows over
// the next several years.
import { existsSync } from "node:fs";
import { join } from "node:path";
import { getProfile } from "@/lib/repositories/profile";
import { getCuriosities } from "@/lib/repositories/curiosities";
import { getBooks } from "@/lib/repositories/books";
import { getProjects } from "@/lib/repositories/projects";
import { getMusic } from "@/lib/repositories/music";
import { getLeadership } from "@/lib/repositories/leadership";
import { getBeyond } from "@/lib/repositories/beyond";
import { getGrowing } from "@/lib/repositories/growing";
import { getFuture } from "@/lib/repositories/future";
import { getTimeline } from "@/lib/repositories/timeline";
import { getResume } from "@/lib/repositories/resume";
import { getContact } from "@/lib/repositories/contact";

function fileExists(publicPath: string): boolean {
  return existsSync(join(process.cwd(), "public", publicPath));
}

function checkImagePaths(label: string, images: Array<{ src: string | null }>): string[] {
  const missing: string[] = [];
  for (const image of images) {
    if (image.src && image.src.startsWith("/") && !fileExists(image.src)) {
      missing.push(`${label}: ${image.src}`);
    }
  }
  return missing;
}

const checks: Array<[string, () => unknown[] | object]> = [
  ["profile.json", getProfile],
  ["curiosities.json", getCuriosities],
  ["books.json", getBooks],
  ["projects.json", getProjects],
  ["music.json", getMusic],
  ["leadership.json", getLeadership],
  ["beyond.json", getBeyond],
  ["growing.json", getGrowing],
  ["future.json", getFuture],
  ["timeline.json", getTimeline],
  ["resume.json", getResume],
  ["contact.json", getContact],
];

let failed = false;

for (const [name, load] of checks) {
  try {
    const result = load();
    const count = Array.isArray(result) ? result.length : "object";
    console.log(`✔ ${name} (${count})`);
  } catch (error) {
    failed = true;
    console.error(`✘ ${name}`);
    console.error(error instanceof Error ? error.message : error);
  }
}

const missingImages = [
  ...checkImagePaths("profile.photo", getProfile().photo ? [getProfile().photo!] : []),
  ...getProjects().items.flatMap((p) => checkImagePaths(`project "${p.title}"`, p.images)),
  ...getMusic().items.flatMap((m) => checkImagePaths(`music "${m.title}"`, m.images)),
  ...getBeyond().items.flatMap((b) => checkImagePaths(`beyond "${b.title}"`, b.images)),
  ...getLeadership().items.flatMap((l) => checkImagePaths(`leadership "${l.role}"`, l.images)),
  ...checkImagePaths("future", getFuture().images),
  ...getBooks().reviews.flatMap((r) =>
    checkImagePaths(`book review "${r.bookTitle}"`, r.image ? [r.image] : []),
  ),
];

if (missingImages.length > 0) {
  failed = true;
  console.error(`✘ image files missing on disk (${missingImages.length}):`);
  for (const entry of missingImages) console.error(`  - ${entry}`);
} else {
  console.log("✔ all local image paths resolve to a real file");
}

const missingVideos = getMusic()
  .items.filter((m) => m.video && m.video.src.startsWith("/") && !fileExists(m.video.src))
  .map((m) => `music "${m.title}": ${m.video!.src}`);

if (missingVideos.length > 0) {
  failed = true;
  console.error(`✘ video files missing on disk (${missingVideos.length}):`);
  for (const entry of missingVideos) console.error(`  - ${entry}`);
} else {
  console.log("✔ all local video paths resolve to a real file");
}

const resume = getResume();
if (resume.fileSrc && resume.fileSrc.startsWith("/") && !fileExists(resume.fileSrc)) {
  failed = true;
  console.error(`✘ resume.fileSrc does not exist on disk: ${resume.fileSrc}`);
} else {
  console.log("✔ resume file path resolves (or is not yet set)");
}

if (failed) {
  console.error("\nContent validation failed.");
  process.exit(1);
}

console.log("\nAll content files are valid.");
