
import React, { useState ,useRef , useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollButton from "../../../components/ScrollingButton/ScrollingButton";
import TextAnimation from "../../../components/TextAnimation";
import './AppleScalingWindow.css'

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


export default function AppleScalingWindow() {

    
    const [currentWindow, setCurrentWindow] = useState(0);
    
     const sectionRef = useRef(null);
    
     const videoRefs = useRef([]);
    
     const [windowScaled, setIsWindowScaled] = useState(false);

     const [windowInfoActive,setWindowInfoActive] = useState(false)
    
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
      [0, 0.8],
      [8, 0]
    );
    const halfGap = useTransform(gap, (v) => v / 2);
    
      const radius = useTransform(scrollYProgress, [0.4, 1], ["20px", "0px"]);
    
      const padding = useTransform(
      scrollYProgress,
      [0, 0.3, 0.6, 0.8],
      [8, 6, 2, 0]
    );
    
 useEffect(() => {
  const unsubscribe = scale.on("change", (latest) => {
    setWindowInfoActive(latest >= 1.7);
    setIsWindowScaled(latest >= 2);
  });

  return () => unsubscribe();
}, [scale]);
    
      
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
    <motion.div className="Apple-scaling-window"
    style={{ padding }}>

          <motion.div 
initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 'some' }}
className='ap-head-wrapper'>
         <motion.div className='ap-head-img'
 variants={{
        hidden: { scale:.5 }, 
        visible: { 
       scale:1 ,opacity:1,
          transition: { duration: .8, ease: [1, 1, 0.5, 1] }
        }
      }}  
  >
    <img src='AppleProductsMedia/AppleWhite.png'/>

    </motion.div> 
    <div className="ap-head-content">
     
     <div className="ap-head-upper">

    <div className="ap-head-main">
       <TextAnimation text={'The Apple Store'} delay={0.15} staggerDelay={.1} />
    </div>
     </div>
     <div className="ap-head-lower">
         <TextAnimation text={'Experiences only Apple can deliver.'} delay={0.5} staggerDelay={.1} />
     </div>

 
    </div>


    </motion.div> 
         <section className="window-section-wrapper"> 
    <section ref={sectionRef} className="window-section">
      {/* Video screen content */}

      <div className={`window-video-content-wrapper ${windowInfoActive ? 'window-video-scaled' : ''}`}>
        <div className="window-video-content">
          
          <div className="window-info">
            <h1>{AppleWindowInfo[currentWindow].title}</h1>
            <span className="applePro-para">{AppleWindowInfo[currentWindow].description}</span>
            <span className="applePro-price">{AppleWindowInfo[currentWindow].price}</span>

            <div className="ApplePro-btn-wrapper">
              <span className="ApplePro-btn">
                <ScrollButton  text="Buy Now" /> 
                </span>
              
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

       
        <motion.div className="window-wrapper"
         style={{ y, scale, borderRadius: radius, }}>
          
          <motion.div className="window-content"

          >
            
            {/* ROW 1 */}
           
            <div className="window-row"
            >
              <motion.div className="window-wrapper"
           style={{
       
        marginRight: gap
      }}
       >
                <img src="AppleProductsMedia/AppleImg7.jpg" alt="gallery" />
              </motion.div>
              <div className="window-wrapper">
                <img src="AppleProductsMedia/MacBookImg7.webp" alt="gallery" />
              </div>
            </div>

            {/* ROW 2 (CENTER ROW) */}
            <div className="mid-row-wrapper">
              <div className="middle-row-grid apple-left-grid">
                The Absolute Best of Apple. All in One Place.
              </div>
                  <div className="middle-row-grid apple-right-grid">
                The Absolute Best of Apple. All in One Place.
              </div>
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
                <motion.div key={index} className="window-wrapper middle-row-window"
          style={{
        marginLeft: halfGap,
        marginRight: halfGap
      }}
                >
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={item.video}
                    poster={item.poster}
                    loop
                    preload="metadata"
                    muted
                    playsInline
                    className="window-video"
                  />
                </motion.div>
              ))}
            </div>
            </div>

            {/* ROW 3 */}
          
            <div className="window-row">
              <motion.div className="window-wrapper"
                style={{
       
        marginRight: gap
      }}>
                <img src="AppleProductsMedia/Iphone-img6.png" alt="gallery" />
              </motion.div>
              <div className="window-wrapper">
                <img src="AppleProductsMedia/Iphone-img3.png" alt="gallery" />
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>

    </section>
  </section>
    </motion.div>
  )
}
