import {useState,useEffect,useRef} from "react";
import {NavLink, Link, useLocation,useNavigate} from 'react-router-dom'
import { Search } from "react-feather";
import { useFirebase } from "../../components/FirebaseContext/Firebase";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiOutlineUser, HiUser } from 'react-icons/hi';
import { HiShoppingCart,HiOutlineShoppingCart } from 'react-icons/hi';
import MenuCancel from "../MenuCancel/MenuCancel";
import { MdLogin } from 'react-icons/md';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiShoppingBag } from "react-icons/hi2";
import AnimatedUnderline from "../AnimatedUnderline/AnimatedUnderline";


import SiteLogo from "./SiteLogo/SiteLogo";

import './Header.css'
import { head } from "lodash";
export default function Header({toggleSwitch,screenOverlay,toggleOverlay, sideBarToggle}){

  
        
     const [searchTerm,setSearchTerm]= useState('')
    
     const[suggestions,setSuggestions]= useState([])
    

    const firebase= useFirebase()

    console.log('username',firebase.currentUser)
    const pagelocation= useLocation();

  const elements = [
  
        {
    title: "Login",
    path: "/login",
    logo:  
      pagelocation.pathname === "/login" ? (
        <HiUser id="fd-header-logo" />
      ) : (
        <HiOutlineUser id="ol-header-logo" style={{ strokeWidth: "1.5" }} />
      )
    
  }
      ,
   

      {
          title: "Cart",
          path: "/cart",
          logo:
            pagelocation.pathname === "/cart" ? (
              <HiShoppingBag id="fd-header-logo" />
            ) : (
              <HiOutlineShoppingBag
                id="ol-header-logo"
                style={{ strokeWidth: "1.5" }}
              />
            ),
        }
,
];


        /*         {title:"Wishlist ", path:'/wishlist',logo:pagelocation.pathname==='/wishlist'?<FaHeart id="fd-header-logo" className="wishlistIcon" />:<FiHeart className="wishlistIcon"  id="ol-header-logo"  style={{ strokeWidth: '1.5' }}/>}, */


    const navElements= [{title:'HOME',path:'/'},{title:'STORE',path:'/store'},{title:'ABOUT',path:'/testing'}]



    


    const[categories,setCategories]= useState(null)

    

    

   
 




   useEffect(()=>{
    const fetchCategory= async()=>{
    const response= await fetch("https://dummyjson.com/products/categories")
    const data = await response.json()
    setCategories(data)
  
    }
    fetchCategory();
    },[])

    
  

 
   const categoryArr= categories? (window.innerWidth>775? categories.slice(12,20): categories.slice(12,16)):'loading'
   console.log('arr is',categoryArr)

    const location= useLocation()
    console.log(location)


    
      // Move up/down state
      const [isIdle, setIsIdle] = useState(false);

    const [isAtTop, setIsAtTop] = useState(true);

      // For scroll detection
      const lastScrollY = useRef(window.scrollY);
      
useEffect(() => {
  let ticking = false;
  // Define the distance from the top in pixels after which the header
  // changes its base class (e.g., from transparent to solid background)
  const headerClassChangeThreshold = 10; // You can adjust this value as needed

  // NEW: Define the scroll distance from the top *before* the header
  // starts to consider hiding (becoming idle).
  const hideHeaderStartThreshold = 10; // For example, hide after scrolling 200px from top

  // NEW: Define the scroll distance before the header becomes idle/hidden,
  // once the hideHeaderStartThreshold has been crossed.
  const scrollDeltaForIdle = 5; // Adjust this value as needed (e.g., 50px, 100px)

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Update isAtTop state (based on initial threshold)
        if (currentScrollY <= headerClassChangeThreshold) {
          setIsAtTop(true);
        } else {
          setIsAtTop(false);
        }

        // --- MODIFIED IDLE LOGIC ---
        // Only start checking for idle/hide behavior AFTER scrolling past a certain point from the top
        if (currentScrollY > hideHeaderStartThreshold) {
          if (currentScrollY > lastScrollY.current + scrollDeltaForIdle) {
            // Scrolled down sufficiently past the hide threshold
            setIsIdle(true);
          } else if (currentScrollY < lastScrollY.current - scrollDeltaForIdle) {
            // Scrolled up sufficiently, show header
            setIsIdle(false);
          }
        } else {
          // If we are above or at the hideHeaderStartThreshold, the header should never be idle (hidden)
          setIsIdle(false);
        }
        // --- END MODIFIED IDLE LOGIC ---

        lastScrollY.current = currentScrollY;
        ticking = false;
      });

      ticking = true;
    }
  };

 
    

  window.addEventListener('scroll', onScroll);
  return () => window.removeEventListener('scroll', onScroll);
}, []);

 const suggestionComp= suggestions?suggestions.filter(item=>item.name.toLowerCase().includes(searchTerm.toLowerCase())):null;

   
    return(<div      
className={location.pathname!=='/'? "sticky-header-ScrollUp":isAtTop ?"sticky-header-TopMounted": "sticky-header-ScrollUp"}
     style={{
      // Dynamic transition based on 'isIdle' state
      transition: isIdle
        ? 'transform 0.4s ease-in, background-color 0.4s ease, box-shadow 1s ease' // When hiding (moving up/idle)
        : 'transform 0.5s ease-out,  background-color 0.4s ease, box-shadow 1s ease', // When showing (moving down/active)
      transform:!isAtTop  /*  && window.innerWidth>700  */
  ? 'translateY(-50%)'
  : 'translateY(0%)',
     
     
    }}>


        <div className="header-home">
          <div className="header-home-upper">
            <div className="site-logo-div" style={{scale:isAtTop?'1':'.5' , opacity:isAtTop?'1':'.4'}}> 
              <img src='./whiteStork5.png'  className="site-logo"/>
            </div>          
          </div>
          <div className="header-home-lower">
               
                    <div className="home-menu-ph" onClick={()=>sideBarToggle(true)}>
                   {/*  <RxHamburgerMenu className="menu-icon" /> */}
                   <MenuCancel/>
                        </div>


                 <div className="page-nav-container">
    
                   <div className="page-nav">  
  
                     {navElements ? navElements.map(item => (
                 <AnimatedUnderline  from="center" color= {pagelocation.pathname==='/'?'white':"rgb(0,250,250)"} thickness={pagelocation.pathname==='/'?3.5:4}>
                         <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) =>
          `${isActive ? 'page-nav-item-selected' : 'page-nav-item'} ${
            item.title === 'ABOUT' ? 'desktop-only' : ''
          }`
        }
      >
        {item.title}
      </NavLink>
                 </AnimatedUnderline>
                    
                      
                  
                      
                         ))
                        : <div>loading</div>
                     }
                  </div>
                </div> 

                <div className="site-name-div">
                  <div className="site-logo-tagline">Elevate your World with</div>
                  <div className="site-name">SAARAS</div>
                </div>

                  {/* <SiteLogo/> */}


     
               <div className='Home-Nav-Container'>

                 <div
                 onClick={()=>{toggleSwitch(true),toggleOverlay(true)}} 
                 className="searchIcon-div"><Search className="searchIcon"    
                 style={{ strokeWidth: '1.5'}} />
                 </div>

                  {elements.map((element,index)=> 
                  <NavLink key={index} 
                   className={({ isActive }) =>
          `${isActive ? 'navlink-selected' : 'navlink'} ${
            element.title === 'Login' ? 'desktop-only' : ''
          }`
        }
                 
                   to={element.path}>
                    <div id="header-icon">{element.logo}</div>  
                  </NavLink>)}

               </div>

          </div>
    
 
         
        
    </div>

 
    </div>
    
    
    
        
    )
}




 {/*  <Link to={`/store${location.state?location.state:'?page=1'}`} className="backToStore">←</Link> */} 


        
{/*         <div className="header-backArrow"> <Link style={{color:'white'}} to={`/store${location.state?location.state:'?page=1'}`}  >←</Link> </div> */}