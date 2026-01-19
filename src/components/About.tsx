import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Briefcase, GraduationCap } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative">
      <div className="container px-6">
        <div ref={ref} className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-primary text-sm mb-4 tracking-wider"
          >
            01. About Me
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-8"
          >
            A bit about myself
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="md:col-span-2 space-y-4 text-muted-foreground"
            >
              <p className="text-lg leading-relaxed">
                I'm a Backend Engineer with 4+ years of experience building cloud-native APIs, 
                secure backend systems, and data-intensive pipelines. I specialize in Python 
                technologies like FastAPI, Django, and Flask, deployed on Google Cloud Platform.
              </p>
              <p className="text-lg leading-relaxed">
                I've delivered significant performance improvements including a 24× boost in 
                processing speed and 70% reduction in database load. I have a strong track 
                record of owning backend systems end-to-end in remote, async, and fast-paced environments.
              </p>
              <p className="text-lg leading-relaxed">
                My expertise includes designing JWT-based authentication, RBAC systems, 
                microservices architecture, and building scalable data pipelines using 
                Apache Beam on Google Cloud Dataflow.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase className="text-primary" size={20} />
                  <span className="font-semibold">Experience</span>
                </div>
                <p className="text-muted-foreground text-sm">4+ Years</p>
              </div>
              
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <GraduationCap className="text-primary" size={20} />
                  <span className="font-semibold">Education</span>
                </div>
                <p className="text-muted-foreground text-sm">B.Tech in Computer Science</p>
                <p className="text-muted-foreground text-xs">CGPA: 8.11</p>
              </div>
              
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="text-primary" size={20} />
                  <span className="font-semibold">Certification</span>
                </div>
                <p className="text-muted-foreground text-sm">GCP Associate Cloud Engineer</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
