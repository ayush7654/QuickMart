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
import MenuCancel from '../MenuCancel/MenuCancel';
import { Link } from 'react-router-dom';
import { useStoreData } from '../StoreDataContext';
import HeaderBar from './HeaderBar/HeaderBar';
import { WinScrollContext } from '../WinScrollProvider/WinScrollProvider';
import AnimatedUnderline from '../AnimatedUnderline/AnimatedUnderline';
import SiteMenu from '../SiteMenu/SiteMenu';




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

const menuItems = [
  "Box One",
  "Box Two",
  "Box Three",
  "Box Four",
];


export default function StaticHeader({toggleSwitch,toggleOverlay, sideBarToggle,setCartToggled}) {



const {isOpen, setIsOpen} = useStoreData();



 const [isMenuOpen, setIsMenuOpen] = useState(false);

const [headerTheme, setHeaderTheme] = useState('black');

 const { isAtTop ,  isIdle } = useContext(WinScrollContext);

const headerNavLeft = 
[
 {name:'Store',path:'/store',},
  {name:'Collections',path:'/',},
 /* {name:'Journal',path:'/',}, */
 {name:'About',path:'/testing',},
 {name:'Contact',path:'/',},

]

const location = useLocation();

const timeoutRef = useRef(null);

const handleMouseEnter = () => {
  // Clear any pending close timeout so it opens immediately
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }
  setIsOpen(true);
};

const handleMouseLeave = () => {
  // Apply the 0.8s (800ms) delay only when leaving
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

  return (

       
    
<div
  className={`
    static-header-wrapper
    ${isOpen
      ? "header-force-black"
      : headerTheme === "white"
        ? "header-force-white"
        : "header-force-black"
    }
    ${isIdle && !isOpen ? "static-header-hidden" : ""}
    ${isOpen?'open-menu-header':''}
  `}
>

        <HeaderBar/>

  <div className='static-header'
    >



 
   
   <div className="static-header-content"  >

     
     <Link to ='/' className="static-header-middle"> {/* Make this transational */}
                
                 <span className="site-logo"> <img src='NewSiteLogo1.png'/></span>
                 <span className='header-site-name'>Shihō</span>
               
    {/*       <div className="site-logo-name">Saras Drops</div>  */}
     </Link>

   

  <div className="header-left-section"
 onMouseLeave={handleMouseLeave}
>

 {/*    <div className='header-menu-wrapper'
    onClick={handleExpandedToggle}>
        <MenuCancel color='white' state={isOpen} />
  
    </div> */}


      {headerNavLeft.map((item,index)=>
    <TransitionLink to={item.path} key={index}
       className={({ isActive }) =>`header-nav ${isActive?'active-header-nav':''}`}
     onMouseEnter={handleMouseEnter}
  >
        
       <span className='dropDown-menu-btn' 
       >{item.name}</span> 
      
    </TransitionLink>)}

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

      <div className="header-search-wrapper"
      onClick={()=>{toggleSwitch(true),toggleOverlay(true)}} >


        <span className='header-nav-icon'>
               <Search className="header-search-icon"    
          style={{ strokeWidth: '1.5'}} size={22} />
        </span>
       
          {/* <span>Search</span> */}
        
      </div>

        <TransitionLink 
        to='/Login'
        className={({ isActive }) =>`header-nav ${isActive?'active-header-nav':''}`}>
         <div className="header-nav">
          {/* <span className='active-page-dot'>
            <FaCircle size={6} />
        </span>
            <span>Account</span>   */}    

 <span className='header-nav-icon'>
       { location.pathname == "/Login" ? 
        <img src='userIcon-fill.png'/>:<img src='userIcon-outline.png'/>} 
                          
                          
 </span>
                       
            </div>  
           </TransitionLink>


              <div  className={`header-nav ${location.pathname==='/cart'?'active-header-nav':''}`}
              onClick={()=>{setCartToggled(true) ,toggleOverlay(true)} }>
                      
                           {/*  <span className='active-page-dot'>
                            <FaCircle size={6} />
                             </span>
                          <span>Cart</span>  */}
                           <span className='header-nav-icon'>
                                            {location.pathname === "/cart" ? (
              <HiShoppingBag   />
            ) : (
              <HiOutlineShoppingBag
                
                style={{ strokeWidth: "1.5" }}
              />
            )}
                           </span>
                
                        
                           
                 </div>

                 <div>
     {/*                 <div className='header-menu-wrapper'
    onClick={handleExpandedToggle}>
        <MenuCancel color='white' state={isOpen} />
  
    </div>  */}
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
      <SiteMenu />
    </motion.div>
  )}
</AnimatePresence>
    

  </div>

   

    </div>


  )
}

   {/*  <div className="mega-menu-content">
              {menuItems.map((item) => (
                <motion.div
                  className="mega-menu-box"
                  key={item}
                  variants={boxVariants}
                >
                  {item}
                </motion.div>
              ))}
            </div> */}