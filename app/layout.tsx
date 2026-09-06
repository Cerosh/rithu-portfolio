import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { getProfile } from "@/lib/repositories/profile";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "[Add name] — Portfolio",
    template: "%s — [Add name]",
  },
  description:
    "A growing portfolio: curiosity, problem-solving, music, and the things I'm exploring — currently a Year 9 student in Sydney.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const profile = getProfile();

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body id="top" className="flex min-h-screen flex-col bg-paper font-sans text-ink">
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
