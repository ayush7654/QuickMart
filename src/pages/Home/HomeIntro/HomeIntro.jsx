import React, { useState, useRef, useEffect } from 'react';
import './HomeIntro.css';
import IconButton from '../../../components/IconButton/IconButton';
import { useScroll } from '../../../components/ScrollData/ScrollData';
import { gsap } from 'gsap';
import { Observer } from 'gsap/all'; // Try importing from 'gsap/all'

gsap.registerPlugin(Observer);

export default function HomeIntro() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimating = useRef(false);
  const { scrollY } = useScroll();
  
  // We consider it "Top" if scroll is near zero
  const atTop = scrollY < 50;

  const homeContent = [
    { id: 0, content: <>Buy from the <span>hottest</span> brands. </>, info: 'From rising independent labels to established industry favorites, buy from the hottest brands and visionary designers shaping today’s global market.' },
    { id: 1, content: <>Browse <span>millions</span> of products. </>, info: 'Browse millions of products carefully organized to help you find exactly what you’re looking for.' },
    { id: 2, content: <>Find the <span>best</span> prices. </>, info: 'Compare products easily and discover competitive pricing across our entire collection. ' },
    { id: 3, content: <>Stay ahead with <span>latest</span> trends. </>, info: 'Discover the latest trends as they emerge, with new products and styles added regularly.' }
  ];

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
      onUp: () => {
        if (!isAnimating.current && atTop && activeIndex > 0) {
          isAnimating.current = true;
          setActiveIndex(prev => prev - 1);
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

  return (
    <div className='homeIntro'>
      <div className="video-hero">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/poster.jpg"
        >
          <source src="/HomeIntroAppleVid.mp4" type="video/mp4" />
        </video>

        <div className="home-intro-content">
          <div className="carousel-container">
            <div className="carousel-track">
              {homeContent.map((item) => (
                <div key={item.id} className={`carousel-item`}>
                  <div 
                    className='homeIntro-head' 
                    style={{ 
                        transform: `translateY(-${activeIndex * 600}px)`,
                        transition: 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)' 
                    }}
                  >
                    {item.content}
                  </div>
                  <p 
                    className={`${activeIndex === item.id ? '' : 'blur-content'}`} 
                    style={{ 
                        transform: `translateY(-${activeIndex * 600}px)`,
                        transition: 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1), filter 0.5s' 
                    }}
                  >
                    {item.info}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className='home-intro-explore'>
            <IconButton
              width='60%'
              height='3rem'
              text='Explore More'
              contentColor='rgba(0, 0, 0)'
              borderColor='white'
              bgColor='white'
              fontSize='1.1rem'
              IconSize='60%'
              hoverText='white'
            />
          </div>
        </div>

        <div className="CrousalNav-div">
          <div className="CrousalNav-content">
            {homeContent.map(nav => (
              <div 
                key={nav.id}
                onClick={() => setActiveIndex(nav.id)}
                className={`CrousalNav ${nav.id === activeIndex ? "CrousalNav-selected" : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}