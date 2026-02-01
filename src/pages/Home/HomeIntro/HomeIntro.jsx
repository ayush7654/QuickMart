import React ,{useState,useRef,useEffect}from 'react'
import './HomeIntro.css'
import IconButton from '../../../components/IconButton/IconButton';
import { useScroll } from '../../../components/ScrollData/ScrollData';
import { head } from 'lodash';
export default function HomeIntro() {

const [activeIndex, setActiveIndex] = useState(0);
const isAnimating = useRef(false);


const {scrollY} = useScroll();
const atTop = scrollY<100?true:false;

console.log('scroll Y is' ,scrollY)

const homeContent = [
     { id: 0,   content:<>Discover the <span>hottest</span> brands. </> , info:'From rising labels to established favorites, discover the hottest brands shaping today’s market. Our selection is constantly updated so you never miss what’s new and in demand.'  },
     { id: 1, content:<>Browse <span>millions</span> of products. </> ,info:'Browse millions of products carefully organized to help you find exactly what you’re looking for. With detailed listings and smart navigation, discovering the right product feels effortless.' },
    { id: 2,content:<>Find the <span>best</span> prices. </>, info:'Compare products easily and discover competitive pricing across our entire collection. We help you find great value without compromising on quality, so you can shop smarter every time.' },
    { id: 3,content:<>Stay ahead with <span>latest</span> trends. </> , info:'Discover the latest trends as they emerge, with new products and styles added regularly. We keep our collection fresh so you can stay ahead of what’s popular and relevant.'}
   
  ];
const handleNext = () => {
    // Loops back to 0 when it hits the end
    setActiveIndex((prev) => (prev === homeContent.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    // Loops to the end when it hits 0
    setActiveIndex((prev) => (prev === 0 ? homeContent.length - 1 : prev - 1));
  };

console.log('active index is ',activeIndex)




  /* IMPORT ISHEADTOP HERE AND MAKE THIS USEEFFECT ONLY FUNCTION OF ISHEADTOP IS TURE  */

useEffect(() => {
if (atTop && activeIndex < 3) {
  document.body.style.overflow = "hidden";
} else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [activeIndex]);

useEffect(() => {
  const handleWheel = (e) => {
    // 🚪 If section is NOT at top → allow normal scroll
    if (!atTop) return;

    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;

    // ⛔ Allow normal scroll at boundaries
    if (
      (scrollingDown && activeIndex >= 3) ||
      (scrollingUp && activeIndex <= 0)
    ) {
      document.body.style.overflow = "";
      return;
    }

    // 🚫 Intercept scroll only when carousel is active
    e.preventDefault();

    if (isAnimating.current) return;
    isAnimating.current = true;

    if (scrollingDown) {
      setActiveIndex(prev => Math.min(prev + 1, 3));
    }

    if (scrollingUp) {
      setActiveIndex(prev => Math.max(prev - 1, 0));
    }

    setTimeout(() => {
      isAnimating.current = false;
    }, 700);
  };

  window.addEventListener("wheel", handleWheel, { passive: false });

  return () => {
    window.removeEventListener("wheel", handleWheel);
    document.body.style.overflow = "";
  };
}, [activeIndex, atTop]);


  /* IMPORT ISHEADTOP HERE AND MAKE THIS USEEFFECT ONLY FUNCTION OF ISHEADTOP IS TURE  */

  return (
    <div className='homeIntro'>
          <div className="video-hero">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/poster.jpg"
        >
          <source src="/AmiriSampleVid2.mp4" type="video/mp4" />
        </video>


         <div className="home-intro-content">
          <div className="carousel-container">
      <div 
        className="carousel-track" 
        /* style={{ transform: `translateY(-${activeIndex * 100}%)` }} */
      >
        {homeContent.map((item) => (
          <div key={item.id} className={`carousel-item `}>
            <h2  style={{ transform: `translateY(-${activeIndex * 600}px)` }}>{item.content}</h2>
            <p className={`${activeIndex===item.id?'':'blur-content'}`} style={{ transform: `translateY(-${activeIndex * 600}px)` }}>{item.info}</p>
          </div>
        ))}
      </div>

     
    </div>

  <div className='home-intro-explore'>
   <IconButton
 width='60%'
 height='3rem'
 text='Explore More'
 contentColor='rgba(0, 0, 0)'
 borderColor='white'
 bgColor='white'
 fontSize='1.1rem'
 IconSize='60%'
 hoverText='white'
 />
   </div>  

   
        </div>

         <div className="CrousalNav-div">
          <div className="CrousalNav-content">
            {homeContent.map(nav=><div onClick={()=>setActiveIndex(nav.id)} 
            className={`CrousalNav ${nav.id===activeIndex?"CrousalNav-selected":''}`}>

            </div>) }
            </div>
         </div>
       
      </div>
    </div>
  )
}
