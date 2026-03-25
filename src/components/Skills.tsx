import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ParticleBackground, type ParticlePhase } from "./skills/ParticleBackground";
import { SkillCard } from "./skills/SkillCard";
import { TerminalOverlay, type TerminalPhase } from "./skills/TerminalOverlay";

type Phase = "idle" | "init" | "compiling" | "complete";

const CATEGORIES = [
  {
    name: "Languages & APIs",
    skills: ["Python", "C++", "FastAPI", "Django", "Flask", "REST APIs"],
    delay: 0,
  },
  {
    name: "Cloud & Data",
    skills: ["GCP", "BigQuery", "Cloud SQL", "Dataflow", "Pub/Sub", "Apache Beam"],
    delay: 100,
  },
  {
    name: "Databases & Tools",
    skills: ["PostgreSQL", "Redis", "Elasticsearch", "Docker", "Git", "PyTest"],
    delay: 200,
  },
  {
    name: "Security",
    skills: ["JWT Authentication", "RBAC", "Secure API Design", "OAuth"],
    delay: 300,
  },
];

const TOTAL_CARDS = CATEGORIES.length;

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });
  const startedRef = useRef(false);

  const [phase, setPhase] = useState<Phase>("idle");
  const [completedCards, setCompletedCards] = useState(0);

  // Kick off animation sequence when section enters view
  useEffect(() => {
    if (!isInView || startedRef.current) return;
    startedRef.current = true;

    setPhase("init");
    const t = setTimeout(() => setPhase("compiling"), 400);
    return () => clearTimeout(t);
  }, [isInView]);

  // Advance to complete when all cards finish
  useEffect(() => {
    if (completedCards >= TOTAL_CARDS && phase === "compiling") {
      setPhase("complete");
    }
  }, [completedCards, phase]);

  const handleCardComplete = useCallback(() => {
    setCompletedCards(c => c + 1);
  }, []);

  const particlePhase: ParticlePhase =
    phase === "idle"     ? "idle"    :
    phase === "complete" ? "complete": "active";

  const terminalPhase: TerminalPhase = phase;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-32 relative bg-muted/30 overflow-hidden z-[1]"
    >
      {/* Layer 0 — particles */}
      {/* <ParticleBackground phase={particlePhase} /> */}

      {/* Layer 1+ — content */}
      <div className="container px-6 relative" style={{ zIndex: 2 }}>
        <div className="max-w-4xl mx-auto">

          {/* Section label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-primary text-sm mb-4 tracking-wider"
          >
            03. Skills
          </motion.p>

          {/* Section heading */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-12"
          >
            Technologies I work with
          </motion.h2>

          {/* 4 skill cards — compile in parallel */}
          <div className="grid md:grid-cols-2 gap-8">
            {CATEGORIES.map((cat) => (
              <SkillCard
                key={cat.name}
                name={cat.name}
                skills={cat.skills}
                startDelay={cat.delay}
                active={phase === "compiling" || phase === "complete"}
                visible={phase !== "idle"}
                onComplete={handleCardComplete}
              />
            ))}
          </div>

          {/* Terminal narrator — below the grid */}
          <TerminalOverlay phase={terminalPhase} />

        </div>
      </div>
    </section>
  );
};

export default Skills;
