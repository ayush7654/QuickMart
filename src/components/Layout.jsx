import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from './Header/Header'
import Footer from './Footer/Footer'
import SearchBar from './SearchBar/SearchBar';
import SideBarNav from './SideBarNav/SideBarNav';

import StaticHeader from './StaticHeader/StaticHeader';
import { CartListProvider } from './CartListProvider';
import TransitionSlider from './TransitionSlider/TransitionSlider';
import { usePageTransition } from './PageTransitionContext';
import SiteMenu from './SiteCollection/SiteCollection';
import { useStoreData } from './StoreDataContext';
import SideCart from './SideCart/SideCart';
import NavigationPanel from './NavigationPanel/NavigationPanel';



 

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



    const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handlePanelToggle = () => {
    setIsPanelOpen(prev => !prev);
  };

  const closePanel = () =>{
    setIsPanelOpen(false);
    setCurrentPanel('');
  }


  const [currentPanel,setCurrentPanel] = useState('')   /* search (top) , sideNav bar (left), cart (right) , storefilter (left)   */


console.log(currentPanel)
   
    return(

 
     

    <div  className={`root${isHomePage ?'home':'nothome'} ${isPanelOpen?currentPanel:''} `} style={{position:"relative"}}>

 

  {/* <div className="middleLine"></div> */}

<div className={`search-overlay ${currentPanel === 'top-panel' ? 'active' : ''}`}>
  <SearchBar 
    currentToggle={searchBarToggle} 
    toggleSwitch={SearchToggle} 
    closePanel={closePanel}
    toggleOverlay={setShowOverlay} 
    currentPanel={currentPanel}
  />
</div>






{currentPanel==='top-panel'&&  <div className="search-overlay">
  <SearchBar currentToggle={searchBarToggle} 
      toggleSwitch={SearchToggle} 
     closePanel={closePanel}
      toggleOverlay={setShowOverlay} 
      currentPanel={currentPanel}/>
  
  </div>}



       <StaticHeader
      toggleSwitch={SearchToggle} 
    
      toggleOverlay={setShowOverlay}
      sideBarToggle={toggleSideBar}
      setCartToggled={setCartToggled}
         sideBarState={sideBarOn} 
         setCurrentPanel={setCurrentPanel}
         setIsPanelOpen={setIsPanelOpen}
         currentPanel={currentPanel}
   />




       
  <CartListProvider>


<div className='siteNav-panel' >

<NavigationPanel closePanel={closePanel}/>
</div>

<div className="cart-panel" >

  <SideCart closePanel={closePanel}/>

</div>






 





  
    <div className={`outlet-container`}
    data-animation={animationStatus}>
    <Outlet 
      toggleOverlay={setShowOverlay}/>
    </div>




  </CartListProvider>




         <Footer />    {/* fix layout for screen chnage */}
         <TransitionSlider/>
    </div>

        
    )
}


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