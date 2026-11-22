import React, { useState, useRef, useEffect } from 'react';

import { motion, AnimatePresence } from "framer-motion";
import './SlideFrame.css'






export default function SlideFrame({srcIndex,getImage ,imgIndex}) {





  

  return (
    <div className="slider-frame">
   

<AnimatePresence mode="sync">
  <motion.div 
   key={imgIndex}
   style={{backgroundImage:`url(ExploreCollection/${getImage(srcIndex)})`}}
    className="slider-image"
    initial={{
      x: "100%",
      scaleX: 2,
      transformOrigin: "left center",
    }}
    animate={{
      x: "0%",
      scaleX: 1,
    }}
    exit={{
      x: "-100%",
      scaleX: 3,
      scaleY: 2,
      transformOrigin: "right center",
    }}
    transition={{
      duration: 1.5,
      ease: [0.76, 0, 0.24, 1],
    }}>

  </motion.div>
 
</AnimatePresence>



    </div> 
  )
}
