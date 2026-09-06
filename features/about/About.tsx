import Image from "next/image";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import { Tag } from "@/components/common/Tag";
import { getProfile } from "@/lib/repositories/profile";

// "Tell her story as a person rather than repeating her résumé" (brief §7).
export function About() {
  const profile = getProfile();

  return (
    <section id="about" className="scroll-mt-16 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="About" title="Who I am" />

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
              <div className="flex flex-wrap gap-2 pt-2">
                {profile.values.map((value) => (
                  <Tag key={value}>{value}</Tag>
                ))}
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
      </Container>
    </section>
  );
}
