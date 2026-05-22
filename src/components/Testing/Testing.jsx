
import React, { useState ,useRef , useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollButton from "../ScrollingButton/ScrollingButton";
import BentoImageGrid from "./BentoImages";
 import "./Testing.css";

 const subGroupList = [
  {name:'Sub Group 1',para:'Group Para 1'},
  {name:'Sub Group 2',para:'Group Para 2'},
  {name:'Sub Group 3',para:'Group Para 3'},
  {name:'Sub Group 4',para:'Group Para 4'},
  {name:'Sub Group 5',para:'Group Para 5'},
  {name:'Sub Group 6',para:'Group Para 6'},
  {name:'Sub Group 7',para:'Group Para 7'},

 ]


export default function Testing() {



 const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
<div className="testing-div">
<div className="accordion-container">
      {subGroupList.map((item, index) => {
        const isOpen = index === activeIndex;

        return (
          <div 
            key={index} 
            className={`accordion-item ${isOpen ? "is-open" : ""}`}
          >
            {/* Header Trigger */}
            <button 
              className="accordion-header" 
              onClick={() => toggleAccordion(index)}
              aria-expanded={isOpen}
            >
              <span className="accordion-title">{item.name}</span>
              
              {/* Rotating Arrow Icon */}
              <motion.span 
                className="accordion-icon"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                ▼
              </motion.span>
            </button>

            {/* Collapsible Content Area */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: "auto", 
                    opacity: 1,
                    transition: {
                      height: { type: "spring", stiffness: 150, damping: 20 },
                      opacity: { duration: 0.25, ease: "linear" }
                    }
                  }}
                  exit={{ 
                    height: 0, 
                    opacity: 0,
                    transition: {
                      height: { duration: 0.25, ease: "easeInOut" },
                      opacity: { duration: 0.15 }
                    }
                  }}
                  className="accordion-content-wrapper"
                >
                  <div className="accordion-content-body">
                    <p>{item.para}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>

</div>





  );
};


/* const expandVariants = {
  hidden: { 
    opacity: 0,
    clipPath: 'inset(0% 50% 0% 50%)',
    transition: { duration: 0.5 } 
  },
  visible: { 
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { 
      duration: 1.2, 
      ease: [0.25, 1, 0.5, 1],
 
      opacity: { duration: 0.8, ease: "linear" } 
    } 
  }
}; */
 