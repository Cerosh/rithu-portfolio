import { Download } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { getResume } from "@/lib/repositories/resume";
import { formatDateDMY } from "@/lib/utils";

export function Resume() {
  const resume = getResume();

  return (
    <section
      id="resume"
      className="scroll-mt-16 border-t border-line py-20 sm:py-28"
      style={{ background: "linear-gradient(180deg, #873e3e 0%, #7d3a39 100%)" }}
    >
      <Container className="max-w-3xl text-center">
        <SectionHeading eyebrow="Resume" title="Downloadable resume" align="center" />

        <Reveal className="mt-8 flex flex-col items-center gap-3">
          {resume.fileSrc ? (
            <a
              href={resume.fileSrc}
              download
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-mono text-small text-paper transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-warm"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {resume.label}
            </a>
          ) : (
            <p className="text-body text-ink-faint">
              [Add the resume PDF to /public/resume and set content/resume.json → fileSrc]
            </p>
          )}
          {resume.lastUpdated ? (
            <p className="font-mono text-small text-ink-faint">
              Last updated {formatDateDMY(resume.lastUpdated)}
            </p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
