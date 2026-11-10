import {useState,useEffect, useContext , useRef}from 'react'
import './StaticHeader.css'
import TransitionLink from '../TransitionLink';
import { Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import HeaderBar from './HeaderBar/HeaderBar';
import { WinScrollContext } from '../WinScrollProvider/WinScrollProvider';
import AnimatedUnderline from '../AnimatedUnderline/AnimatedUnderline';
import { HiUser , HiOutlineUser} from 'react-icons/hi2';
import { FiShoppingBag } from 'react-icons/fi';



export default function StaticHeader({
  toggleOverlay, 
  sideBarToggle,
  setCurrentPanel,
 setIsPanelOpen,
 setCollectionOpen}) {


const location = useLocation();







const [headerTheme, setHeaderTheme] = useState('black');

 const { isAtTop ,  isIdle } = useContext(WinScrollContext);

  const storeHeader = ['/store'].includes(location.pathname);


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
    ${ headerTheme === "white"
        ? "header-force-white"
        : "header-force-black"
    }
  ${isIdle &&  storeHeader ? "static-header-hidden" : ""} 
    ${!isAtTop ? 'hide-header-bar':'' }`}

  style={{ '--header-translate': storeHeader ? '-100%' : '0rem' }}
>

     <div className="header-bar-wrapper">
      <HeaderBar/>
     </div>

  <div className='static-header' >

   <div className="static-header-content">

   

     
     <Link to ='/' className="site-logo-wrapper"> 
                 
                 <span className="site-logo"> <img src='/siteSampleLogo7.png'/></span>
                 <span className='header-site-name'>lethora</span>  
               
     </Link>

   

  <div className="header-nav-wrapper">

 




      <TransitionLink to='/store' className='header-nav'>
      <AnimatedUnderline>Shop</AnimatedUnderline>
      </TransitionLink>

       <span className='header-nav'
     onClick={()=>{setIsPanelOpen(true),setCurrentPanel('left-panel')}}>
       <AnimatedUnderline>Menu</AnimatedUnderline>
    </span> 

    <span className='header-nav'

  onClick={()=>setCollectionOpen(true)}>
   <AnimatedUnderline>Collection</AnimatedUnderline>


    </span>

        <Link to='/testing' className='header-nav'

>
   <AnimatedUnderline>Wishlist</AnimatedUnderline>


    </Link>

  



      {/* <div className="home-menu-ph"
          onClick={()=>{sideBarToggle(true),toggleOverlay(true)}}>
          <MenuCancel colorSwitch={true} />                
          </div>
    
          <div className="header-right-icon" 
          
          id='header-search-icon-ph'>
            <Search className="header-search-icon"    
                     style={{ strokeWidth: '1.5'}}  />
           </div> */}


    </div>


      <div className="header-icon-wrapper">

            <div className='header-icon'
             onClick={()=>{setIsPanelOpen(true),setCurrentPanel('top-panel')}}>
     <Search size={20} strokeWidth={1.5} />
    </div>

  {/*    <div className='header-icon'>
     <LuBell size={20} strokeWidth={1.5} />
    </div> */}
    
    <div className='header-icon' 
    onClick={()=>{setIsPanelOpen(true),setCurrentPanel('right-panel')}}>
     {location.pathname === "/cart" ?
      (< RiShoppingBag3Fill  />   ) : ( <FiShoppingBag style={{ strokeWidth: "1.5" }} /> )}
      </div> 
       



        <TransitionLink 
        to='/Login'
        className='header-icon'>

       { location.pathname == "/Login" ? 
        < HiUser/>:<HiOutlineUser strokeWidth={1.5} />}   
       </TransitionLink>    

    </div> 

 

   

   </div>


 

  </div>

   

    </div>


  )
}

  