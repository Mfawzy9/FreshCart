import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const opacityAni = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const x_Ani = {
  initial: { x: "-100vw" },
  animate: { x: 0 },
  exit: { y: "-100vh" },
};

const zoom = {
  initial: { scale: 0.7, opacity: 1 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 1, opacity: 0 },
};
const rotateY = {
  initial: { rotateY: 90 },
  animate: { rotateY: 0 },
  exit: { rotateY: -90 },
};

const xAni = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
};

const scaleAni = {
  initial: { scale: 0.2 },
  animate: { scale: 1 },
  exit: { scale: 1.5 },
};

const scaleYAni = {
  initial: { scaleY: 1.5 },
  animate: { scaleY: 1 },
  exit: { scaleY: 0.5 },
};

const scaleXAni = {
  initial: { scaleX: 1.5 },
  animate: { scaleX: 1 },
  exit: { scaleX: 0.5 },
};

export default function PagesAnimation({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={location.pathname}
        className="w-full "
        transition={{
          ease: "easeInOut",

          duration: 0.4,
        }}
        variants={opacityAni}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.section>
    </AnimatePresence>
  );
}
