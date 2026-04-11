

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { motion, useScroll, useTransform, useSpring, transform, scale } from 'framer-motion';
import "./Testing.css";






export default function Testing() {


 const [arcItems,setArcItems] = useState(
  [
  {id:0,img:'DogFood2.png',scale:.7},
  {id:1,img:'DogFood5.png',scale:.8},
  {id:2,img:'DogFood6.png',scale:.9},
  {id:3,img:'DogFood4.png',scale:1},
]
)

const PetProducts =[
  {id:0,title:'Wet Dog Food Bumper Pack',img1:'PetFood1Img1.webp',price:'£36.65',brand:'Superfoods'},
  {id:1,title:'Salmon And Chicken ',img1:'PetFood5Img1.webp',price:'£19.07',brand:'Harringtons'},
  {id:2,title:'Baked Salmon Fish Bites',img1:'PetFood3Img1.webp',price:'£14.32',brand:'FreshBakes'},
  {id:3,title:'Lamb And Chicken',img1:'PetFood4Img1.webp',price:'£14.00',brand:'Harringtons'},
]


 const arcRef = useRef(null);

 const sectionRef = useRef(null);

const { scrollYProgress } = useScroll({
  target: sectionRef,
  // "start end" = top of div enters bottom of viewport
  // "start start" = top of div reaches top of viewport
  offset: ["start end", "start start"] 
});

const translateYUp = useTransform(scrollYProgress,[0,1],["100%", "0%"]);

useEffect(() => {
  gsap.to(arcRef.current, {
    rotate: 90,
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.current, // ✅ bigger area
      start: "top center",
      end: "bottom center", // smoother range
      scrub: 1, // 🔥 smoothing (not true)
      invalidateOnRefresh: true,
    },
  });
}, []);




  return (
    <div className="testing-div">

<div className='pet-section' ref={sectionRef}>
        <motion.img style={{y:translateYUp}} className='dog-main' src='HomeCollections/PetMainImg2.png'/>
<div className="pet-products-wrapper">
  <div className='pet-png-wrapper'>
    <img src='HomeCollections/Dog-paws-Img.png'/>
  </div>
<div className="arc-container">
      <div className="arc" ref={arcRef}>
        {arcItems.map((item, i) => (
          <div className="arc-item" key={i} style={{ "--i": i}} >
           <img src={`HomeCollections/${item.img}`} style={{transform:`scale(${item.scale})`}}/>
          </div>
        ))}
      </div>


    </div>
</div>
<div className="pet-preview-wrapper">
  {PetProducts.map((item,index)=>
  <div className='pet-product'>
  <div className='pet-food-img-wrapper'>
   <img src={`HomeCollections/${item.img1}`}/> 
  </div>
  <div className='pet-food-Info-wrapper'>
  <div className="pet-info-line1">
    <span>{item.title}</span>
    <span>{item.price}</span>
  </div>
  <div className="pet-food-brand">{item.brand}</div>
  </div>
  </div>)}
</div>
</div>


</div>
)
}



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
 