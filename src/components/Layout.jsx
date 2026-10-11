import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from './Header/Header'
import Footer from './Footer/Footer'
import SearchBar from './SearchBar/SearchBar';
import SideBarNav from './SideBarNav/SideBarNav';
import SideBarCart from './SideBarCart/SideBarCart';
import StaticHeader from './StaticHeader/StaticHeader';
import { CartListProvider } from './CartListProvider';
import TransitionSlider from './TransitionSlider/TransitionSlider';
import { usePageTransition } from './PageTransitionContext';
import SiteMenu from './SiteMenu/SiteMenu';
import { useStoreData } from './StoreDataContext';



 

export default function Home(){
    const location = useLocation();
    const isHomePage = location.pathname === '/';
   
   const [searchBarToggle,setSearchBarToggle]= useState(false)
   
   const [showOverlay, setShowOverlay] = useState(false);

   const [animationStatus, setAnimationStatus] = useState('idle');

   const [sideBarOn,setSideBarOn] = useState(false)

   const {isOpen} = useStoreData();

   const overlayVisible = isOpen || showOverlay;

   

       const [cartToggled,setCartToggled]= useState(false)

const { isAnimating } = usePageTransition();


 const SearchToggle=(i)=>{
setSearchBarToggle(i)
   }

   const toggleSearchOverlay=(i)=>{
    setShowOverlay(i)
   }

  const toggleSideBar=(i)=>{
 setSideBarOn(i)

  }

  const toggleSideCart=(i)=>{
    setCartToggled(i)
  }

  useEffect(() => {
    if (isAnimating) {
      setAnimationStatus('leaving');
    }
  }, [isAnimating]);

  // 2. The magic trick: As soon as the URL changes, INSTANTLY reset the layout
  // This ensures the new page loads completely fresh with no scale/translate
  useEffect(() => {
    setAnimationStatus('idle');
  }, [location.pathname]);
   
    return(

 
     

    <div  className={`root${isHomePage ? 'home' : 'nothome'}`} style={{position:"relative"}}>

 

  {/* <div className="middleLine"></div> */}

{overlayVisible  && (
  <div className="screen-overlay" onClick={() => setShowOverlay(false)} />
)}
      <SearchBar currentToggle={searchBarToggle} 
      toggleSwitch={SearchToggle} 
     
      toggleOverlay={setShowOverlay} />

  <SideBarNav
   sideBarState={sideBarOn} 
  sideBarToggle={toggleSideBar}
  toggleOverlay={setShowOverlay} />


{/*     <div className="mix-blend-test">
           <div className="site-logo">
          <img src='whiteStork5.png'/>
         </div>
          MIX BLEND TEST</div> */}

      

{/*   <Header toggleSwitch={SearchToggle} 
    screenOverlay={showOverlay}
      toggleOverlay={setShowOverlay}
      sideBarToggle={toggleSideBar}
      setCartToggled={setCartToggled}/>  */}  


        
{/*  <SiteMenu   toggleOverlay={setShowOverlay}/> */}

       <StaticHeader
      toggleSwitch={SearchToggle} 
    
      toggleOverlay={setShowOverlay}
      sideBarToggle={toggleSideBar}
      setCartToggled={setCartToggled}/>






  



  <CartListProvider>

  
    <div className='outlet-container' data-animation={animationStatus}>
    <Outlet 
      toggleOverlay={setShowOverlay}/>
    </div>

     <SideBarCart
  cartToggled={cartToggled}
  setCartToggled={setCartToggled}
  toggleOverlay={setShowOverlay}/> 


  </CartListProvider>




         <Footer />    {/* fix layout for screen chnage */}
         <TransitionSlider/>
    </div>

        
    )
}

