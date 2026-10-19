
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Lottie } from "lottie-react";
import SiteLogoAnimation3 from "../../assets/SiteLogoAnimation3.json";
 import "./Testing.css";





export default function Testing() {




  
  
  return (
<div className="testing-div"  >
 <div >
      <Lottie
        src={SiteLogoAnimation3}
        autoplay
        loop
        style={{ width: "50%", height: "50%" }}
      />
    </div>
</div>





  );

  



}
