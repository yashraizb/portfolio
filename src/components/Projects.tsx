import { useState, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import { Github, Server, Train, Bot, Database, ExternalLink, FileSpreadsheet } from "lucide-react";

const projects = [
  {
    title: "BitTorrent CLI",
    description:
      "Built a fully-functional BitTorrent client from scratch, implementing the complete BitTorrent wire protocol. Designed peer-to-peer file transfer using TCP sockets, SHA-1 integrity verification, and multi-threaded concurrent piece downloading with request pipelining.",
    tech: ["Python", "TCP/IP", "WebSocket", "Multithreading", "SHA-1"],
    github: "https://github.com/yashraizb",
    icon: Server,
    featured: true,
    file: "bittorrent_client.py",
  },
  {
    title: "IRCTC Booking System",
    description:
      "Built a Django REST Framework–based booking system handling concurrent seat allocation and race conditions. Implemented JWT authentication, atomic database transactions, and rollback-safe booking flows with dynamic refund policies.",
    tech: ["Python", "Django", "DRF", "JWT", "PostgreSQL"],
    github: "https://github.com/yashraizb",
    icon: Train,
    featured: true,
    file: "booking_system.py",
  },
  {
    title: "AI Support Assistant",
    description:
      "Developed an AI-powered assistant leveraging Vertex AI Datastore and Gemini, automating user support workflows and cutting manual response effort by 50%.",
    tech: ["Python", "Vertex AI", "Gemini", "GCP", "FastAPI"],
    github: "https://github.com/yashraizb",
    icon: Bot,
    featured: false,
    file: "support_assistant.py",
  },
  {
    title: "Cloud Data Pipeline",
    description:
      "Built Apache Beam (Dataflow) pipelines processing large-scale datasets, migrating data from Cloud SQL to BigQuery and Elasticsearch, delivering 24× performance improvement.",
    tech: ["Apache Beam", "Dataflow", "BigQuery", "Elasticsearch"],
    github: "https://github.com/yashraizb",
    icon: Database,
    featured: false,
    file: "data_pipeline.py",
  },
  {
    title: "Spreadsheet MCP Agent",
    description:
      "Engineered an MCP-based system for querying structured data via natural language, converting queries to SQL with DuckDB and improving reliability using LLM-driven correction and retries.",
    tech: ["LLMs", "DuckDB", "MCP", "Python", "LangSmith"],
    github: "https://github.com/yashraizb/mcpflux",
    icon: FileSpreadsheet,
    featured: false,
    file: "mcp_agent.py",
  },
];

const TiltCard = ({ project }: { project: typeof projects[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const IconComponent = project.icon;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [-14, 14]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [14, -14]);
  const spotlightX = useTransform(springX, [-0.5, 0.5], ["10%", "90%"]);
  const spotlightY = useTransform(springY, [-0.5, 0.5], ["10%", "90%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      ref={cardRef}
      className="w-full h-full flex items-center justify-center p-8 md:p-12"
      style={{ perspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full max-w-lg rounded-2xl border border-border bg-card overflow-hidden shadow-2xl"
      >
        {/* Spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([x, y]) =>
                `radial-gradient(400px circle at ${x} ${y}, hsl(175 80% 50% / 0.12), transparent 70%)`
            ),
            opacity: 1,
          }}
        />

        <div className="relative z-10 p-8" style={{ transform: "translateZ(30px)" }}>
          {/* Header row */}
          <div className="flex items-start justify-between mb-6">
            <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <IconComponent className="h-7 w-7 text-primary" />
            </div>
            <div className="flex items-center gap-3">
              {project.featured && (
                <span className="font-mono text-xs text-primary border border-primary/30 rounded-full px-3 py-1">
                  Featured
                </span>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary text-muted-foreground transition-colors duration-200"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* File name tab */}
          <p className="font-mono text-xs text-muted-foreground mb-3">
            ~/projects/{project.file}
          </p>

          <h3 className="text-2xl font-bold mb-4">{project.title}</h3>

          <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs font-mono text-primary/80 bg-primary/10 rounded-full border border-primary/15"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom edge glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const [selected, setSelected] = useState(0);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });


  return (
    <section id="projects" className="py-32 relative z-[1]">
      <div className="container px-6">
        <div ref={headerRef} className="mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-primary text-sm mb-4 tracking-wider"
          >
            02. Projects
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold"
          >
            Things I've built
          </motion.h2>
        </div>

        {/* IDE Shell */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="rounded-xl border border-border overflow-hidden"
          style={{ minHeight: 520 }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-4 font-mono text-xs text-muted-foreground">
              projects / {projects[selected].file}
            </span>
          </div>

          <div className="flex flex-col md:flex-row" style={{ minHeight: 476 }}>
            {/* ── Left: File tree ── */}
            <div className="md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-border bg-card/60">
              {/* Explorer header */}
              <div className="px-4 py-3 border-b border-border">
                <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                  Explorer
                </p>
              </div>

              {/* Mobile: pill tabs */}
              <div className="flex gap-1 p-2 md:hidden overflow-x-auto">
                {projects.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.title}
                      onClick={() => setSelected(i)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-colors duration-200 ${
                        selected === i
                          ? "bg-primary/15 text-primary border border-primary/30"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                      {p.title}
                    </button>
                  );
                })}
              </div>

              {/* Desktop: file tree */}
              <div className="hidden md:block py-2">
                <div className="px-4 py-1.5">
                  <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
                    <span className="text-primary">▸</span> projects/
                  </span>
                </div>
                {projects.map((p, i) => {
                  const Icon = p.icon;
                  const isLast = i === projects.length - 1;
                  return (
                    <button
                      key={p.title}
                      onClick={() => setSelected(i)}
                      className={`w-full flex items-center gap-2 px-4 py-2 text-left transition-colors duration-150 relative ${
                        selected === i
                          ? "bg-primary/10 text-primary border-l-2 border-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5 border-l-2 border-transparent"
                      }`}
                    >
                      {/* Tree line */}
                      <span className="font-mono text-xs text-muted-foreground/40 select-none">
                        {isLast ? "└" : "├"}
                      </span>
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <span className="font-mono text-m truncate">{p.file}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Right: 3D Tilt Card ── */}
            <div className="flex-1 flex items-center justify-center bg-background/40 relative overflow-hidden">
              {/* Grid dots background */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, hsl(175 80% 50%) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  className="w-full h-full"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <TiltCard project={projects[selected]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
