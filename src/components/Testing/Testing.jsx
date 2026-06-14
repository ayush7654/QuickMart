
import React, { useState ,useRef , useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDownOutline } from "react-icons/io5";
import useProductDetailsData from "../../pages/ProductDetails/useProductDetailsData";
 import "./Testing.css";



export default function Testing() {
 
const fadingTextStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    
    /* 1. Create a linear gradient running from top (solid black) to bottom (transparent) */
    backgroundImage: 'linear-gradient(to bottom, #ffffff 30%, transparent 100%)',
    
    /* 2. Clip the background gradient so it only renders inside the shape of the letters */
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    
    /* 3. Make the actual text color transparent so the gradient shines through */
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
  };

  return (
<div className="testing-div">
  
  <div style={{ padding: '2rem'}}>
      <h1 style={fadingTextStyle}>
        Everything Your Pet Needs <br />
       
      </h1>
    </div>
</div>





  );
};


