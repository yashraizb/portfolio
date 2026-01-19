import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured online store with cart functionality, payment integration, and admin dashboard.",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
    github: "#",
    live: "#",
  },
  {
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates and team workspaces.",
    tech: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
    github: "#",
    live: "#",
  },
  {
    title: "AI Chat Interface",
    description: "Modern chat application powered by AI with context-aware responses and memory.",
    tech: ["React", "OpenAI", "TailwindCSS", "Vercel"],
    github: "#",
    live: "#",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative"
    >
      <div className="relative h-full p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden">
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
            <div className="flex gap-3">
              <a 
                href={project.github}
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href={project.live}
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-muted-foreground mb-6 leading-relaxed">
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
