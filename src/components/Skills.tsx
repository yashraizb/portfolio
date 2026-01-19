import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = {
  "Languages & Frameworks": ["Python", "C++", "FastAPI", "Django", "Flask", "REST APIs"],
  "Cloud & Data": ["GCP", "BigQuery", "Cloud SQL", "Dataflow", "Pub/Sub", "Apache Beam"],
  "Databases & Tools": ["PostgreSQL", "Redis", "Elasticsearch", "Docker", "Git", "PyTest"],
  "Security": ["JWT Authentication", "RBAC", "Secure API Design", "OAuth"],
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative bg-muted/30">
      <div className="container px-6">
        <div ref={ref} className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-primary text-sm mb-4 tracking-wider"
          >
            03. Skills
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-12"
          >
            Technologies I work with
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + categoryIndex * 0.1, duration: 0.6 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <h3 className="text-lg font-semibold mb-4 text-primary">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + categoryIndex * 0.1 + skillIndex * 0.05, duration: 0.4 }}
                      className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
