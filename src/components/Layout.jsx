import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from './Header/Header'
import Footer from './Footer/Footer'
import SearchBar from './SearchBar/SearchBar';
import SideBarNav from './SideBarNav/SideBarNav';



export default function Home(){
    const location = useLocation();
    const isHomePage = location.pathname === '/';
   
   const [searchBarToggle,setSearchBarToggle]= useState(false)
   const [showOverlay, setShowOverlay] = useState(false);

   const [sideBarOn,setSideBarOn] = useState(false)

 const SearchToggle=(i)=>{
setSearchBarToggle(i)
   }

   const toggleSearchOverlay=(i)=>{
    setShowOverlay(i)
   }

  const toggleSideBar=(i)=>{
 setSideBarOn(i)
 console.log('clicked side bar')
  }
   
    return(
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
      sideBarToggle={toggleSideBar}/> 
    <div className='outlet-container' style={{paddingTop:isHomePage?'0rem':'0rem'}}>
    <Outlet screenOverlay={showOverlay}
      toggleOverlay={setShowOverlay}/>
    </div>
         <Footer /> 
    </div>
        
    )
}

