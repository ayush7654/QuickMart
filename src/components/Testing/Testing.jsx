
import React, { useState ,useRef , useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollButton from "../ScrollingButton/ScrollingButton";
import BentoImageGrid from "./BentoImages";
 import "./Testing.css";


const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const tileVariants = {
  hidden: { 
    opacity: 0, 
    y: 30, 
    scale: 0.94 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 140, 
      damping: 18 
    }
  },
};
export default function Testing() {

const [refreshKey, setRefreshKey] = useState(0);

  const items = [
    { id: 1, title: "Cityscapes", size: "tall", img: "https://picsum.photos/400/800?random=1" },
    { id: 2, title: "Collaboration", size: "wide", img: "https://picsum.photos/800/400?random=2" },
    { id: 3, title: "Abstract Geometry", size: "large", img: "https://picsum.photos/600/600?random=3" },
    { id: 4, title: "Video Showcase", size: "medium", img: "https://picsum.photos/600/400?random=4" },
    { id: 5, title: "Fluid Dynamics", size: "wide", img: "https://picsum.photos/800/400?random=5" },
    { id: 6, title: "Flora Study", size: "small", img: "https://picsum.photos/400/400?random=6" },
    { id: 7, title: "Botanical Detail", size: "small", img: "https://picsum.photos/400/400?random=7" },
    { id: 8, title: "Data Architecture", size: "medium", img: "https://picsum.photos/600/400?random=8" },
  ];

  return (
<div className="testing-div">


<div className="bento-page-wrapper">
      <header className="bento-header">
        <h1 className="bento-main-title">Portfolio Bento Showcase</h1>
        <button 
          onClick={() => setRefreshKey(prev => prev + 1)} 
          className="bento-refresh-btn"
        >
          Replay Entrance
        </button>
      </header>

      <motion.div
        key={refreshKey}
        variants={gridContainerVariants}
        initial="hidden"
        animate="visible"
        className="bento-grid-container"
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            variants={tileVariants}
            whileHover={{ 
              y: -10, 
              scale: 1.015,
              boxShadow: "0px 20px 40px rgba(0,0,0,0.4)" 
            }}
            className={`bento-tile tile-${item.size}`}
          >
            <div className="bento-image-wrapper">
              <img 
                src={item.img} 
                alt={item.title} 
                className="bento-img" 
              />
              <div className="bento-overlay" />
            </div>

            <div className="bento-content">
              <h3 className="bento-tile-title">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
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
 