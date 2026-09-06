import { loadContent } from "./base";
import { futureSchema, type Future } from "@/lib/schemas/content";

export function getFuture(): Future {
  return loadContent("future.json", futureSchema);
}
