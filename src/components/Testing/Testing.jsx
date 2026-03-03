import { useEffect, useRef, useState } from "react";
import "./Testing.css";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StoreSorting from "../../pages/Store/StoreSorting/StoreSorting";
import { useScroll } from "../ScrollData/ScrollData";
import ScrollingAnimation from "../ScrollingAnimation/ScrollingAnimation";
gsap.registerPlugin(ScrollTrigger);


export default function Testing() {

  const{ scrollY} = useScroll();

  console.log(scrollY)

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to(".test-header", {
      scrollTrigger: {
        trigger: ".scroll-section", // Syncs with your video component's class
        start: "top top",
        end: "+=500",               // Shrinks over the first 500px of scroll
        scrub: 1,
      },
      width: "65%",                 // Your requested target width
      ease: "power2.out",
    });
  });

  return () => ctx.revert();
}, []);
  return (
    <div className="testing-div">

{/* <div className="test-bg"></div> */}
    {/*   <ScrollingAnimation/> */}

<div className="test-header-wrapper">
<div className={`test-header ${scrollY===0?'':'test-header-blurred'}`}>
<span>Icon</span>
<h2>Product Categlog</h2>
<span>Dropdown</span>
</div>

</div> 

{/* <div className="scroll-section" ref={sectionRef}>
      <div className="grid-container">
        


        <div className="grid-item item-1"><img src="/AmiriImg9.jpg" alt="" /></div>
        <div className="grid-item item-2"><img src="/AmiriImg7.jpg" alt="" /></div>
        <div className="grid-item item-3"><img src="/AmiriImg6.jpg" alt="" /></div>
        <div className="grid-item item-4"><img src="/AmiriImg10.png" alt="" /></div>

        
        <div className="main-image-wrapper" ref={mainImgRef}>
  <video 
    src="/AmiriSampleVid2.mp4" 
    muted 
    autoPlay 
    loop 
    playsInline
    className="hero-video"
  />
</div>

        <h1 className="hero-title">Go Further</h1>
      </div>
    </div> */}
</div>
)
}