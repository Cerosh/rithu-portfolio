import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/EmptyState";
import { getIcon } from "@/lib/icon-map";
import { getCuriosities } from "@/lib/repositories/curiosities";

// "Things I'm Curious About" — her intellectual curiosity, backed by
// evidence from the resume rather than generic claims (brief §7, §10).
export function Curiosity() {
  const { intro, items } = getCuriosities();

  return (
    <section id="curiosity" className="scroll-mt-16 border-t border-line bg-paper-raised py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Curious about"
          title="Things I'm curious about"
          subtitle={intro}
        />

        <div className="mt-10">
          {items.length === 0 ? (
            <EmptyState message="[Add curiosity areas here once the resume is provided — e.g. shapes, structures, problem-solving, design.]" />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => {
                const Icon = getIcon(item.icon);
                return (
                  <Reveal key={item.id} delay={index * 0.05}>
                    <article className="h-full rounded-2xl border border-line bg-paper p-6">
                      <Icon className="h-6 w-6 text-accent-warm" aria-hidden="true" />
                      <h3 className="font-display mt-4 text-h3 text-ink">{item.title}</h3>
                      <p className="mt-2 text-body text-ink-soft">{item.description}</p>
                      {item.evidence.length > 0 ? (
                        <ul className="mt-4 space-y-1 border-t border-line pt-4 font-mono text-small text-ink-faint">
                          {item.evidence.map((line, i) => (
                            <li key={i}>&middot; {line}</li>
                          ))}
                        </ul>
                      ) : null}
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
