"use client";

import { useEffect, useRef } from "react";

// A quiet backdrop for the Hero: a handful of drawn geometric shapes
// (circles, squares, triangles — the dominant visual language) drifting
// slowly, alongside a smaller number of music marks (notes, an occasional
// treble clef, a faint staff fragment) that nod to violin/church-music life
// without turning the page into a music site. See AGENTS.md "Music +
// Geometry" for the brief this implements.
//
// Roughly every 20–30s, five of the elements — one of each: circle, eighth
// note, triangle, beamed note, square — drift toward a shared line, hold
// briefly with thin connecting strokes between them, then separate again.
// That's the one place the two systems are allowed to visibly touch.

type GeometryKind = "circle" | "square" | "triangle";
type MusicKind = "eighth" | "beamed" | "quarter" | "clef";
type Kind = GeometryKind | MusicKind;

const MUSIC_GLYPHS: Record<MusicKind, string> = {
  eighth: "♪", // ♪
  beamed: "♫", // ♫
  quarter: "♩", // ♩
  clef: "𝄞", // 𝄞
};

interface Particle {
  kind: Kind;
  isMusic: boolean;
  size: number;
  opacity: number;
  tint: string;
  homeX: number; // normalized 0..1
  homeY: number; // normalized 0..1
  seed: number;
  speed: number;
  ampX: number;
  ampY: number;
  rotSpeed: number;
  rotOffset: number;
}

const INK_SOFT = "31, 42, 43"; // --ink rgb-ish, used at low alpha
const INK_FAINT = "82, 96, 95"; // --ink-soft
const ACCENT_WARM = "193, 89, 47"; // --accent-warm

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function makeGeometry(kind: GeometryKind, count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    kind,
    isMusic: false,
    size: rand(6, 12),
    opacity: rand(0.12, 0.28),
    tint: Math.random() < 0.18 ? ACCENT_WARM : INK_FAINT,
    homeX: rand(0.04, 0.96),
    homeY: rand(0.08, 0.92),
    seed: rand(0, Math.PI * 2),
    speed: rand(0.05, 0.11),
    ampX: rand(0.015, 0.035),
    ampY: rand(0.015, 0.035),
    rotSpeed: rand(-0.05, 0.05),
    rotOffset: rand(0, Math.PI * 2),
  }));
}

function makeMusic(kind: MusicKind, count: number, sizeRange: [number, number], opacityRange: [number, number]): Particle[] {
  return Array.from({ length: count }, () => ({
    kind,
    isMusic: true,
    size: rand(sizeRange[0], sizeRange[1]),
    opacity: rand(opacityRange[0], opacityRange[1]),
    tint: INK_SOFT,
    homeX: rand(0.06, 0.94),
    homeY: rand(0.1, 0.85),
    seed: rand(0, Math.PI * 2),
    speed: rand(0.04, 0.08),
    ampX: rand(0.012, 0.026),
    ampY: rand(0.012, 0.026),
    rotSpeed: 0,
    rotOffset: 0,
  }));
}

function buildParticles(): Particle[] {
  return [
    ...makeGeometry("circle", 4),
    ...makeGeometry("square", 4),
    ...makeGeometry("triangle", 4),
    ...makeMusic("eighth", 2, [15, 19], [0.16, 0.26]),
    ...makeMusic("beamed", 1, [16, 20], [0.16, 0.24]),
    ...makeMusic("quarter", 1, [14, 17], [0.14, 0.22]),
    ...makeMusic("clef", 1, [20, 24], [0.1, 0.15]),
  ];
}

function drawGeometry(ctx: CanvasRenderingContext2D, p: Particle, x: number, y: number, angle: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.strokeStyle = `rgba(${p.tint}, ${p.opacity})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  if (p.kind === "circle") {
    ctx.arc(0, 0, p.size, 0, Math.PI * 2);
  } else if (p.kind === "square") {
    ctx.rect(-p.size, -p.size, p.size * 2, p.size * 2);
  } else {
    const r = p.size * 1.15;
    ctx.moveTo(0, -r);
    ctx.lineTo(r * 0.87, r * 0.6);
    ctx.lineTo(-r * 0.87, r * 0.6);
    ctx.closePath();
  }
  ctx.stroke();
  ctx.restore();
}

function drawMusic(ctx: CanvasRenderingContext2D, p: Particle, x: number, y: number) {
  ctx.save();
  ctx.font = `${p.size}px "JetBrains Mono", ui-monospace, monospace`;
  ctx.fillStyle = `rgba(${p.tint}, ${p.opacity})`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(MUSIC_GLYPHS[p.kind as MusicKind], x, y);
  ctx.restore();
}

function drawStaffFragment(ctx: CanvasRenderingContext2D, cx: number, cy: number, width: number, opacity: number) {
  ctx.save();
  ctx.strokeStyle = `rgba(${INK_FAINT}, ${opacity})`;
  ctx.lineWidth = 1;
  for (let i = -2; i <= 2; i++) {
    const y = cy + i * 4.5;
    ctx.beginPath();
    ctx.moveTo(cx - width / 2, y);
    ctx.lineTo(cx + width / 2, y);
    ctx.stroke();
  }
  ctx.restore();
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const STORY_ORDER: Kind[] = ["circle", "eighth", "triangle", "beamed", "square"];
const CONVERGE_MS = 3200;
const HOLD_MS = 2600;
const DIVERGE_MS = 3200;
const IDLE_MIN_MS = 16000;
const IDLE_MAX_MS = 28000;

export function GeometryMusicField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const container = canvas.parentElement;
    if (!container) return;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const particles = buildParticles();
    const storyIndices = STORY_ORDER.map((kind) => particles.findIndex((p) => p.kind === kind));

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function drawStaticFrame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      drawStaffFragment(ctx, width * 0.85, height * 0.18, 46, 0.05);
      for (const p of particles) {
        const x = p.homeX * width;
        const y = p.homeY * height;
        if (p.isMusic) drawMusic(ctx, p, x, y);
        else drawGeometry(ctx, p, x, y, p.rotOffset);
      }
    }

    function resize() {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Resizing the canvas clears its bitmap — redraw immediately when the
      // animation loop isn't the one doing that on every frame.
      if (reduceMotionQuery.matches) drawStaticFrame();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    // Static, reduced-motion frame: draw once (resize() keeps it redrawn).
    if (reduceMotionQuery.matches) {
      return () => resizeObserver.disconnect();
    }

    let rafId = 0;
    let running = true;
    let storyPhase: "idle" | "converge" | "hold" | "diverge" = "idle";
    let phaseStart = performance.now();
    let idleDuration = rand(IDLE_MIN_MS, IDLE_MAX_MS);
    let alignY = 0.5;
    let alignSpan = 0.5;

    function handleVisibility() {
      running = document.visibilityState === "visible";
      if (running) rafId = requestAnimationFrame(tick);
      else cancelAnimationFrame(rafId);
    }
    document.addEventListener("visibilitychange", handleVisibility);

    function tick(now: number) {
      if (!running || !ctx) return;
      const t = now / 1000;
      ctx.clearRect(0, 0, width, height);

      drawStaffFragment(
        ctx,
        width * 0.85,
        height * 0.18,
        46,
        0.045 + 0.015 * Math.sin(t * 0.15),
      );

      const elapsed = now - phaseStart;
      let storyProgress = 0;
      if (storyPhase === "converge") storyProgress = Math.min(1, elapsed / CONVERGE_MS);
      else if (storyPhase === "hold") storyProgress = 1;
      else if (storyPhase === "diverge") storyProgress = 1 - Math.min(1, elapsed / DIVERGE_MS);

      const eased = easeInOutCubic(storyProgress);

      // Advance the story state machine.
      if (storyPhase === "idle" && elapsed > idleDuration) {
        storyPhase = "converge";
        phaseStart = now;
        alignY = rand(0.38, 0.6);
        alignSpan = rand(0.42, 0.62);
      } else if (storyPhase === "converge" && elapsed > CONVERGE_MS) {
        storyPhase = "hold";
        phaseStart = now;
      } else if (storyPhase === "hold" && elapsed > HOLD_MS) {
        storyPhase = "diverge";
        phaseStart = now;
      } else if (storyPhase === "diverge" && elapsed > DIVERGE_MS) {
        storyPhase = "idle";
        phaseStart = now;
        idleDuration = rand(IDLE_MIN_MS, IDLE_MAX_MS);
        // Re-home the story members so they don't snap back identically.
        for (const idx of storyIndices) {
          if (idx < 0) continue;
          particles[idx].homeX = rand(0.06, 0.94);
          particles[idx].homeY = rand(0.1, 0.85);
        }
      }

      const alignPoints: { x: number; y: number }[] = [];

      particles.forEach((p, i) => {
        const drift = t * p.speed + p.seed;
        const organicX = (p.homeX + p.ampX * Math.sin(drift)) * width;
        const organicY = (p.homeY + p.ampY * Math.cos(drift * 1.3)) * height;

        const storySlot = storyIndices.indexOf(i);
        let x = organicX;
        let y = organicY;

        if (storySlot !== -1 && eased > 0) {
          const n = storyIndices.length;
          const targetX = (0.5 - alignSpan / 2 + (alignSpan * storySlot) / (n - 1)) * width;
          const targetY = alignY * height;
          x = organicX + (targetX - organicX) * eased;
          y = organicY + (targetY - organicY) * eased;
        }

        if (storySlot !== -1) alignPoints[storySlot] = { x, y };

        if (p.isMusic) {
          drawMusic(ctx, p, x, y);
        } else {
          const angle = p.rotOffset + t * p.rotSpeed;
          drawGeometry(ctx, p, x, y, angle);
        }
      });

      if (eased > 0.05 && alignPoints.length === STORY_ORDER.length) {
        ctx.save();
        ctx.strokeStyle = `rgba(${ACCENT_WARM}, ${0.16 * eased})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        alignPoints.forEach((pt, i) => {
          if (!pt) return;
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
        ctx.restore();
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 block h-full w-full"
    />
  );
}
