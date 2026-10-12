import { cn } from "@/lib/utils";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/EmptyState";
import { getTimeline } from "@/lib/repositories/timeline";
import { getGrowing } from "@/lib/repositories/growing";

const PROMPT_LABEL: Record<string, string> = {
  learned: "Something I learned",
  surprised: "Something that surprised me",
  stuck: "A problem I couldn't solve at first",
  reflection: "A reflection",
};

// The site's "still growing" concept (brief §9): a roadmap that will
// naturally mature over 4-5 years without a redesign, plus a running log of
// short reflections — meant to become more valuable than certificates.
export function Growing() {
  const { items: stages } = getTimeline();
  const { intro, items: reflections } = getGrowing();

  return (
    <section
      id="growing"
      className="scroll-mt-16 relative overflow-hidden border-t border-line py-20 sm:py-28"
      style={{ background: "linear-gradient(180deg, #9b4746 0%, #914342 100%)" }}
    >
      {/* Soft burgundy splash — decorative only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(50% 40% at 94% 80%, var(--burgundy), transparent 70%)",
        }}
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Still growing"
          title="What I have done so far and what I will be doing"
          subtitle={intro}
        />

        <ol className="mt-12 space-y-10">
          {stages.map((stage, index) => (
            <Reveal key={stage.id} delay={index * 0.05}>
              <li className="grid grid-cols-[auto_1fr] gap-4">
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      "h-3 w-3 shrink-0 rounded-full",
                      stage.status === "current" && "bg-accent-warm",
                      stage.status === "past" && "bg-ink-faint",
                      stage.status === "upcoming" && "bg-line",
                    )}
                    aria-hidden="true"
                  />
                  {index < stages.length - 1 ? (
                    <span className="mt-1 w-px flex-1 bg-line" aria-hidden="true" />
                  ) : null}
                </div>

                <div className="pb-2">
                  <p
                    className={cn(
                      "font-mono text-small",
                      stage.status === "current" ? "text-ink" : "text-ink-faint",
                    )}
                  >
                    {stage.stage}
                    {stage.status === "current" ? " (now)" : ""}
                  </p>
                  {stage.headline ? (
                    <p className="mt-1 text-body text-ink-soft">{stage.headline}</p>
                  ) : null}

                  {stage.highlights.length > 0 ? (
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {stage.highlights.map((highlight, highlightIndex) => (
                        <li
                          key={highlightIndex}
                          className="rounded-lg border border-line bg-paper px-3 py-2 font-mono text-small text-ink"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <div className="mt-16">
          <h3 className="font-display text-h3 text-ink">Things I&rsquo;m learning</h3>
          <div className="mt-6 space-y-4">
            {reflections.length === 0 ? (
              <EmptyState message="[Add short, ongoing reflections here — e.g. &ldquo;something I learned,&rdquo; &ldquo;something that surprised me,&rdquo; &ldquo;a problem I couldn't solve at first.&rdquo; This is meant to be a living log she updates herself.]" />
            ) : (
              reflections.map((entry) => (
                <article key={entry.id} className="rounded-2xl border border-line bg-paper p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-mono text-eyebrow tracking-wide text-accent-warm uppercase">
                      {PROMPT_LABEL[entry.prompt]}
                    </span>
                    {entry.dateLabel ? (
                      <span className="font-mono text-small text-ink-faint">{entry.dateLabel}</span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-body text-ink-soft">{entry.entry}</p>
                </article>
              ))
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
