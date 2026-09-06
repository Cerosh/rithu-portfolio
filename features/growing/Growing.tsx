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
    <section id="growing" className="scroll-mt-16 border-t border-line bg-paper-raised py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Still growing" title="Where I am, and where I'm headed" subtitle={intro} />

        <ol className="mt-12 grid gap-6 sm:grid-cols-5">
          {stages.map((stage, index) => (
            <Reveal key={stage.id} delay={index * 0.05}>
              <li className="flex flex-col gap-2">
                <div
                  className={cn(
                    "h-2 w-full rounded-full",
                    stage.status === "current" && "bg-accent-warm",
                    stage.status === "past" && "bg-ink-faint",
                    stage.status === "upcoming" && "bg-line",
                  )}
                  aria-hidden="true"
                />
                <p
                  className={cn(
                    "font-mono text-small",
                    stage.status === "current" ? "text-ink" : "text-ink-faint",
                  )}
                >
                  {stage.stage}
                  {stage.status === "current" ? " (now)" : ""}
                </p>
                <p className="text-small text-ink-soft">
                  {stage.headline ?? "[Add what happens at this stage]"}
                </p>
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
