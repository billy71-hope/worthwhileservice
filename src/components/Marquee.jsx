import { motion, useScroll, useTransform } from "framer-motion";

const words = ["Diagnostic électronique", "Moteur diesel", "Hydraulique", "Transmission", "Freinage pneumatique", "Intervention sur site", "Toutes marques"];

export default function Marquee() {
  const { scrollYProgress } = useScroll();
  const drift = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const row = [...words, ...words];

  return (
    <div className="marquee" aria-hidden="true">
      <motion.div className="marquee-track" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
        <motion.div className="marquee-row" style={{ x: drift }}>
          {[...row, ...row].map((w, i) => (
            <span key={i}>{w}<i>✦</i></span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
