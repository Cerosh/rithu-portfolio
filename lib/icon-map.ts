import {
  Shapes,
  Compass,
  Sparkles,
  Wrench,
  Ruler,
  Building2,
  Music4,
  Users,
  Lightbulb,
  BookOpen,
  Film,
  Disc3,
  Puzzle,
  Hand,
  Camera,
  type LucideIcon,
} from "lucide-react";

// Content files reference icons by name (a plain string in JSON) rather than
// importing a component directly — this keeps content/*.json framework-free
// and lets new icons be wired up here without touching any content file.
export const iconMap: Record<string, LucideIcon> = {
  shapes: Shapes,
  compass: Compass,
  sparkles: Sparkles,
  wrench: Wrench,
  ruler: Ruler,
  building: Building2,
  music: Music4,
  users: Users,
  lightbulb: Lightbulb,
  book: BookOpen,
  film: Film,
  album: Disc3,
  puzzle: Puzzle,
  hand: Hand,
  camera: Camera,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Sparkles;
}
