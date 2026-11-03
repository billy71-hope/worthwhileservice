import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import { Reveal } from "./ui.jsx";

function Counter({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => { ref.current.textContent = Math.round(v); },
    });
    return () => ctrl.stop();
  }, [inView, to]);
  return <span ref={ref}>{to}</span>;
}

const stats = [
  { num: <><Counter to={20} /><sup>+</sup></>, label: "Techniciens et mécaniciens dans l'équipe" },
  { num: <>24<span className="gold-text">/</span>7</>, label: "Assistance mobile et dépannage d'urgence" },
  { num: <Counter to={2} />, label: "Pôles d'expertise : poids lourds & engins de chantier" },
];

export default function Stats() {
  return (
    <section className="stats" aria-label="Chiffres clés">
      <div className="wrap stats-grid">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.12} className="stat">
            <p className="stat-num">{s.num}</p>
            <p className="stat-label">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
