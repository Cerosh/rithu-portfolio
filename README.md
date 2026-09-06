# Rithu's Portfolio

A personal portfolio site, built as a living document that grows year over year — not a one-time résumé site. Next.js (App Router) + Tailwind, with all real content stored as validated JSON files so the site can be extended without touching component code.

## Getting started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How content works

Every fact on the site comes from a file in `content/*.json`. Nothing is hardcoded in a component, and nothing should be invented — a missing fact should be `null` (or an empty array), which the page renders as an honest, visible placeholder like `[Add project image here]` rather than made-up copy.

| File | Section | What it holds |
| --- | --- | --- |
| `content/profile.json` | Home / About | Name, grade, location, tagline, about paragraphs, values, photo |
| `content/curiosities.json` | Things I'm curious about | Curiosity areas with evidence |
| `content/projects.json` | Projects | What it was / what she did / why it mattered / what she learned / what she'd do differently |
| `content/music.json` | Music | Performances, community involvement, reflections |
| `content/leadership.json` | Leadership & Community | Role, who it helped, what changed, what she learned |
| `content/beyond.json` | Beyond School | Movies, albums, books currently on her radar |
| `content/growing.json` | Growing | Short, ongoing reflections ("something I learned...") |
| `content/timeline.json` | Growing | The Year 9 → University roadmap |
| `content/future.json` | My Future | Why engineering, aspiration, women-in-engineering reflection |
| `content/resume.json` | Resume | Path to the downloadable PDF |
| `content/contact.json` | Contact | A single, parent-monitored contact email |

Each file is validated against a schema in `lib/schemas/content.ts`. To add or edit content:

1. Edit the relevant `content/*.json` file.
2. Drop any referenced images into `public/images/` (or the resume PDF into `public/resume/`) and reference them by path, e.g. `"/images/violin-recital.jpg"`.
3. Run `npm run validate:content` — this catches typos, missing required fields, and image paths that don't point to a real file, before they ever reach the live site.

No component changes are needed to add a new project, a new music entry, a new reflection, etc. — just add an entry to the array in the relevant JSON file.

## Adding a new section in future years

The pattern is always the same: a Zod schema in `lib/schemas/content.ts` → a `content/*.json` file → a loader in `lib/repositories/` → a component in `features/`. Follow an existing one (e.g. `leadership`) as a template.

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript
- `npm run validate:content` — validates all `content/*.json` files and checks referenced image/resume files exist

## Privacy notes

This is a minor's public-facing site. By design:

- Only a first name is shown publicly (see `content/profile.json`).
- No school name, address, phone number, or exact date of birth is collected anywhere in the content schema.
- The only contact method is a single email in `content/contact.json`, intended to be a parent-monitored inbox.

Keep it that way when adding new content.
