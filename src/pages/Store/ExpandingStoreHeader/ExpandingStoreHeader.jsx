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
import { useScroll } from "../../../components/ScrollData/ScrollData";


gsap.registerPlugin(ScrollTrigger);




const storeMenuOptions=['Payment Methods','Cancel Order' ,'Become a Seller' ,'FAQ']

const storeMenuGrids= [
  
  {name:'Select delivery location', backgroundImage:'DeliveryLocation.jpg'},
   {name:'Track Order', backgroundImage:'trackOrderImg2.jpg'},
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

const slideUpVariant = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: (customDelay) => ({ 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 16,
      mass: 0.8,
      delay: customDelay // Dynamic delay applied here
    }
  })
};

const paraVariant = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: (customDelay) => ({ 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
      delay: customDelay + 0.2 // Staggers right after the title
    }
  })
};


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




export default function ExpandingStoreHeader({partialPill}) {

const {handleTypeFilter,isOpen, setIsOpen,currentCategory} = useStoreData()

 
const { categorizedData, loading , selectedGroup} = CategoryDataProvider();
const [activeGroup, setActiveGroup] = useState(null);

const [selectedSubGroupId,setSelectedSubGroupId] =useState(null)
const [selectedCategoryId,setSelectedCategoryId] = useState(null)

const [selectedCategory,setSelectedCategory] =useState({category:'',categoryId:''})
/* const [partialPill,setPartialPill] = useState(false) */
const [hoveredIndex, setHoveredIndex] = useState(0);

const [refreshKey, setRefreshKey] = useState(0);







useEffect(() => {

  if (!loading && categorizedData) {

    /* CLOSED */
    if (!isOpen) {
      setActiveGroup(null);
       /* setSelectedSubGroupId(null) */
      
      return;
    }

    const groups = Object.keys(categorizedData);

    /* NO SELECTED CATEGORY */
    if (selectedCategoryId === null) {
      setActiveGroup(groups[0]);
       setSelectedSubGroupId(isOpen?0:null)  /*  */
      
      
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

useEffect(() => {
  // 1. Check if selectedGroup is valid (not null, undefined, or an empty string)
  if (selectedGroup && categorizedData && categorizedData[selectedGroup]) {
    
    // 2. Safely grab the groupId and update the state
    const targetId = categorizedData[selectedGroup].groupId;
    setSelectedCategoryId(targetId);
  }
}, [selectedGroup, categorizedData, setSelectedCategoryId]); 
// Dependency array includes these variables so the effect re-runs whenever they change


  return (
     <div 
          className={`floating-pill ${isOpen ? "pill-expanded" : ""} ${partialPill?'partial':''}`}
      style={{}}
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

       <div className="subgroup-sidebar">
         { !partialPill ? <div  className="sub-group-icon-wrapper">
            { Object.keys(categorizedData).map((groupName,index) => {

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


      
        
        }
        </div>:
         storeMenuOptions.map((item, index) => (
  <div
    key={index}
    className={`subgroup-item ${hoveredIndex === index ? 'active' : ''}`}
    onMouseEnter={() => setHoveredIndex(index)}
   
  >
    {item}
  </div>
))}
       </div>
      }
    

{(selectedSubGroupId != null && !partialPill) && (
  <>
    <div className="subgroup-animation-mask">
      <motion.div 
        className="main-subgroup-head"
        // 1. Remounts when group changes OR when the parent menu slides open
        key={`title-${selectedSubGroupId}-${isOpen}`} 
        
        // 2. Pass the layout opening transition delay time (e.g., 0.35 seconds)
        custom={isOpen ? 0.25 : 0}
        
        variants={slideUpVariant}
        initial="hidden"
        animate="visible"
      >
        <span>{CATEGORY_ICONS[selectedSubGroupId].subgroup[0]}</span>
        {CATEGORY_ICONS[selectedSubGroupId].subgroup.length > 1 && (
          <div>
            <span className="gradient-text">&</span>
            <span>{CATEGORY_ICONS[selectedSubGroupId].subgroup[1]}</span>
          </div>
        )}
      </motion.div>
    </div>

    <div className="subgroup-animation-mask">
      <motion.div 
        className="para-subgroup-head"
        // 1. Remounts matching the header element
        key={`para-${selectedSubGroupId}-${isOpen}`} 
        
        // 2. Pass the same baseline delay time
        custom={isOpen ? 0.15 : 0}
        
        variants={paraVariant}
        initial="hidden"
        animate="visible"
      >
        {CATEGORY_ICONS[selectedSubGroupId].description}
      </motion.div>
    </div>
  </>
)}


      </div>

     
      <div className={`category-grid-container ${isOpen ? 'is-active' : ''}`}>
   
   <AnimatePresence mode="wait">
   
     {partialPill?

<motion.div
  variants={gridContainerVariants}
  initial="hidden"
  animate="visible"
  exit="exit"
  className={`grid-wrapper ${getLayoutClass(storeMenuGrids.length)} visible`}
>

  {storeMenuGrids.map((item, index) => (

    <motion.div
      key={index}
      variants={tileVariants}
      className={`category-card card-${index}`}

    >
    <div className="category-img-wrapper" style={{ backgroundImage: `url(StoreMedia/${item.backgroundImage})` }}></div>


      <div className="card-overlay">
        <span className="category-name">
          {item.name}
        </span>
      </div>

    </motion.div>

  ))}

</motion.div>
     : Object.entries(categorizedData).map(([groupName, groupData], id) => {
      const isVisited = visitedGroups.includes(groupName);
      const isActive = activeGroup === groupName;

   
        if (!isVisited || !isActive) return null;

      return (
        <motion.div 
           key={refreshKey}
        variants={gridContainerVariants}
        initial="hidden"
        animate="visible"
          key={groupName}   
          className={`grid-wrapper ${getLayoutClass(id)} ${isActive ? 'visible' : 'hidden'}`}
        >
         {groupData.items.map((item, index) => (
            <motion.div 
             variants={tileVariants}
              key={item.slug} 
              className={`category-card card-${index} ${item.slug===currentCategory?'card-selected':''}`}
              
              onClick={()=>{handleTypeFilter(item),
                setIsOpen(false),
                setSelectedCategoryId(id),
                setSelectedSubGroupId(id)}
                
              }
            >
              <div className="category-img-wrapper" style={{ backgroundImage: `url(StoreMedia/${item.backgroundImage})` }}></div>
              <div className="card-overlay">
                <span className='category-name'>{item.name}</span>
               
              </div>
            </motion.div>
          ))} 
        </motion.div>
      );
    })  
    

  }
  </AnimatePresence>

  </div>
    </div>
  )}
  
</div>
  
 
           
          </div>
        </div>
  )
}




