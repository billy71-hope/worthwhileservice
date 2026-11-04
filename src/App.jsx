import { motion, useScroll, useSpring } from "framer-motion";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Stats from "./components/Stats.jsx";
import Expertises from "./components/Expertises.jsx";
import Craft from "./components/Craft.jsx";
import Method from "./components/Method.jsx";
import Booking from "./components/Booking.jsx";
import Location from "./components/Location.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <a className="skip" href="#main">Aller au contenu</a>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Stats />
        <Expertises />
        <Craft />
        <Method />
        <Booking />
        <Location />
      </main>
      <Footer />
    </>
  );
}
