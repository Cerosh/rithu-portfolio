import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string | null;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="font-mono text-eyebrow tracking-wide text-accent-warm uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display mt-2 text-h2 text-ink">{title}</h2>
      {subtitle ? <p className="mt-3 text-body-lg text-ink-soft">{subtitle}</p> : null}
    </div>
  );
}
