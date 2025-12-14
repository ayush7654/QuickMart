import React, { createContext , useState, useRef, useEffect } from 'react'

 export const WinScrollContext = createContext(null); 

export default function WinScrollProvider({children}) {

      // Move up/down state
          const [isIdle, setIsIdle] = useState(false);
    
        const [isAtTop, setIsAtTop] = useState(true);
    
          // For scroll detection
          const lastScrollY = useRef(window.scrollY);
          
    useEffect(() => {
      let ticking = false;
      // Define the distance from the top in pixels after which the header
      // changes its base class (e.g., from transparent to solid background)
      const headerClassChangeThreshold = 10; // You can adjust this value as needed
    
      // NEW: Define the scroll distance from the top *before* the header
      // starts to consider hiding (becoming idle).
      const hideHeaderStartThreshold = 10; // For example, hide after scrolling 200px from top
    
      // NEW: Define the scroll distance before the header becomes idle/hidden,
      // once the hideHeaderStartThreshold has been crossed.
      const scrollDeltaForIdle = 5; // Adjust this value as needed (e.g., 50px, 100px)
    
      const onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
    
            // Update isAtTop state (based on initial threshold)
            if (currentScrollY <= headerClassChangeThreshold) {
              setIsAtTop(true);
            } else {
              setIsAtTop(false);
            }
    
            // --- MODIFIED IDLE LOGIC ---
            // Only start checking for idle/hide behavior AFTER scrolling past a certain point from the top
            if (currentScrollY > hideHeaderStartThreshold) {
              if (currentScrollY > lastScrollY.current + scrollDeltaForIdle) {
                // Scrolled down sufficiently past the hide threshold
                setIsIdle(true);
              } else if (currentScrollY < lastScrollY.current - scrollDeltaForIdle) {
                // Scrolled up sufficiently, show header
                setIsIdle(false);
              }
            } else {
              // If we are above or at the hideHeaderStartThreshold, the header should never be idle (hidden)
              setIsIdle(false);
            }
            // --- END MODIFIED IDLE LOGIC ---
    
            lastScrollY.current = currentScrollY;
            ticking = false;
          });
    
          ticking = true;
        }
      };
    
     
        
    
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }, []);


  return (
    <WinScrollContext.Provider value={{isIdle, isAtTop}}>
        {children}
    </WinScrollContext.Provider>
  )
}
