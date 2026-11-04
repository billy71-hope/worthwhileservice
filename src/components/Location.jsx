import { motion } from "framer-motion";
import { Eyebrow, Magnetic, Reveal, SplitTitle, ease } from "./ui.jsx";

// ---- Configuration : coordonnées GPS de l'atelier ----
// Atelier : côté nord du CEG Hêvié (CEG sur Google Maps : 6.4266732, 2.2367921 — C6GP+MP7)
const COORDS = "6.4279165250381025,2.2370481489066862";
// -------------------------------------------------------

const MAP_EMBED = `https://www.google.com/maps?q=${COORDS}&z=16&hl=fr&output=embed`;
export const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${COORDS}`;

export default function Location() {
  return (
    <section className="section location" id="localisation" aria-labelledby="loc-title">
      <div className="wrap location-grid">
        <div className="location-info">
          <Eyebrow>05 — Localisation</Eyebrow>
          <SplitTitle id="loc-title" className="section-title" text={"Notre atelier,\nà Hêvié."} gold={["Hêvié."]} />
          <Reveal as="p" delay={0.1}>
            Notre atelier est situé à Abomey-Calavi / Hêvié. Pour une intervention sur site, nos équipes mobiles se déplacent jusqu'à vous.
          </Reveal>

          <Reveal as="dl" className="location-list" delay={0.2}>
            <div><dt>Adresse</dt><dd>Côté nord du CEG Hêvié, même clôture — Abomey-Calavi, Bénin</dd></div>
            <div><dt>GPS</dt><dd>6.42792, 2.23705</dd></div>
            <div><dt>Téléphone</dt><dd><a href="tel:+2290151125456">01 51 12 54 56</a></dd></div>
          </Reveal>

          <Reveal className="location-actions" delay={0.3}>
            <Magnetic>
              <a className="btn btn-gold" href={MAPS_DIRECTIONS} target="_blank" rel="noopener">
                Obtenir l'itinéraire <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a className="btn btn-ghost" href="#rendez-vous">Prendre rendez-vous</a>
            </Magnetic>
          </Reveal>
        </div>

        <motion.figure
          className="map-frame"
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 1, ease }}
        >
          <iframe
            src={MAP_EMBED}
            title="Carte : atelier Worthwhile Service à Abomey-Calavi / Hêvié"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <span className="frame-tag"><span className="live-dot" /> Worthwhile Service</span>
        </motion.figure>
      </div>
    </section>
  );
}
