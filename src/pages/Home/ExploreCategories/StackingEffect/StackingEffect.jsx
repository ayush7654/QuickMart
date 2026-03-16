import React, { useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import './StackingEffect.css';

const cards = [
  { id: 1, title: "STYLE", img: "/ExploreImgs/Browse-Style2.jpg" },
  { id: 2, title: "FITNESS", img: "/ExploreImgs/Browse-Fitness.jpg" },
  { id: 3, title: "LUXURY", img: "/ExploreImgs/Browse-Luxury2.jpg" },
];

export const StackingEffect = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--scroll-progress', latest);
    }
  });

  return (
    <div className="page-wrapper">
      
      <div ref={containerRef} className="main-stack-area">
        
        {cards.map((card, i) => (
          <div 
            key={card.id} 
            className="card-sticky-container" 
            style={{ '--index': i, '--total': cards.length }}
          >
            <div className="stack-card" style={{ backgroundImage: `url(${card.img})` }}>
            
               <div className='stack-card-title-wrapper'>
                <span id="explore-card-name1">{card.title}</span>
                <span id="explore-card-name2">{card.title}</span>
                <span id="explore-card-name3">{card.title}</span>
                </div>
                
            </div>
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default StackingEffect;