import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.08, // The 'Train' inertia
    });

    // 2. EXPOSE TO WINDOW 
    // This allows your HomeIntro component to call lenis.stop() and lenis.start()
    window.lenis = lenis;

    // 3. Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 4. Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      window.lenis = null; // Clean up global reference
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;