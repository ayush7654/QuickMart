
import React, { useState ,useRef , useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrambleTextSwitcher from "./ScrambleTextSwitcher";
import StoreBanner from "./../../pages/Store/StoreBanner/StoreBanner";
 import "./Testing.css";


const COLS = 12; // Matches the video's dense vertical grid look
const ROWS = 6;

export default function Testing({  
  rows = 1,
  cols = 5,
  interval = 4000,
  duration = 1
}) {
 
  const images =['StoreMedia/StoreImg7.jpg','StoreMedia/StoreImg9.jpg']



  return (
<div className="testing-div">



</div>





  );
};


/* const expandVariants = {
  hidden: { 
    opacity: 0,
    clipPath: 'inset(0% 50% 0% 50%)',
    transition: { duration: 0.5 } 
  },
  visible: { 
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { 
      duration: 1.2, 
      ease: [0.25, 1, 0.5, 1],
 
      opacity: { duration: 0.8, ease: "linear" } 
    } 
  }
}; */
 