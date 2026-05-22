import { useEffect, useRef, useState ,useLayoutEffect} from "react";
import './ExpandingStoreHeader.css'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence  } from "framer-motion";
import StoreSorting from "../StoreSorting/StoreSorting";
import CategoryDataProvider from "./CategoryDataProvider";
import { useStoreData } from "../../../components/StoreDataContext";
import { FaGem } from "react-icons/fa";
import { PiTShirtFill } from "react-icons/pi";
import { MdLaptopMac } from "react-icons/md";
import { GiLipstick } from "react-icons/gi";
import { PiDeskFill } from "react-icons/pi";
import { FaRunning } from "react-icons/fa";
import { GiGrapes } from "react-icons/gi";

gsap.registerPlugin(ScrollTrigger);




const storeMenuOptions=['Payment Methods','Cancel Order' ,'Become a Seller' ,'FAQ']

const storeMenuGrids= [
  {name:'Track Order', backgroundImage:'trackOrderImg2.jpg'},
  {name:'Select delivery location', backgroundImage:'DeliveryLocation.jpg'},
  {name:'Connect with us', backgroundImage:'connectImg.jpg'},
]

const CATEGORY_ICONS = [
  {
    subgroup: ["Clothing" , "Apparel"],
    description:
      "Explore premium fashion collections featuring trendy outfits, stylish footwear, seasonal essentials, and modern apparel designed for every lifestyle and occasion.",
    Icon: PiTShirtFill
  },

  {
    subgroup:[ "Accessories" , "Jewelry"],
    description:
      "Discover luxury watches, elegant jewelry, fashionable handbags, sunglasses, and statement accessories crafted to enhance your personal style effortlessly.",
    Icon: FaGem
  },

  {
    subgroup: ["Electronics" , "Tech"],
    description:
      "Browse advanced laptops, smartphones, tablets, accessories, and innovative technology products built to improve productivity, entertainment, and everyday convenience.",
    Icon: MdLaptopMac
  },

  {
    subgroup: ["Beauty","Wellness"],
    description:
      "Find skincare products, premium fragrances, wellness essentials, and beauty collections carefully selected to support confidence, self-care, and healthy routines.",
    Icon: GiLipstick
  },

  {
    subgroup:[ "Home" , "Living"],
    description:
      "Upgrade your interiors with stylish furniture, home décor, kitchen accessories, and modern lifestyle essentials created for comfortable everyday living.",
    Icon: PiDeskFill
  },

  {
    subgroup:[ "Automotive" , "Outdoors"],
    description:
      "Shop vehicles, motorcycles, outdoor gear, fitness equipment, and performance accessories designed for adventure, active lifestyles, and everyday mobility needs.",
    Icon: FaRunning
  },

  {
    subgroup: ["Daily Essentials"],
    description:
      "Get groceries, household products, and everyday necessities conveniently organized to simplify routines and support a more comfortable daily lifestyle experience.",
    Icon: GiGrapes
  }
];


const gridContainerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(10px)",
  },

  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",

    transition: {
      duration: 0.45,

      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },

  exit: {
    opacity: 0,
    scale: 0.96,
    filter: "blur(8px)",

    transition: {
      duration: 0.55,

      staggerChildren: 0.05,
      staggerDirection: -1,

      when: "afterChildren",
    },
  },
};

const tileVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.92,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
    },
  },

  exit: {
    opacity: 0,
    y: -30,
    scale: 0.9,

    transition: {
      duration: 0.35,
      ease: "easeInOut",
    },
  },
};


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


export default function ExpandingStoreHeader({partialPill}) {

const {handleTypeFilter,isOpen, setIsOpen,currentCategory} = useStoreData()

 
const { categorizedData, loading} = CategoryDataProvider();
const [activeGroup, setActiveGroup] = useState(null);

const [selectedSubGroupId,setSelectedSubGroupId] =useState(0)
const [selectedCategoryId,setSelectedCategoryId] = useState(0)
/* const [partialPill,setPartialPill] = useState(false) */
const [hoveredIndex, setHoveredIndex] = useState(0);

const [refreshKey, setRefreshKey] = useState(0);


useEffect(() => {

  if (!loading && categorizedData) {

    /* CLOSED */
    if (!isOpen) {
      setActiveGroup(null);
      
      return;
    }

    const groups = Object.keys(categorizedData);

    /* NO SELECTED CATEGORY */
    if (selectedCategoryId === null) {
      setActiveGroup(groups[0]);
      
    }

    /* RESTORE SELECTED CATEGORY */
    else {
      setActiveGroup(groups[selectedCategoryId]);
      setSelectedSubGroupId(selectedCategoryId)
      
    }

  }

}, [loading, categorizedData, isOpen, selectedCategoryId]);


const getLayoutClass = (count) => {
  const layouts = { 0: "layout-1", 1: "layout-2", 2: "layout-3", 3: "layout-4",4: "layout-5" ,5: "layout-6" ,6: "layout-7" };
  return layouts[count] || "layout-standard";
};









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


console.log('categorized data is ', categorizedData)
  return (
     <div 
          className={`floating-pill ${isOpen ? "pill-expanded" : ""} ${partialPill?'partial':''}`}
     
        >
          <div className="pill-content">
    
<div className="pill-space">

</div>

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
       <div 
          /* variants={listContainerVariants}
            initial="hidden"
            animate="visible" */
       className="sub-group-icon-wrapper">
            { !partialPill?  Object.keys(categorizedData).map((groupName,index) => {

               /*  const Icon = SUBGROUP_MAPPING[groupName].Icon; */
               const Icon = CATEGORY_ICONS[index].Icon;
              return (
          <div
            key={groupName}
            className={`sub-group-icon ${activeGroup === groupName ? "subgroup-active" : ""} `}
            onClick={() => {setActiveGroup(groupName),setSelectedSubGroupId(index)}}
          
            
            
          >
             <Icon size={20} />  
          
          </div>
        )})
:

       storeMenuOptions.map((item, index) => (
  <div
    key={index}
    className={`subgroup-item ${hoveredIndex === index ? 'active' : ''}`}
    onMouseEnter={() => setHoveredIndex(index)}
   /*  onMouseLeave={() => setHoveredIndex(null)} */
  >
    {item}
  </div>
))
        
        }
        </div>}
    

     { selectedSubGroupId !==null &&
     <>
      <div className="main-subgroup-head">
       <span> {CATEGORY_ICONS[selectedSubGroupId].subgroup[0]}</span>
    { CATEGORY_ICONS[selectedSubGroupId].subgroup.length>1 &&  <div>
           <span className="gradient-text">&</span>
        <span> {CATEGORY_ICONS[selectedSubGroupId].subgroup[1]}</span>
       </div>}
  
   
         </div>
       <div className="para-subgroup-head">
        {CATEGORY_ICONS[selectedSubGroupId].description}
        </div></>
     }

      </div>

     
      <div className={`category-grid-container ${isOpen ? 'is-active' : ''}`}>
    {/* We map through ALL data, but we only physically render the HTML 
      if the group has been visited. This is the "Lazy Cache".
    */}
   <AnimatePresence mode="wait">
   
     {!partialPill? Object.entries(categorizedData).map(([groupName, items],id) => {
      const isVisited = visitedGroups.includes(groupName);
      const isActive = activeGroup === groupName;

   
        if (!isVisited || !isActive) return null;

      return (
        <motion.div 
           key={refreshKey}
        variants={gridContainerVariants}
        initial="hidden"
        animate="visible"
          key={groupName}    /* CREATE 8 NEW LAYOUTS ,ADD ID TO THE CATEGORY LIST IN ITS COMPONENT, CHNAGE COUNT TO ID ,  */
          className={`grid-wrapper ${getLayoutClass(id)} ${isActive ? 'visible' : 'hidden'}`}
        >
          {items.map((item, index) => (
            <motion.div 
             variants={tileVariants}
              key={item.slug} 
              className={`category-card card-${index} ${item.name===currentCategory?'card-selected':''}`}
              style={{ backgroundImage: `url(StoreMedia/${item.backgroundImage})` }}
              onClick={()=>{handleTypeFilter(item),setIsOpen(false),setSelectedCategoryId(id),setSelectedSubGroupId(id)}}
            >
              <div className="card-overlay">
                <span className='category-name'>{item.name}{/* {id} */}</span>
                {/* <span className='category-name'> card no: {index} </span> */}
              </div>
            </motion.div>
          ))}
        </motion.div>
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
  </AnimatePresence>

  </div>
    </div>
  )}
</div>
  
 
           
          </div>
        </div>
  )
}




