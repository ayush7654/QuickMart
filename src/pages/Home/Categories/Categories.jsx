import React, { useEffect, useState } from "react";
import './Categories.css'
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import AnimatedUnderline from "../../../components/AnimatedUnderline/AnimatedUnderline";
import BracketButton from "../../../components/BracketButton/BracketButton";
import { motion } from 'framer-motion';
import { slideUpVariants,standardViewport } from "../../../components/AnimationVariants";



export default function Categories() {

    const [index, setIndex] = useState(window.innerWidth>450?1:0);
    const [touchStartX, setTouchStartX] = useState(null);
    const [touchEndX, setTouchEndX] = useState(null);
      
     const cardsList=[
   
     
     
      {id:1,img:'CategoriesImg/FC-Clothing2.jpg',name:'Clothing',capName:'CLOTHING',path1:'',path2:''},
       {id:2,img:'CategoriesImg/FC-Tech.jpg',name:'Tech',capName:'TECH',path1:'',path2:''},
       {id:3,img:'CategoriesImg/FC-Shoes.jpg',name:'Footwear',capName:'FOOTWEAR',path1:'',path2:''},
        {id:4,img:'CategoriesImg/FC-Skincare3.jpg',name:'Skincare',capName:'SKINCARE',path1:'',path2:''},
        {id:5,img:'CategoriesImg/FC-HomeDecor4.jpg',name:'Decor',capName:'DECOR',path1:'',path2:''},
           {id:6,img:'motocycle3.jpg',name:'Adventure',capName:'ADVENTURE',path1:'',path2:''},
              
       
          
   {id:7,img:'CategoriesImg/FC-Sports6.jpg',name:'Sports',capName:'SPORTS',path1:'',path2:''},
      {id:8,img:'CategoriesImg/FC-Shades3.jpg',name:'Shades',capName:'SHADES',path1:'',path2:''},
         {id:9,img:'CategoriesImg/FC-Essentials5.jpg',name:'Essentials',capName:'ESSENTIALS',path1:'',path2:''},

   
  ]// placeholders for div cards
    const count =cardsList.length;
      
    
const next = () => setIndex((prev) => Math.min(prev + 1, cardsList.length - 1));
const prev = () => setIndex((prev) => Math.max(prev - 1, 0));

  // handle touch
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  
  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    setTouchEndX(e.changedTouches[0].clientX);
    const diff = e.changedTouches[0].clientX - touchStartX;

    // swipe threshold (in pixels)
    const threshold = 50;

    if (diff > threshold) {
      // swipe right → previous
      prev();
    } else if (diff < -threshold) {
      // swipe left → next
      next();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

   return (
    <div className="Categories-div">
      <div className="Categories-head-div">
                   <div className='home-heading'>Explore Our Range</div>

              </div>
    <div className="Categories-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}>
    
          <div className="wall"></div>
      <div className="floor"></div>
     
      
<div className="carousel-wrapper">
 

<div
className="carousel">
{cardsList.map((item, i) => {
  const offset = i - index; // linear difference (no wrap-around)
  const spacing = window.innerWidth>400?810:260; // px distance between cards
  let transform = "";
  let zIndex = 1;
  let opacity = 1;
  let filter = "blur(0px) grayscale(0%)";

  let rotate = 'rotateX(20deg)';
 
  if (offset===0){
    transform = `scale(0.7)`;
  }

  // Cards too far left or right are hidden (off-screen)
  if (offset < -2 || offset > 2) {
    opacity = 0;
    transform = `translateX(${offset * spacing  }px) scale(0.7)`;
  }

  else {
    // Position cards relative to center
    transform = `translateX(${offset * spacing}px) scale(${1 - Math.abs(offset) * 0.3})`;
    zIndex = 10 - Math.abs(offset);

    // Visual effects based on distance
    if (offset === 0) {
      filter = "blur(0px) grayscale(0%)";
       
      rotate = 'rotateX(50deg)';
      
     
    } else if (Math.abs(offset) === 1) {
      filter = "blur(0.5px) grayscale(40%)";
   
      rotate = 'rotateX(30deg)';
       
    } else if (Math.abs(offset) === 2) {
      filter = "blur(1px) grayscale(50%)";
      
      rotate = 'rotateX(20deg)';

    }
  }

  return (
   <motion.div
  key={i}
  className="carousel-card"
  style={{
    transform,
    zIndex,
    opacity,
    filter,
   
    backgroundImage: `url(${item.img})`,
    "--shadowOpacity": offset === 0 ? 0 : 1,
    pointerEvents:offset===0?'auto':'none'
  }}

  



  

  


>

   <div className='carousel-name'>
   {item.name}
</div  >  
  

  </motion.div>
  );
})}

    </div>

 <div className="carousel-controls">
<button onClick={prev}><FiChevronLeft /></button>

<button onClick={next}><FiChevronRight/></button>
</div>
 

</div>


 </div>

</div>



  );
}
