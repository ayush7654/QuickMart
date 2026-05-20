import { useEffect, useRef, useState ,useLayoutEffect} from "react";
import './ExpandingStoreHeader.css'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from "framer-motion";
import StoreSorting from "../StoreSorting/StoreSorting";
import CategoryDataProvider from "./CategoryDataProvider";
import { useStoreData } from "../../../components/StoreDataContext";
gsap.registerPlugin(ScrollTrigger);


export default function ExpandingStoreHeader({partialPill}) {

const {handleTypeFilter,isOpen, setIsOpen,currentCategory} = useStoreData()

 
const { categorizedData, loading} = CategoryDataProvider();
const [activeGroup, setActiveGroup] = useState(null);

/* const [partialPill,setPartialPill] = useState(false) */
const [hoveredIndex, setHoveredIndex] = useState(null);


const storeMenuOptions=['Payment Methods','Cancel Order' ,'Become a Seller' ,'FAQ']

const storeMenuGrids= [
  {name:'Track Order', backgroundImage:'trackOrderImg2.jpg'},
  {name:'Select delivery location', backgroundImage:'DeliveryLocation.jpg'},
  {name:'Connect with us', backgroundImage:'connectImg.jpg'},
]



const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Delay before the *first* child text animation begins
      delayChildren: 0.1, 
      // Delay between each child's text animation starting (the stagger effect)
      staggerChildren: 0.08, 
    },
  },
};

// 2. The Text Animation Variants (This is what you requested)
const textRevealVariants = {
  hidden: { 
    y: "100%", // Starts completely below the visible area
  },
  visible: { 
    y: "0%", // Rises into position
    transition: { 
      // A spring transition feels very natural for UI movement
      type: "spring", 
      stiffness: 180, 
      damping: 24,
    },
  },
};

// Automatically set the first group as active once data arrives
useEffect(() => {
  if (!loading && categorizedData && !activeGroup) {
    setActiveGroup(Object.keys(categorizedData)[0]);
  }
}, [loading, categorizedData, activeGroup]);

// Helper to determine grid class
/* const getLayoutClass = (count) => {
  const layouts = { 1: "layout-hero", 3: "layout-triad", 4: "layout-quad", 5: "layout-mosaic" };
  return layouts[count] || "layout-standard";
}; */

const getLayoutClass = (count) => {
  const layouts = { 0: "layout-1", 1: "layout-2", 2: "layout-3", 3: "layout-4",4: "layout-5" ,5: "layout-6" ,6: "layout-7" };
  return layouts[count] || "layout-standard";
};

// Guard: Current items based on activeGroup
const currentItems = categorizedData && activeGroup ? categorizedData[activeGroup] : [];






const [visitedGroups, setVisitedGroups] = useState([]);

// 1. Logic to add the active group to the cache
useEffect(() => {
  if (activeGroup && !visitedGroups.includes(activeGroup)) {
    setVisitedGroups((prev) => [...prev, activeGroup]);
  }
}, [activeGroup, visitedGroups]);

useEffect(() => {
  // When the header closes, we wipe the cache.
  // This ensures the next time they open the store, it feels "fresh" and blooms again.
  if (!isOpen) {
    setVisitedGroups([]);
  }
}, [isOpen]);

// This separate effect ensures that as soon as it opens OR changes, 
// the active group is added to the cache to trigger the bloom.
useEffect(() => {
  if (isOpen && activeGroup && !visitedGroups.includes(activeGroup)) {
    setVisitedGroups((prev) => [...prev, activeGroup]);
  }
}, [activeGroup, isOpen, visitedGroups]);


  return (
     <div 
          className={`floating-pill ${isOpen ? "pill-expanded" : ""} ${partialPill?'partial':''}`}
     
        >
          <div className="pill-content">
    
<div className="pill-space"></div>

<div className={`category-layout ${isOpen || partialPill?'':'category-layout-hidden'}`}>
  {loading ? (
    /* Loading View: Prevents errors and keeps the pill from looking empty */
    <div className="layout-loader">
      <div className="spinner"></div>
      <p>Arranging Categories...</p>
    </div>
  ) : (
    <div className="category-layout-content">
      {/* Left Section: 30% Sidebar */}
      <div className="subgroup-sidebar-wrapper">
       {(isOpen || partialPill) && 
       <motion.div 
          variants={listContainerVariants}
            initial="hidden"
            animate="visible"
       className="subgroup-sidebar">
            { !partialPill?  Object.keys(categorizedData).map((groupName) => (
          <div
            key={groupName}
            className={`subgroup-item ${activeGroup === groupName ? "active" : ""} `}
            onMouseEnter={() => setActiveGroup(groupName)}
            
          >
               {/* THE MASK (Essential for "reveal" animations)
                                This div masks the text when it's below y:100% */}
                            <div style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
                              
                              {/* THE ANIMATING TEXT (The child that reacts to the orchestrator) */}
                              <motion.span 
                                className="subgroup-text" 
                                // This tells the child: 'look at my parent for hidden/visible signals'
                                variants={textRevealVariants}
                                style={{ 
                                  
                                  display: "block", // Required for transform: translateY to work correctly
                                }}
                              >
                                {groupName}
                              </motion.span>
            
                            </div>
          
          </div>
        ))
:

       storeMenuOptions.map((item, index) => (
  <div
    key={index}
    className={`subgroup-item ${hoveredIndex === index ? 'active' : ''}`}
    onMouseEnter={() => setHoveredIndex(index)}
    onMouseLeave={() => setHoveredIndex(null)}
  >
    {item}
  </div>
))
        
        }
        </motion.div>}
    



      </div>

     
      <div className={`category-grid-container ${isOpen ? 'is-active' : ''}`}>
    {/* We map through ALL data, but we only physically render the HTML 
      if the group has been visited. This is the "Lazy Cache".
    */}

   
     {!partialPill? Object.entries(categorizedData).map(([groupName, items],id) => {
      const isVisited = visitedGroups.includes(groupName);
      const isActive = activeGroup === groupName;

   
      if (!isVisited) return null;

      return (
        <div 
          key={groupName}    /* CREATE 8 NEW LAYOUTS ,ADD ID TO THE CATEGORY LIST IN ITS COMPONENT, CHNAGE COUNT TO ID ,  */
          className={`grid-wrapper ${getLayoutClass(id)} ${isActive ? 'visible' : 'hidden'}`}
        >
          {items.map((item, index) => (
            <div 
              key={item.slug} 
              className={`category-card card-${index} ${item.name===currentCategory?'card-selected':''}`}
              style={{ backgroundImage: `url(StoreMedia/${item.backgroundImage})` }}
              onClick={()=>{handleTypeFilter(item),setIsOpen(false)}}
            >
              <div className="card-overlay">
                <span className='category-name'>{item.name}{/* {id} */}</span>
                {/* <span className='category-name'> card no: {index} </span> */}
              </div>
            </div>
          ))}
        </div>
      );
    }) 
    
:
  <div className={`grid-wrapper ${getLayoutClass(storeMenuGrids.length)} visible`}>

{storeMenuGrids.map((item, index) => (
            <div 
              key={index} 
              className={`category-card card-${index}`}
              style={{ backgroundImage: `url(StoreMedia/${item.backgroundImage})` }}
              
            >
              <div className="card-overlay">
                <span className="category-name">{item.name}</span>
              </div>
            </div>
          ))}
  </div>}

  </div>
    </div>
  )}
</div>
  
 
           
          </div>
        </div>
  )
}




