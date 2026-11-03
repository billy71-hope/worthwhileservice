import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Magnetic, SplitTitle, ease } from "./ui.jsx";

export default function Hero() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const yArt = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Spotlight qui suit le pointeur + inclinaison de la carte
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, rgba(125,196,240,.35), transparent 60%)`;
  const rx = useSpring(useTransform(my, [0, 100], [8, -8]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 100], [-10, 10]), { stiffness: 120, damping: 20 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <section className="hero" id="top" ref={ref} onPointerMove={onMove} aria-labelledby="hero-title">
      <motion.div className="hero-spotlight" style={{ background: spotlight }} aria-hidden="true" />
      <div className="aurora" aria-hidden="true">
        <motion.span className="blob b1" animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.15, 0.95, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
        <motion.span className="blob b2" animate={{ x: [0, -70, 50, 0], y: [0, 50, -30, 0], scale: [1, 0.9, 1.1, 1] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
        <motion.span className="blob b3" animate={{ x: [0, 40, -60, 0], y: [0, 30, -50, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
      </div>
      <div className="grid-bg" aria-hidden="true" />

      <div className="wrap hero-grid">
        <motion.div className="hero-copy" style={{ y: yText, opacity: fade }}>
          <SplitTitle
            as="h1"
            id="hero-title" className="hero-title"
            text={"Vos engins tournent.\nOn s'en porte garant."}
            gold={["garant."]}
            delay={0.35}
          />

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1 }}
          >
            Diagnostic électronique, réparation mécanique et intervention sur site pour camions, tracteurs routiers et engins de chantier. Moins d'immobilisation, plus de rendement.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.15 }}
          >
            <Magnetic>
              <a className="btn btn-gold" href="#rendez-vous">
                Prendre rendez-vous <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a className="btn btn-ghost" href="#expertises">Voir nos expertises</a>
            </Magnetic>
          </motion.div>

          <motion.dl
            className="hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <div><dt>Base</dt><dd>Abomey-Calavi / Hêvié</dd></div>
            <div><dt>Urgence 24/7</dt><dd><a href="tel:+2290151125456">01 51 12 54 56</a></dd></div>
          </motion.dl>
        </motion.div>

        <motion.div className="hero-art" style={{ y: yArt }}>
          <motion.div
            className="art-card"
            style={{ rotateX: rx, rotateY: ry }}
            initial={{ opacity: 0, scale: 0.85, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.3, ease, delay: 0.5 }}
          >
            <div className="art-shine" aria-hidden="true" />
            {/* Passage supérieur au marché Dantokpa, Cotonou — Adoscam, CC BY-SA 4.0 (Wikimedia Commons) */}
            <motion.video
              className="truck"
              src="media/trafic-cotonou.mp4"
              autoPlay={!reduceMotion}
              muted loop playsInline preload="auto"
              aria-hidden="true"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease, delay: 0.8 }}
            />
            <span className="frame-tag"><span className="live-dot" /> En circulation</span>
          </motion.div>

          <motion.div className="float-chip chip-a" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0, y: [0, -12, 0] }} transition={{ opacity: { delay: 1.8 }, x: { delay: 1.8, duration: 0.8, ease }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}>
            <b>24/7</b><span>Assistance mobile</span>
          </motion.div>
          <motion.div className="float-chip chip-b" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0, y: [0, 14, 0] }} transition={{ opacity: { delay: 2 }, x: { delay: 2, duration: 0.8, ease }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}>
            <b className="gold-text">20+</b><span>Techniciens</span>
          </motion.div>        </motion.div>
      </div>

      <motion.a href="#expertises" className="scroll-cue" style={{ opacity: fade }} aria-label="Défiler vers les expertises">
        <motion.span animate={{ y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
      </motion.a>
    </section>
  );
}
