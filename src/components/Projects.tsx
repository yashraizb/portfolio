import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Server, Train, Bot, Database } from "lucide-react";

const projects = [
  {
    title: "BitTorrent CLI",
    description: "Built a fully-functional BitTorrent client from scratch, implementing the complete BitTorrent wire protocol. Designed peer-to-peer file transfer using TCP sockets, SHA-1 integrity verification, and multi-threaded concurrent piece downloading with request pipelining.",
    tech: ["Python", "TCP/IP", "WebSocket", "Multithreading", "SHA-1"],
    github: "https://github.com/yashraizb",
    icon: Server,
    featured: true,
  },
  {
    title: "IRCTC Booking System",
    description: "Built a Django REST Framework–based booking system handling concurrent seat allocation and race conditions. Implemented JWT authentication, atomic database transactions, and rollback-safe booking flows with dynamic refund policies.",
    tech: ["Python", "Django", "DRF", "JWT", "PostgreSQL"],
    github: "https://github.com/yashraizb",
    icon: Train,
    featured: true,
  },
  {
    title: "AI-Powered Support Assistant",
    description: "Developed an AI-powered assistant leveraging Vertex AI Datastore and Gemini, automating user support workflows and cutting manual response effort by 50%.",
    tech: ["Python", "Vertex AI", "Gemini", "GCP", "FastAPI"],
    github: "https://github.com/yashraizb",
    icon: Bot,
    featured: false,
  },
  {
    title: "Cloud Data Pipeline",
    description: "Built Apache Beam (Dataflow) pipelines processing large-scale datasets, migrating data from Cloud SQL to BigQuery and Elasticsearch, delivering 24× performance improvement.",
    tech: ["Apache Beam", "Dataflow", "BigQuery", "Elasticsearch"],
    github: "https://github.com/yashraizb",
    icon: Database,
    featured: false,
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const IconComponent = project.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative"
    >
      <div className={`relative h-full p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden ${project.featured ? 'md:col-span-2' : ''}`}>
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {project.featured && (
          <span className="absolute top-4 right-4 text-primary font-mono text-xs">Featured</span>
        )}
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <IconComponent className="h-6 w-6 text-primary" />
            </div>
            <div className="flex gap-3">
              <a 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1 text-xs font-mono text-primary/80 bg-primary/10 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 relative">
      <div className="container px-6">
        <div ref={headerRef} className="max-w-4xl mx-auto mb-16">
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
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
