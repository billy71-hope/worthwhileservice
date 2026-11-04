import { motion } from "framer-motion";
import { Reveal, ease } from "./ui.jsx";
import { MAPS_DIRECTIONS } from "./Location.jsx";

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="wrap">
        <motion.p
          className="footer-giant"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          aria-hidden="true"
        >
          Worthwhile<em className="gold-text">.</em>
        </motion.p>

        <div className="footer-grid">
          <Reveal className="footer-brand">
            <p>Maintenance mécanique et automobile — poids lourds &amp; engins de chantier.</p>
          </Reveal>
          <Reveal as="address" className="footer-col" delay={0.1}>
            <p className="footer-h">Coordonnées</p>
            <p><span>Tél</span> <a href="tel:+2290151125456">01 51 12 54 56</a></p>
            <p><span>WhatsApp</span> <a href="https://wa.me/2290197643212" target="_blank" rel="noopener">01 97 64 32 12</a></p>
            <p><span>Mail</span> <a href="mailto:worthwhileservices3@gmail.com">worthwhileservices3@gmail.com</a></p>
            <p><span>Adresse</span> <a href={MAPS_DIRECTIONS} target="_blank" rel="noopener">Abomey-Calavi / Hêvié, Bénin</a></p>
          </Reveal>
          <Reveal className="footer-col" delay={0.2}>
            <p className="footer-h">Navigation</p>
            <p><a href="#expertises">Expertises</a></p>
            <p><a href="#savoir-faire">Savoir-faire</a></p>
            <p><a href="#methode">Méthode</a></p>
            <p><a href="#rendez-vous">Prendre rendez-vous</a></p>
            <p><a href="#localisation">Localisation</a></p>
          </Reveal>
        </div>

        <div className="footer-legal">
          <p>© {new Date().getFullYear()} Worthwhile Service. Tous droits réservés.</p>
          <a className="to-top" href="#top">Haut de page ↑</a>
        </div>
      </div>
    </footer>
  );
}
