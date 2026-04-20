
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

 import "./Testing.css";


 




export default function Testing() {


 const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // 1️⃣ Move wrapper up until center aligns
const y = useTransform(
  scrollYProgress,
  [0, 0.04, 0.1, 0.24, 0.33],
  [0, -1, -50, -180, -270]
);

  // 2️⃣ Then scale whole wrapper
const scale = useTransform(
  scrollYProgress,
  [0, 0.32, 0.52, 0.8],
  [1, 1.1, 1.9, 2]
);

  const radius = useTransform(scrollYProgress, [0.4, 1], ["20px", "0px"]);



  return (
<div className="testing-div">
  <section className="window-section-wrapper"> 
   <section ref={sectionRef} className="window-section">
      <div className="sticky-window-wrapper">

        <motion.div
          className="window-wrapper"
          style={{
            y,
             scale, 
            borderRadius: radius,
          }}
        >
        <div className="window-content">
  {/* ROW 1 */}
  <div className="window-row">
    <div className="img-wrapper">
      <img src="https://picsum.photos/400/500?1" alt="gallery" />
    </div>
    <div className="img-wrapper">
      <img src="https://picsum.photos/400/500?2" alt="gallery" />
    </div>
  </div>

  {/* ROW 2 (CENTER ROW) */}
  <div className="window-row middle">
    <div className="img-wrapper">
      <img src="https://picsum.photos/400/500?3" alt="gallery" />
    </div>
    <div className="img-wrapper center-img-wrapper">
      <img src="https://picsum.photos/600/700?4" alt="gallery" />
    </div>
    <div className="img-wrapper">
      <img src="https://picsum.photos/400/500?5" alt="gallery" />
    </div>
  </div>

  {/* ROW 3 */}
  <div className="window-row">
    <div className="img-wrapper">
      <img src="https://picsum.photos/400/500?6" alt="gallery" />
    </div>
    <div className="img-wrapper">
      <img src="https://picsum.photos/400/500?7" alt="gallery" />
    </div>
  </div>
</div>
        </motion.div>


      </div>

    </section>
    </section>
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
 