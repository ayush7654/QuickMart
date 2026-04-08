

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import "./Testing.css";






export default function Testing() {


  const collections =['Anti UV', "Dogs/Pets",]


  return (
    <div className="testing-div">
 <div className='solarpack-main-img-wrapper'>
<div className='solar-img-wrapper-left'>

<img src='HomeCollections/solarMainImg1.webp' width={600}/> 
<img className='solarImgOverlay' src='HomeCollections/sampleSolarImg.webp' width={600}/> 
 <img className='blurredImgLeft' src='HomeCollections/blurImgSample.webp' width={600}/>
 <img className='blurredImgRight' src='HomeCollections/blurImgSample.webp' width={600}/>

 </div>

{/*   <div className='solar-img-wrapper-right'>

<img src='HomeCollections/solarMainImg2.webp' width={1000}/> 
<img className='solarImgOverlay' src='HomeCollections/solarOverlayImg2.webp' width={1000}/> 
 <img className='blurredImgLeft' src='HomeCollections/solarBlurImg2.webp' width={1000}/>
 <img className='blurredImgRight' src='HomeCollections/solarBlurImg2.webp' width={1000}/>

 </div> */}
 </div>
 

</div>
)
}



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
 