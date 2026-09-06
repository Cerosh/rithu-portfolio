import { loadContent } from "./base";
import { profileSchema, type Profile } from "@/lib/schemas/content";

export function getProfile(): Profile {
  return loadContent("profile.json", profileSchema);
}
