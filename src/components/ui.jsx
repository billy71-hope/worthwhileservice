import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1];

// Apparition au scroll, en cascade via `delay`
export function Reveal({ children, delay = 0, y = 40, as = "div", ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.9, delay, ease }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Titre révélé mot par mot, chaque mot sort d'un masque
export function SplitTitle({ text, className, as = "h2", delay = 0, gold = [], id }) {
  const Tag = motion[as];
  const lines = text.split("\n");
  let i = 0;
  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {lines.map((line, li) => (
        <span className="line" key={li}>
          {line.split(" ").map((word) => {
            const k = i++;
            return (
              <span key={k}>
                <span className="word-mask">
                  <motion.span
                    className={gold.includes(word) ? "word gold-text" : "word"}
                    variants={{ hidden: { y: "110%", rotate: 4 }, show: { y: "0%", rotate: 0 } }}
                    transition={{ duration: 0.9, ease }}
                  >
                    {word}
                  </motion.span>
                </span>{" "}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

// Bouton qui suit légèrement le pointeur
export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} className="magnetic" style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }) {
  return (
    <Reveal as="p" className="eyebrow" y={20}>
      <span className="eyebrow-dot" />
      {children}
    </Reveal>
  );
}
