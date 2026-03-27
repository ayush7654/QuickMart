import { useState, useEffect, useRef } from 'react';
import { Observer } from 'gsap/all'; // Try importing from 'gsap/all'
import gsap from 'gsap';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './ExploreCategory.css';

// Register the plugin
gsap.registerPlugin(Observer);

const cardsList = [
  { id: 0, img: 'CategoriesImg/FC-Clothing7Rec.jpg', name: 'Clothing', heading: { l1: 'Signature styles', l2: ' for every personal', l3: 'journey.' } },
  { id: 1, img: 'CategoriesImg/FC-Tech2Rec.jpg', name: 'Tech', heading: { l1: 'Next generation', l2: 'innovation in your', l3: 'hands.' }},
  { id: 2, img: 'CategoriesImg/FC-Sports8.jpg', name: 'Sports', heading: { l1: 'Fueling your', l2: 'pursuit of peak', l3: ' performance.' }},
  { id: 3, img: 'CategoriesImg/FC-Decor2Rec.png', name: 'Decor', heading: { l1: 'Refining the art of', l2: 'living well.', l3: '' }},
    { id: 4, img: 'CategoriesImg/FC-Skincare5Rec.jpg', name: 'Skincare', heading: { l1: 'The ultimate ritual', l2: 'for healthy skin.', l3: '' } },
      { id: 5, img: 'CategoriesImg/FC-Adventure4.jpg', name: 'Adventure', heading: { l1: 'Every journey', l2: 'begins with better', l3: ' gear.' } },
  { id: 6, img: 'CategoriesImg/FC-Shoes4.jpg', name: 'Footwear', heading: { l1: 'Exceptional', l2: 'craftsmanship in', l3: 'every single step.' } },
  { id: 7, img: 'CategoriesImg/FC-Essentials8.jpg', name: 'Essentials', heading: { l1: 'Essentials for', l2: 'daily use.', l3: '' }},
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
    <div className='ExploreCategory-wrapper' style={{ backgroundImage: `url(${cardsList[activeIndex].img})` }}>

       
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
        <div className="exploreCategory-head-wrapper">
             <div className='exploreCategory-head'>
            <div>Explore Our Range</div>
               <div className="pagination-container">
  {cardsList.map((_, index) => (
    <div
      key={index}
      className={`pagination-dot ${activeIndex === index ? 'active' : ''}`}
      onClick={() => setActiveIndex(index)} // Allows clicking dots to jump
    />
  ))}
</div>
         </div>
        </div>
        
        <div className="test-carousel-window" ref={containerRef} data-lenis-prevent>
          <div
            className="test-carousel-track"
            style={{
              transform: `translateX(calc(-${activeIndex} * (var(--test-collapsed-width) + var(--test-gap))))`,
            }}
          >
          
            {cardsList.map((card, index) => (
              <div
                key={card.id}
                className={`test-category-card ${activeIndex === index ? 'test-active' : ''}`}
                onClick={() => setActiveIndex(index)}
                style={{ backgroundImage: `url(${card.img})` }}
              >
               
                <div className="test-card-content">
                  <div id='category-head-line'>{card.heading.l1}</div>
                  <div id='category-head-line'>{card.heading.l2}</div>
                  <div id='category-head-line'>{card.heading.l3}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    
    </div>
  );
}