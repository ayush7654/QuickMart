
import React, { useState, useEffect } from 'react';

import { motion, useScroll, useTransform } from "framer-motion";

 import "./Testing.css";



  

export default function Testing() {


  const { scrollY } = useScroll();

  // Animation completes after scrolling 100vh
  const { innerHeight } = window;

  const y = useTransform(
    scrollY,
    [0, innerHeight],
    ["0vh", "-42vh"]
  );

  const scale = useTransform(
    scrollY,
    [0, innerHeight],
    [1, 0.25]
  );


  return (
<div className="testing-div">

      <motion.div
      className="logo-animation"
      style={{ y, scale }}
    >
      VERO
    </motion.div>
 
 </div>





  );

  



}
