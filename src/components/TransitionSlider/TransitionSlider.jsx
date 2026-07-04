import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePageTransition } from "../PageTransitionContext";
import "./TransitionSlider.css";

const TEXT = "SARAS";

export default function TransitionSlider() {
  const { phase, handleAnimationComplete } = usePageTransition();

  const letters = TEXT.split("");

  const [enterDelays, setEnterDelays] = useState([]);
  const [exitDelays, setExitDelays] = useState([]);

  const createRandomDelays = () => {
    const order = Array.from({ length: letters.length }, (_, i) => i);

    // Fisher-Yates Shuffle
    for (let i = order.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      [order[i], order[randomIndex]] = [
        order[randomIndex],
        order[i],
      ];
    }

    const delays = Array(letters.length);

    order.forEach((letterIndex, sequenceIndex) => {
      delays[letterIndex] = sequenceIndex * 0.07;
    });

    return delays;
  };

  useEffect(() => {
    if (phase === "center") {
      setEnterDelays(createRandomDelays());
    }

    if (phase === "top") {
      setExitDelays(createRandomDelays());
    }
  }, [phase]);

  const sliderVariants = {
    bottom: {
      clipPath: "polygon(0% 100%,100% 100%,100% 100%,0% 100%)",
      transition: { duration: 0 },
    },

    center: {
      clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
      transition: {
        duration: 1,
        ease: [0.25, 1, 0.5, 1],
      },
    },

    top: {
      clipPath: "polygon(0% 0%,100% 0%,100% 0%,0% 0%)",
      transition: {
        duration:1,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <motion.div
      className="transition-slider"
      variants={sliderVariants}
      initial="bottom"
      animate={phase}
      onAnimationComplete={handleAnimationComplete}
    >
      <div className="transition-text">
        {letters.map((letter, index) => (
          <span className="letter-wrapper" key={index}>
            <motion.span
              className="letter"
              initial={{ y: "100%" }}
              animate={
                phase === "bottom"
                  ? { y: "100%" }
                  : phase === "center"
                  ? { y: "0%" }
                  : { y: "-100%" }
              }
              transition={{
                duration: 0.8,
                ease: [0.25, 1, 0.5, 1],
                delay:
                  phase === "center"
                    ? enterDelays[index] ?? 0
                    : phase === "top"
                    ? exitDelays[index] ?? 0
                    : 0,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          </span>
        ))}
      </div>
    </motion.div>
  );
}