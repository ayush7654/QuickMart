import { createContext, useContext, useEffect, useRef, useState } from "react";

const ScrollContext = createContext(null);

export function ScrollData({ children }) {
  const [scrollY, setScrollY] = useState(0);
  const [direction, setDirection] = useState("down");
  const [velocity, setVelocity] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const delta = currentY - lastScrollY.current;

          setScrollY(currentY);
          setDirection(delta > 0 ? "down" : "up");
          setVelocity(Math.abs(delta));
          setIsScrolling(true);

          lastScrollY.current = currentY;
          ticking.current = false;
        });

        ticking.current = true;
      }

      // detect scroll stop
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
        setVelocity(0);
      }, 120);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  

  return (
    <ScrollContext.Provider
      value={{
        scrollY,
        direction,
        velocity,
        isScrolling,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}


export function useScroll() {
  const context = useContext(ScrollContext);

  if (!context) {
    throw new Error("useScroll must be used inside <ScrollData>");
  }

  return context;
}
