import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type TerminalPhase = "idle" | "init" | "compiling" | "complete";

const CYCLING = [
  "loading modules...",
  "resolving dependencies...",
  "compiling capabilities...",
  "binding interfaces...",
];

export const TerminalOverlay = ({ phase }: { phase: TerminalPhase }) => {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    if (phase !== "compiling") return;
    setMsgIdx(0);
    const iv = setInterval(() => setMsgIdx(i => (i + 1) % CYCLING.length), 520);
    return () => clearInterval(iv);
  }, [phase]);

  if (phase === "idle") return null;

  const isComplete = phase === "complete";
  const text =
    phase === "init"      ? "initializing system..." :
    phase === "compiling" ? CYCLING[msgIdx] :
                            "all systems operational";

  return (
    <div className="flex justify-center mt-8" style={{ zIndex: 10 }}>
      <div className="px-4 py-2 rounded-lg bg-card/80 border border-border/60 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          <motion.p
            key={isComplete ? "__done__" : text}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className={`font-mono text-xs ${isComplete ? "text-primary" : "text-muted-foreground"}`}
          >
            <span className="opacity-50 mr-1">{isComplete ? "✔" : ">"}</span>
            {text}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};
