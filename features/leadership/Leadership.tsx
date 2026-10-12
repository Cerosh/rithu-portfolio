import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/EmptyState";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import { getLeadership } from "@/lib/repositories/leadership";
import type { LeadershipEntry } from "@/lib/schemas/content";
import { cn } from "@/lib/utils";

const FIELDS: Array<{ key: keyof LeadershipEntry; label: string }> = [
  { key: "whatSheDid", label: "What she took on" },
  { key: "whoItHelped", label: "Who it helped" },
  { key: "whatSheLearned", label: "What she learned" },
];

// Per-entry image column width — Primary Prosperitas/SRC/Library Monitor
// get a bigger photo; House Minister gets a smaller one. Anything else not
// listed here keeps the original 220px.
const IMAGE_COLUMN_CLASS: Record<string, string> = {
  "primary-prosperitas": "lg:grid-cols-[minmax(0,1fr)_300px]",
  src: "lg:grid-cols-[minmax(0,1fr)_300px]",
  "library-monitor": "lg:grid-cols-[minmax(0,1fr)_300px]",
  "house-captain": "lg:grid-cols-[minmax(0,1fr)_180px]",
};
const DEFAULT_IMAGE_COLUMN_CLASS = "lg:grid-cols-[minmax(0,1fr)_220px]";

// Leadership shown through stories and evidence, not a skill badge
// (brief §2 — "The leader").
export function Leadership() {
  const { intro, items } = getLeadership();

  return (
    <section
      id="leadership"
      className="scroll-mt-16 relative overflow-hidden border-t border-line py-20 sm:py-28"
      style={{ background: "linear-gradient(180deg, #b95453 0%, #af4f4f 100%)" }}
    >
      {/* Soft burgundy splash — decorative only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(45% 35% at 8% 10%, var(--burgundy), transparent 70%)",
        }}
      />

      <Container className="relative">
        <SectionHeading eyebrow="Leadership & community" title="In school leadership" subtitle={intro} />

        <div className="mt-10 space-y-6">
          {items.length === 0 ? (
            <EmptyState message="[Add leadership/community stories here — what she took responsibility for, who it helped, what changed, what she learned.]" />
          ) : (
            items.map((entry, index) => (
              <Reveal key={entry.id} delay={index * 0.05}>
                <article
                  className={cn(
                    "grid gap-6 rounded-2xl border border-line bg-paper p-6 sm:p-8",
                    IMAGE_COLUMN_CLASS[entry.id] ?? DEFAULT_IMAGE_COLUMN_CLASS,
                  )}
                >
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-h3 text-ink">{entry.role}</h3>
                      {entry.dateLabel ? (
                        <span className="font-mono text-small text-ink-faint">{entry.dateLabel}</span>
                      ) : null}
                    </div>
                    {entry.organisation ? (
                      <p className="mt-1 text-body text-ink-faint">{entry.organisation}</p>
                    ) : null}

                    {entry.updates.length > 0 ? (
                      <div className="mt-6 space-y-5">
                        {entry.updates.map((update, updateIndex) => (
                          <div key={updateIndex}>
                            <h4 className="font-display text-body-lg text-ink">{update.label}</h4>
                            <p className="mt-1 text-body text-ink-soft">{update.body}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                      {FIELDS.filter(
                        ({ key }) => !(entry.updates.length > 0 && key === "whatSheDid"),
                      ).map(({ key, label }) => {
                        const value = entry[key];
                        return (
                          <div key={key} className="[&:nth-child(3):last-child]:sm:col-span-2">
                            <dt className="font-mono text-eyebrow tracking-wide text-accent-warm uppercase">
                              {label}
                            </dt>
                            <dd className="mt-1 text-body text-ink-soft">
                              {typeof value === "string" ? value : `[Add "${label.toLowerCase()}"]`}
                            </dd>
                          </div>
                        );
                      })}
                    </dl>
                  </div>

                  {entry.images.length > 0 ? (
                    <div className="space-y-3 lg:self-center">
                      {entry.images.map((image, imageIndex) =>
                        image.src ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={imageIndex}
                            src={image.src}
                            alt={image.alt}
                            className="w-full rounded-xl border border-line object-cover"
                          />
                        ) : (
                          <PlaceholderImage key={imageIndex} label={image.alt} />
                        ),
                      )}
                    </div>
                  ) : null}
                </article>
              </Reveal>
            ))
          )}
        </div>
      </Container>
    </section>
  );
}
