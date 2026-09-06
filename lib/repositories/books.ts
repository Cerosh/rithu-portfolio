import { loadContent } from "./base";
import { booksFileSchema, type BooksFile } from "@/lib/schemas/content";

export function getBooks(): BooksFile {
  return loadContent("books.json", booksFileSchema);
}
