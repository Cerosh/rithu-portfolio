"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { HTMLAttributes } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

// framer-motion's event props (drag/animation handlers) have incompatible
// signatures with React's DOM equivalents — exclude them so the rest of
// HTMLAttributes can be safely spread onto both the plain div and
// motion.div branches below.
type RevealProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
> & { delay?: number };

// Wraps a section in a gentle fade/rise on scroll into view. Fully inert
// when the visitor has requested reduced motion (content just appears).
export function Reveal({ children, delay = 0, className, ...rest }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
