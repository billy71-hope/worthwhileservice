import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Eyebrow, Reveal, SplitTitle } from "./ui.jsx";

const items = [
  {
    title: "Maintenance préventive",
    desc: "Plans d'entretien calés sur les heures moteur et le kilométrage. Vidanges, filtration, graissage, contrôle des circuits hydrauliques et pneumatiques avant la panne, pas après.",
    specs: ["Vidange & filtration", "Freinage pneumatique", "Circuits hydrauliques", "Carnet d'entretien"],
    icon: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6M12 9a3 3 0 100 6 3 3 0 000-6z",
  },
  {
    title: "Diagnostic & réparation",
    desc: "Lecture des codes défauts, analyse des capteurs et des calculateurs, puis réparation mécanique : moteur diesel, injection, boîte, transmission, ponts et trains roulants.",
    specs: ["Valise multimarque", "Moteur & injection", "Boîte & transmission", "Électricité embarquée"],
    icon: "M3 12h4l2-6 4 12 2-6h6",
  },
  {
    title: "Assistance mobile / urgence",
    desc: "Une équipe se déplace sur votre chantier, votre dépôt ou en bord de route avec l'outillage nécessaire. Remise en route sur place ou rapatriement vers l'atelier.",
    specs: ["Intervention sur site", "Dépannage bord de route", "Engins immobilisés", "Ligne directe"],
    icon: "M12 21s-7-6.5-7-12a7 7 0 1114 0c0 5.5-7 12-7 12zM12 7v4l2 2",
  },
];

function Card({ item, index }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [10, -10]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-10, 10]), { stiffness: 150, damping: 18 });
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, rgba(212,175,55,.22), transparent 55%)`;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => { px.set(0.5); py.set(0.5); };

  return (
    <motion.li
      className="exp-card"
      style={{ rotateX, rotateY }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      initial={{ opacity: 0, y: 80, rotateX: 25 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10 }}
    >
      <motion.div className="exp-glow" style={{ background: glow }} aria-hidden="true" />
      <div className="exp-top">
        <span className="exp-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d={item.icon} /></svg>
        </span>
        <span className="exp-num">0{index + 1}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
      <ul className="exp-specs">
        {item.specs.map((s) => <li key={s}>{s}</li>)}
      </ul>
    </motion.li>
  );
}

export default function Expertises() {
  return (
    <section className="section" id="expertises" aria-labelledby="exp-title">
      <div className="wrap">
        <header className="section-head">
          <Eyebrow>01 — Expertises</Eyebrow>
          <SplitTitle id="exp-title" className="section-title" text={"Trois métiers.\nUn seul objectif : la disponibilité."} gold={["disponibilité."]} />
          <Reveal as="p" className="section-lead" delay={0.2}>
            De la vidange planifiée à la panne en bord de route, une seule équipe qui connaît vos machines.
          </Reveal>
        </header>
        <ol className="exp-grid">
          {items.map((item, i) => <Card key={item.title} item={item} index={i} />)}
        </ol>
      </div>
    </section>
  );
}
