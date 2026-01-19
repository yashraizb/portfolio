import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 relative">
      <div className="container px-6">
        <div ref={ref} className="max-w-2xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-primary text-sm mb-4 tracking-wider"
          >
            04. Contact
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Let's work together
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-muted-foreground mb-10 leading-relaxed"
          >
            I'm currently open to new opportunities and interesting projects. 
            Whether you have a question or just want to say hi, my inbox is always open.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Button 
              variant="hero" 
              size="lg" 
              asChild
            >
              <a href="mailto:hello@example.com">
                <Mail className="mr-2 h-5 w-5" />
                Say Hello
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
