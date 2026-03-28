import { useEffect, useRef, useState } from "react";
import "./ScrollingAnimation.css";

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollingAnimation({isAtTop}) {

const sectionRef = useRef(null); // For the pinned video section
 

  const mainImgRef = useRef(null);
  const gridItemsRef = useRef([]);

useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2000",
        scrub: 1, // Increased slightly for smoother video motion
        pin: true,
      }
    });

    tl.fromTo(mainImgRef.current, 
      { 
        width: "98vw", 
        height: "98vh", 
        borderRadius: "10px",
        marginTop:'0rem' 
      }, 
      { 
        width: "30vw", 
        height: "80vh", 
        borderRadius: "20px",
        ease: "expo.out", // High initial movement rate
        immediateRender: false,
        marginTop:'0rem' 
      }
    );

    // Pull satellite images in
    tl.from(".grid-item", {
      scale: 1.5,
      opacity: 0,
      x: (i) => (i % 2 === 0 ? -1200 : 1200),
      y: (i) => (i < 2 ? -800 : 800),
      ease: "expo.out"
    }, 0);


      // Header Animation
    gsap.to(".test-header", {
      scrollTrigger: {
        trigger: ".scroll-section", // Starts when the video starts shrinking
        start: "top top",
        end: "+=500",               // Finishes faster than the video shrink
        scrub: 1,
      },
      width: "90%",                 // Shrinks width
      backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent glass
      backdropFilter: "blur(10px)", // The blur effect
      borderRadius: "40px",         // Makes it look like a floating pill
      padding: "10px 30px",         // Optional: tighten padding
      border: "1px solid rgba(255, 255, 255, 0.2)",
      marginTop: "20px",            // Lifts it off the top edge
      ease: "power2.out"
    });

  }, sectionRef);




  return () => ctx.revert();
}, []);


  return (
    <div className="scroll-section" ref={sectionRef}>
      <div className="grid-container">
        


        <div className="grid-item item-1"><img src="/AmiriSnap1.webp" alt="" /></div>
        <div className="grid-item item-2"><img src="/AmiriSnap2.webp" alt="" /></div>
        <div className="grid-item item-3"><img src="/AmiriSnap3.webp" alt="" /></div>
        <div className="grid-item item-4"><img src="/AmiriSnap4.webp" alt="" /></div>

        
        <div className="main-image-wrapper" ref={mainImgRef}>
  <video 
    src="/AmiriVidFinalCut.mp4" 
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
  )
}
