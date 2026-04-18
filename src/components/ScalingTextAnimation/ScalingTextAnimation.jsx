import React, { useState , useEffect} from 'react';
import { motion } from 'framer-motion';
import './ScalingTextAnimation.css'


export default function ScalingTextAnimation() {

const [isFlipped, setIsFlipped] = useState(false);
 const word = "Push Beyond Limits"; 
  const letters = word.split("");

  // Smooth ease that avoids the "springy" overshoot
  const transition = {
    duration: 1.1,
    ease: [0.76, 0, 0.24, 1], 
  };

  useEffect(() => {
  
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 2500); 

    return () => clearInterval(interval);
  }, []); 

  return (
  <div className="test-wave-section">
      <div className="test-wave-container">
        
        {/* TOP WORD: Scales down to 0 */}
        <div className="test-word-row">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              animate={{ scaleY: isFlipped ? 0 : 1 }}
              transition={{ ...transition, delay: i * 0.04 }}
              className="test-letter"
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* BOTTOM WORD: Scales up to 1 */}
        <div className="test-word-row test-absolute">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: isFlipped ? 1 : 0 }}
              transition={{ ...transition, delay: i * 0.04 }}
              className="test-letter"
            >
              {letter}
            </motion.span>
          ))}
        </div>

      </div>
    </div>
  )
}
