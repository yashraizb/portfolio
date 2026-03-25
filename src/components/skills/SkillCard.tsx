import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  name: string;
  skills: string[];
  /** ms after the 'compiling' phase starts before this card begins */
  startDelay: number;
  /** set true once the compiling phase is active */
  active: boolean;
  /** controls card fade-in (true during init/compiling/complete) */
  visible: boolean;
  onComplete: () => void;
}

export const SkillCard = ({ name, skills, startDelay, active, visible, onComplete }: Props) => {
  const [status, setStatus] = useState<"idle" | "compiling" | "done">("idle");
  const [visibleCount, setVisibleCount] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!active || doneRef.current) return;

    let cancelled = false;

    const t0 = setTimeout(() => {
      if (cancelled) return;
      setStatus("compiling");

      let i = 0;
      const step = () => {
        if (cancelled) return;
        if (i < skills.length) {
          i++;
          setVisibleCount(i);
          setTimeout(step, 290 + Math.random() * 40);
        } else {
          setTimeout(() => {
            if (cancelled) return;
            setStatus("done");
            if (!doneRef.current) {
              doneRef.current = true;
              onComplete();
            }
          }, 180);
        }
      };

      setTimeout(step, 80);
    }, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(t0);
    };
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="p-6 rounded-xl bg-card border border-border"
      style={{ zIndex: 1 }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between mb-4 min-h-[1.5rem]">
        <h3 className="text-sm font-semibold text-primary font-mono">{name}</h3>
        <AnimatePresence mode="wait">
          {status === "done" ? (
            <motion.span
              key="done"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="font-mono text-xs text-primary"
            >
              ✔ ready
            </motion.span>
          ) : status === "compiling" ? (
            <motion.span
              key="compiling"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="font-mono text-xs text-muted-foreground"
            >
              compiling...
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Skills — appear one by one */}
      <div className="flex flex-wrap gap-2 min-h-[2.75rem]">
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, y: 6 }}
            animate={i < visibleCount ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/15"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};
