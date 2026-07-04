
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";

 import "./Testing.css";




export default function Testing() {
  const text = "SARAS";
  const letters = text.split("");

  const [animate, setAnimate] = useState(false);
  const [letterDelays, setLetterDelays] = useState([]);

  // Fisher-Yates Shuffle
  const createRandomSequence = (length) => {
    const order = Array.from({ length }, (_, i) => i);

    for (let i = order.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      [order[i], order[randomIndex]] = [
        order[randomIndex],
        order[i],
      ];
    }

    return order;
  };

  const handleAnimation = () => {
    // Generate a new random animation order
    const order = createRandomSequence(letters.length);

    // Map delays back to each letter
    const delays = Array(letters.length);

    order.forEach((letterIndex, sequenceIndex) => {
      delays[letterIndex] = sequenceIndex * 0.06;
    });

    setLetterDelays(delays);

    // Restart animation
    setAnimate(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimate(true);
      });
    });
  };

  return (
<div className="testing-div" >
    <div className="slide-text-container">
      <div className="slide-text-viewport">
        {letters.map((letter, index) => (
          <span className="slide-text-letterWrapper" key={index}>
            <motion.span
              className="slide-text-letter"
              initial={{ y: "100%" }}
              animate={
                animate
                  ? {
                      y: [
                        "100%", // below
                        "0%", // visible
                        "0%", // hold
                        "-100%", // exit above
                      ],
                    }
                  : { y: "100%" }
              }
              transition={{
                duration: 1.8,
                delay: letterDelays[index] ?? 0,
                times: [0, 0.3, 0.7, 1],
                ease: "easeInOut",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          </span>
        ))}
      </div>

      <button onClick={handleAnimation}>
        Trigger Animation
      </button>
    </div>
</div>





  );

  
}



