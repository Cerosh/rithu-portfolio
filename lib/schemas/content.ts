import { z } from "zod";

// Every content/*.json file is validated against one of these schemas before
// it ever reaches a component. This is the mechanism that enforces "no
// fabricated or invented content" mechanically — malformed, incomplete, or
// missing content fails loudly at dev/build time instead of silently
// rendering broken or made-up UI. See scripts/validate-content.ts.
//
// Nullable string fields are the sanctioned way to represent "not written
// yet" — components must render an honest placeholder when they see null,
// never invented copy. Empty arrays are valid and mean "nothing here yet."

const imageSchema = z.object({
  src: z.string().min(1).nullable(),
  alt: z.string().min(1),
  caption: z.string().min(1).nullable().default(null),
});

export const profileSchema = z.object({
  firstName: z.string().min(1),
  gradeLabel: z.string().min(1), // e.g. "Year 9"
  location: z.string().min(1), // city-level only, e.g. "Sydney, Australia"
  tagline: z.string().min(1).nullable(),
  introStatement: z.string().min(1).nullable(),
  currentlyExploring: z.array(z.string().min(1)).default([]),
  // Free-form narrative for the About section — one entry per paragraph, in
  // her own voice. Kept as an array rather than named fields (bio/values/
  // motivation, etc.) so the story can be told however it naturally comes
  // out, without the schema presupposing its shape.
  aboutParagraphs: z.array(z.string().min(1)).default([]),
  values: z.array(z.string().min(1)).default([]),
  photo: imageSchema.nullable(),
});

export const curiositySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  icon: z.string().min(1), // lucide-react icon name, resolved via lib/icon-map.ts
  description: z.string().min(1),
  evidence: z.array(z.string().min(1)).default([]),
});

export const curiositiesFileSchema = z.object({
  intro: z.string().min(1).nullable(),
  items: z.array(curiositySchema).default([]),
});

// A short book review she's written (published through the school library),
// or a Book Week conversation-starter she personally answered. Deliberately
// lightweight — an excerpt, not the full review — this lives inside the
// Curious About section rather than as its own nav item (brief: "Books &
// Words").
export const bookReviewSchema = z.object({
  id: z.string().min(1),
  bookTitle: z.string().min(1),
  author: z.string().min(1).nullable(),
  dateLabel: z.string().min(1).nullable(), // e.g. "Year 9"
  excerpt: z.string().min(1), // a short quoted excerpt from her review, not the full text
  image: imageSchema.nullable().default(null),
});

export const bookConversationSchema = z.object({
  id: z.string().min(1),
  prompt: z.string().min(1), // the Book Week conversation-starter question
  response: z.string().min(1), // her actual, attributed answer
  dateLabel: z.string().min(1).nullable(),
});

export const booksFileSchema = z.object({
  intro: z.string().min(1).nullable(),
  reviews: z.array(bookReviewSchema).default([]),
  conversations: z.array(bookConversationSchema).default([]),
});

export const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  dateLabel: z.string().min(1).nullable(), // e.g. "Year 9, Term 2"
  tags: z.array(z.string().min(1)).default([]),
  summary: z.string().min(1),
  whatItWas: z.string().min(1).nullable(),
  whatSheDid: z.string().min(1).nullable(),
  whyItMattered: z.string().min(1).nullable(),
  whatSheLearned: z.string().min(1).nullable(),
  whatNextTime: z.string().min(1).nullable(),
  images: z.array(imageSchema).default([]),
});

export const projectsFileSchema = z.object({
  intro: z.string().min(1).nullable(),
  items: z.array(projectSchema).default([]),
});

export const musicEntrySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  type: z.enum(["performance", "community", "practice", "milestone"]),
  dateLabel: z.string().min(1).nullable(),
  description: z.string().min(1),
  reflection: z.string().min(1).nullable(),
  images: z.array(imageSchema).default([]),
  // Optional video for an entry — images[0] doubles as the poster frame, so
  // the video itself is never fetched until a visitor presses play.
  video: z
    .object({
      src: z.string().min(1),
    })
    .nullable()
    .default(null),
});

export const musicFileSchema = z.object({
  intro: z.string().min(1).nullable(),
  items: z.array(musicEntrySchema).default([]),
});

export const leadershipEntrySchema = z.object({
  id: z.string().min(1),
  role: z.string().min(1),
  organisation: z.string().min(1).nullable(),
  dateLabel: z.string().min(1).nullable(),
  whatSheDid: z.string().min(1).nullable(),
  whoItHelped: z.string().min(1).nullable(),
  whatChanged: z.string().min(1).nullable(),
  whatSheLearned: z.string().min(1).nullable(),
  // Optional evidence photo(s) — most entries have none; the few stories
  // with real photographic evidence (a mentoring session, an event she ran)
  // get one hero image, not a gallery.
  images: z.array(imageSchema).default([]),
});

export const leadershipFileSchema = z.object({
  intro: z.string().min(1).nullable(),
  items: z.array(leadershipEntrySchema).default([]),
});

export const beyondItemSchema = z.object({
  id: z.string().min(1),
  category: z.enum(["movie", "album", "book", "show", "activity", "other"]),
  title: z.string().min(1),
  note: z.string().min(1).nullable(),
  dateLabel: z.string().min(1).nullable(),
  // Most "on my radar" items (a movie, an album) carry no photos and render
  // as a plain tile. An item with photos — something she actually did, not
  // just something she's into — renders as a small photo-story tile instead.
  images: z.array(imageSchema).default([]),
  reflection: z.string().min(1).nullable().default(null),
});

export const beyondFileSchema = z.object({
  intro: z.string().min(1).nullable(),
  items: z.array(beyondItemSchema).default([]),
});

export const growingEntrySchema = z.object({
  id: z.string().min(1),
  prompt: z.enum(["learned", "surprised", "stuck", "reflection"]),
  dateLabel: z.string().min(1).nullable(),
  entry: z.string().min(1),
});

export const growingFileSchema = z.object({
  intro: z.string().min(1).nullable(),
  items: z.array(growingEntrySchema).default([]),
});

export const futureSchema = z.object({
  whyEngineering: z.string().min(1).nullable(),
  aspirationStatement: z.string().min(1).nullable(),
  womenInEngineeringNote: z.string().min(1).nullable(),
  // Evidence photos for the milestone that kicked this section off (Dare to
  // Dream) — a small hero + supporting image, not a gallery.
  images: z.array(imageSchema).default([]),
});

export const timelineStageSchema = z.object({
  id: z.string().min(1),
  stage: z.string().min(1), // e.g. "Year 9"
  year: z.string().regex(/^\d{4}$/).nullable(),
  status: z.enum(["past", "current", "upcoming"]),
  headline: z.string().min(1).nullable(),
  description: z.string().min(1).nullable(),
});

export const timelineFileSchema = z.object({
  items: z.array(timelineStageSchema).default([]),
});

export const resumeSchema = z.object({
  fileSrc: z.string().min(1).nullable(),
  label: z.string().min(1),
  lastUpdated: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullable(),
});

export const contactSchema = z.object({
  formEmail: z.string().email().nullable(),
  note: z.string().min(1).nullable(),
  socialLinks: z
    .array(
      z.object({
        platform: z.string().min(1),
        label: z.string().min(1),
        url: z.string().url(),
      }),
    )
    .default([]),
});

export type Profile = z.infer<typeof profileSchema>;
export type Curiosity = z.infer<typeof curiositySchema>;
export type CuriositiesFile = z.infer<typeof curiositiesFileSchema>;
export type BookReview = z.infer<typeof bookReviewSchema>;
export type BookConversation = z.infer<typeof bookConversationSchema>;
export type BooksFile = z.infer<typeof booksFileSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ProjectsFile = z.infer<typeof projectsFileSchema>;
export type MusicEntry = z.infer<typeof musicEntrySchema>;
export type MusicFile = z.infer<typeof musicFileSchema>;
export type LeadershipEntry = z.infer<typeof leadershipEntrySchema>;
export type LeadershipFile = z.infer<typeof leadershipFileSchema>;
export type BeyondItem = z.infer<typeof beyondItemSchema>;
export type BeyondFile = z.infer<typeof beyondFileSchema>;
export type GrowingEntry = z.infer<typeof growingEntrySchema>;
export type GrowingFile = z.infer<typeof growingFileSchema>;
export type Future = z.infer<typeof futureSchema>;
export type TimelineStage = z.infer<typeof timelineStageSchema>;
export type TimelineFile = z.infer<typeof timelineFileSchema>;
export type Resume = z.infer<typeof resumeSchema>;
export type Contact = z.infer<typeof contactSchema>;
