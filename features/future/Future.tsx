import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { getFuture } from "@/lib/repositories/future";

// Aspiration, not a predetermined career (brief §5, §10, §11). Nothing here
// should read as "Future Civil Engineer" — the evidence in the other
// sections should already have made that case; this section is her own
// reflection on why the idea interests her.
export function Future() {
  const future = getFuture();

  return (
    <section id="future" className="scroll-mt-16 border-t border-line py-20 sm:py-28">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Looking ahead" title="My future (so far)" />

        {future.images.length > 0 ? (
          <Reveal className="mt-10 grid gap-3 sm:grid-cols-[1.4fr_1fr]">
            {future.images.map((image, index) =>
              image.src ? (
                <figure key={index} className={index === 0 ? "sm:row-span-2" : undefined}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full rounded-2xl border border-line object-cover"
                  />
                  {image.caption ? (
                    <figcaption className="mt-2 font-mono text-small text-ink-faint">
                      {image.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null,
            )}
          </Reveal>
        ) : null}

        <div className="mt-10 space-y-8">
          <Reveal>
            <h3 className="font-mono text-eyebrow tracking-wide text-accent-warm uppercase">
              Why engineering?
            </h3>
            <p className="mt-2 text-body-lg text-ink-soft">
              {future.whyEngineering ??
                "[In her own words — why the idea of engineering interests her, grounded in what she's already shown a pull toward, not a fabricated inspirational story.]"}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h3 className="font-mono text-eyebrow tracking-wide text-accent-warm uppercase">
              Where I might be headed
            </h3>
            <p className="mt-2 text-body-lg text-ink-soft">
              {future.aspirationStatement ??
                "[Add a statement that keeps the future open — an emerging interest, not a decided path.]"}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="font-mono text-eyebrow tracking-wide text-accent-warm uppercase">
              Women in engineering
            </h3>
            <p className="mt-2 text-body-lg text-ink-soft">
              {future.womenInEngineeringNote ??
                "[Add her own reflection on why this matters to her — framed as wanting to explore and contribute, not as a slogan.]"}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
