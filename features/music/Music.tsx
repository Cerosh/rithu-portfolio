import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/EmptyState";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import { getMusic } from "@/lib/repositories/music";

const TYPE_LABEL: Record<string, string> = {
  performance: "Performance",
  community: "Community",
  practice: "Practice",
  milestone: "Milestone",
};

// Music gets its own visual register — warmer, less grid-like than the
// engineering-adjacent sections — because it's about discipline, expression
// and community, not a résumé line ("Violin — Grade X") (brief §2).
export function Music() {
  const { intro, items } = getMusic();

  return (
    <section
      id="music"
      className="scroll-mt-16 border-t border-line py-20 sm:py-28"
      style={{
        background: "linear-gradient(180deg, var(--paper) 0%, var(--accent-warm-soft) 140%)",
      }}
    >
      <Container>
        <SectionHeading eyebrow="Music" title="Violin &amp; music" subtitle={intro} />

        <div className="mt-10">
          {items.length === 0 ? (
            <EmptyState message="[Add performances and musical involvement here — the human side of it: discipline, practice, performing, community, not just a grade level.]" />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {items.map((entry, index) => (
                <Reveal key={entry.id} delay={index * 0.05}>
                  <article className="h-full overflow-hidden rounded-2xl border border-line bg-paper">
                    {entry.images[0]?.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={entry.images[0].src}
                        alt={entry.images[0].alt}
                        className="aspect-[16/10] w-full object-cover"
                      />
                    ) : (
                      <PlaceholderImage
                        label={entry.images[0]?.alt ?? "[Add photo of a performance]"}
                        aspect="aspect-[16/10]"
                        className="rounded-none border-0 border-b"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="font-mono text-eyebrow tracking-wide text-accent-warm uppercase">
                          {TYPE_LABEL[entry.type]}
                        </span>
                        {entry.dateLabel ? (
                          <span className="font-mono text-small text-ink-faint">
                            {entry.dateLabel}
                          </span>
                        ) : null}
                      </div>
                      <h3 className="font-display mt-2 text-h3 text-ink">{entry.title}</h3>
                      <p className="mt-2 text-body text-ink-soft">{entry.description}</p>
                      {entry.reflection ? (
                        <p className="mt-3 border-t border-line pt-3 text-body text-ink-soft italic">
                          &ldquo;{entry.reflection}&rdquo;
                        </p>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
