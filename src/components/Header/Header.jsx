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
import { useScroll } from "../ScrollData/ScrollData";
import SiteLogo from "./SiteLogo/SiteLogo";

import './Header.css'
import { head } from "lodash";
import DotNav from "../DotNav/DotNav";
export default function Header({toggleSwitch,screenOverlay,toggleOverlay, sideBarToggle,setCartToggled}){

  
        
     const [searchTerm,setSearchTerm]= useState('')
    
     const[suggestions,setSuggestions]= useState([])
    
     const [cursorOff, setCursorOff] = useState(true);

    const firebase= useFirebase()

    
    const pagelocation= useLocation();
    const navigate = useNavigate();

 


        /*         {title:"Wishlist ", path:'/wishlist',logo:pagelocation.pathname==='/wishlist'?<FaHeart id="fd-header-logo" className="wishlistIcon" />:<FiHeart className="wishlistIcon"  id="ol-header-logo"  style={{ strokeWidth: '1.5' }}/>}, */


    const navElements= [{id:0,title:'Home',function:'/'},
      {id:1,title:'Store',function:'/store'},
      {id:2,title:'About',function:'/testing'}]



   const handlePageNav=(func)=>{
   
    navigate(func);
   }

    


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


    const location= useLocation()
  

      const { scrollY, direction, velocity } = useScroll();
    
      // Move up/down state
      const [isIdle, setIsIdle] = useState(false);

    const [isAtTop, setIsAtTop] = useState(true);

   const headertp = ['/', '/store', '/cart'].includes(location.pathname);

   console.log('header is ' , headertp)

      // For scroll detection
      const lastScrollY = useRef(window.scrollY);
      
useEffect(() => {
  let ticking = false;
  // Define the distance from the top in pixels after which the header
  // changes its base class (e.g., from transparent to solid background)
  const headerClassChangeThreshold = 600; // You can adjust this value as needed

  // NEW: Define the scroll distance from the top *before* the header
  // starts to consider hiding (becoming idle).
  const hideHeaderStartThreshold = 500; // For example, hide after scrolling 200px from top

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




  // 1. Clamp progress (0 → 1)
  const progress = Math.min(scrollY / 300, 1);

  // 2. Interpolate values
  const scale = 8 - progress * 7;        // 8 → 1
  const translateY = 200 - progress * 200; // 200px → 0

  // 3. Apply transform ONLY while headerAtTop is true
  const transformStyle = isAtTop
    ? `translateY(${translateY}px) scale(${scale})`
    : "translateY(0) scale(1)";

 
   

 const suggestionComp= suggestions?suggestions.filter(item=>item.name.toLowerCase().includes(searchTerm.toLowerCase())):null;

   
    return(<div      
      className='site-header-div' 
     


     style={{
      display:location.pathname=='/Login'?'none':'flex',
      // Dynamic transition based on 'isIdle' state
      transition: isIdle
        ? 'transform 0.2s ease, background-color 0.4s ease, box-shadow 1s ease' // When hiding (moving up/idle)
        : 'transform 0.2s ease,  background-color 0.4s ease, box-shadow 1s ease', // When showing (moving down/active)
      transform:isIdle 
 ? `translate(-50%, ${location.pathname=='/store'? '-100%':'-100%'}`   /* ENABLE HEADER TOGGLE IN STORE PAGE */
    : 'translate(-50%, 0%)'
  
     
     
    }}>


        <div  className={`header-home ${isAtTop && cursorOff && headertp ?'headerAtTop':''}`}  /* REMOVE '!' */
            onMouseEnter={() => setCursorOff(false)}
  onMouseLeave={() => setCursorOff(true)}
        style={{
            transition: isIdle
        ? 'transform 0.4s ease-in, background-color 0.4s ease, box-shadow 1s ease' // When hiding (moving up/idle)
        : 'transform 0.5s ease-out,  background-color 0.4s ease, box-shadow 1s ease', // When showing (moving down/active)
        }}>
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

  <div className="site-name-div"   /* style={{
        transform: location.pathname=='/'? transformStyle:''
      }} */>
                  <div className="site-logo-tagline">Elevate your World with</div>
                  <div className="site-name">SARAS</div>
                </div>
                 <div className="page-nav-wrapper-left">
    
                   
  
                    {/* {navElements ? navElements.map(item => (
                
                         <NavLink
        key={item.path}
        to={item.function}
        className={({ isActive }) =>
          `page-nav-left ${isActive?'page-nav-left-selected':''} ${
            item.title === 'About' ? 'desktop-only' : ''
          }`
        }
      >
      <AnimatedUnderline 
                  from="left" 
                  exit="opposite"
                  color={'blue'}  
                  thickness={1.5}
                  duration={.3}
                  offset={2}> 
                  {item.title}
                  </AnimatedUnderline>  
      </NavLink>
               
                    
                      
                  
                      
                         ))
                        : <div>loading</div>
                     } */}
                  

   <DotNav
   sections={navElements}
   textColor={isAtTop && cursorOff && headertp?"white":"rgb(80,80,80)"}
   textColorHover="black"
   dotColor={isAtTop && cursorOff && headertp?"white":"blue"}
   handleClick={(func)=>handlePageNav(func)}
   syncWithUrl={true}/>

                </div> 

              

                  {/* <SiteLogo/> */}
{/*  <span style={{color:'black'}}>replicate the shrinking header design</span> */}

     
               <div className='page-nav-wrapper-right'>

                 <div
                 onClick={()=>{toggleSwitch(true),toggleOverlay(true)}} 
                 className="page-nav-right">
                 <div id="header-icon">
                  <Search className="searchIcon"    
                 style={{ strokeWidth: '1.5'}} />
                 </div> 
                 </div>

                 <NavLink to='/Login'
                   className={({ isActive }) =>`page-nav-right ${isActive?'page-nav-right-selected':''} desktop-only`}>
                      <div id="header-icon">
                        { pagelocation.pathname == "/Login" ? 
                          <HiUser  /> :
                           <HiOutlineUser  style={{ strokeWidth: "1.5" }} />
                          }                       
                        </div>  
                 </NavLink>

                 <div  className={`page-nav-right ${location.pathname==='/cart'?'page-nav-right-selected':''}`}
                  onClick={()=>{setCartToggled(true),toggleOverlay(true)}}>
                <div id="header-icon">
                    { pagelocation.pathname === "/cart" ? (
              <HiShoppingBag   />
            ) : (
              <HiOutlineShoppingBag
                
                style={{ strokeWidth: "1.5" }}
              />
            )}
                </div>
                
                 </div>

               
 
               </div>

              

          </div>
    
 
         
        
    </div>

 
    </div>
    
    
    
        
    )
}




 {/*  <Link to={`/store${location.state?location.state:'?page=1'}`} className="backToStore">←</Link> */} 


        
{/*         <div className="header-backArrow"> <Link style={{color:'white'}} to={`/store${location.state?location.state:'?page=1'}`}  >←</Link> </div> */}