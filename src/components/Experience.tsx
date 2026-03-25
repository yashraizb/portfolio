import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

const experiences = [
  {
    company: "EXL",
    role: "Consultant (Backend Engineering)",
    period: "Nov 2024 – Present",
    highlights: [
      "Automated data validation workflows for on-prem to cloud migrations using Apache Airflow",
      "Designed backend validation pipelines ensuring data accuracy during large-scale cloud migrations",
      "Built Power BI–based monitoring solution for Apache Airflow DAG runs, cutting manual reporting effort by 40%",
    ],
  },
  {
    company: "Quantiphi Analytics",
    role: "Senior Software Engineer (Backend / Data Engineering)",
    period: "Jul 2021 – Nov 2024",
    highlights: [
      "Engineered cloud-native, microservices-based backend systems using FastAPI and Django with Redis cache optimization",
      "Built Apache Beam pipelines delivering 24× performance improvement and 70% reduction in database calls",
      "Designed and implemented JWT-based authentication and RBAC for multi-role backend workflows",
      "Automated event-driven backend jobs using Cloud Scheduler and Pub/Sub",
      "Led sprint planning and delivery for a 7-member engineering team in Agile/Scrum",
      "Developed AI-powered assistant using Vertex AI and Gemini, reducing manual response effort by 50%",
    ],
  },
];

// ── Date helpers ───────────────────────────────────────────────────────────
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const EARLIEST = new Date(2021, 6, 1); // Jul 2021 — oldest experience start
const NOW = new Date();
const TOTAL_MONTHS =
  (NOW.getFullYear() - EARLIEST.getFullYear()) * 12 +
  (NOW.getMonth() - EARLIEST.getMonth());

function dateAtProgress(p: number): string {
  const offset = Math.round(p * TOTAL_MONTHS);
  const d = new Date(NOW.getFullYear(), NOW.getMonth() - offset, 1);
  return `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

// ── Per-experience item ────────────────────────────────────────────────────
const ExperienceItem = ({ exp }: { exp: (typeof experiences)[0] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-18% 0px -18% 0px" });

  return (
    <motion.div
      ref={ref}
      animate={{
        opacity: isInView ? 1 : 0.1,
        y: isInView ? 0 : 18,
        filter: isInView ? "blur(0px)" : "blur(3px)",
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="pl-8"
    >
      <h3 className="text-xl font-bold mb-1">
        {exp.role}{" "}
        <span className="text-primary">@ {exp.company}</span>
      </h3>
      <p className="font-mono text-sm text-muted-foreground mt-1">{exp.period}</p>

      <ul className="space-y-3 mt-4">
        {exp.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-3 text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-[0.45rem] shrink-0" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

// ── Section ────────────────────────────────────────────────────────────────
const Experience = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 25%"],
  });

  const spring = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Dot Y position in pixels — reads live container height on each tick
  const dotTop = useTransform(spring, (v) => {
    const h = lineRef.current?.offsetHeight ?? 0;
    return Math.max(0, v * (h - 12));
  });

  const lineScaleY = spring;

  // Rolling date state — updates whenever the month changes as dot moves
  const [dateState, setDateState] = useState({
    str: dateAtProgress(0),
    key: 0,
  });

  useMotionValueEvent(spring, "change", (v) => {
    const next = dateAtProgress(v);
    setDateState((prev) => {
      if (prev.str === next) return prev;
      return { str: next, key: prev.key + 1 };
    });
  });

  return (
    <section id="experience" className="py-32 relative bg-muted/30 z-[1]">
      <div className="container px-6">
        <div ref={headerRef} className="max-w-4xl mx-auto">

          {/* Header */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-primary text-sm mb-4 tracking-wider"
          >
            04. Experience
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-16"
          >
            Where I've worked
          </motion.h2>

          {/* ── Timeline ──────────────────────────────────────────────── */}
          {/* ml-28 gives the left-side ticker room; pl-24 on items clears the right of the dot */}
          <div ref={timelineRef} className="relative ml-28">

            {/* Vertical track + fill */}
            <div ref={lineRef} className="absolute left-0 top-0 bottom-0 w-px">
              <div className="absolute inset-0 bg-border/40" />
              <motion.div
                className="absolute top-0 left-0 right-0 bg-primary/50 origin-top"
                style={{ scaleY: lineScaleY, height: "100%" }}
              />
            </div>

            {/* Rolling ticker — to the LEFT of the line, right-aligned */}
            <motion.div
              className="absolute pointer-events-none overflow-hidden h-[1.6rem] text-right"
              style={{ top: dotTop, left: -116, width: 100 }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={dateState.key}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.16, ease: "easeInOut" }}
                  className="block font-mono text-base font-semibold text-primary whitespace-nowrap leading-none pt-[2px]"
                >
                  {dateState.str}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Dot — centered on the line at left: 0 */}
            <motion.div
              className="absolute w-[11px] h-[11px] rounded-full bg-primary pointer-events-none z-10"
              style={{ top: dotTop, left: -5 }}
            >
              <motion.span
                className="absolute inset-0 rounded-full bg-primary"
                animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Experience items */}
            <div className="space-y-28">
              {experiences.map((exp) => (
                <ExperienceItem key={exp.company} exp={exp} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
