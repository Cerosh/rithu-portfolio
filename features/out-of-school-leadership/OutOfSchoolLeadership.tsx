import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/EmptyState";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import { Tag } from "@/components/common/Tag";
import { getIcon } from "@/lib/icon-map";
import { getMusic } from "@/lib/repositories/music";
import { getTutoring } from "@/lib/repositories/tutoring";
import type { LeadershipEntry, MusicEntry } from "@/lib/schemas/content";
import { cn } from "@/lib/utils";

const TYPE_LABEL: Record<string, string> = {
  performance: "Performance",
  community: "Music × Community",
  practice: "Practice",
  milestone: "Milestone",
};

const TYPE_ICON: Record<string, string> = {
  performance: "music",
  community: "users",
  practice: "music",
  milestone: "sparkles",
};

const TUTORING_FIELDS: Array<{ key: keyof LeadershipEntry; label: string }> = [
  { key: "whatSheDid", label: "What I took on" },
  { key: "whoItHelped", label: "Who it helped" },
  { key: "whatSheLearned", label: "What I learned" },
];

// Only renders when there's an actual reflection — no placeholder prompt.
function Reflection({ reflection }: { reflection: string | null }) {
  if (!reflection) return null;
  return (
    <p className="mt-3 border-t border-line pt-3 text-body text-ink-soft italic">
      &ldquo;{reflection}&rdquo;
    </p>
  );
}

// A featured, larger story card — for entries that carry more weight than a
// single performance (e.g. an activity she organised, or a video of her
// performing), so it reads as "a small story from her life" rather than an
// achievement badge.
function FeaturedMusicEntry({ entry }: { entry: MusicEntry }) {
  const [hero, supporting] = entry.images;

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-paper">
      {entry.video?.src ? (
        <video
          controls
          playsInline
          preload="metadata"
          poster={hero?.src ?? undefined}
          aria-label={hero?.alt ?? entry.title}
          className="aspect-video w-full bg-ink"
        >
          <source src={entry.video.src} type="video/mp4" />
        </video>
      ) : hero?.src ? (
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

        {supporting ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div>
              <p className="text-body-lg text-ink-soft">{entry.description}</p>
              <Reflection reflection={entry.reflection} />
            </div>
            <div>
              {supporting.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={supporting.src}
                  alt={supporting.alt}
                  className="aspect-[4/5] w-full rounded-xl border border-line object-cover"
                />
              ) : (
                <PlaceholderImage label={supporting.alt} aspect="aspect-[4/5]" />
              )}
            </div>
          </div>
        ) : (
          <div className="mt-6 max-w-2xl">
            <p className="text-body-lg text-ink-soft">{entry.description}</p>
            <Reflection reflection={entry.reflection} />
          </div>
        )}
      </div>
    </article>
  );
}

function CompactMusicEntry({ entry }: { entry: MusicEntry }) {
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

function TutoringCard({ entry }: { entry: LeadershipEntry }) {
  return (
    <article
      className={cn(
        "grid gap-6 rounded-2xl border border-line bg-paper p-6 sm:p-8",
        entry.images.length > 0 && "lg:grid-cols-[minmax(0,1fr)_220px]",
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

        <dl className="mt-6 space-y-4">
          {TUTORING_FIELDS.map(({ key, label }) => {
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
  );
}

// Leadership shown outside of school — violin/music performances and
// Private Tutoring, in that order. Replaces what used to be two separate
// sections (Music, and a standalone Private Tutoring section).
const PONNONAM_ID = "ponnonam-2026-performance";
const CHURCH_ID = "church-music-ministry";
const DANCE_ID = "dancing-at-events";

export function OutOfSchoolLeadership() {
  const { intro: musicIntro, items: musicItems } = getMusic();
  const { entry: tutoringEntry } = getTutoring();
  const isFeatured = (entry: MusicEntry) => entry.video !== null || entry.images.length > 1;
  const featured = musicItems.filter(isFeatured);
  const rest = musicItems.filter((entry) => !isFeatured(entry));

  // Ponnonam and Church have a fixed arrangement — Ponnonam first, Church
  // stacked underneath it, Private Tutoring beside them. Tutoring's card
  // stretches to match their combined height and centers its own content
  // within that — rather than being left short with empty space trailing
  // beside Church. Any other non-featured entry just falls in afterwards.
  const ponnonam = rest.find((entry) => entry.id === PONNONAM_ID);
  const church = rest.find((entry) => entry.id === CHURCH_ID);
  // Dancing sits in the right-hand column, directly under Private Tutoring.
  const dancing = rest.find((entry) => entry.id === DANCE_ID);
  const otherRest = rest.filter(
    (entry) => entry.id !== PONNONAM_ID && entry.id !== CHURCH_ID && entry.id !== DANCE_ID,
  );

  const isEmpty = musicItems.length === 0 && !tutoringEntry;

  return (
    <section
      id="out-of-school-leadership"
      className="scroll-mt-16 relative overflow-hidden border-t border-line py-20 sm:py-28"
      style={{ background: "linear-gradient(180deg, #a54b4b 0%, #9b4746 100%)" }}
    >
      {/* Soft burgundy splash — decorative only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(45% 35% at 6% 90%, var(--burgundy), transparent 70%)",
        }}
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Leadership & community"
          title="Out of School Leadership"
          subtitle={musicIntro}
        />

        <div className="mt-10 space-y-6">
          {isEmpty ? (
            <EmptyState message="[Add out-of-school leadership and community stories here — music, tutoring, and anything else outside the classroom.]" />
          ) : (
            <>
              {featured.map((entry, index) => (
                <Reveal key={entry.id} delay={index * 0.05}>
                  <FeaturedMusicEntry entry={entry} />
                </Reveal>
              ))}

              {ponnonam || church || tutoringEntry || dancing ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-6">
                    {ponnonam ? (
                      <Reveal>
                        <CompactMusicEntry entry={ponnonam} />
                      </Reveal>
                    ) : null}
                    {church
                      ? (() => {
                          const Icon = getIcon(TYPE_ICON[church.type]);
                          return (
                            <Reveal delay={0.05}>
                              <div className="flex h-full items-start gap-3 rounded-2xl border border-line bg-paper-raised p-5">
                                <Icon
                                  className="mt-1 h-5 w-5 shrink-0 text-accent-warm"
                                  aria-hidden="true"
                                />
                                <div>
                                  <p className="font-display text-body-lg text-ink">
                                    {church.title}
                                  </p>
                                  <p className="mt-1 text-small text-ink-soft">
                                    {church.description}
                                  </p>
                                  {church.dateLabel ? (
                                    <Tag className="mt-2">{church.dateLabel}</Tag>
                                  ) : null}
                                </div>
                              </div>
                            </Reveal>
                          );
                        })()
                      : null}
                  </div>

                  {tutoringEntry || dancing ? (
                    <div className="space-y-6">
                      {tutoringEntry ? (
                        <Reveal delay={0.1}>
                          <TutoringCard entry={tutoringEntry} />
                        </Reveal>
                      ) : null}
                      {dancing
                        ? (() => {
                            const Icon = getIcon(TYPE_ICON[dancing.type]);
                            return (
                              <Reveal delay={0.15}>
                                <div className="flex h-full items-start gap-3 rounded-2xl border border-line bg-paper-raised p-5">
                                  <Icon
                                    className="mt-1 h-5 w-5 shrink-0 text-accent-warm"
                                    aria-hidden="true"
                                  />
                                  <div>
                                    <p className="font-display text-body-lg text-ink">
                                      {dancing.title}
                                    </p>
                                    <p className="mt-1 text-small text-ink-soft">
                                      {dancing.description}
                                    </p>
                                    {dancing.dateLabel ? (
                                      <Tag className="mt-2">{dancing.dateLabel}</Tag>
                                    ) : null}
                                  </div>
                                </div>
                              </Reveal>
                            );
                          })()
                        : null}
                    </div>
                  ) : null}
                </div>
              ) : null}

              {otherRest.length > 0 ? (
                // Any further non-featured entries, side by side so a
                // single one doesn't end up stranded alone on one side.
                <div className="grid gap-6 sm:grid-cols-2">
                  {otherRest.map((entry, index) => {
                    if (entry.images.length > 0) {
                      return (
                        <Reveal key={entry.id} delay={index * 0.05}>
                          <CompactMusicEntry entry={entry} />
                        </Reveal>
                      );
                    }
                    const Icon = getIcon(TYPE_ICON[entry.type]);
                    return (
                      <Reveal key={entry.id} delay={index * 0.05}>
                        <div className="flex h-full items-start gap-3 rounded-2xl border border-line bg-paper-raised p-5">
                          <Icon
                            className="mt-1 h-5 w-5 shrink-0 text-accent-warm"
                            aria-hidden="true"
                          />
                          <div>
                            <p className="font-display text-body-lg text-ink">{entry.title}</p>
                            <p className="mt-1 text-small text-ink-soft">{entry.description}</p>
                            {entry.dateLabel ? (
                              <Tag className="mt-2">{entry.dateLabel}</Tag>
                            ) : null}
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              ) : null}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
