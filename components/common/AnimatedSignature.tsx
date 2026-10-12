"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { Signature } from "@/lib/signature";

const LETTER_DURATION = 0.5; // how long one letter's outline takes to trace
const LETTER_STAGGER = 0.085; // gap before the next letter starts tracing

// Her name, drawn with its real letterforms — each letter's actual outline
// (from the Dancing Script font file, via lib/signature.ts) is traced
// stroke-first, then the ink fills in, left to right. Replays every time
// this scrolls into view (page load, and again any time you scroll back up
// to the top), and sits out entirely if the visitor has asked for reduced
// motion.
export function AnimatedSignature({
  signature,
  label,
  className,
}: {
  signature: Signature;
  label: string;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { once: false, amount: 0.6 });
  const wasInView = useRef(false);
  const isFirstRender = useRef(true);
  const [playKey, setPlayKey] = useState(0);

  useEffect(() => {
    // The initial mount already plays the animation once (via initial ->
    // animate below) — skip re-triggering it here so it doesn't double-play
    // on first load.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      wasInView.current = isInView;
      return;
    }
    if (isInView && !wasInView.current) {
      setPlayKey((key) => key + 1);
    }
    wasInView.current = isInView;
  }, [isInView]);

  return (
    <div ref={wrapperRef} className={className}>
      {/* The SVG below is purely decorative — this is the accessible,
          SEO-visible page heading. */}
      <h1 className="sr-only">{label}</h1>
      <svg
        key={playKey}
        aria-hidden="true"
        viewBox={signature.viewBox}
        className="h-auto w-full max-w-3xl overflow-visible"
      >
        {signature.letters.map((letter, index) =>
          letter.d ? (
            <motion.path
              key={index}
              d={letter.d}
              transform={`translate(${letter.x} 0)`}
              stroke="currentColor"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="currentColor"
              initial={
                prefersReducedMotion ? false : { pathLength: 0, opacity: 1, fillOpacity: 0 }
              }
              animate={{ pathLength: 1, opacity: 1, fillOpacity: 1 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      pathLength: {
                        duration: LETTER_DURATION,
                        delay: index * LETTER_STAGGER,
                        ease: "easeInOut",
                      },
                      fillOpacity: {
                        duration: 0.3,
                        delay: index * LETTER_STAGGER + LETTER_DURATION * 0.55,
                        ease: "easeOut",
                      },
                    }
              }
            />
          ) : null,
        )}
      </svg>
    </div>
  );
}
