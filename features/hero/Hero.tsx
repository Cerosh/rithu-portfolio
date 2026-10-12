import { AnimatedSignature } from "@/components/common/AnimatedSignature";
import { Container } from "@/components/common/Container";
import { GeometryMusicField } from "@/components/common/GeometryMusicField";
import { Reveal } from "@/components/common/Reveal";
import { Tag } from "@/components/common/Tag";
import { getProfile } from "@/lib/repositories/profile";
import { getSignature } from "@/lib/signature";

// The first screen of the story: who she is, where she is now, what excites
// her, and where she might be going — without pinning down a fixed career.
// See brief §5. All copy comes from content/profile.json; nothing here is
// invented.
export function Hero() {
  const profile = getProfile();
  const signature = getSignature(profile.fullName);

  return (
    <section
      className="relative overflow-hidden border-b border-line"
      style={{ background: "linear-gradient(180deg, #cd5c5c 0%, #c35858 100%)" }}
    >
      {/* Soft burgundy splash — decorative only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(55% 45% at 88% 12%, var(--burgundy), transparent 70%), radial-gradient(45% 40% at 6% 95%, var(--burgundy), transparent 70%)",
        }}
      />

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

      {/* Geometric shapes drifting with a smaller number of music marks —
          decorative only. See components/common/GeometryMusicField.tsx. */}
      <GeometryMusicField />

      <Container className="relative z-10 py-20 sm:py-28">
        <Reveal>
          <p className="font-mono text-eyebrow tracking-wide text-accent-warm uppercase">
            {profile.gradeLabel} &middot; {profile.location}
          </p>
          <AnimatedSignature
            signature={signature}
            label={profile.fullName}
            className="mt-4 text-ink"
          />
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
