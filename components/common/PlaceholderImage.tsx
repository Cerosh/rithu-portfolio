import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Renders wherever an image slot exists but no file has been added yet
// (see content/*.json "images" arrays). Makes it obvious, in the running
// site, exactly where a photo can be dropped in later — never a stock photo.
export function PlaceholderImage({
  label,
  className,
  aspect = "aspect-[4/3]",
}: {
  label: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line bg-paper-raised p-6 text-center",
        aspect,
        className,
      )}
    >
      <ImageIcon className="h-6 w-6 text-ink-faint" aria-hidden="true" />
      <p className="text-small text-ink-faint">{label}</p>
    </div>
  );
}
