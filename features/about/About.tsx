import Image from "next/image";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/EmptyState";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import { Tag } from "@/components/common/Tag";
import { getIcon } from "@/lib/icon-map";
import { getProfile } from "@/lib/repositories/profile";
import { getCuriosities } from "@/lib/repositories/curiosities";
import { getBooks } from "@/lib/repositories/books";

// "Tell her story as a person rather than repeating her résumé" (brief §7),
// followed by her intellectual curiosity — backed by evidence from the
// resume rather than generic claims (brief §7, §10) — as one combined
// "About" section rather than two separate stops in the nav.
export function About() {
  const profile = getProfile();
  const { intro: curiosityIntro, items: curiosities } = getCuriosities();
  const books = getBooks();
  const hasBooks = books.reviews.length > 0 || books.conversations.length > 0;

  return (
    <section
      id="about"
      className="scroll-mt-16 relative overflow-hidden py-20 sm:py-28"
      style={{ background: "linear-gradient(180deg, #c35858 0%, #b95453 100%)" }}
    >
      {/* Soft burgundy splash — decorative only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(50% 40% at 92% 85%, var(--burgundy), transparent 70%)",
        }}
      />

      <Container className="relative">
        <SectionHeading eyebrow="About" title="A little bit about me" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Reveal className="space-y-5">
            {profile.aboutParagraphs.length > 0 ? (
              profile.aboutParagraphs.map((paragraph, index) => (
                <p key={index} className="text-body-lg text-ink-soft">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-body-lg text-ink-faint">
                [Add a few paragraphs here, in her own voice — personality, what she enjoys
                learning, what motivates her, and what she values. This should read like a person
                talking, not a résumé.]
              </p>
            )}

            {profile.values.length > 0 ? (
              <div className="pt-2">
                <h3 className="font-mono text-eyebrow tracking-wide text-accent-warm uppercase">
                  My Skills
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {profile.values.map((value) => (
                    <Tag key={value}>{value}</Tag>
                  ))}
                </div>
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={0.1}>
            {profile.photo?.src ? (
              <Image
                src={profile.photo.src}
                alt={profile.photo.alt}
                width={320}
                height={400}
                className="w-full rounded-2xl border border-line object-cover"
              />
            ) : (
              <PlaceholderImage label="[Add a photo of her]" aspect="aspect-[4/5]" />
            )}
          </Reveal>
        </div>

        <div className="mt-16 border-t border-line pt-12 sm:mt-20 sm:pt-16">
          <SectionHeading
            eyebrow="Curious about"
            title="Things I'm curious about"
            subtitle={curiosityIntro}
          />

          <div className="mt-10">
            {curiosities.length === 0 ? (
              <EmptyState message="[Add curiosity areas here once the resume is provided — e.g. shapes, structures, problem-solving, design.]" />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {curiosities.map((item, index) => {
                  const Icon = getIcon(item.icon);
                  return (
                    <Reveal key={item.id} delay={index * 0.05}>
                      <article className="h-full rounded-2xl border border-line bg-paper-raised p-6">
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
                        {item.id === "photography" ? (
                          <p className="mt-4 border-t border-line pt-4 text-small text-ink-faint">
                            See some of my photos in{" "}
                            <a
                              href="#projects"
                              className="underline decoration-line underline-offset-2 hover:text-accent-warm"
                            >
                              My Projects
                            </a>
                            .
                          </p>
                        ) : null}
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </div>

          {hasBooks ? (
            <div className="mt-16 border-t border-line pt-12">
              <h3 className="font-display text-h3 text-ink">Books &amp; words</h3>
              {books.intro ? (
                <p className="mt-2 max-w-2xl text-body text-ink-soft">{books.intro}</p>
              ) : null}

              {books.reviews.length > 0 ? (
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {books.reviews.map((review, index) => (
                    <Reveal key={review.id} delay={index * 0.04}>
                      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper-raised">
                        {review.image?.src ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={review.image.src}
                            alt={review.image.alt}
                            className="aspect-square w-full object-cover"
                          />
                        ) : null}
                        <div className="flex flex-1 flex-col p-4">
                          <p className="font-display text-body-lg text-ink">{review.bookTitle}</p>
                          {review.author ? (
                            <p className="text-small text-ink-faint">{review.author}</p>
                          ) : null}
                          <p className="mt-2 flex-1 text-small text-ink-soft italic">
                            &ldquo;{review.excerpt}&rdquo;
                          </p>
                          {review.dateLabel ? (
                            <p className="mt-3 font-mono text-small text-ink-faint">
                              {review.dateLabel}
                            </p>
                          ) : null}
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              ) : null}

              {books.conversations.length > 0 ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {books.conversations.map((conversation, index) => (
                    <Reveal key={conversation.id} delay={index * 0.04}>
                      <article className="h-full rounded-2xl border border-line bg-paper p-5">
                        <p className="font-mono text-eyebrow tracking-wide text-accent-warm uppercase">
                          Book Week conversation starter
                        </p>
                        <p className="mt-2 text-small text-ink-faint">{conversation.prompt}</p>
                        <p className="mt-3 text-body text-ink-soft italic">
                          &ldquo;{conversation.response}&rdquo;
                        </p>
                        {conversation.dateLabel ? (
                          <p className="mt-3 font-mono text-small text-ink-faint">
                            {conversation.dateLabel}
                          </p>
                        ) : null}
                      </article>
                    </Reveal>
                  ))}
                </div>
              ) : null}

              <p className="mt-6 text-small text-ink-faint">
                I also devised and ran a school-wide Book Blurb Challenge — more on that in{" "}
                <a
                  href="#projects"
                  className="underline decoration-line underline-offset-2 hover:text-accent-warm"
                >
                  my projects
                </a>
                .
              </p>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
