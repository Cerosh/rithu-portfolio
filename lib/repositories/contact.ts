import { loadContent } from "./base";
import { contactSchema, type Contact } from "@/lib/schemas/content";

export function getContact(): Contact {
  return loadContent("contact.json", contactSchema);
}
