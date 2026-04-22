
import React, { useState ,useRef , useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollButton from "../ScrollingButton/ScrollingButton";
 import "./Testing.css";


 

const AppleWindowInfo = [
  { 
    video:'AppleProductsMedia/MacBookProVid.mp4',
     poster:"AppleProductsMedia/MacBookImgHD.jpg",
     title:"MacBook Pro 14",
        description:"With up to 3.5x more performance for AI workflows, faster storage, up to a phenomenal 24 hours of battery life, and macOS Tahoe, the 14-inch MacBook Pro gets even better.",
        price:"From ₹169900.00* or ₹26650.00/mo. for 6 mo."},
  {
    video:'AppleProductsMedia/Apple17Vid.mp4',
     poster:"AppleProductsMedia/AppleProImg.jpg",
    title:"Apple iPhone 17 Pro",
        description:" iPhone 17 Pro is designed from the inside out to be our most powerful model ever. Its heat-forged unibody enclosure maximizes performance, capacity, and durability.",
        price:"From ₹134900.00* or ₹21650.00/mo. for 6 mo."

  },
  {
    video:'AppleProductsMedia/AppleWatchVid.mp4',
      poster:"AppleProductsMedia/AppleWatchImg3.jpg",
     title:"Apple Watch Series 10",
        description:" The world’s bestselling watch is thinner than ever, featuring the biggest, most advanced display yet; sleep apnea notifications; faster charging; and  temperature sensing.",
        price:"From ₹134900.00* or ₹21650.00/mo. for 6 mo."  
  }
]


export default function Testing() {

const [currentWindow, setCurrentWindow] = useState(1)

/* const handleNext = () => {
  setCurrentWindow(prev => Math.min(prev + 1, AppleWindowInfo.length - 1));
};

const handlePrev = () => {
  setCurrentWindow(prev => Math.max(prev - 1, 0));
}; */




 const sectionRef = useRef(null);

 const videoRefs = useRef([]);

 const [windowScaled, setIsWindowScaled] = useState(false);

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

const gap = useTransform(
  scrollYProgress,
  [0, 0.28, 0.5, 0.75],
  [8, 7, 1.5, 0]
);

/* const halfGap = gap.to(v => v / 2); */

  const radius = useTransform(scrollYProgress, [0.4, 1], ["20px", "0px"]);

useEffect(() => {
  const unsubscribe = scale.on("change", (latest) => {
    if (latest >= 1.7) { // small tolerance
      setIsWindowScaled(true);
    } else {
      setIsWindowScaled(false);
    }
  });

  return () => unsubscribe();
}, [scale]);

  // This effect runs whenever currentWindow changes
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentWindow) {
          video.play().catch((err) => console.log("Playback error:", err));
        } else {
          video.pause();
          video.currentTime = 0; // Reset video to start when inactive
        }
      }
    });
  }, [currentWindow]);

  return (
<div className="testing-div">
  <section className="window-section-wrapper"> 
    <section ref={sectionRef} className="window-section">
      {/* Video screen content */}

      <div className={`window-video-content-wrapper ${windowScaled ? 'window-video-scaled' : ''}`}>
        <div className="window-video-content">
          
          <div className="window-info">
            <h2>{AppleWindowInfo[currentWindow].title}</h2>
            <span className="applePro-para">{AppleWindowInfo[currentWindow].description}</span>
            <span className="applePro-price">{AppleWindowInfo[currentWindow].price}</span>

            <div className="ApplePro-buy">
              <ScrollButton className="apple-buy-btn" text="Buy Now" /> 
            </div>

            <div className="window-nav-wrapper">
              {AppleWindowInfo.map((_, index) => (
                <div
                  key={index}
                  className={`pagination-dot ${currentWindow === index ? 'active' : ''}`}
                  onClick={() => setCurrentWindow(index)} // Allows clicking dots to jump
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="sticky-window-wrapper"
     >

        {/* style removed safely */}
        <motion.div className="window-wrapper"
         style={{ y, scale, borderRadius: radius, }}>
          
          <div className="window-content">

            {/* ROW 1 */}
            {/* style={{ gap }} */}
            <div className="window-row">
              <div className="img-wrapper">
                <img src="AppleProductsMedia/Iphone-img5.png" alt="gallery" />
              </div>
              <div className="img-wrapper">
                <img src="AppleProductsMedia/Iphone-img7.png" alt="gallery" />
              </div>
            </div>

            {/* ROW 2 (CENTER ROW) */}
            <div
              className="window-row middle-row"
              style={{
                transform: `translateX(${
                  currentWindow === 0 ? "50%" : 
                  currentWindow === 1 ? "0%" : 
                  "-50%"
                })`
              }}
            >
              {AppleWindowInfo.map((item, index) => (
                <div key={index} className="img-wrapper middle-row-window">
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={item.video}
                    poster={item.poster}
                    loop
                    muted
                    playsInline
                    className="window-video"
                  />
                </div>
              ))}
            </div>

            {/* ROW 3 */}
            {/* style={{ gap }} */}
            <div className="window-row">
              <div className="img-wrapper">
                <img src="AppleProductsMedia/Iphone-img6.png" alt="gallery" />
              </div>
              <div className="img-wrapper">
                <img src="AppleProductsMedia/Iphone-img3.png" alt="gallery" />
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
 