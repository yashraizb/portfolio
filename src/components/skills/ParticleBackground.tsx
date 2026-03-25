import { useRef, useEffect } from "react";

export type ParticlePhase = "idle" | "active" | "complete";

// Matrix character set — katakana + hex digits + symbols
const CHARS =
  "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ" +
  "0123456789ABCDEF<>[]{}!@#$%";

const FONT_SIZE = 14;
const COL_SPACING = 18;

// Background color of the section (hsl 220 15% 12% ≈ rgb 24,27,35) — used for overlay
const BG = "rgba(14,16,22,0.08)";

interface Column {
  x: number;
  y: number;       // head row index
  nextStep: number; // timestamp for next character drop
  stepMs: number;  // ms between drops (controls speed per column)
}

interface Props {
  phase: ParticlePhase;
}

export const ParticleBackground = ({ phase }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const stateRef = useRef({
    phase: "idle" as ParticlePhase,
    phaseStart: 0,
    cols: [] as Column[],
    running: true,
  });

  useEffect(() => {
    stateRef.current.phase = phase;
    stateRef.current.phaseStart = performance.now();
  }, [phase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const buildCols = () => {
      const W = canvas.width;
      const H = canvas.height;
      const count = Math.floor(W / COL_SPACING);
      stateRef.current.cols = Array.from({ length: count }, (_, i) => ({
        x: i * COL_SPACING + 4,
        y: -Math.floor(Math.random() * 30),   // stagger start heights
        nextStep: performance.now() + Math.random() * 1200, // stagger activation
        stepMs: 20 + Math.random() * 35,       // 20–55 ms per step
      }));
    };

    const syncSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      buildCols();
    };

    const ro = new ResizeObserver(syncSize);
    ro.observe(canvas);
    syncSize();

    const tick = (ts: number) => {
      const { phase, phaseStart, cols } = stateRef.current;
      const H = canvas.height;
      const W = canvas.width;

      if (phase === "idle") {
        // clear and wait
        ctx.clearRect(0, 0, W, H);
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // Fade-out on complete — drive canvas CSS opacity
      if (phase === "complete") {
        const age = ts - phaseStart;
        const fadeMs = 700;
        const opacity = Math.max(0, 1 - age / fadeMs);
        canvas.style.opacity = String(opacity);
        if (opacity <= 0) {
          ctx.clearRect(0, 0, W, H);
          // stop looping once fully faded
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
      } else {
        canvas.style.opacity = "1";
      }

      // ── Matrix rain ────────────────────────────────────────────────────
      // Semi-transparent overlay fades previous characters toward background
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;
      ctx.textBaseline = "top";

      for (const col of cols) {
        if (ts < col.nextStep) continue;

        // Pick a random character
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const yPx = col.y * FONT_SIZE;

        // Bright "head" character — near-white cyan
        ctx.fillStyle = "hsl(175, 85%, 90%)";
        ctx.fillText(char, col.x, yPx);

        // Second character slightly dimmer — softens the head edge
        if (col.y > 0) {
          ctx.fillStyle = "hsl(175, 75%, 65%)";
          ctx.fillText(
            CHARS[Math.floor(Math.random() * CHARS.length)],
            col.x,
            (col.y - 1) * FONT_SIZE
          );
        }

        // Advance head
        col.y++;

        // Reset column when it drops off the bottom (+ random trail length)
        const trailRows = 18 + Math.floor(Math.random() * 12);
        if (col.y * FONT_SIZE > H + trailRows * FONT_SIZE) {
          col.y = -Math.floor(Math.random() * 20);
          col.stepMs = 20 + Math.random() * 35; // re-randomise speed
        }

        col.nextStep = ts + col.stepMs;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0 }}
    />
  );
};
