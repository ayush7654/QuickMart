

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import "./Testing.css";



const CategoryCollection = [
  { id: 0, title: 'Dumbell', brand: 'Gornation', price: 45, img1: 'HomeCollections/Fitness-Barbell1.jpg', img2: 'HomeCollections/Fitness-Barbell3.jpg' },
  { id: 1, title: 'Running Shoe', brand: 'Nike', price: 130, img1: 'HomeCollections/Fitness-RunningShoes3.jpg', img2: 'HomeCollections/Fitness-RunningShoes2.jpg' },
  { id: 2, title: 'Yoga Pants', brand: 'Cambivo', price: 20, img1: 'HomeCollections/Fitness-Yogamat3.jpg', img2: 'HomeCollections/Fitness-Yogamat4.jpg' },
  { id: 3, title: 'Tredmill', brand: 'Tychnogym', price: 1200, img1: 'HomeCollections/Fitness-Tredmill1.jpg', img2: 'HomeCollections/Fitness-Tredmill2.jpg' }
];


export default function Testing() {


  const collections =['Anti UV', "Dogs/Pets",]

 const containerRef = useRef(null);

 const [items, setItems] = useState([
    { id: 1, title: 'Sun Protection', icon:'HomeCollections/solarIcon1.png', para:'Built-in UPF 50+ protection blocks up to 98% of UV rays, so you can enjoy the outdoors with confidence — even in full sun.', img:'HomeCollections/solar-card1.webp', stacked: false },
    { id: 2, title: 'Water-Repellent' , icon:'HomeCollections/solarIcon2.png' ,para:'A durable water-repellent finish that sheds light rain and protects you from light showers.', img:'HomeCollections/solar-card2.webp', stacked: false },
    { id: 3, title: 'Breathable' , icon:'HomeCollections/solarIcon3.png' ,para:'Engineered for airflow and temperature regulation, ensuring lasting comfort on the move.', img:'HomeCollections/solar-card3.webp', stacked: false },
    { id: 4, title: 'Packable' , icon:'HomeCollections/solarIcon4.png' ,para:'Packs down into its own hood in seconds.',  img:'HomeCollections/solar-card4.webp', stacked: false },
    { id: 5, title: 'Cool touch' , icon:'HomeCollections/solarIcon5.png' ,para:'Instant cooling sensation against the skin — ideal for hot weather.', img:'HomeCollections/solar-card5.webp', stacked: false },
    { id: 6, title: 'Dry-Fast™' , icon:'HomeCollections/solarIcon6.png' ,para:'Quick-dry fabric keeps you comfortable and dry in all conditions.',  img:'HomeCollections/solar-card6.webp',stacked: false },
  
  ]);

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
  const stickyOffset = 10 + (i * 10); 

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
    <div className="testing-div">

{/* <div className='solar-jacket-Img'></div> */}


<div className="solar-stack" ref={containerRef}>
      {items.map((item, index) => (
        <div 
          className={`solar-stack-item ${item.stacked?'solar-stacked':''} `  }
          key={item.id} 
          style={{ 
            top: `${10 + (index * 10)}vh`,
            // Adding a z-index ensures newer cards stay on top
            zIndex: index,
           /*  backgroundColor: item.stacked ? '#a41515' : '#1a1a1a' */
          }}
        >
          <div className="solar-content" style={{backgroundImage:`url(${item.img})`}}>
            <div className='solar-card-overlay'></div>
            <div className="solar-head">
              <span>{item.title}</span>
              <span className='solar-icon-wrapper'  style={{backgroundImage:`url(${item.icon})`}} >
              
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
 