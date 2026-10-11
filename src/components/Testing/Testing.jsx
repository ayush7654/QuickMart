
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import SiteMenu from '../SiteMenu/SiteMenu';



 import "./Testing.css";


const menuVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const boxVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const menuItems = [
  "Box One",
  "Box Two",
  "Box Three",
  "Box Four",
];


export default function Testing() {

 const [isOpen, setIsOpen] = useState(false);


  
  
  return (
<div className="testing-div"  >
 <div
      className="mega-menu-container"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <header className="mega-header">
        <div className="mega-logo">YOUR BRAND</div>

        <nav className="mega-nav">
          <span className="mega-trigger">
            Collections
          </span>
          <span>About</span>
          <span>Contact</span>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mega-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="mega-menu-content">
              {menuItems.map((item) => (
                <motion.div
                  className="mega-menu-box"
                  key={item}
                  variants={boxVariants}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

</div>





  );

  



}
