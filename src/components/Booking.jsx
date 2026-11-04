import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow, Magnetic, Reveal, SplitTitle, ease } from "./ui.jsx";

// ---- Configuration : modifier ici ----
// Format international sans "+" ni espaces : 229 (Bénin) + numéro à 10 chiffres.
const WHATSAPP_NUMBER = "2290197643212";
// --------------------------------------

const pad = (n) => String(n).padStart(2, "0");
const today = new Date();
const todayISO = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

const rules = {
  name: (v) => (v.length >= 2 ? "" : "Indiquez votre nom."),
  machine: (v) => (v ? "" : "Sélectionnez un type d'engin."),
  date: (v) => (!v ? "Choisissez une date." : v < todayISO ? "La date ne peut pas être passée." : ""),
  time: (v) => (v ? "" : "Choisissez une heure."),
  description: (v) => (v.length >= 10 ? "" : "Décrivez le problème (10 caractères minimum)."),
};

const urgencies = [
  ["Faible — planifiable", "Faible", "Planifiable"],
  ["Moyenne — sous 48 h", "Moyenne", "Sous 48 h"],
  ["Critique — engin immobilisé", "Critique", "Engin immobilisé"],
];

const formatDate = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
};

const empty = { name: "", company: "", machine: "", date: "", time: "", description: "", urgency: urgencies[0][0] };

function Field({ id, label, required, error, children }) {
  return (
    <div className={`field ${error ? "has-error" : ""}`}>
      <label htmlFor={id}>{label} {required && <span className="req" aria-hidden="true">*</span>}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-err`} className="field-error" aria-live="polite"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Booking() {
  const [data, setData] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ text: "", kind: "" });
  const [waUrl, setWaUrl] = useState("");

  const set = (name) => (e) => {
    const value = e.target.value;
    setData((d) => ({ ...d, [name]: value }));
    // Revalidation à la volée une fois qu'un champ a été signalé
    if (errors[name]) setErrors((er) => ({ ...er, [name]: rules[name](value.trim()) }));
  };

  const a11y = (name) => ({
    "aria-invalid": errors[name] ? "true" : "false",
    "aria-describedby": errors[name] ? `f-${name}-err` : undefined,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const clean = Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v.trim()]));
    const next = Object.fromEntries(Object.entries(rules).map(([k, check]) => [k, check(clean[k])]));
    setErrors(next);

    const firstInvalid = Object.keys(rules).find((k) => next[k]);
    if (firstInvalid) {
      document.getElementById(`f-${firstInvalid}`).focus();
      setWaUrl("");
      setStatus({ text: "Certains champs sont à compléter.", kind: "is-error" });
      return;
    }

    const lines = [
      "🚨 *Nouvelle demande de RDV — Worthwhile Service*",
      "",
      `👤 *Nom :* ${clean.name}`,
      `🏢 *Société :* ${clean.company || "Non renseignée"}`,
      `🚛 *Type d'engin :* ${clean.machine}`,
      `📅 *Date souhaitée :* ${formatDate(clean.date)}`,
      `🕒 *Heure souhaitée :* ${clean.time.replace(":", "h")}`,
      `⚠️ *Urgence :* ${clean.urgency}`,
      "",
      "🔧 *Description du problème :*",
      clean.description,
    ];

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    setWaUrl(url);
    setStatus({ text: "Demande prête — validez l'envoi dans WhatsApp.", kind: "is-ok" });

    // Mobile : ouverture directe de l'application (évite un onglet vide et les
    // navigateurs intégrés Facebook/Instagram qui bloquent les popups).
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = url;
      return;
    }
    // Ordinateur : WhatsApp Web dans un nouvel onglet.
    // Pas de "noopener" dans les features : sinon window.open renvoie toujours null.
    const win = window.open(url, "_blank");
    if (win) {
      win.opener = null;
    } else {
      window.location.href = url;
    }
  };

  return (
    <section className="section booking" id="rendez-vous" aria-labelledby="booking-title">
      <div className="wrap booking-grid">
        <div className="booking-intro">
          <Eyebrow>04 — Rendez-vous</Eyebrow>
          <SplitTitle id="booking-title" className="section-title" text={"Planifiez\nl'intervention."} gold={["l'intervention."]} />
          <Reveal as="p" delay={0.1}>
            Remplissez la fiche. Elle est transmise directement à notre atelier via WhatsApp, avec toutes les informations nécessaires pour préparer l'intervention.
          </Reveal>
          <Reveal className="direct-card" delay={0.2}>
            <span>Panne immobilisante ? Appelez directement</span>
            <a href="tel:+2290151125456">01 51 12 54 56</a>
          </Reveal>
        </div>

        <motion.form
          className="form"
          noValidate
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 1, ease }}
        >
          <div className="field-row">
            <Field id="f-name" label="Nom complet" required error={errors.name}>
              <input id="f-name" type="text" autoComplete="name" value={data.name} onChange={set("name")} {...a11y("name")} />
            </Field>
            <Field id="f-company" label="Société">
              <input id="f-company" type="text" autoComplete="organization" value={data.company} onChange={set("company")} />
            </Field>
          </div>

          <Field id="f-machine" label="Type d'engin" required error={errors.machine}>
            <select id="f-machine" value={data.machine} onChange={set("machine")} {...a11y("machine")}>
              <option value="">Sélectionner</option>
              <optgroup label="Poids lourds">
                <option>Tracteur routier / semi-remorque</option>
                <option>Camion porteur</option>
                <option>Camion benne</option>
                <option>Citerne</option>
                <option>Bus / car</option>
              </optgroup>
              <optgroup label="Engins de chantier">
                <option>Pelle hydraulique</option>
                <option>Chargeuse / chouleur</option>
                <option>Bulldozer</option>
                <option>Niveleuse</option>
                <option>Compacteur</option>
                <option>Tractopelle</option>
              </optgroup>
              <option>Autre engin</option>
            </select>
          </Field>

          <div className="field-row">
            <Field id="f-date" label="Date souhaitée" required error={errors.date}>
              <input id="f-date" type="date" min={todayISO} value={data.date} onChange={set("date")} {...a11y("date")} />
            </Field>
            <Field id="f-time" label="Heure souhaitée" required error={errors.time}>
              <input id="f-time" type="time" step="900" value={data.time} onChange={set("time")} {...a11y("time")} />
            </Field>
          </div>

          <Field id="f-description" label="Description du problème" required error={errors.description}>
            <textarea id="f-description" rows="4" value={data.description} onChange={set("description")} {...a11y("description")}
              placeholder="Symptômes, codes défauts, marque et modèle, localisation de l'engin…" />
          </Field>

          <fieldset className="field urgency">
            <legend>Niveau d'urgence <span className="req" aria-hidden="true">*</span></legend>
            <div className="seg">
              {urgencies.map(([value, title, sub], i) => {
                const checked = data.urgency === value;
                return (
                  <label key={value} className={checked ? "is-checked" : ""} data-level={i}>
                    <input type="radio" name="urgency" value={value} checked={checked} onChange={set("urgency")} />
                    {checked && <motion.span layoutId="urgency-pill" className="seg-pill" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                    <b>{title}</b><small>{sub}</small>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="form-foot">
            <Magnetic strength={0.15}>
              <motion.button type="submit" className="btn btn-gold btn-block" whileTap={{ scale: 0.97 }}>
                Confirmer le rendez-vous <span className="btn-arrow" aria-hidden="true">→</span>
              </motion.button>
            </Magnetic>
            <AnimatePresence mode="wait">
              <motion.p
                key={status.text}
                className={`form-note ${status.kind}`} role="status"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              >
                {status.text}
              </motion.p>
            </AnimatePresence>
            {waUrl && (
              <a className="form-fallback" href={waUrl} target="_blank" rel="noopener">
                WhatsApp ne s'est pas ouvert ? Cliquez ici
              </a>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
