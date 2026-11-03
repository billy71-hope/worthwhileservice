import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ease } from "./ui.jsx";

const links = [
  ["#expertises", "Expertises"],
  ["#savoir-faire", "Atelier"],
  ["#methode", "Méthode"],
  ["#contact", "Contact"],
];

export function Logo() {
  return (
    <motion.img
      className="logo-mark" src="logo.png" alt="" width="199" height="120"
      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease, delay: 0.3 }}
    />
  );
}

export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 400 && !open);
  });

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <motion.header
      className={`site-header ${scrolled ? "is-scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ duration: 0.6, ease }}
    >
      <div className="wrap header-inner">
        <a className="brand" href="#top" aria-label="Worthwhile Service, retour en haut">
          <Logo />
          <span className="brand-text"><strong>Worthwhile</strong><span>Service</span></span>
        </a>

        <nav aria-label="Navigation principale">
          <ul className="nav-list" onPointerLeave={() => setHover(null)}>
            {links.map(([href, label]) => (
              <li key={href} onPointerEnter={() => setHover(href)}>
                <a href={href}>
                  {hover === href && (
                    <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                  )}
                  <span className="nav-label">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="btn btn-gold btn-sm header-cta" href="#rendez-vous">Rendez-vous</a>

        <button className="nav-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
          <span className="sr-only">Menu</span>
          <motion.i animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} />
          <motion.i animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.7, ease }}
          >
            <motion.ul initial="hidden" animate="show" transition={{ staggerChildren: 0.07, delayChildren: 0.2 }}>
              {[...links, ["#rendez-vous", "Rendez-vous"]].map(([href, label]) => (
                <motion.li key={href} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
                  <a href={href} onClick={() => setOpen(false)}>{label}</a>
                </motion.li>
              ))}
            </motion.ul>
            <a className="mobile-phone" href="tel:+2290151125456">Urgence · 01 51 12 54 56</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
