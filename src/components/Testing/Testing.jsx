
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Lottie } from "lottie-react";
import SiteLogoAnimation3 from "../../assets/SiteLogoAnimation3.json";
import SiteMenu from '../SiteMenu/SiteMenu';
import SiteMenuAnimation2 from "../../assets/SiteMenuAnimation2.json";
import ExpandablePanel from '../ExpandablePanel/ExpandablePanel';
 import "./Testing.css";


const sampleCart = [
  { name: "Product Carousel", price: "250", quantity: "1", img: "MockDP2.png" },
  { name: "Product Columns", price: "150", quantity: "2", img: "MockDP3.jpg" },
  { name: "Product Stacked", price: "135", quantity: "4", img: "MockDP4.avif" },
  { name: "Product Split", price: "70", quantity: "3", img: "MockDP5.jpg" },
  { name: "Product Carousel", price: "250", quantity: "1", img: "MockDP2.png" },
  { name: "Product Columns", price: "150", quantity: "2", img: "MockDP3.jpg" },
  { name: "Product Stacked", price: "135", quantity: "4", img: "MockDP4.avif" },
  { name: "Product Split", price: "70", quantity: "3", img: "MockDP5.jpg" },
];


export default function Testing({ onClose }) {





  
  
  return (
<div className="testing-div"  >
   
<div className="outer-container">
  <div className="sideCart">
    <div className="sideCart-list">
      <div className="sideCart-item"></div>
      <div className="sideCart-item"></div>
      <div className="sideCart-item"></div>
      <div className="sideCart-item"></div>
    </div>
    <div className="sideCart-footer"></div>
  </div>
</div>

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
