import { useState, useEffect, useRef } from 'react';
import { Observer } from 'gsap/all'; // Try importing from 'gsap/all'
import gsap from 'gsap';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CarouselNav from '../../../components/CarouselNav/CarouselNav';
import { ActiveVideoPlayer } from './ActiveVideoPlayer';
import './ExploreCategory.css';

// Register the plugin
gsap.registerPlugin(Observer);

const cardsList = [

    { id: 0,  name: 'Clothing', video:'clothing-vid.mp4', snap:'clothing-snap.jpg', thumbnail:'clothing-tn.jpg',  path:'', heading: { l1: 'Signature styles', l2: ' for every personal', l3: 'journey.' } },
  { id: 1, name: 'Technology',video:'technology-vid.mp4',snap:'technology-snap.jpg', thumbnail:'technology-tn.jpg', path:'',  heading: { l1: 'Next generation', l2: 'innovation in your', l3: 'hands.' }},
      { id:2,  name: 'Decor',video:'decor-vid.mp4',snap:'decor-snap.jpg', thumbnail:'decor-tn.jpg',  path:'',  heading: { l1: 'Refining the art of', l2: 'living well.', l3: '' }},
        { id: 3,  name: 'Adventure',video:'adventure-vid.mp4',snap:'adventure-snap.jpg', thumbnail:'adventure-tn.jpg',  path:'',  heading: { l1: 'Every journey', l2: 'begins with better', l3: ' gear.' } },
            { id:4,  name: 'Sports',video:'sports-vid.mp4',snap:'sports-snap.jpg', thumbnail:'sports-tn.jpg',  path:'',  heading: { l1: 'Fueling your', l2: 'pursuit of peak', l3: ' performance.' }},
          { id: 5,name: 'Essentials',video:'grocery-vid.mp4',snap:'grocery-snap.jpg', thumbnail:'grocery-tn.jpg', path:'',  heading: { l1: 'Essentials for', l2: 'daily use.', l3: '' }},
  { id: 6, name: 'Skincare',video:'Skincare-vid.mp4',snap:'skincare-snap.jpg', thumbnail:'skincare-tn.jpg',  path:'', heading: { l1: 'The ultimate ritual', l2: 'for healthy skin.', l3: '' } },
    { id: 7, name: 'Footwear',video:'footwear-vid.mp4', snap:'footwear-snap.jpg', thumbnail:'footwear-tn.jpg', path:'',  heading: { l1: 'Exceptional', l2: 'craftsmanship in', l3: 'every single step.' } },
];

export default function ExploreCategory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimating = useRef(false);
  const containerRef = useRef(null);
const cursorRef = useRef(null);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % cardsList.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + cardsList.length) % cardsList.length);

  useEffect(() => {
    const lenis = window.lenis;
    
    // Create Observer on the container
    let obs = Observer.create({
      target: containerRef.current,
      type: "wheel,touch",
      preventDefault: true, // This stops the 'wheel' event from reaching the browser/Lenis
      onDown: () => {
        if (!isAnimating.current) {
          isAnimating.current = true;
          handleNext();
          setTimeout(() => { isAnimating.current = false }, 800);
        }
      },
      onUp: () => {
        if (!isAnimating.current) {
          isAnimating.current = true;
          handlePrev();
          setTimeout(() => { isAnimating.current = false }, 800);
        }
      },
      // Ensure the observer is only active when hovering
      active: false 
    });

    const handleEnter = () => {
      if (lenis) lenis.stop();
      obs.enable();
    };

    const handleLeave = () => {
      if (lenis) lenis.start();
      obs.disable();
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    }

    return () => {
      if (obs) obs.kill();
      if (lenis) lenis.start();
      if (el) {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      }
    };
  }, []); // Empty dependency array as we use refs for animation locking

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
    <div className='ExploreCategory-wrapper' style={{ backgroundImage: `url(ExploreCategory/${cardsList[activeIndex].snap})` }}>

       
      <div className='image-blur'></div>
         <div ref={cursorRef} className="custom-cursor">
  <div className="cursor-arrows">
    {/* <span>&larr;</span>
    <span>&rarr;</span> */}
      <FiChevronLeft/>
      <span className='cursor-circle'></span>
      <FiChevronRight/>
  </div> 


</div>
    

      <div className="test-carousel-viewport">
    
        <div className="test-carousel-window" ref={containerRef} data-lenis-prevent>
          <div
            className="test-carousel-track"
            style={{
              transform: `translateX(calc(-${activeIndex} * (var(--test-collapsed-width) + var(--test-gap))))`,
            }}
          >
   



          {cardsList.map((card, index) => {
        const isActive = index === activeIndex;

        return (
          <div key={card.id} 
           className={`test-category-card ${activeIndex === index ? 'test-active' : ''}`}
           onClick={() => setActiveIndex(index)}
          >
            {isActive ? (
              // 🎥 Render the heavy video ONLY when it is active
              <ActiveVideoPlayer 
                src={`ExploreCategory/${card.video}`} 
                poster={`ExploreCategory/${card.thumbnail}`}
              />
            ) : (
              // 🖼️ Render a lightweight preview/thumbnail for inactive items
              <div className="video-placeholder" onClick={() => setActiveIndex(index)}>
                <img src={`ExploreCategory/${card.thumbnail}`} alt={card.name} />
               {/*  <button className="play-trigger-btn">▶</button> */}
              </div>
            )}
            <div className="test-card-content-wrapper">
                    <div className="test-card-title"> {card.name} </div>
                  <div className="test-card-content">
                       <div id='category-head-line'>{card.heading.l1}</div>
                  <div id='category-head-line'>{card.heading.l2}</div>
                  <div id='category-head-line'>{card.heading.l3}</div>
                  </div>
                  <div className="category-btn">
                    <span>Shop Now</span>
                    <ArrowUpRight className='category-btn-icon' size={25}/>
                  </div>
                
                </div>
          </div>
        );
      })}

          </div>
        </div>
          <div id='explore-category-nav' className="pagination-container">
          <CarouselNav
    list={cardsList}
    activeIndex={activeIndex}
    setActiveIndex={setActiveIndex}/>
    </div>  
      </div>
    
    </div>
  );
}



 {/*  
  add this right after <video/>
    */}