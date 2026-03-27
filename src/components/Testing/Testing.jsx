

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import "./Testing.css";





export default function Testing() {

const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    // 1. Move the cursor element to the mouse position
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1, // This small delay makes it feel 'fluid'
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="testing-div">
<div ref={cursorRef} className="custom-cursor"></div>
<div className='box-test'></div>
      

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
 