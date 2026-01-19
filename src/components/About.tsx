import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
                I'm a passionate developer with 5+ years of experience building web applications 
                that are both beautiful and functional. I believe in writing clean, maintainable 
                code that stands the test of time.
              </p>
              <p className="text-lg leading-relaxed">
                My journey started with curiosity about how websites work, and has evolved into 
                a deep love for creating digital experiences that make a difference. I specialize 
                in React, TypeScript, and modern web technologies.
              </p>
              <p className="text-lg leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-lg bg-gradient-to-br from-muted to-card border border-border overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">👨‍💻</span>
                </div>
              </div>
              <div className="absolute -inset-1 rounded-lg border-2 border-primary/30 -z-10 translate-x-3 translate-y-3" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
