
import React, { useState ,useRef , useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
 import "./Testing.css";



export default function Testing() {





  return (
<div className="testing-div" >
<div className="lottie-animation-wrapper">
  <DotLottieReact src="bar-animation.lottie" loop autoplay />
</div>
</div>





  );
};


