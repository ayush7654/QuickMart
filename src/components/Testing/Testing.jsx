

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
gsap.registerPlugin(ScrollTrigger);

 import "./Testing.css";
import ScalingTextAnimation from '../ScalingTextAnimation/ScalingTextAnimation';

 




export default function Testing() {


const [isOpen, setIsOpen] = useState(false);

// 1. Store your videos in an array
const videoFiles = [
 {id:0,videoSrc:'/Fitness-Video3.mp4', color:'rgb(255, 224, 0)',img:'/WeightImg4.jpg'},
 {id:1,videoSrc:'/Fitness-Video4.mp4', color:'rgb(183, 110, 255)',img:'/YogaMatImg2.jpg'},
 {id:2,videoSrc:'/Fitness-Video5.mp4', color:'rgb( 247, 187, 206 )',img:'/MachineImg1.jpg'}
 
];

// 2. Track the index instead of the string
const [videoIndex, setVideoIndex] = useState(0);

useEffect(() => {
  const delay = isOpen ? 8000 : 4000;
  
  const timeoutId = setTimeout(() => {
    setIsOpen((prev) => {
      const nextState = !prev;
      
      // 3. Increment index only when expanding (false -> true)
      if (nextState === true) {
        setVideoIndex((prevIndex) => (prevIndex + 1) % videoFiles.length);
      }
      
      return nextState;
    });
  }, delay);

  return () => clearTimeout(timeoutId);
}, [isOpen]);
 

const banners = new Array(1).fill(null);
const loopBanners = [...banners, ...banners];




  return (
    <div className="testing-div">
      <h1>reference website https://phive.pt/en</h1>
<div className="test-container" style={{backgroundImage:`url(${videoFiles[videoIndex].img})`}}>
<div className={`test-video-wrapper ${isOpen ? 'test-video-expanded' : ''}`}>
 <video 
  key={videoFiles[videoIndex].id} // Forces re-render to start the new video immediately
  className="test-video-content"
  src={videoFiles[videoIndex].videoSrc} 
  autoPlay 
  loop 
  muted 
  playsInline
/>
</div>
 <div className="banners-viewport">  
    <div className="banners-wrapper">
      {loopBanners.map((_, index) => (
        <div
          key={index}
          className={`test-banner-wrapper ${isOpen ? 'test-active' : ''}`}
          
        >
     <div className="banner-inner">

          <div className="test-banner-part test-top"
          style={{background:videoFiles[videoIndex].color}} >
            <div className="test-content">
              
                    <ScalingTextAnimation word='Equip Your Grind'/>   
                     

            </div>
          </div>

          <div className="test-banner-part test-bottom"
           style={{background:videoFiles[videoIndex].color}} > {/* 247, 187, 206 */} {/* 183, 110, 255 */}
            <div className="test-content">
                    <ScalingTextAnimation word='Equip Your Grind'/>  
                   
            </div>
          </div>
</div>
        </div>
      ))}
    </div>
  </div>
  

      {/* <button className="test-split-btn" onClick={toggleSplit}>
        {isOpen ? 'CLOSE BANNER' : 'SPLIT BANNER'}
      </button> */}
               
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
 