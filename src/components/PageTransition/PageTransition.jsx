import { motion } from 'framer-motion';
import './PageTransition.css'
// 1. Animation for the page container itself (slight upward slide + scale down)
const contentVariants = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1], // Smooth cinematic easing
      delay: 0.4, // Wait for the curtain cover before showing content structure
    },
  },
  exit: {
    y: -40,
    scale: 0.96,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

// 2. Animation for the red curtain overlay
const shutterVariants = {
  initial: {
    scaleY: 1,
    transformOrigin: "top",
  },
  animate: {
    scaleY: 0,
    transformOrigin: "top",
    transition: {
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1],
      delay: 0.1,
    },
  },
  exit: {
    scaleY: 1,
    transformOrigin: "bottom",
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export default function PageTransition({ children }) {
  return (
    <>
      {/* The main page content container */}
      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ width: "100%", minHeight: "100vh" }}
      >
        {children}
      </motion.div>

      {/* The full screen red panel layer */}
      <motion.div
        className="transition-shutter"
        variants={shutterVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      />
    </>
  );
}