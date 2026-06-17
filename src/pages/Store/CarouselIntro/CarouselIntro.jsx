import React, { useState, useRef, useEffect } from 'react';
import './CarouselIntro.css';
import IconButton from '../../../components/IconButton/IconButton';
import ScrambleTextSwitcher from '../../../components/Testing/ScrambleTextSwitcher';
import { useScroll } from '../../../components/ScrollData/ScrollData';
import { gsap } from 'gsap';
import { Observer } from 'gsap/all'; // Try importing from 'gsap/all'
import { AnimatePresence , motion } from 'framer-motion';
import BlurTransition from '../../../components/Testing/BlurTransition';
gsap.registerPlugin(Observer);


  // We consider it "Top" if scroll is near zero
  const atTop = scrollY < 50;

export default function CarouselIntro() {
const [activeIndex, setActiveIndex] = useState(() => {
  const saved = localStorage.getItem("activeIndex");
  return saved !== null ? Number(saved) : 0;
});
  const isAnimating = useRef(false);
  const { scrollY } = useScroll();
  


  const homeContent = [
     { id: 0, info: 'Discover the latest trends as they emerge, with new products and styles added regularly.' },
         { id: 1, info: 'Browse millions of products organized to help you find exactly what you’re looking for.' },
             { id: 2, info: 'Compare products easily and discover competitive pricing across our entire collection. ' },
    { id: 3,  info: "From independent labels to established favorites, shop today's hottest global designers." },


   
  ];

  const storeImages=['StoreImg5.webp','StoreImg7.jpg','StoreImg10.jpg','StoreImg9.jpg']

  useEffect(() => {
    // 1. Access the Lenis instance from the window (standard for Lenis setups)
    const lenis = window.lenis;

    // 2. Logic to Lock/Unlock Page Scroll
    // If at top and not on the last dot, we lock the page
    if (atTop && activeIndex < 3) {
      if (lenis) lenis.stop();
    } else {
      if (lenis) lenis.start();
    }

    // 3. Setup GSAP Observer to "Listen" for scroll intent
    let obs = Observer.create({
      target: window,
      type: "wheel,touch",
      onDown: () => {
        if (!isAnimating.current && atTop && activeIndex < 3) {
          isAnimating.current = true;
          setActiveIndex(prev => prev + 1);
          setTimeout(() => { isAnimating.current = false }, 800);
        }
      },
   
      // This is key: it stops the 'wheel' event from reaching Lenis
      preventDefault: (atTop && activeIndex < 3) 
    });

    return () => {
      if (obs) obs.kill();
      if (lenis) lenis.start(); // Ensure scroll is back on if component unmounts
    };
  }, [activeIndex, atTop]);

useEffect(() => {
  localStorage.setItem("activeIndex", activeIndex);
}, [activeIndex]);

  return (
    <div className='CarouselIntro'>





<div className='store-Bg-wrapper'>
<BlurTransition activeIndex={activeIndex}/>

</div>

<div className='store-text-content'>
<ScrambleTextSwitcher
words={["Stay ahead with latest trends.", "Browse millions of products.", "Find the best prices.", "Buy from the hottest brands."]}
  activeIndex={activeIndex}
/>

<div className="store-text-description">
  {homeContent[activeIndex].info}
</div>
</div>
      
     

        <div className="CrousalNav-div">
       
          <div className="CrousalNav-content">
  {homeContent.map((nav, index) => (
    <div 
      key={nav.id}
      // Use index if your activeIndex is 0-based, or nav.id if it matches exactly
      onClick={() => setActiveIndex(index)} 
      className={`CrousalNav ${index === activeIndex ? "CrousalNav-selected" : ''}`}
    />
  ))}
</div>
        </div>
      
    </div>
  )
}