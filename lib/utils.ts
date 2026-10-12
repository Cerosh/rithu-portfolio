import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Content stores full calendar dates as ISO ("YYYY-MM-DD") so they stay
// machine-sortable/validatable — this formats one for display as
// "DD/MM/YYYY". Not for month-only labels (e.g. "April 2026"), which don't
// carry a specific day to format.
export function formatDateDMY(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}
