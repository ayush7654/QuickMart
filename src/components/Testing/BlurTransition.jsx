import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BlurTransition.css';

const IMAGES = [
  'StoreMedia/storeImg1.jpg',
  'StoreMedia/StoreImg2.jpg',
  'StoreMedia/storeImg3.jpg',
  'StoreMedia/storeImg4.jpg'
];

export default function BlurTransition({activeIndex=0}) {


  return (
    <div className="slider-wrapper1">
      <div className="blur-container">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={activeIndex} // Changing the key tells Framer Motion to animate it out and a new one in
            src={IMAGES[activeIndex]}
            alt="Slider Display"
            className="transition-img"
            
            // 1. Initial State: How the incoming image starts (blurred and invisible)
            initial={{ filter: 'blur(40px)', opacity: 0 }}
            
            // 2. Animate State: The normal, resting look (sharp and fully visible)
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            
            // 3. Exit State: How the old image leaves when the key changes
            exit={{ filter: 'blur(40px)', opacity: 0 }}
            
         transition={{
              type: 'tween',
              duration:1
            
            }} 
          />
        </AnimatePresence>
      </div>

    </div>
  );
}