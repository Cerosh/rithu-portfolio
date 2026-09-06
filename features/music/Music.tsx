import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/EmptyState";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import { getMusic } from "@/lib/repositories/music";
import type { MusicEntry } from "@/lib/schemas/content";

const TYPE_LABEL: Record<string, string> = {
  performance: "Performance",
  community: "Music × Community",
  practice: "Practice",
  milestone: "Milestone",
};

function Reflection({ reflection }: { reflection: string | null }) {
  if (reflection) {
    return (
      <p className="mt-3 border-t border-line pt-3 text-body text-ink-soft italic">
        &ldquo;{reflection}&rdquo;
      </p>
    );
  }
  return (
    <p className="mt-3 border-t border-line pt-3 text-small text-ink-faint">
      [Add Rithu&rsquo;s reflection here — what made her want to do this, what she enjoyed most,
      or what surprised her]
    </p>
  );
}

// A featured, larger story card — for entries that carry more weight than a
// single performance (e.g. an activity she organised for other people), so
// it reads as "a small story from her life" rather than an achievement badge.
function FeaturedEntry({ entry }: { entry: MusicEntry }) {
  const [hero, supporting] = entry.images;

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-paper">
      {hero?.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={hero.src} alt={hero.alt} className="aspect-[21/9] w-full object-cover" />
      ) : (
        <PlaceholderImage
          label={hero?.alt ?? "[Add hero photo]"}
          aspect="aspect-[21/9]"
          className="rounded-none border-0 border-b"
        />
      )}

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="font-mono text-eyebrow tracking-wide text-accent-warm uppercase">
            {TYPE_LABEL[entry.type]}
          </span>
          {entry.dateLabel ? (
            <span className="font-mono text-small text-ink-faint">{entry.dateLabel}</span>
          ) : null}
        </div>
        <h3 className="font-display mt-2 text-h3 text-ink">{entry.title}</h3>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div>
            <p className="text-body-lg text-ink-soft">{entry.description}</p>
            <Reflection reflection={entry.reflection} />
          </div>
          <div>
            {supporting?.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={supporting.src}
                alt={supporting.alt}
                className="aspect-[4/5] w-full rounded-xl border border-line object-cover"
              />
            ) : (
              <PlaceholderImage label={supporting?.alt ?? "[Add supporting photo]"} aspect="aspect-[4/5]" />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function CompactEntry({ entry }: { entry: MusicEntry }) {
  return (
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
            <span className="font-mono text-small text-ink-faint">{entry.dateLabel}</span>
          ) : null}
        </div>
        <h3 className="font-display mt-2 text-h3 text-ink">{entry.title}</h3>
        <p className="mt-2 text-body text-ink-soft">{entry.description}</p>
        <Reflection reflection={entry.reflection} />
      </div>
    </article>
  );
}

// Music gets its own visual register — warmer, less grid-like than the
// engineering-adjacent sections — because it's about discipline, expression
// and community, not a résumé line ("Violin — Grade X") (brief §2).
export function Music() {
  const { intro, items } = getMusic();
  const featured = items.filter((entry) => entry.type === "community");
  const standard = items.filter((entry) => entry.type !== "community");

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

        <div className="mt-10 space-y-6">
          {items.length === 0 ? (
            <EmptyState message="[Add performances and musical involvement here — the human side of it: discipline, practice, performing, community, not just a grade level.]" />
          ) : (
            <>
              {featured.map((entry, index) => (
                <Reveal key={entry.id} delay={index * 0.05}>
                  <FeaturedEntry entry={entry} />
                </Reveal>
              ))}

              {standard.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  {standard.map((entry, index) => (
                    <Reveal key={entry.id} delay={index * 0.05}>
                      <CompactEntry entry={entry} />
                    </Reveal>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
