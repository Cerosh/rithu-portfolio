import { Mail } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { getContact } from "@/lib/repositories/contact";

// Kept deliberately minimal for a school-aged student — a single,
// parent-monitored contact point rather than a phone number, address, or
// school name (brief §7, §16).
export function Contact() {
  const contact = getContact();

  return (
    <section id="contact" className="scroll-mt-16 border-t border-line py-20 sm:py-28">
      <Container className="max-w-3xl text-center">
        <SectionHeading eyebrow="Get in touch" title="Say hello" align="center" />

        <Reveal className="mt-8 flex flex-col items-center gap-4">
          {contact.formEmail ? (
            <a
              href={`mailto:${contact.formEmail}`}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-raised px-6 py-3 font-mono text-small text-ink transition-colors hover:border-accent-warm hover:text-accent-warm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-warm"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {contact.formEmail}
            </a>
          ) : (
            <p className="text-body text-ink-faint">
              [Add a single, parent-monitored contact email in content/contact.json]
            </p>
          )}
          {contact.note ? <p className="text-small text-ink-faint">{contact.note}</p> : null}
        </Reveal>
      </Container>
    </section>
  );
}
