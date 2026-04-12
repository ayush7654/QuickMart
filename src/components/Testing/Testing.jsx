

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

 import "./Testing.css";

 




export default function Testing() {


const [isOpen, setIsOpen] = useState(false);

  const toggleSplit = () => {
    setIsOpen(!isOpen);
  };


const banners = new Array(1).fill(null);
const loopBanners = [...banners, ...banners];


  return (
    <div className="testing-div">
<div className="test-container">
 <div className="banners-viewport">   {/* 👈 NEW */}
    <div className="banners-wrapper">
      {loopBanners.map((_, index) => (
        <div
          key={index}
          className={`test-banner-wrapper ${isOpen ? 'test-active' : ''}`}
        >
     <div className="banner-inner">

          <div className="test-banner-part test-top">
            <div className="test-content"><h1>FITNESS</h1></div>
          </div>

          <div className="test-banner-part test-bottom">
            <div className="test-content"><h1>FITNESS</h1></div>
          </div>
</div>
        </div>
      ))}
    </div>
  </div>
  

      <button className="test-split-btn" onClick={toggleSplit}>
        {isOpen ? 'CLOSE BANNER' : 'SPLIT BANNER'}
      </button>
    </div>
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
 