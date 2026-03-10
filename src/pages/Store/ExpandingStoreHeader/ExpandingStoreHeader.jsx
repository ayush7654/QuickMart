import { useEffect, useRef, useState } from "react";
import './ExpandingStoreHeader.css'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StoreCategory from "../StoreSidebar/StoreCategory/StoreCategory";
import StoreSorting from "../StoreSorting/StoreSorting";
import CategoryDataProvider from "./CategoryDataProvider";
import { useStoreData } from "../../../components/StoreDataContext";
gsap.registerPlugin(ScrollTrigger);


export default function ExpandingStoreHeader() {

const {currentSort,toggleSortOrder,typeFilter,handleSort,currentCategory,handleTypeFilter} = useStoreData()

 const [isOpen, setIsOpen] = useState(false);
const { categorizedData, loading } = CategoryDataProvider();
const [activeGroup, setActiveGroup] = useState(null);

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

 console.log('categary subgroups are' , categorizedData)

    useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to(".floating-pill", {
      scrollTrigger: {
        trigger: ".scroll-section", 
        start: "top top",      
        end: "+=700",           
        // Changing scrub to a small number (like 0.5) adds "weight" or inertia.
        // It still starts instantly but follows the scroll with a soft follow-through.
        scrub: 0.8,            
        immediateRender: false,
      },
      width:'50%',    /* typeFilter?"100%": "65%" */
      // 'power2.out' creates the inertia effect (fast start, slow finish)
      ease: "power2.out",    
    });
  });

  return () => ctx.revert();
}, []); 



  return (
     <div 
          className={`floating-pill ${isOpen ? "pill-expanded" : ""}`}
          /* onClick={() => setIsOpen(!isOpen)} */
        >
          <div className="pill-content">
    
    <StoreSorting

  currentSort={currentSort}
  handleSort={handleSort}
  toggleSortOrder={toggleSortOrder}
  typeFilter={typeFilter}

  currentCategory={currentCategory}
     isOpen={isOpen}
     setIsOpen={setIsOpen}/> 

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
        {Object.keys(categorizedData).map((groupName) => (
          <div
            key={groupName}
            className={`subgroup-item ${activeGroup === groupName ? "active" : ""}`}
            onMouseEnter={() => setActiveGroup(groupName)}
          >
            <span className="subgroup-text">{groupName}</span>
          </div>
        ))}
      </div>

      {/* Right Section: 70% Grid Display */}
      <div className="category-grid-container">
        {/* We use a key on the wrapper so GSAP can trigger animations on change */}
        <div 
          key={activeGroup} 
          className={`grid-wrapper ${getLayoutClass(currentItems.length)}`}
        >
          {currentItems.map((item, index) => (
            <div 
              key={item.slug} 
              className={`category-card card-${index}`}
              style={{ backgroundImage: `url(${item.backgroundImage})` }}
                        onClick={() => {
  handleTypeFilter(item.slug);
 setIsOpen(false)
}}
            >
              <div className="card-overlay">
                <span className="category-name">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )}
</div>
  
 
           
          </div>
        </div>
  )
}




/*   <div>
        <h1>divide this by 3:7</h1>
        <h1> render the sub group list </h1>
        <h1>  Design the grid layouts for 1,3,4,5 grid sub group </h1>
        <h1>render grid</h1>
        <h1>re design sorting btn </h1>          
    </div> */