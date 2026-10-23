
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Lottie } from "lottie-react";
import SiteLogoAnimation3 from "../../assets/SiteLogoAnimation3.json";
import SiteMenu from '../SiteMenu/SiteMenu';
import SiteMenuAnimation2 from "../../assets/SiteMenuAnimation2.json";
import ExpandablePanel from '../ExpandablePanel/ExpandablePanel';
import NavigationPanel from '../NavigationPanel/NavigationPanel';
 import "./Testing.css";




export default function Testing() {





  
  
  return (
<div className="testing-div"  >
   
<NavigationPanel/>

{/* <ExpandablePanel/> */}

{/* <SiteMenu/>  */}


 {/*   <div >
      <Lottie
        src={SiteMenuAnimation2}
        autoplay
        loop
        style={{ width: "50%", height: "100%" }}
      />
    </div> */}  
</div>





  );

  



}
