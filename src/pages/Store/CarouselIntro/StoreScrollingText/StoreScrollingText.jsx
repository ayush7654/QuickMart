import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './StoreScrollingText.css';

// Container variant: controls stagger timing between words
const sentenceVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05, // 50ms delay between each word entry
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03, // Slightly faster exit stagger
    },
  },
};

// Word variant: handles vertical motion, opacity, and blur
const wordVariants = {
  hidden: {
    y: '100%',
    opacity: 0,
    filter: 'blur(8px)',
  },
  visible: {
    y: '0%',
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a springy snap
    },
  },
  exit: {
    y: '-100%',
    opacity: 0,
    filter: 'blur(8px)',
    transition: {
      duration: 0.5,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

export default function StoreScrollingText({ items = [], activeIndex = 0 }) {
  const currentSentence = items[activeIndex] || '';
  const words = currentSentence.split(' ');

  return (
    <div className="staggerStore-viewport">
      {/* mode="wait" ensures exiting sentence clears out before the next enters */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          variants={sentenceVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="stagger-sentence"
        >
          {words.map((word, index) => (
            <span key={index} className="word-wrapper">
              <motion.span variants={wordVariants} className="stagger-word">
                {word}&nbsp;
              </motion.span>
            </span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}