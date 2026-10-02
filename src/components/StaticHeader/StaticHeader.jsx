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
import ExtraHeader from '../Header/ExtraHeader/ExtraHeader';
import HeaderBar from './HeaderBar/HeaderBar';
import { WinScrollContext } from '../WinScrollProvider/WinScrollProvider';


export default function StaticHeader({toggleSwitch,screenOverlay,toggleOverlay, sideBarToggle,setCartToggled}) {

const [headerTheme, setHeaderTheme] = useState("white");

 const { isAtTop ,  isIdle } = useContext(WinScrollContext);

const headerNavLeft = 
[/* {name:'Home',path:'/',}, */
 {name:'Store',path:'/store',},
 {name:'About',path:'/testing',}
]

const location = useLocation();


/* directly paste the original page nav right from the previous one */

useEffect(() => {
    const sections = document.querySelectorAll("[data-header-theme]");

    console.log("THEMED SECTIONS:", sections);
    
const observer = new IntersectionObserver(
  (entries) => {
    const activeEntry = entries.find(
      (entry) => entry.isIntersecting
    );

    if (activeEntry) {
      setHeaderTheme(activeEntry.target.dataset.headerTheme);
    } else {
      setHeaderTheme("blend");
    }
  },
  {
    rootMargin: "-16px 0px -90% 0px",
    threshold: 0,
  }
);

    sections.forEach((section) => observer.observe(section));


sections.forEach((section) => {
  const rect = section.getBoundingClientRect();

  if (rect.top <= 16 && rect.bottom > 16) {
    setHeaderTheme(section.dataset.headerTheme);
  }
});

console.log('is at top', isAtTop)

    return () => observer.disconnect();
}, []);

  return (

       
    
    <div 
className={`static-header-wrapper ${
  headerTheme === "white" ? "header-force-white" : "header-force-blend"
} ${
  headerTheme === "black" ? "header-force-black" : ""
} ${isIdle?'static-header-hidden':''} `}


    
    >

        <HeaderBar/>

  

 
   
   <div className="static-header-content">

     
     <Link to ='/' className="static-header-middle"> {/* Make this transational */}
                 <div className="site-logo">
          <img src='whiteStork5.png'/>
         </div>
         <div className="site-logo-name">Saras & Suburbs</div>
     </Link>

   

  <div className="header-left-section">

    <div className='header-menu-wrapper'>
        <MenuCancel color='white'/>
  
    </div>

      {headerNavLeft.map((item,index)=>
    <TransitionLink to={item.path} key={index}
     className={({ isActive }) =>`header-nav ${isActive?'active-header-nav':''}`}
    >
          <span className='active-page-dot'>
            <FaCircle size={6} />
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
