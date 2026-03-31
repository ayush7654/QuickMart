import { useEffect, useRef, useState } from "react";
import "./ScrollingAnimation.css";

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollingAnimation({isAtTop}) {

const sectionRef = useRef(null); // For the pinned video section
 

  const mainImgRef = useRef(null);
  const gridContentTRef= useRef(null);
  const gridItemsRef = useRef([]);

useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2000",
        scrub: 0, // Keeping your original 0 scrub for direct response
        pin: true,
      }
    });

    // 1. SITE TITLE - EXITS INSTANTLY
    // By giving this a tiny duration (0.1), it finishes in the first 10% of the scroll.

tl.to(".hero-title2", {
  x: -100,               // Slides left
  opacity: 0,
  filter: "blur(10px)",
  duration: 0.2,
}, 0);

tl.to(".title-tag", {
  x: 100,                // Slides right
  opacity: 0,
  filter: "blur(10px)",
  duration: 0.2,
}, 0);

    // 2. MAIN VIDEO - YOUR ORIGINAL ANIMATION
    // We keep this at duration 1 so it matches the speed of the grid items.
    tl.fromTo(mainImgRef.current, 
      { 
        width: "98vw", 
        height: "98vh", 
        borderRadius: "10px",
        marginTop: '0rem' 
      }, 
      { 
        width: "0vw", 
        height: "90vh", 
        borderRadius: "20px",
        ease: "expo.out", // Restored your original ease
        duration: 1,      
        immediateRender: false,
        marginTop: '0rem' 
      }, 
      0 
    );

    // 3. GRID ITEMS - YOUR ORIGINAL ANIMATION
    tl.from(".grid-item", {
      scale: 1.5,
      opacity: 0,
      x: (i) => (i % 2 === 0 ? -1200 : 1200),
      y: (i) => (i < 2 ? -800 : 800),
      ease: "expo.out",
      duration: 1,
    }, 0); 

    gsap.fromTo(".scroll-animation-text-wrapper",
  {
    y: "-20vh"
  },
  {
    y: "100vh",
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top top",
      end: "+=2000",
      scrub: true,
    }
  }
);

  }, sectionRef);



  return () => ctx.revert();
}, []);

  return (
    
    <div className="scroll-section" ref={sectionRef}>


<div className="grid-item item-1" style={{backgroundImage:'url(/AmiriSnap1.webp)'}}>
        
      

        </div>
        <div className="grid-item item-2" style={{backgroundImage:'url(/AmiriSnap4.webp)'}}>
      
     
        </div>


      <div className="grid-container-wrapper" >
        <div className="grid-content">

        <div className="site-title-wrapper">
         <div className="hero-title2">SaraS</div>
        <div className="title-tag">Refine Living</div>
       </div>

        <div className="main-image-wrapper" ref={mainImgRef}>
  <video 
    src="/AmiriVidFinalCut.mp4"    /* change thios back to AmiriVidFinalCut  */
    muted 
    autoPlay 
    loop 
    playsInline
    className="hero-video"
  />
  
</div>

    <div style={{opacity:isAtTop?1:0}} className="store-scroll-down-wrapper">
      <span style={{fontSize:'1.1rem'}}>↓</span>
      <span>Scroll Down</span>
    </div>
        </div>
 
    
        
      </div>
<div className="scroll-animation-text-wrapper">
 <div className="scrolling-animation-text">
  <div className="animation-text">
    <div className="text-wrapper">
  <span id='subText'>Your</span>
  <span id='mainText'>Vision</span>
</div>
  </div>
<div className="animation-text">
  <div className="text-wrapper">
  <span id='subText'>Our</span>
  <span id='mainText'>Canvas</span>
</div>
</div>

</div>
</div>
    </div>
  )
}
