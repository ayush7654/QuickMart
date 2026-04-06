import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StackingEffect.css';
import { useCartList } from '../../../../components/CartListProvider';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { id: 1, title: "STYLE", img: "/ExploreImgs/Browse-Style2.jpg" },
  { id: 2, title: "FITNESS", img: "/ExploreImgs/Browse-Fitness.jpg" },
  { id: 3, title: "LUXURY", img: "/ExploreImgs/Browse-Luxury2.jpg" },
];

export const StackingEffect = () => {
  const { cartList } = useCartList();
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

useEffect(() => {
  const cards = cardRefs.current;
  const container = containerRef.current;
  
  // 1. Initial Reset to prevent flashes and set GPU acceleration
  gsap.set(cards, { 
    filter: "brightness(1)", 
    force3D: true 
  });

  cards.forEach((card, i) => {
    // --- THE ENTRANCE ANIMATION ---
    // We want all cards to emerge. 
    // Card 0 starts partially visible (30vh) to avoid "white space"
    // Card 1+ starts off-screen (100vh)
    // --- THE ENTRANCE ANIMATION ---
  gsap.fromTo(card, 
    { 
      y: i === 0 ? "100vh" : "100vh", 
      width: "30%", 
    }, 
    { 
      y: i * 40,
      width: "30%", 
      ease: "power1.out", // Adding an ease makes the start of the growth feel smoother
      scrollTrigger: {
        trigger: i === 0 ? container : card,
        // For card 0: start when container is 80% visible, end when it hits the top
        // This gives it a 'zone' to animate through
        start: i === 0 ? "top 80%" : "top bottom",
        end: "top top",
        scrub: 1, // Adding a slight '1' here adds a tiny bit of smooth catch-up
        invalidateOnRefresh: true,
      }
    }
  );

    // --- THE BURIAL ANIMATION (Darkening) ---
    if (i < cards.length - 1) {
      const nextCard = cards[i + 1];

      gsap.to(card, {
        scale: 0.92,
        filter: "brightness(0.6)", 
        scrollTrigger: {
          trigger: nextCard,
          start: "top bottom",
          end: "top top",
          scrub: true,
          immediateRender: false, // Stops the black flash on load
        }
      });
    }
  });

  return () => {
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
}, []);

  return (
    <div className="page-wrapper">
      <div ref={containerRef} className="main-stack-area">
        {cards.map((card, i) => (
          <div 
            key={card.id} 
            ref={el => cardRefs.current[i] = el}
            className="stack-card" 
            style={{ 
              backgroundImage: `url(${card.img})`,
              zIndex: i 
            }}
          >
            <div className='stack-card-title-wrapper'>
              <span id="explore-card-name1">{card.title}</span>
              <span id="explore-card-name2">{card.title}</span>
              <span id="explore-card-name3">{card.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackingEffect;