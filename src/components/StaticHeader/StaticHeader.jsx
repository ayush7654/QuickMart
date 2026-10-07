import {useState,useEffect, useContext }from 'react'
import './StaticHeader.css'
import TransitionLink from '../TransitionLink';
import { FaCircle } from "react-icons/fa";
import { Search } from 'lucide-react';
import { HiUser , HiOutlineUser } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
import {  HiShoppingBag,HiOutlineShoppingBag } from "react-icons/hi2";
import MenuCancel from '../MenuCancel/MenuCancel';
import { Link } from 'react-router-dom';
import { useStoreData } from '../StoreDataContext';
import HeaderBar from './HeaderBar/HeaderBar';
import { WinScrollContext } from '../WinScrollProvider/WinScrollProvider';



export default function StaticHeader({toggleSwitch,toggleOverlay, sideBarToggle,setCartToggled}) {



          const {isOpen, setIsOpen,typeFilter,partialPill,setPartialPill,setSideFilterOn,storeSearch,setStoreSearch} = useStoreData();





const [headerTheme, setHeaderTheme] = useState('black');

 const { isAtTop ,  isIdle } = useContext(WinScrollContext);

const headerNavLeft = 
[
 {name:'Store',path:'/store',},
 {name:'About',path:'/testing',}
]

const location = useLocation();

const handleExpandedToggle = () => {
  if (!isOpen) {
    // Stage 1: If it's closed, open it.
    setIsOpen(true);
  } 
    else {
      // If it's already full height, close the whole thing.
      setIsOpen(false);
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
className={`static-header-wrapper ${
  headerTheme === "white" ? "header-force-white" : "header-force-black"
} ${isIdle?'static-header-hidden':''} `}


    
    >

        <HeaderBar/>

  

 
   
   <div className="static-header-content">

     
     <Link to ='/' className="static-header-middle"> {/* Make this transational */}
                
                 <span className="site-logo"> <img src='SarasBlueLogo.png'/></span>
               
          <div className="site-logo-name">Saras Drops</div> 
     </Link>

   

  <div className="header-left-section">

    <div className='header-menu-wrapper'
    onClick={handleExpandedToggle}>
        <MenuCancel color='white'  />
  
    </div>

      {headerNavLeft.map((item,index)=>
    <TransitionLink to={item.path} key={index}
     className={({ isActive }) =>`header-nav ${isActive?'active-header-nav':''}`}
    >
          <span className='active-page-dot'>
            <FaCircle size={6} className='header-page-dot' />
        </span>
        <span>{item.name}</span>
      
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
          <Search className="header-search-icon"    
          style={{ strokeWidth: '2'}} size={15} />
          <span>Search</span>
        
      </div>

        <TransitionLink 
        to='/Login'
        className={({ isActive }) =>`header-nav ${isActive?'active-header-nav':''}`}>
         <div className="header-nav">
          <span className='active-page-dot'>
            <FaCircle size={6} />
        </span>
             <span>Account</span>                       
            </div>  
           </TransitionLink>


              <div  className={`header-nav ${location.pathname==='/cart'?'active-header-nav':''}`}
              onClick={()=>{setCartToggled(true),toggleOverlay(true)}}>
                      
                            <span className='active-page-dot'>
                            <FaCircle size={6} />
                             </span>
                          <span>Cart</span> 
                        
                           
                 </div>


    </div> 

 

   

   </div>


    </div>


  )
}
