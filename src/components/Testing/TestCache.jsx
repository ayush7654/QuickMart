import { useEffect, useRef, useState } from "react";

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StoreSorting from "../../pages/Store/StoreSorting/StoreSorting";
import { useScroll } from "../ScrollData/ScrollData";
import ScrollingAnimation from "../ScrollingAnimation/ScrollingAnimation";
gsap.registerPlugin(ScrollTrigger);


export default function TestCache() {

    
   
  return (
    <div 
      className={`floating-pill ${isOpen ? "pill-expanded" : ""}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="pill-content">

        <StoreSorting/> 
       
      </div>
    </div>
  )
}
