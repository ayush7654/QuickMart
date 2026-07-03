import React from 'react';
import { motion } from 'framer-motion';
import { usePageTransition } from '../PageTransitionContext';
import './TransitionSlider.css';

export default function TransitionSlider() {
  // Grab the global state and handshakes from context
  const { phase, isAnimating, triggerTransition, handleAnimationComplete } = usePageTransition();

  const sliderVariants = {
    bottom: {
      y: "100vh",
      transition: { duration: 0 }
    },
    center: {
      y: "0vh",
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    },
    top: {
      y: "-100vh",
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <>
      {/* This local button works, but now ANY component can render this click trigger */}
      <button 
        onClick={triggerTransition} 
        disabled={isAnimating}
        className="test-trigger-btn"
      >
        {isAnimating ? 'Running...' : 'TRIGGER SLIDER'}
      </button>

      <motion.div 
        className='transition-slider'
        variants={sliderVariants}
        initial="bottom"
        animate={phase}
        onAnimationComplete={handleAnimationComplete}
      >
        <span>OutFit</span>
      </motion.div>
    </>
  );
}