import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/EmptyState";
import { LightboxImage } from "@/components/common/LightboxImage";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import { Tag } from "@/components/common/Tag";
import { getIcon } from "@/lib/icon-map";
import { getBeyond } from "@/lib/repositories/beyond";
import { getPhotography } from "@/lib/repositories/photography";
import { getLibraryMonitorProjects } from "@/lib/repositories/library-monitor-projects";
import type { BeyondItem, LeadershipEntry } from "@/lib/schemas/content";
import { cn } from "@/lib/utils";

const CATEGORY_ICON: Record<string, string> = {
  movie: "film",
  album: "album",
  book: "book",
  show: "film",
  activity: "hand",
  other: "sparkles",
};

const CATEGORY_EYEBROW: Record<string, string> = {
  activity: "Making & creating",
};

const ENTRY_FIELDS: Array<{ key: keyof LeadershipEntry; label: string }> = [
  { key: "whatSheDid", label: "What I took on" },
  { key: "whoItHelped", label: "Who it helped" },
];

// A story card for something she devised/ran as a Library Monitor — same
// shape as a Leadership entry (role, who it helped, what she learned), just
// shown here instead since it's project work rather than an ongoing role.
function LibraryMonitorProjectCard({ entry }: { entry: LeadershipEntry }) {
  return (
    <article
      className={cn(
        "grid gap-6 rounded-2xl border border-line bg-paper p-6 sm:p-8",
        entry.id === "book-blurb-challenge"
          ? "lg:grid-cols-[minmax(0,1fr)_300px]"
          : "lg:grid-cols-[minmax(0,1fr)_220px]",
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

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {ENTRY_FIELDS.map(({ key, label }) => {
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

// A small photo-story tile — for the rare "on my radar" entry that's
// actually something she did with her hands, not just something she's
// into. Deliberately modest: one row, not a cinematic hero, so it reads as
// "here's something else I did recently" rather than a major achievement.
function StoryItem({ item }: { item: BeyondItem }) {
  const [hero, ...rest] = item.images;

  return (
    <li className="overflow-hidden rounded-2xl border border-line bg-paper-raised">
      <div className="grid gap-0 sm:grid-cols-[220px_1fr]">
        {hero?.src ? (
          item.id === "finger-knitting" ? (
            <LightboxImage
              src={hero.src}
              alt={hero.alt}
              className="aspect-[4/3] w-full sm:aspect-auto sm:h-full"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={hero.src}
              alt={hero.alt}
              className={`w-full object-cover sm:aspect-auto sm:h-full ${
                // Tall portrait photo — use a taller frame on mobile, anchored near the
                // top, so both her head and the mandala stay in view.
                item.id === "mandala-painting"
                  ? "aspect-[4/5] object-[50%_5%]"
                  : "aspect-[4/3]"
              }`}
            />
          )
        ) : hero ? (
          <PlaceholderImage
            label={hero.alt}
            aspect="aspect-[4/3] sm:aspect-auto"
            className="w-full sm:h-full"
          />
        ) : null}
        <div className="p-6 sm:self-center">
          <span className="font-mono text-eyebrow tracking-wide text-accent-warm uppercase">
            {CATEGORY_EYEBROW[item.category] ?? item.category}
          </span>
          <p className="font-display mt-2 text-body-lg text-ink">{item.title}</p>
          {item.note ? <p className="mt-2 text-small text-ink-soft">{item.note}</p> : null}
          {item.reflection ? (
            <p className="mt-3 border-t border-line pt-3 text-small text-ink-soft italic">
              &ldquo;{item.reflection}&rdquo;
            </p>
          ) : null}
          {item.dateLabel ? <Tag className="mt-3">{item.dateLabel}</Tag> : null}

          {rest.length > 0 ? (
            <div className="mt-4 flex gap-2">
              {rest.map((image, index) =>
                image.src ? (
                  item.id === "finger-knitting" ? (
                    <LightboxImage
                      key={index}
                      src={image.src}
                      alt={image.alt}
                      className="aspect-square w-16 rounded-lg border border-line"
                    />
                  ) : (
                    <div key={index} className="h-16 w-16 overflow-hidden rounded-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="aspect-square w-16 border border-line object-cover"
                      />
                    </div>
                  )
                ) : (
                  <PlaceholderImage
                    key={index}
                    label={image.alt}
                    aspect="aspect-square"
                    className="w-16 rounded-lg p-1"
                  />
                ),
              )}
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}

// "Projects" — a container for three subsections: things she devised/ran as
// a Library Monitor, the "On my radar" stories (things outside the
// classroom she's into or has made), and a gallery of photos she's taken
// herself.
export function Projects() {
  const { intro: libraryMonitorIntro, items: libraryMonitorItems } = getLibraryMonitorProjects();
  const { intro: beyondIntro, items: beyondItems } = getBeyond();
  const { intro: photographyIntro, items: photographyItems } = getPhotography();

  return (
    <section
      id="projects"
      className="scroll-mt-16 relative overflow-hidden py-20 sm:py-28"
      style={{ background: "linear-gradient(180deg, #af4f4f 0%, #a54b4b 100%)" }}
    >
      {/* Soft burgundy splash — decorative only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(50% 40% at 90% 15%, var(--burgundy), transparent 70%)",
        }}
      />

      <Container className="relative">
        <SectionHeading title="My Projects" />

        <div className="mt-10">
          <SectionHeading
            eyebrow="Library Monitor"
            title="Library monitor projects"
            subtitle={libraryMonitorIntro}
            className="max-w-5xl"
          />

          <div className="mt-10 space-y-8">
            {libraryMonitorItems.length === 0 ? (
              <EmptyState message="[Add things she devised or ran as a Library Monitor — e.g. the Book Blurb Challenge.]" />
            ) : (
              libraryMonitorItems.map((entry, index) => (
                <Reveal key={entry.id} delay={index * 0.05}>
                  <LibraryMonitorProjectCard entry={entry} />
                </Reveal>
              ))
            )}
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-12 sm:mt-20 sm:pt-16">
          <SectionHeading
            eyebrow="Outside the classroom"
            title="Library activities I have participated in"
            subtitle={beyondIntro}
          />

          <div className="mt-10">
            {beyondItems.length === 0 ? (
              <EmptyState message="[Add movies, albums, books or shows she's currently into — this is meant to feel personal, not curated for a portfolio.]" />
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {beyondItems.map((item, index) => {
                  if (item.images.length > 0) {
                    return (
                      <Reveal
                        key={item.id}
                        delay={index * 0.04}
                        className="sm:col-span-2 lg:col-span-3"
                      >
                        <StoryItem item={item} />
                      </Reveal>
                    );
                  }

                  const Icon = getIcon(CATEGORY_ICON[item.category]);
                  return (
                    <Reveal key={item.id} delay={index * 0.04}>
                      <li className="flex h-full items-start gap-3 rounded-2xl border border-line bg-paper-raised p-5">
                        <Icon className="mt-1 h-5 w-5 shrink-0 text-accent-warm" aria-hidden="true" />
                        <div>
                          <p className="font-display text-body-lg text-ink">{item.title}</p>
                          {item.note ? (
                            <p className="mt-1 text-small text-ink-soft">{item.note}</p>
                          ) : null}
                          {item.dateLabel ? <Tag className="mt-2">{item.dateLabel}</Tag> : null}
                        </div>
                      </li>
                    </Reveal>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-12 sm:mt-20 sm:pt-16">
          <SectionHeading
            eyebrow="Behind the lens"
            title="Photos I've taken so far"
            subtitle={photographyIntro}
          />

          <div className="mt-10">
            {photographyItems.length === 0 ? (
              <EmptyState message="[Add photos she's taken herself.]" />
            ) : (
              <ul className="columns-1 gap-5 sm:columns-2">
                {photographyItems.map((item, index) => (
                  <Reveal key={item.id} delay={index * 0.04} className="mb-5 break-inside-avoid">
                    <li className="list-none overflow-hidden rounded-2xl border border-line bg-paper-raised">
                      {item.image.src ? (
                        // Full natural size, not forced into a fixed box —
                        // so nothing is cropped, whatever each photo's own
                        // shape is.
                        <LightboxImage
                          src={item.image.src}
                          alt={item.image.alt}
                          className="w-full"
                        />
                      ) : (
                        <PlaceholderImage label={item.image.alt} aspect="aspect-[3/2]" />
                      )}
                    </li>
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
