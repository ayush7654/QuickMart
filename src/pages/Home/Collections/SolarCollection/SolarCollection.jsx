import React from 'react'
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import './SolarCollection.css'

export default function SolarCollection() {

     const containerRef = useRef(null);

 const [items, setItems] = useState([
    { id: 1, title: 'Sun Protection', icon:'solarIcon1.png', para:'Built-in UPF 50+ protection blocks up to 98% of UV rays, so you can enjoy the outdoors with confidence — even in full sun.', img:'solar-card1.webp', stacked: false },
    { id: 2, title: 'Water-Repellent' , icon:'solarIcon2.png' ,para:'A durable water-repellent finish that sheds light rain and protects you from light showers.', img:'solar-card2.webp', stacked: false },
    { id: 3, title: 'Breathable' , icon:'solarIcon3.png' ,para:'Engineered for airflow and temperature regulation, ensuring lasting comfort on the move.', img:'solar-card3.webp', stacked: false },
    { id: 4, title: 'Packable' , icon:'solarIcon4.png' ,para:'Packs down into its own hood in seconds.',  img:'solar-card4.webp', stacked: false },
    { id: 5, title: 'Cool touch' , icon:'solarIcon5.png' ,para:'Instant cooling sensation against the skin — ideal for hot weather.', img:'solar-card5.webp', stacked: false },
    { id: 6, title: 'Dry-Fast™' , icon:'solarIcon6.png' ,para:'Quick-dry fabric keeps you comfortable and dry in all conditions.',  img:'solar-card6.webp',stacked: false },
  
  ]);

  const SolarProducts=[
    {title:'SolarPack Jacket',img1:'solar1Img1.webp',img2:'solar1Img2.webp',price:'370',brand:'Raw Sienna PR'},
    {title:'SolarPack Sweatshirt',img1:'solar2Img1.webp',img2:'solar2Img2.webp',price:'170',brand:'Raw Sienna'},
    {title:'SolarPack Trousers',img1:'solar3Img1.webp',img2:'solar3Img2.webp',price:'200',brand:'Shadow'},
    {title:'SOlarPack Hat',img1:'solar4Img1.webp',img2:'solar4Img2.webp',price:'100',brand:'Raw Sienna'},
]

const [hoveredIndex, setHoveredIndex] = useState(null);

  const setStackedState = (index, isStacked) => {
    setItems((prev) =>
      prev.map((item, i) => (i+1 === index ? { ...item, stacked: isStacked } : item))
    );
  };

  useEffect(() => {
    ScrollTrigger.refresh();
    const sections = gsap.utils.toArray('.solar-stack-item');
    
  sections.forEach((section, i) => {
  // Calculate the same offset you used in your CSS/Style
  const stickyOffset = 15 + (i * 10); 

  gsap.to(section, {
    
    scrollTrigger: {
      trigger: section,
      // Adjust start to match the 'top' offset of your sticky CSS
      // This ensures the "stacked" state triggers exactly when it stops moving
      start: `top ${stickyOffset}%`, 
      endTrigger: containerRef.current,
      end: "bottom bottom",
      scrub: true,
      
     onUpdate: (self) => {
  // If progress is 0, it means it's not 'stuck' yet or has been 'unstuck'
  // Use a tiny threshold (0.001) to avoid flickering at the exact start
  const isCurrentlyStacked = self.progress > 0.001;

  if (items[i].stacked !== isCurrentlyStacked) {
    setStackedState(i, isCurrentlyStacked);
  }
},
// Explicitly force false when the element leaves the trigger area going UP
onLeaveBack: () => {
  setStackedState(i, false);
}
    }
  });
});

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);


  return (
    <div className="solar-collection-section">
    <div className='solar-collection'>
   <div className='solar-mainImage-wrapper'>
   <img src='HomeCollections/SolarJacket3.png'/>
   </div>
   <div className="solar-stack" ref={containerRef}>
      {items.map((item, index) => (
        <div 
          className={`solar-stack-item ${item.stacked?'solar-stacked':''} `  }
          key={item.id} 
          style={{ 
            top: `${15 + (index * 10)}vh`,
            // Adding a z-index ensures newer cards stay on top
            zIndex: index,
           /*  backgroundColor: item.stacked ? '#a41515' : '#1a1a1a' */
          }}
        >
          <div className="solar-content" style={{backgroundImage:`url(HomeCollections/${item.img})`}}>
            <div className='solar-card-overlay'></div>
            <div className="solar-head">
              <span>{item.title}</span>
              <span className='solar-icon-wrapper'  style={{backgroundImage:`url(HomeCollections/${item.icon})`}} >
              
              </span>

           
            </div>
             <div className="solar-para">{item.para}</div>
            
          </div>
        </div>
      ))}
      
      {/* Spacer to allow the last card to finish its "stacking" animation */}
      <div className="scroll-spacer"></div>
    </div>
    </div>
    <div className='solar-product-wrapper'>   
   <div className='solarpack-products-head' id='home-product-head'>SolarPack Collection</div>

         <div className='home-Products-container'>
     {SolarProducts.map((product,index)=>
     <div className='solar-ProductCard'
      onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
     >
        <div className="solarProductImg-wrapper"
        
        style={{ 
          backgroundImage: `url(HomeCollections/${hoveredIndex === index ? product.img2 : product.img1})` 
        }}>

        </div>
        <div className="solarProductInfo-wrapper">
            <div className="solarInfo-line1">
                <span >{product.title}</span>
                <span >${product.price}</span>
            </div>
            <div className='solarProduct-brandname'>{product.brand}</div>
        </div>

     </div>)}
    </div>
    </div>
   
    </div>
  )
}



