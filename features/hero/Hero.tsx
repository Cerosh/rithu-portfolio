import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { Tag } from "@/components/common/Tag";
import { getProfile } from "@/lib/repositories/profile";

// The first screen of the story: who she is, where she is now, what excites
// her, and where she might be going — without pinning down a fixed career.
// See brief §5. All copy comes from content/profile.json; nothing here is
// invented.
export function Hero() {
  const profile = getProfile();

  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* Faint blueprint-style grid — decorative only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--line-strong) 1px, transparent 1px), linear-gradient(to bottom, var(--line-strong) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <Container className="relative py-20 sm:py-28">
        <Reveal>
          <p className="font-mono text-eyebrow tracking-wide text-accent-warm uppercase">
            {profile.gradeLabel} &middot; {profile.location}
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-display text-ink">
            {profile.firstName}
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-ink-soft">
            {profile.tagline ??
              "[Add tagline — a one-line sense of who she is, drawn from her own words]"}
          </p>
          {profile.introStatement ? (
            <p className="mt-4 max-w-2xl text-body text-ink-soft">{profile.introStatement}</p>
          ) : (
            <p className="mt-4 max-w-2xl text-body text-ink-faint">
              [Add an intro statement here once the resume is provided — e.g. what she&rsquo;s
              curious about, and the idea that her future is still taking shape.]
            </p>
          )}
        </Reveal>

        {profile.currentlyExploring.length > 0 ? (
          <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2">
            {profile.currentlyExploring.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
