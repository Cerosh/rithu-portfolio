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
    <section
      id="contact"
      className="scroll-mt-16 relative overflow-hidden border-t border-line py-20 sm:py-28"
      style={{ background: "linear-gradient(180deg, #7d3a39 0%, #733635 100%)" }}
    >
      {/* Soft burgundy splash — decorative only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(50% 40% at 85% 20%, var(--burgundy), transparent 70%)",
        }}
      />

      <Container className="relative max-w-3xl text-center">
        <SectionHeading eyebrow="Get in touch" title="Say hello" align="center" />

        <Reveal className="mt-8 flex flex-col items-center gap-4">
          {contact.formEmail ? (
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contact.formEmail)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-raised px-6 py-3 font-mono text-small text-ink underline decoration-line underline-offset-4 transition-colors hover:border-accent-warm hover:text-accent-warm hover:decoration-accent-warm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-warm"
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
