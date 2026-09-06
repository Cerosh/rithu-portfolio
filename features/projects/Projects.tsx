import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/EmptyState";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import { Tag } from "@/components/common/Tag";
import { getProjects } from "@/lib/repositories/projects";
import type { Project } from "@/lib/schemas/content";

const FIELDS: Array<{ key: keyof Project; label: string }> = [
  { key: "whatItWas", label: "What it was" },
  { key: "whatSheDid", label: "What I did" },
  { key: "whyItMattered", label: "Why it mattered" },
  { key: "whatSheLearned", label: "What I learned" },
  { key: "whatNextTime", label: "What I'd do differently" },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="grid gap-6 rounded-2xl border border-line bg-paper p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_260px]">
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-h3 text-ink">{project.title}</h3>
          {project.dateLabel ? (
            <span className="font-mono text-small text-ink-faint">{project.dateLabel}</span>
          ) : null}
        </div>

        {project.tags.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        ) : null}

        <p className="mt-4 text-body-lg text-ink-soft">{project.summary}</p>

        <dl className="mt-6 space-y-4 border-t border-line pt-6">
          {FIELDS.map(({ key, label }) => {
            const value = project[key];
            if (Array.isArray(value)) return null;
            return (
              <div key={key}>
                <dt className="font-mono text-eyebrow tracking-wide text-accent-warm uppercase">
                  {label}
                </dt>
                <dd className="mt-1 text-body text-ink-soft">
                  {typeof value === "string" ? value : `[Add "${label.toLowerCase()}"]`}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>

      {project.images.length > 0 ? (
        <div className="space-y-3">
          {project.images.map((image, index) =>
            image.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                className="w-full rounded-xl border border-line object-cover"
              />
            ) : (
              <PlaceholderImage key={index} label={image.alt} />
            ),
          )}
        </div>
      ) : (
        <PlaceholderImage label="[Add project image here]" />
      )}
    </article>
  );
}

// "Do not invent projects." Each real entry explains what it was, what she
// did, why it mattered, what she learned, and what she'd do differently —
// emphasis on thinking, not on dressing up school activities (brief §7).
export function Projects() {
  const { intro, items } = getProjects();

  return (
    <section id="projects" className="scroll-mt-16 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Projects" title="Things I've done" subtitle={intro} />

        <div className="mt-10 space-y-8">
          {items.length === 0 ? (
            <EmptyState message="[Add real projects/activities here once the resume is provided. Nothing invented — genuine work only.]" />
          ) : (
            items.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.05}>
                <ProjectCard project={project} />
              </Reveal>
            ))
          )}
        </div>
      </Container>
    </section>
  );
}
