
import React, { useState ,useRef , useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollButton from "../ScrollingButton/ScrollingButton";
import BentoImageGrid from "./BentoImages";
import IconButton from "../IconButton/IconButton";
import { FaArrowRight } from "react-icons/fa";
 import "./Testing.css";



export default function Testing() {



  return (
<div className="testing-div">
<button className="modern-btn">
  <span className="btn-icon">
    <FaArrowRight />
  </span>

  <span className="btn-text">
  <ScrollButton text='Catelog'/>
  </span>
</button>


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
 