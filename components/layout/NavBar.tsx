"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#curiosity", label: "Curious About" },
  { href: "#projects", label: "Projects" },
  { href: "#music", label: "Music" },
  { href: "#leadership", label: "Leadership" },
  { href: "#beyond", label: "Beyond School" },
  { href: "#growing", label: "Growing" },
  { href: "#future", label: "My Future" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

export function NavBar({ firstName }: { firstName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-lg font-semibold text-ink">
          {firstName}
        </a>

        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-small text-ink-soft">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-sm transition-colors hover:text-accent-warm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-warm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-ink lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-warm"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </Container>

      <nav
        id="mobile-nav"
        aria-label="Primary"
        className={cn(
          "overflow-hidden border-t border-line bg-paper transition-[max-height] duration-300 lg:hidden",
          isOpen ? "max-h-[28rem]" : "max-h-0 border-t-0",
        )}
      >
        <Container>
          <ul className="flex flex-col divide-y divide-line py-2 font-mono text-small text-ink-soft">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block px-1 py-3"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </header>
  );
}
