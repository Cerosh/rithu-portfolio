import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/EmptyState";
import { getLeadership } from "@/lib/repositories/leadership";
import type { LeadershipEntry } from "@/lib/schemas/content";

const FIELDS: Array<{ key: keyof LeadershipEntry; label: string }> = [
  { key: "whatSheDid", label: "What she took on" },
  { key: "whoItHelped", label: "Who it helped" },
  { key: "whatChanged", label: "What changed" },
  { key: "whatSheLearned", label: "What she learned" },
];

// Leadership shown through stories and evidence, not a skill badge
// (brief §2 — "The leader").
export function Leadership() {
  const { intro, items } = getLeadership();

  return (
    <section id="leadership" className="scroll-mt-16 border-t border-line bg-paper-raised py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Leadership & community" title="Taking responsibility" subtitle={intro} />

        <div className="mt-10 space-y-6">
          {items.length === 0 ? (
            <EmptyState message="[Add leadership/community stories here — what she took responsibility for, who it helped, what changed, what she learned.]" />
          ) : (
            items.map((entry, index) => (
              <Reveal key={entry.id} delay={index * 0.05}>
                <article className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-h3 text-ink">{entry.role}</h3>
                    {entry.dateLabel ? (
                      <span className="font-mono text-small text-ink-faint">{entry.dateLabel}</span>
                    ) : null}
                  </div>
                  {entry.organisation ? (
                    <p className="mt-1 text-body text-ink-faint">{entry.organisation}</p>
                  ) : null}

                  <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                    {FIELDS.map(({ key, label }) => {
                      const value = entry[key];
                      return (
                        <div key={key}>
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
                </article>
              </Reveal>
            ))
          )}
        </div>
      </Container>
    </section>
  );
}
