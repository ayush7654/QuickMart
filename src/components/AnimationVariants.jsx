// variants.js
// variants.js
export const slideUpVariants = {
  hidden: { 
    y: "5rem", 
    opacity: 0 
  },
  visible: (delayValue) => ({ 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.8, 
      delay: delayValue, // Use the passed value here
      ease: [0.21, 1, 0.36, 1] 
    }
  })
};

// Standard viewport settings to keep things consistent
export const standardViewport = {
  once: true,
  amount: 0.2
};