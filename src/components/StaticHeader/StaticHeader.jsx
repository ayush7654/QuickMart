import {useState,useEffect, useContext , useRef}from 'react'
import './StaticHeader.css'
import TransitionLink from '../TransitionLink';
import { FaCircle } from "react-icons/fa";
import { Search } from 'lucide-react';
import { HiUser , HiOutlineUser } from 'react-icons/hi';
import { FaRegUser, FaUser } from 'react-icons/fa6';
import { User } from 'lucide-react';
import { UserCircle } from 'lucide-react';
import { MdOutlineAccountCircle, MdAccountCircle } from 'react-icons/md';
// Change 'fa6' to 'fa'
import { FaRegUserCircle, FaUserCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from 'react-router-dom';
import {  HiShoppingBag,HiOutlineShoppingBag } from "react-icons/hi2";
import { RiShoppingBag3Line, RiShoppingBag3Fill } from 'react-icons/ri';
import { RiAccountPinCircleLine,  RiAccountPinCircleFill } from 'react-icons/ri';
import MenuCancel from '../MenuCancel/MenuCancel';
import { Link } from 'react-router-dom';
import { useStoreData } from '../StoreDataContext';
import HeaderBar from './HeaderBar/HeaderBar';
import { WinScrollContext } from '../WinScrollProvider/WinScrollProvider';
import AnimatedUnderline from '../AnimatedUnderline/AnimatedUnderline';
import SiteCollection from '../SiteCollection/SiteCollection';




const menuVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const boxVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};




export default function StaticHeader({toggleSwitch,toggleOverlay, sideBarToggle,setCartToggled,setCurrentPanel,
         setIsPanelOpen}) {


const location = useLocation();

const {isOpen, setIsOpen} = useStoreData();



 const [isMenuOpen, setIsMenuOpen] = useState(false);

const [headerTheme, setHeaderTheme] = useState('black');

 const { isAtTop ,  isIdle } = useContext(WinScrollContext);

  const storeHeader = ['/store'].includes(location.pathname);

const headerNavLeft = 
[
 {name:'Store',path:'/store',},
  {name:'Collections',path:'/',},
 /* {name:'Journal',path:'/',}, */
 {name:'About',path:'/testing',},
 {name:'Contact',path:'/',},

]



const timeoutRef = useRef(null);
const openTimeoutRef = useRef(null);

const handleMouseEnter = () => {
  // Cancel any pending close timeout
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }

  // Open only if the cursor stays for 300ms
  openTimeoutRef.current = setTimeout(() => {
    setIsOpen(true);
  }, 300);
};

const handleMouseLeave = () => {
  // Cancel any pending open timeout
  if (openTimeoutRef.current) {
    clearTimeout(openTimeoutRef.current);
  }

  // Close after 500ms
  timeoutRef.current = setTimeout(() => {
    setIsOpen(false);
  }, 500);
};

const handleExpandedToggle = () => {
  if (!isOpen) {
    // Stage 1: If it's closed, open it.
    setIsOpen(true);
    /* toggleOverlay(true); */
    
  } 
    else {
      // If it's already full height, close the whole thing.
      setIsOpen(false);
     /*  toggleOverlay(false) */
    }
  
};


/* directly paste the original page nav right from the previous one */
useEffect(() => {
    const sections = document.querySelectorAll("[data-header-theme]");

    const observer = new IntersectionObserver(
        (entries) => {
            const activeEntry = entries.find(
                (entry) => entry.isIntersecting
            );

            if (activeEntry) {
                setHeaderTheme(
                    activeEntry.target.dataset.headerTheme
                );
            } else {
                setHeaderTheme("black");
            }
        },
        {
            rootMargin: "-16px 0px -90% 0px",
            threshold: 0,
        }
    );

    sections.forEach((section) => observer.observe(section));

    // Initial check for the newly rendered page
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= 16 && rect.bottom > 16) {
            setHeaderTheme(section.dataset.headerTheme);
        }
    });

    return () => observer.disconnect();

}, [location.pathname]);

console.log(' is at top' , isAtTop)

  return (

       
    
<div
  className={`
    static-header-wrapper
    ${isOpen
      ? "open-menu-header"
      : headerTheme === "white"
        ? "header-force-white"
        : "header-force-black"
    }
  ${isIdle && !isOpen &&  storeHeader ? "static-header-hidden" : ""} 
    ${!isAtTop ? 'hide-header-bar':'' }
    
   
  `}

  style={{ '--header-translate': storeHeader ? '-100%' : '0rem' }}
>

     <div className="header-bar-wrapper">
      <HeaderBar/>
     </div>

  <div className='static-header' >



 
   
   <div className="static-header-content">

     
     <Link to ='/' className="static-header-middle"> {/* Make this transational */}
                
                 <span className="site-logo"> <img src='/LightBlueLogo.png'/></span>
                 <span className='header-site-name'>ananta</span>  {/* Shihō */}
               
    {/*       <div className="site-logo-name">Saras Drops</div>  */}
     </Link>

   

  <div className="header-left-section"
/*  onMouseLeave={handleMouseLeave} */   /* UNCOMMENT THIS */
>

  {/* about , FAQ , BLOG , COntact us , english */}

    <div className='header-menu-wrapper'
    onClick={handleExpandedToggle}>
        <MenuCancel color='white' state={isOpen} />
        <span>Menu</span>
  
    </div> 

      <TransitionLink to='/store' className="">Shop All</TransitionLink>

    <div className="collections-btn"
    /* onMouseEnter={handleMouseEnter} */>
      Collection

      make all side panel emerge from circle
    </div>

  


   {/*    {headerNavLeft.map((item,index)=>
    <TransitionLink to={item.path} key={index}
       className={({ isActive }) =>`header-nav ${isActive?'active-header-nav':''}`}
     onMouseEnter={handleMouseEnter}
  >
        
       <span className='dropDown-menu-btn' 
       >{item.name}</span> 
      
    </TransitionLink>)} */}

      <div className="home-menu-ph"
          onClick={()=>{sideBarToggle(true),toggleOverlay(true)}}>
          <MenuCancel colorSwitch={true} />                
          </div>
    
          <div className="header-right-icon" 
          
          id='header-search-icon-ph'>
            <Search className="header-search-icon"    
                     style={{ strokeWidth: '1.5'}}  />
           </div>


    </div>


      <div className="header-right-section">

      <div className="header-icon-wrapper"
      onClick={()=>{toggleSwitch(true),toggleOverlay(true)}} >


        <div className='header-icon'>
               <Search className="header-search-icon"    
          style={{ strokeWidth: '2'}} size={20} />
        </div>
       
    
        
      </div>

        <TransitionLink 
        to='/Login'
        className={({ isActive }) =>`header-icon-wrapper ${isActive?'active-header-nav':''}`}>
         
             

 <span className='header-icon'>
       { location.pathname == "/Login" ? 
        <RiAccountPinCircleFill  />:<RiAccountPinCircleLine />} 
                          
                          
 </span>
                       
       
           </TransitionLink>


              <div  className={`header-icon-wrapper ${location.pathname==='/cart'?'active-header-nav':''}`}
              onClick={()=>{setCartToggled(true) ,toggleOverlay(true)} }>
                      
                           
                           <span className='header-icon' onClick={()=>{setIsPanelOpen(true),setCurrentPanel('right-panel')}}>
                                            {location.pathname === "/cart" ? (
              < RiShoppingBag3Fill  />  
            ) : (
              < RiShoppingBag3Line
                
                style={{ strokeWidth: "" }}
              />
            )}
                           </span>
                
                        
                           
                 </div>

        

    </div> 

 

   

   </div>


       <AnimatePresence>
  {isOpen && (
    <motion.div
       onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
      className="mega-menu"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      <SiteCollection />
    </motion.div>
  )}
</AnimatePresence>
    

  </div>

   

    </div>


  )
}

  