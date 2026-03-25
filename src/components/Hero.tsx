import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

// ── Sequenced typewriter hook ──────────────────────────────────────────────
function useSequencedTyping(
  entries: Array<{ text: string; charDelay: number }>,
  pauseBetween = 300,
  initialDelay = 500
) {
  const [displayed, setDisplayed] = useState(entries.map(() => ""));
  const [step, setStep] = useState(-1);

  useEffect(() => {
    const t = setTimeout(() => setStep(0), initialDelay);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (step < 0 || step >= entries.length) return;
    const { text, charDelay } = entries[step];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed((prev) => {
        const next = [...prev];
        next[step] = text.slice(0, i);
        return next;
      });
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => setStep((s) => s + 1), pauseBetween);
      }
    }, charDelay);
    return () => clearInterval(interval);
  }, [step]);

  return {
    displayed,
    activeStep: step,
    done: step >= entries.length,
  };
}

// ── Blinking cursor ────────────────────────────────────────────────────────
const Cursor = () => (
  <span
    className="inline-block w-[2px] bg-primary ml-[3px] align-middle"
    style={{ height: "0.8em", animation: "blink 1s step-end infinite" }}
  />
);

// ── Hero ───────────────────────────────────────────────────────────────────
const DESCRIPTION =
  "Backend Engineer with 4+ years of experience building cloud-native APIs, secure systems, and data-intensive pipelines on GCP.";

const Hero = () => {
  const { displayed, activeStep, done } = useSequencedTyping([
    { text: "Hello, I'm",  charDelay: 65 },
    { text: "Yash Rai",    charDelay: 95 },
    { text: DESCRIPTION,   charDelay: 40 },
  ]);

  // Split name to preserve gradient on "Rai" (starts at index 5)
  const nameLine    = displayed[1];
  const nameNormal  = nameLine.slice(0, 5);   // "Yash " (or partial)
  const nameGradient = nameLine.slice(5);     // "Rai" chars typed so far

  return (
    <section className="relative z-[1] min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30"
        style={{ background: "var(--gradient-glow)" }}
      />

      <div className="container relative z-10 px-6">
        <div className="max-w-4xl">

          {/* Line 1 — greeting */}
          <p className="font-mono text-primary mb-4 text-sm tracking-wider min-h-[1.25rem]">
            {displayed[0]}
            {activeStep === 0 && <Cursor />}
          </p>

          {/* Line 2 — name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight min-h-[1.2em]">
            {nameNormal}
            {nameGradient && (
              <span className="text-gradient">{nameGradient}</span>
            )}
            {activeStep === 1 && <Cursor />}
          </h1>

          {/* Line 3 — description */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8 leading-relaxed min-h-[2em]">
            {displayed[2]}
            {activeStep === 2 && <Cursor />}
          </p>

          {/* Buttons — fade in after all typing done */}
          <motion.div
            animate={{ opacity: done ? 1 : 0, y: done ? 0 : 10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Button variant="hero" size="lg" asChild>
              <a href="#projects">
                View Projects
                <ArrowDown className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </motion.div>

          {/* Social links — fade in after buttons */}
          <motion.div
            animate={{ opacity: done ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex gap-4"
          >
            <a
              href="https://github.com/yashraizb"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors duration-300"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/yashrai0202"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors duration-300"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:yash.rai.zb0202@gmail.com"
              className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors duration-300"
            >
              <Mail className="h-5 w-5" />
            </a>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ opacity: done ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
