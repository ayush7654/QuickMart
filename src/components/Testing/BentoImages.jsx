import React from "react";
import { motion } from "framer-motion";
import "./BentoImages.css";

const gridVariants = {
  hidden: { opacity: 1 }, // Keeps container stable
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 } // Cascading shutter effect
  }
};

const shutterVariants = {
  hidden: { 
    clipPath: "inset(100% 0% 0% 0%)" // Fully masked from the bottom
  },
  visible: { 
    clipPath: "inset(0% 0% 0% 0%)", // Unmasks completely
    transition: { 
      duration: 0.85, 
      ease: [0.16, 1, 0.3, 1] // Ultra-smooth custom cubic-bezier
    }
  }
};

export default function BentoImageGrid() {
  const images = [
    { id: 1, size: "tall", url: "https://picsum.photos/400/800?random=1" },
    { id: 2, size: "wide", url: "https://picsum.photos/800/400?random=2" },
    { id: 3, size: "large", url: "https://picsum.photos/600/600?random=3" },
    { id: 4, size: "medium", url: "https://picsum.photos/600/400?random=4" },
  ];

  return (
    <motion.div 
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      className="bento-image-grid"
    >
      {images.map((img) => (
        <motion.div
          key={img.id}
          variants={shutterVariants}
          className={`bento-image-tile tile-${img.size}`}
        >
          <img src={img.url} alt="Bento showcase" className="bento-pure-img" />
        </motion.div>
      ))}
    </motion.div>
  );
}