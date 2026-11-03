import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Eyebrow, SplitTitle, ease } from "./ui.jsx";

const steps = [
  ["Diagnostic", "Contrôle visuel, lecture des défauts, essais. On identifie la cause, pas seulement le symptôme."],
  ["Devis", "Un chiffrage détaillé pièces et main-d'œuvre, avec le délai d'immobilisation annoncé. Vous validez avant toute intervention."],
  ["Intervention", "Réparation à l'atelier ou sur site, selon les standards constructeur. Essai en charge avant restitution."],
  ["Suivi", "Compte rendu d'intervention, recommandations et rappel de la prochaine échéance d'entretien."],
];

export default function Method() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section className="section method" id="methode" aria-labelledby="method-title">
      <div className="wrap">
        <header className="section-head">
          <Eyebrow>03 — Méthode</Eyebrow>
          <SplitTitle id="method-title" className="section-title" text={"Un process en quatre temps.\nAucune surprise."} gold={["surprise."]} />
        </header>

        <div className="timeline" ref={ref}>
          <div className="timeline-track" aria-hidden="true">
            <motion.div className="timeline-fill" style={{ scaleY: progress }} />
          </div>
          <ol>
          {steps.map(([title, text], i) => (
            <motion.li
              key={title}
              className="step"
              initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.9, ease }}
            >
              <motion.span
                className="step-dot"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.2 }}
              >
                {i + 1}
              </motion.span>
              <div className="step-card">
                <span className="step-code">Étape 0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </motion.li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
