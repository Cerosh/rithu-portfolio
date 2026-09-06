import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/EmptyState";
import { Tag } from "@/components/common/Tag";
import { getIcon } from "@/lib/icon-map";
import { getBeyond } from "@/lib/repositories/beyond";

const CATEGORY_ICON: Record<string, string> = {
  movie: "film",
  album: "album",
  book: "book",
  show: "film",
  other: "sparkles",
};

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
