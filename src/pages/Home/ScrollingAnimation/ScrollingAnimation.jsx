import { useEffect, useRef } from "react";
import "./ScrollingAnimation.css";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const containerVariants = {

  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between text 1 and text 2
    },
  },
};

// Individual child variants for opacity and movement
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
};

export default function ScrollingAnimation({ isAtTop }) {
  const sectionRef = useRef(null);
  const mainImgRef = useRef(null);


  useEffect(() => {
    // Force ScrollTrigger to update perfectly in sync with Lenis's layout engine
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 0, 
          pin: true,
          // FIX: Prevents layout breaking from 3D body transitions 
          // and stops Lenis scrolling conflict jitters dead in their tracks.
          pinType: "transform", 
 
        }
      });

      // 1. SITE TITLE - EXITS INSTANTLY
      tl.to(".hero-title2", {
        x: -100,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.2,
      }, 0);

      tl.to(".title-tag", {
        x: 100,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.2,
      }, 0);

      // 2. MAIN VIDEO - YOUR ORIGINAL ANIMATION
      tl.fromTo(mainImgRef.current, 
        { 
          width: "98vw", 
          height: "98vh", 
          borderRadius: "10px",
          marginTop: '0rem' 
        }, 
        { 
          width: "0vw", 
          height: "90vh", 
          borderRadius: "20px",
          ease: "expo.out",
          duration: 1,      
          immediateRender: false,
          marginTop: '0rem' 
        }, 
        0 
      );

      tl.from(".grid-item", {
        scale: 1.5,
        opacity: .5,
        x: (i) => (i % 2 === 0 ? -1200 : 1200),
        y: (i) => (i < 2 ? -100 : 100),
        ease: "expo.out",
        duration: 1,
      }, 0); 



      

    }, sectionRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <div className="scroll-section" ref={sectionRef}>
      <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.8 }} // Triggers when 40% in view, runs only once
      className="grid-item item-1" >
        <motion.div  
        variants={itemVariants}
        className="grid-item-text-wrapper grid-text1">
        <span className="grid-item-text">Elegance</span>
            <span className="grid-item-subtext grid-item-line2">in every quiet detail.</span>
          </motion.div>
        

      </motion.div>
      <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.8 }}
      className="grid-item item-2" >
           <motion.div 
            variants={itemVariants}
           className="grid-item-text-wrapper grid-text2">
        <span className="grid-item-subtext">Tailored to absolute</span>
            <span className="grid-item-text grid-item-line2">perfection.</span>
          </motion.div>
      </motion.div>


      <div className="grid-container-wrapper">
        <div className="grid-content">
          <div className="site-title-wrapper">
            <div className="hero-title2">SaraS</div>
            <div className="title-tag">Refine Living</div>
          </div>

          <div className="main-image-wrapper" ref={mainImgRef}>
            <video 
              src="/HomeMedia/AmiriVidFinalCut.mp4" 
              muted 
              autoPlay 
              loop 
              playsInline
              className="hero-video"
            />
          </div>

          <div style={{ opacity: isAtTop ? 1 : 0 }} className="store-scroll-down-wrapper">
            <span style={{ fontSize: '1.1rem' }}>↓</span>
            <span>Scroll Down</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}