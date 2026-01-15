import React, { useEffect, useState } from "react";
import './Categories.css'
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import AnimatedUnderline from "../../../components/AnimatedUnderline/AnimatedUnderline";
import BracketButton from "../../../components/BracketButton/BracketButton";




export default function Categories() {

    const [index, setIndex] = useState(window.innerWidth>450?2:0);
    const [touchStartX, setTouchStartX] = useState(null);
    const [touchEndX, setTouchEndX] = useState(null);
      
     const cardsList=[
   
        {id:1,img:'CategoriesImg/FC-Shades2.jpg',name:'Shades',capName:'SHADES',path1:'',path2:''},
     
      {id:2,img:'CategoriesImg/FC-Clothing5.jpg',name:'Clothing',capName:'CLOTHING',path1:'',path2:''},
       {id:3,img:'CategoriesImg/FC-Electronics4.jpg',name:'Tech',capName:'TECH',path1:'',path2:''},
         {id:4,img:'CategoriesImg/FC-HomeDecor3.jpg',name:'Decor',capName:'DECOR',path1:'',path2:''},
           {id:5,img:'CategoriesImg/FC-Watches4.jpg',name:'Watches',capName:'WATCHES',path1:'',path2:''},
              
        {id:6,img:'CategoriesImg/FC-Skincare2.jpg',name:'Skincare',capName:'SKINCARE',path1:'',path2:''},
         {id:7,img:'CategoriesImg/FC-Footwear.jpg',name:'Footwear',capName:'FOOTWEAR',path1:'',path2:''},
   {id:8,img:'CategoriesImg/FC-Sports3.jpg',name:'Sports',capName:'SPORTS',path1:'',path2:''},
         {id:9,img:'CategoriesImg/FC-Essentials4.jpg',name:'Essentials',capName:'ESSENTIALS',path1:'',path2:''},

   
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
     
      
<div className="carousel-container">
 

<div className="carousel">
{cardsList.map((item, i) => {
  const offset = i - index; // linear difference (no wrap-around)
  const spacing = window.innerWidth>400?310:260; // px distance between cards
  let transform = "";
  let zIndex = 1;
  let opacity = 1;
  let filter = "blur(0px) grayscale(0%)";
  let fontSize ='5rem';
  let bottom ='-12rem';
  let rotate = 'rotateX(20deg)';


  // Cards too far left or right are hidden (off-screen)
  if (offset < -2 || offset > 2) {
    opacity = 0;
    transform = `translateX(${offset * spacing  }px) scale(0.7)`;
  }

  else {
    // Position cards relative to center
    transform = `translateX(${offset * spacing}px) scale(${1 - Math.abs(offset) * 0.1})`;
    zIndex = 10 - Math.abs(offset);

    // Visual effects based on distance
    if (offset === 0) {
      filter = "blur(0px) grayscale(0%)";
      fontSize= window.innerWidth>1000?'2.5rem':window.innerWidth>450?'3rem':'2.5rem';
      bottom =window.innerWidth>1000?'-7.5rem':window.innerWidth>450?'-8rem':'-6rem';;
      rotate = 'rotateX(0deg)';
      
     
    } else if (Math.abs(offset) === 1) {
      filter = "blur(0.5px) grayscale(40%)";
      fontSize= window.innerWidth>1000?'2.5rem':'2rem';
      bottom =window.innerWidth>1000?'-7rem':'-5rem';
      rotate = 'rotateX(30deg)';
       
    } else if (Math.abs(offset) === 2) {
      filter = "blur(1px) grayscale(50%)";
      fontSize= '2rem'
      bottom ='-8rem';
      rotate = 'rotateX(20deg)';

    }
  }

  return (
   <div
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

  {/*  <AnimatedUnderline from="center" offset={5} color='rgba(255, 255, 255, 1)' thickness={2.5} >
    <div className='carousel-name'>{item.capName}</div  >  
    </AnimatedUnderline> 
    <div className='carousel-name-sm'>{item.capName}</div> */}


   <div className='carousel-name'>
           <BracketButton 
  height="35px" 
  width="230px" 
  bgColor="transparent" 
  color="#ffffffae" 
  hoverTextColor="white"
  textContent={item.capName} 
   hoverHeight='45px'
   fontSize='1.8rem'
  
/> 
</div  >  
  

  </div>
  );
})}

    </div>

 <div className="carousel-controls">
<button onClick={prev}><FiChevronLeft /></button>
{/* <div className="explore-btn">Explore</div> */}
<button onClick={next}><FiChevronRight/></button>
</div>
 

</div>


 </div>

</div>



  );
}
