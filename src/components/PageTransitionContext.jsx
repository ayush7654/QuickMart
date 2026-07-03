import React, { createContext, useState, useContext } from 'react';

const PageTransitionContext = createContext(null);

export function PageTransitionProvider({ children }) {
  const [phase, setPhase] = useState("bottom");
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerTransition = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // 1. Slide up into view
    setPhase("center");

    // 2. Pause in the middle, then slide out past the top edge
    setTimeout(() => {
      setPhase("top");
    }, 1200);
  };

  const handleAnimationComplete = () => {
    // 3. Once it completely leaves the top edge, instantly reset to bottom invisibly
    if (phase === "top") {
      setPhase("bottom");
      setIsAnimating(false);
    }
  };

  return (
    <PageTransitionContext.Provider 
      value={{ phase, isAnimating, triggerTransition, handleAnimationComplete }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
}

// Custom hook for clean consumption across other components
export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within a PageTransitionProvider");
  }
  return context;
}