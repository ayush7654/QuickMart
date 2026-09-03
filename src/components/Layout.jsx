import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from './Header/Header'
import Footer from './Footer/Footer'
import SearchBar from './SearchBar/SearchBar';
import SideBarNav from './SideBarNav/SideBarNav';
import SideBarCart from './SideBarCart/SideBarCart';
import { CartListProvider } from './CartListProvider';
import { StoreFilterProvider } from './StoreFilterContext';
import { StoreDataProvider } from './StoreDataContext';
import TransitionSlider from './TransitionSlider/TransitionSlider';
import { usePageTransition } from './PageTransitionContext';

export default function Home(){
    const location = useLocation();
    const isHomePage = location.pathname === '/';
   
   const [searchBarToggle,setSearchBarToggle]= useState(false)
   const [showOverlay, setShowOverlay] = useState(false);

   const [animationStatus, setAnimationStatus] = useState('idle');

   const [sideBarOn,setSideBarOn] = useState(false)

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

      <StoreDataProvider>

    <div  className={`root${isHomePage ? 'home' : 'nothome'}`} style={{position:"relative"}}>
{showOverlay && (
  <div className="screen-overlay" onClick={() => setShowOverlay(false)} />
)}
      <SearchBar currentToggle={searchBarToggle} 
      toggleSwitch={SearchToggle} 
      screenOverlay={showOverlay}
      toggleOverlay={setShowOverlay} />

  <SideBarNav sideBarState={sideBarOn} sideBarToggle={toggleSideBar} />




 <Header toggleSwitch={SearchToggle} 
    screenOverlay={showOverlay}
      toggleOverlay={setShowOverlay}
      sideBarToggle={toggleSideBar}
      setCartToggled={setCartToggled}/>   

<StoreFilterProvider>
  <CartListProvider>

  
    <div className='outlet-container' data-animation={animationStatus}>
    <Outlet screenOverlay={showOverlay}
      toggleOverlay={setShowOverlay}/>
    </div>

     <SideBarCart
  cartToggled={cartToggled}
  setCartToggled={setCartToggled}
  toggleOverlay={setShowOverlay}/> 


  </CartListProvider>
</StoreFilterProvider>



  {/*        <Footer />  */}  {/* fix layout for screen chnage */}
         <TransitionSlider/>
    </div>
    </StoreDataProvider>
        
    )
}

