import { useScroll, useTransform, motion } from "framer-motion";

const METEORS = [
  { left: "8%",  delay: "0s",    duration: "4s"   },
  { left: "18%", delay: "5.5s",  duration: "3.5s" },
  { left: "28%", delay: "1.8s",  duration: "5s"   },
  { left: "38%", delay: "7s",    duration: "4s"   },
  { left: "48%", delay: "3.5s",  duration: "3.5s" },
  { left: "58%", delay: "9s",    duration: "4.5s" },
  { left: "65%", delay: "0.8s",  duration: "5s"   },
  { left: "73%", delay: "6.5s",  duration: "3s"   },
  { left: "82%", delay: "2.5s",  duration: "4s"   },
  { left: "91%", delay: "4.5s",  duration: "3.5s" },
  { left: "12%", delay: "11s",   duration: "4.5s" },
  { left: "55%", delay: "12.5s", duration: "3s"   },
];

const MeteorBackground = () => {
  const { scrollY } = useScroll();
  // Fade out as user scrolls past the About section (~1600–2000px)
  const opacity = useTransform(scrollY, [1400, 1900], [1, 0]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ opacity, zIndex: 0 }}
    >
      {METEORS.map((m, i) => (
        <div
          key={i}
          className="meteor"
          style={{
            top: "-5%",
            left: m.left,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        />
      ))}
    </motion.div>
  );
};

export default MeteorBackground;
