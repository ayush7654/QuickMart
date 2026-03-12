import { useEffect, useRef, useState ,useLayoutEffect} from "react";
import './ExpandingStoreHeader.css'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import StoreSorting from "../StoreSorting/StoreSorting";
import CategoryDataProvider from "./CategoryDataProvider";
import { useStoreData } from "../../../components/StoreDataContext";
gsap.registerPlugin(ScrollTrigger);


export default function ExpandingStoreHeader() {

const {handleTypeFilter,isOpen, setIsOpen,currentCategory} = useStoreData()

 
const { categorizedData, loading} = CategoryDataProvider();
const [activeGroup, setActiveGroup] = useState(null);

const [partialPill,setPartialPill] = useState(false)
const [hoveredIndex, setHoveredIndex] = useState(null);


const storeMenuOptions=['Payment Methods','Cancel Order' ,'Become a Seller' ,'FAQ']

const storeMenuGrids= [
  {name:'Track Order', backgroundImage:'trackOrderImg2.jpg'},
  {name:'Select delivery location', backgroundImage:'DeliveryLocation.jpg'},
  {name:'Connect with us', backgroundImage:'connectImg.jpg'},
]

// Automatically set the first group as active once data arrives
useEffect(() => {
  if (!loading && categorizedData && !activeGroup) {
    setActiveGroup(Object.keys(categorizedData)[0]);
  }
}, [loading, categorizedData, activeGroup]);

// Helper to determine grid class
const getLayoutClass = (count) => {
  const layouts = { 1: "layout-hero", 3: "layout-triad", 4: "layout-quad", 5: "layout-mosaic" };
  return layouts[count] || "layout-standard";
};

// Guard: Current items based on activeGroup
const currentItems = categorizedData && activeGroup ? categorizedData[activeGroup] : [];

 console.log('curret categary info ' , currentItems)

   useEffect(() => {
  // If the store is open, we DON'T want the scroll to fight the expansion.
  // We return early so the ScrollTrigger isn't even created.
  if (isOpen) return;

  const ctx = gsap.context(() => {
    gsap.to(".floating-pill", {
      scrollTrigger: {
        trigger: ".scroll-section",
        start: "top top",
        end: "+=700",
        scrub: 0.8,
        immediateRender: false,
      },
      // When not open, it follows the scroll to this width
      width: '60%', 
      ease: "power2.out",
    });
  });

  return () => ctx.revert();
}, [isOpen]); // Re-run when the store opens/closes


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
    
    <StoreSorting 
    partialPill={partialPill}
    setPartialPill={setPartialPill}/> 

<div className="category-layout">
  {loading ? (
    /* Loading View: Prevents errors and keeps the pill from looking empty */
    <div className="layout-loader">
      <div className="spinner"></div>
      <p>Arranging Categories...</p>
    </div>
  ) : (
    <>
      {/* Left Section: 30% Sidebar */}
      <div className="subgroup-sidebar">
      { !partialPill?  Object.keys(categorizedData).map((groupName) => (
          <div
            key={groupName}
            className={`subgroup-item ${activeGroup === groupName ? "active" : ""} `}
            onMouseEnter={() => setActiveGroup(groupName)}
          >
            <span className="subgroup-text">{groupName}</span>
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



      </div>

     
      <div className={`category-grid-container ${isOpen ? 'is-active' : ''}`}>
    {/* We map through ALL data, but we only physically render the HTML 
      if the group has been visited. This is the "Lazy Cache".
    */}

   
     {!partialPill? Object.entries(categorizedData).map(([groupName, items]) => {
      const isVisited = visitedGroups.includes(groupName);
      const isActive = activeGroup === groupName;

   
      if (!isVisited) return null;

      return (
        <div 
          key={groupName} 
          className={`grid-wrapper ${getLayoutClass(items.length)} ${isActive ? 'visible' : 'hidden'}`}
        >
          {items.map((item, index) => (
            <div 
              key={item.slug} 
              className={`category-card card-${index} ${item.name===currentCategory?'card-selected':''}`}
              style={{ backgroundImage: `url(${item.backgroundImage})` }}
              onClick={()=>{handleTypeFilter(item),setIsOpen(false)}}
            >
              <div className="card-overlay">
                <span className='category-name'>{item.name}</span>
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
              style={{ backgroundImage: `url(${item.backgroundImage})` }}
              
            >
              <div className="card-overlay">
                <span className="category-name">{item.name}</span>
              </div>
            </div>
          ))}
  </div>}

  </div>
    </>
  )}
</div>
  
 
           
          </div>
        </div>
  )
}




