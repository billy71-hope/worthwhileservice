import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Eyebrow, Reveal, SplitTitle, ease } from "./ui.jsx";

const specs = [
  ["Moteurs", "Diesel, injection mécanique & électronique"],
  ["Hydraulique", "Pompes, vérins, distributeurs, flexibles"],
  ["Transmission", "Embrayage, boîte, ponts, réducteurs"],
  ["Châssis", "Freinage, suspension, direction, soudure"],
];

export default function Craft() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section className="section craft" id="savoir-faire" ref={ref} aria-labelledby="craft-title">
      <div className="wrap craft-grid">
        <motion.figure className="craft-art" style={{ y }}>
          <div className="craft-frame">
            {/* Chantier de la Cité Ministérielle, Cotonou — Charbel1719, CC BY-SA 4.0 (Wikimedia Commons) */}
            <motion.video
              className="craft-video"
              src="media/grue-cotonou.mp4"
              autoPlay={!reduceMotion}
              muted loop playsInline preload="auto"
              aria-hidden="true"
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease }}
            />
            <span className="frame-tag"><span className="live-dot" /> Chantier Cotonou</span>
          </div>
          <figcaption>Grue sur le chantier de la Cité Ministérielle, Cotonou</figcaption>
        </motion.figure>

        <div className="craft-text">
          <Eyebrow>02 — Savoir-faire</Eyebrow>
          <SplitTitle id="craft-title" className="section-title" text={"Le geste juste,\nla mesure exacte."} gold={["exacte."]} />
          <Reveal as="p" delay={0.1}>
            Un engin lourd ne pardonne pas l'approximation. Chaque intervention suit un protocole : contrôle avant démontage, mesure des jeux et des pressions, remplacement des pièces aux couples de serrage constructeur, essai en charge avant restitution.
          </Reveal>
          <Reveal as="p" delay={0.2}>
            Nos mécaniciens travaillent sur toutes les marques de poids lourds et d'engins de chantier : tracteurs routiers, porteurs, bennes, chargeuses, pelles, niveleuses.
          </Reveal>
          <dl className="spec-list">
            {specs.map(([dt, dd], i) => (
              <motion.div
                key={dt}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease }}
                whileHover={{ x: 8 }}
              >
                <dt>{dt}</dt><dd>{dd}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
