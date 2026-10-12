import type { Metadata } from "next";
import { Dancing_Script, Jost, JetBrains_Mono } from "next/font/google";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { getProfile } from "@/lib/repositories/profile";
import "./globals.css";

// Headings — a calligraphy/script style, per Rithu's request.
const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Body copy — "Century Gothic" itself isn't licensed for web embedding /
// not on Google Fonts, so Jost (a free geometric-sans font commonly used as
// a Century Gothic substitute, very close in shape) stands in for it.
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const profile = getProfile();

export const metadata: Metadata = {
  title: {
    default: `${profile.firstName} — Portfolio`,
    template: `%s — ${profile.firstName}`,
  },
  description:
    "A growing portfolio: curiosity, problem-solving, music, and the things I'm exploring — currently a Year 9 student in Sydney.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dancingScript.variable} ${jost.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body
        id="top"
        className="flex min-h-screen flex-col bg-paper font-sans text-ink"
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only rounded-md bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
        >
          Skip to content
        </a>
        <NavBar firstName={profile.firstName} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer firstName={profile.firstName} />
      </body>
    </html>
  );
}
