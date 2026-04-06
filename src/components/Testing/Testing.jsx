

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
    { id: 1, title: '01', stacked: false },
    { id: 2, title: '02', stacked: false },
    { id: 3, title: '03', stacked: false },
    { id: 4, title: '04', stacked: false },
  ]);

  const setStackedState = (index, isStacked) => {
    setItems((prev) =>
      prev.map((item, i) => (i+1 === index ? { ...item, stacked: isStacked } : item))
    );
  };

  useEffect(() => {
    ScrollTrigger.refresh();
    const sections = gsap.utils.toArray('.stack-item');
    
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
<div className="stack-container" ref={containerRef}>
      {items.map((item, index) => (
        <div 
          className="stack-item" 
          key={item.id} 
          style={{ 
            top: `${10 + (index * 10)}vh`,
            // Adding a z-index ensures newer cards stay on top
            zIndex: index,
            backgroundColor: item.stacked ? '#a41515' : '#1a1a1a'
          }}
        >
          <div className="empty-box">
             <h2>0{item.id}</h2>
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
 