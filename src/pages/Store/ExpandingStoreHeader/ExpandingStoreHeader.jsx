import { useEffect, useRef, useState ,useLayoutEffect} from "react";
import './ExpandingStoreHeader.css'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence  } from "framer-motion";

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
import MenuCancel from "../../../components/MenuCancel/MenuCancel";
import StoreHeader from "../StoreHeader/StoreHeader";
import { FaCircle } from "react-icons/fa";
import { div, link, span } from "framer-motion/client";
import { FaFacebook, FaXTwitter, FaYoutube, FaInstagram ,FaTiktok, FaLinkedin, FaLinkedinIn} from "react-icons/fa6";
import AnimatedUnderline from "../../../components/AnimatedUnderline/AnimatedUnderline";
gsap.registerPlugin(ScrollTrigger);




const storeMenuOptions=['Cancel order' ,'Order history','']

const storeMenuGrids= [
  
  {name:'Select delivery location', backgroundImage:'DeliveryLocation.jpg'},
   {name:'Track Order', backgroundImage:'trackOrderImg2.jpg'},
  {name:'Connect with us', backgroundImage:'connectImg.jpg'},
 
]

 const categoryImgs = [
    {id:0, img: ['Clothing1.jpg','Clothing2.jpg'],},
    {id:1,img :['IphoneDuo3.jpg','IphoneDuo.jpg']},
    {id:2, img:['SkincareLeft.jpg','skincareRight.jpg']},
    {id:3, img:['Jewellery1.jpg','Sunglasses2.jpg']},
    {id:4, img:['Motorbike1.jpg','fitness7.jpg']},
    {id:5, img: ['DailyItem2.jpg','DailyItem3.jpg']}

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




export default function ExpandingStoreHeader() {

const {handleTypeFilter,isOpen, setIsOpen,currentCategory,partialPill} = useStoreData()

 
const { categorizedData, loading , selectedGroup} = CategoryDataProvider();
const [activeGroup, setActiveGroup] = useState(null);

const [selectedSubGroupId,setSelectedSubGroupId] =useState(null)
const [selectedCategoryId,setSelectedCategoryId] = useState(null)

const [selectedCategory,setSelectedCategory] =useState({category:'',categoryId:''})
/* const [partialPill,setPartialPill] = useState(false) */
const [hoveredIndex, setHoveredIndex] = useState(0);

const [refreshKey, setRefreshKey] = useState(0);


const handlePartialToggle = () => {
  if (!isOpen) {
    // Stage 1: If closed, open directly into partial mode
    setIsOpen(true);
    setPartialPill(true);
  } else if (isOpen && !partialPill) {
    // Stage 2: If fully open, shrink it down to partial
    setPartialPill(true);
  } else {
    // Stage 3: If already in partial, close the whole pill
    setIsOpen(false);
    setPartialPill(false);
  }
};




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


const CurrentIcon = CATEGORY_ICONS[selectedSubGroupId?selectedSubGroupId:0].Icon;
console.log('categories', categorizedData)

  return (
     <div 
          className={`floating-pill ${isOpen ? "pill-expanded" : ""} ${partialPill?'partial':''}`} >
            
        
       {/*   <StoreHeader /> */}
  
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
   
    <div className="subgroup-sidebar-sm">
{ !partialPill? <div  className="sub-group-icon-wrapper">
            { Object.keys(categorizedData).map((groupName,index) => {

               /*  const Icon = SUBGROUP_MAPPING[groupName].Icon; */
               const Icon = CATEGORY_ICONS[index].Icon;
              return (
          <div
            key={groupName}
            className={`sub-group-icon ${activeGroup === groupName ? "subgroup-active" : ""} `}
            onClick={() => {setActiveGroup(groupName),setSelectedSubGroupId(index)}}
          
            
            
          >
             <Icon size="var(--icon-size)" />
          
          </div>
        )})


      
        
        }
        </div>:
        <div className="subgroup-item-wrapper-sm">
          {         storeMenuOptions.map((item, index) => (
  <div
    key={index}
    className={`subgroup-item ${hoveredIndex === index ? 'active' : ''}`}
    onMouseEnter={() => setHoveredIndex(index)}
   
  >
    {item}
  </div>
)) }
        </div>
    }

    </div>

      <div className="subgroup-sidebar-wrapper">
        



       {(isOpen || partialPill) && 

       <div className="subgroup-sidebar">
         { !partialPill ? 
         <div  className="sub-group-icon-wrapper">
            { Object.keys(categorizedData).map((groupName,index) => {

               /*  const Icon = SUBGROUP_MAPPING[groupName].Icon; */
               const Icon = CATEGORY_ICONS[index].Icon;
              return (
          <div
            key={groupName}
            className={`sub-group-icon ${activeGroup === groupName ? "subgroup-active" : ""} `}
            onClick={() => {setActiveGroup(groupName),setSelectedSubGroupId(index)}}
          
            
            
          >
             <Icon size="var(--icon-size)" />
          
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
    
 <div className="subgroup-content-wrapper">
{(selectedSubGroupId != null && !partialPill) && (
  <div className="subgroup-content">

 <div className="subgroup-new">
   {Object.keys(categorizedData).map((group,index)=>
  <div className="subgroup-list-wrapper" >
  <div className="subgroup-list-head">{group}</div>
 
    <div className="sub-group-list">
     {categorizedData[group].items.map((item, itemIdx) => (
        <div key={itemIdx}  
        onMouseEnter={() => {
    setActiveGroup(group);
    setSelectedSubGroupId(index);
  }}
  
     onClick={()=>{handleTypeFilter(item),
                setIsOpen(false),
                setSelectedCategoryId(itemIdx),
                setSelectedSubGroupId(itemIdx)}
                
              }>
         <AnimatedUnderline>{item.slug.replaceAll('-', ' ')}</AnimatedUnderline> 
          </div>
      ))}
    </div> 
  </div>)}
 </div>

   

  
   <div className="subgroup-selector-wrapper">
    Collections
{Object.keys(categorizedData).map((group,index) => (
  <div key={group} className={`subgroup-selector ${activeGroup===group?'active-subgroup':''}`}
  onClick={() => {setActiveGroup(group),setSelectedSubGroupId(index)}}
  
  >
{/*    <span className="active-group-dot"><FaCircle size={6} className="group-dot"/></span> */}
   <span> {group}</span>
   
  </div>
))}

  
   </div>


  <div className="subgroup-info-wrapper">

   <div className="subgroup-watermark">

  <CurrentIcon/> 

   </div>

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
  
  </div>
  </div>

)}
<div className="social-icons-wrapper">
  <FaFacebook/> 
    <FaInstagram />
  < FaYoutube/> 
  <  FaTiktok /> 
  <FaLinkedinIn/> 


</div>
 </div>

    {/*   <div className="head-dot-wrapper catelog-dot">
      <span className="head-dot red"></span>
      <span className="head-dot blue" ></span>
      <span className="head-dot green"></span>
    
    </div> */}
      </div>

     
      <div className={`category-grid-wrapper ${isOpen ? 'is-active' : ''}`}>


   <div className="category-grid">

{categoryImgs[selectedSubGroupId]?.img.map((imgPath, index) => (
  <div className="catgeory-img-wrapper">
    <img src={`StoreMedia/${imgPath}`}/>

  </div>
))}
  
   </div>



   <div  style={{display:'none'}} >
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
    <div className="category-img-wrapper" /* style={{ backgroundImage: `url(StoreMedia/${item.backgroundImage})` }} */>
     <img src={`StoreMedia/${item.backgroundImage}`}/>
               {/* USE IMG TAG INSTEAD OF BG IMG AND THEN USE SCALE TO SHOW OVER */}
    </div>

     

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
           /*  key={groupName} */     /* MIGHT BE A PROBLEM  */
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
              <div className="category-img-wrapper" /* style={{ backgroundImage: `url(StoreMedia/${item.backgroundImage})` }} */>
              <img src={`StoreMedia/${item.backgroundImage}`}/>
              </div>
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
    </div>
  )}
  
</div>
  
            <div className="pill-footer-wrapper">
                   <div className="pill-footer">
                   {/*  {storeMenuOptions.map((item,index)=>
                    <div className="pill-footer-link">
                      {item}
                    </div> )} */}
                     <div className="pill-footer-info">
                      <span> Get in touch</span>
                      <span> Become a seller</span>
                      <span> .</span>
                    </div>

                    <div className="pill-footer-info">
                     {storeMenuOptions.map((item,index)=><span>{item}</span>)}
                     </div>
                     
                    
                   
                    <div className="pill-footer-info">
                      <div className="pill-footer-contact-wrapper">
                        <div className="pill-footer-contact">
                          <span>For press contacts:</span>
                          <span>press@saras.com</span>
                        </div>
                       {/*  <div> <span>info@saras.com</span></div> */}
                      </div>
                     
                      <span></span>
                    </div>
                    <div className="pill-footer-info">
                      <div className="pill-footer-link-wrapper">
                        <span>Saras HQ</span>
                        <span>42, Harbour View Road , Lower Parel</span>
                       {/*  <span>Mumbai  400013, India</span> */}
                      </div>
                      <div className="pill-footer-telephone">
                        <span>Tel:</span>
                        <span>+91 22 4567 8900</span>
                      </div>
                    </div>
                    <div className="pill-footer-info">
                      <div className="pill-footer-link-wrapper pill-footer-copyright">
                         <span>© 2026 Saras India Pvt. Ltd.</span>
                  
                      <span>  Studio North.</span>
                          <span> All Rights Reserved</span>
                      </div>
                     
                    
                    </div>
                   </div>
                   </div>
           
          </div>
       
        </div>
  )
}




