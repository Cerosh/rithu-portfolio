import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/EmptyState";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import { Tag } from "@/components/common/Tag";
import { getIcon } from "@/lib/icon-map";
import { getBeyond } from "@/lib/repositories/beyond";
import type { BeyondItem } from "@/lib/schemas/content";

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
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero.src}
            alt={hero.alt}
            className="aspect-[4/3] w-full object-cover sm:aspect-auto sm:h-full"
          />
        ) : hero ? (
          <PlaceholderImage
            label={hero.alt}
            aspect="aspect-[4/3] sm:aspect-auto"
            className="w-full sm:h-full"
          />
        ) : null}
        <div className="p-6">
          <span className="font-mono text-eyebrow tracking-wide text-accent-warm uppercase">
            {CATEGORY_EYEBROW[item.category] ?? item.category}
          </span>
          <p className="font-display mt-2 text-body-lg text-ink">{item.title}</p>
          {item.note ? <p className="mt-2 text-small text-ink-soft">{item.note}</p> : null}
          {item.reflection ? (
            <p className="mt-3 border-t border-line pt-3 text-small text-ink-soft italic">
              &ldquo;{item.reflection}&rdquo;
            </p>
          ) : (
            <p className="mt-3 border-t border-line pt-3 text-small text-ink-faint">
              [Add Rithu&rsquo;s reflection here — what she enjoyed, or what she&rsquo;d try
              making next]
            </p>
          )}
          {item.dateLabel ? <Tag className="mt-3">{item.dateLabel}</Tag> : null}

          {rest.length > 0 ? (
            <div className="mt-4 flex gap-2">
              {rest.map((image, index) =>
                image.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    className="aspect-square w-16 rounded-lg border border-line object-cover"
                  />
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

// A teenager is allowed to just love movies and music — this section exists
// so not every interest has to sound career-related (brief §2).
export function Beyond() {
  const { intro, items } = getBeyond();

  return (
    <section id="beyond" className="scroll-mt-16 border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Outside the classroom"
          title="On my radar"
          subtitle={intro ?? "Things I'm currently into — no career angle required."}
        />

        <div className="mt-10">
          {items.length === 0 ? (
            <EmptyState message="[Add movies, albums, books or shows she's currently into — this is meant to feel personal, not curated for a portfolio.]" />
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => {
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
                        {item.dateLabel ? (
                          <Tag className="mt-2">{item.dateLabel}</Tag>
                        ) : null}
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
