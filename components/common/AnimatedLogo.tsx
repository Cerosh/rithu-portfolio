"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Her logo "drawing itself in" — a circular reveal (fitting, since it's a
// round medallion) rather than a literal per-letter trace, since that
// technique (see AnimatedSignature) needs real font outline data and this
// is a flat image. Replays every time it scrolls into view, same as the
// name in the Hero. Fully inert when the visitor has requested reduced
// motion (the logo just appears).
export function AnimatedLogo({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { once: false, amount: 0.6 });
  const wasInView = useRef(false);
  const isFirstRender = useRef(true);
  const [playKey, setPlayKey] = useState(0);

  useEffect(() => {
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
      <motion.img
        key={playKey}
        src={src}
        alt={alt}
        initial={
          prefersReducedMotion
            ? false
            : { clipPath: "circle(0% at 50% 50%)", opacity: 0, scale: 0.92 }
        }
        animate={{ clipPath: "circle(75% at 50% 50%)", opacity: 1, scale: 1 }}
        transition={
          prefersReducedMotion ? { duration: 0 } : { duration: 1.2, ease: "easeInOut" }
        }
        className="h-full w-full object-contain"
      />
    </div>
  );
}
