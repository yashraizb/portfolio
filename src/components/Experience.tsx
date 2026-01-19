import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 relative bg-muted/30">
      <div className="container px-6">
        <div ref={ref} className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-primary text-sm mb-4 tracking-wider"
          >
            04. Experience
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-12"
          >
            Where I've worked
          </motion.h2>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
                className="relative pl-8 border-l-2 border-primary/30"
              >
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-primary" />
                
                <div className="mb-2">
                  <h3 className="text-xl font-bold">
                    {exp.role}{" "}
                    <span className="text-primary">@ {exp.company}</span>
                  </h3>
                  <p className="font-mono text-sm text-muted-foreground">{exp.period}</p>
                </div>
                
                <ul className="space-y-3 mt-4">
                  {exp.highlights.map((highlight, hIndex) => (
                    <motion.li
                      key={hIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.15 + hIndex * 0.05, duration: 0.4 }}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
