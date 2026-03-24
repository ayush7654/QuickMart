import React from 'react';
import { motion } from 'framer-motion';

const TextAnimation = ({ text,staggerDelay, delay = 0 }) => {
  // Splits the paragraph into words to allow for natural line wrapping
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay, // Adjust this for a faster/slower "scan"
      },
    },
  };

  const wordVariants = {
    hidden: { 
      y: "115%",
      opacity:.2 // Pushes word below the invisible crop line
    },
    visible: { 
      y: "0%", opacity:1 ,
      transition: { 
        duration: 0.8, 
        ease: [.5, 1, 0.68, 1] // High-end "Expo" easing
      }
    },
  };

  return (
    <motion.div 
      variants={containerVariants}
      style={{
        display: "flex",
        flexWrap: "wrap", 
        gap: "0px 0.25em", // Natural spacing between words
      }}
    >
      {words.map((word, i) => (
        <span 
          key={i} 
          style={{ 
            display: "inline-block", 
            overflow: "hidden", // This is the "Scanner Mask"
            verticalAlign: "bottom" 
          }}
        >
          <motion.span
            variants={wordVariants}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

export default TextAnimation;