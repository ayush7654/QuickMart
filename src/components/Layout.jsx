import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from './Header/Header'
import Footer from './Footer/Footer'
import SearchBar from './SearchBar/SearchBar';



export default function Home(){
    const location = useLocation();
    const isHomePage = location.pathname === '/';
   
   const [searchBarToggle,setSearchBarToggle]= useState(false)
   const [showOverlay, setShowOverlay] = useState(false);

 const SearchToggle=(i)=>{
setSearchBarToggle(i)
   }

   const toggleSearchOverlay=(i)=>{
    setShowOverlay(i)
   }
   
    return(
    <div  className={`root${isHomePage ? 'home' : 'nothome'}`} style={{position:"relative"}}>
{showOverlay && (
  <div className="screen-overlay" onClick={() => setShowOverlay(false)} />
)}
 {/*      <SearchBar currentToggle={searchBarToggle} 
      toggleSwitch={SearchToggle} 
      screenOverlay={showOverlay}
      toggleOverlay={setShowOverlay} />
    <Header toggleSwitch={SearchToggle} 
    screenOverlay={showOverlay}
      toggleOverlay={setShowOverlay}/> */}
    <div className='outlet-container' style={{paddingTop:isHomePage?'0rem':'4rem'}} >
    <Outlet screenOverlay={showOverlay}
      toggleOverlay={setShowOverlay}/>
    </div>
        {/* <Footer /> */}
    </div>
        
    )
}

