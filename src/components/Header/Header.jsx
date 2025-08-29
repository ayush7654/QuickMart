import {useState,useEffect,useRef} from "react";
import {NavLink, Link, useLocation,useNavigate} from 'react-router-dom'
import { Search } from "react-feather";
import { useFirebase } from "../../components/FirebaseContext/Firebase";
import { AiFillHome } from 'react-icons/ai';
import { HiOutlineUser, HiUser } from 'react-icons/hi';
import { HiShoppingCart,HiOutlineShoppingCart } from 'react-icons/hi';
 import { FaHeart } from 'react-icons/fa';    // Filled heart
import { FiHeart } from 'react-icons/fi';   
import { MdLogin } from 'react-icons/md';
import StoreFilter from "../../pages/Store/StoreFilter/StoreFilter";

import './Header.css'
export default function Header({toggleSwitch,screenOverlay,toggleOverlay}){

  
        
        const [searchTerm,setSearchTerm]= useState('')
    
        const[suggestions,setSuggestions]= useState([])
    

    const firebase= useFirebase()

    console.log('username',firebase.currentUser)
    const pagelocation= useLocation();

    const elements = [

        {title:"Cart ", path:'/cart',logo:pagelocation.pathname==='/cart'?<HiShoppingCart id="fd-header-logo"/>: <HiOutlineShoppingCart id="ol-header-logo"  style={{ strokeWidth: '1.5' }}/>},/*'QMicons/cartLogoOl2.png'  */
/*         {title:"Wishlist ", path:'/wishlist',logo:pagelocation.pathname==='/wishlist'?<FaHeart id="fd-header-logo" className="wishlistIcon" />:<FiHeart className="wishlistIcon"  id="ol-header-logo"  style={{ strokeWidth: '1.5' }}/>}, */
        {title:firebase.isLoggedIn?'Name':'Login',path:'/login',logo:firebase.isLoggedIn?<HiOutlineUser  id="ol-header-logo"  style={{ strokeWidth: '1.5' }}/>:pagelocation.pathname==='/login'?<HiUser id="fd-header-logo" />:<MdLogin id="fd-header-logo"  />}/*'QMicons/userIconOl.png'  */
        ] 


    const navElements= [{title:'HOME',path:'/'},{title:'STORE',path:'/store'},{title:'ABOUT',path:'/testing'},{title:'CONTACT',path:'/contact'}]



    


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
  const headerClassChangeThreshold = 500; // You can adjust this value as needed

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
        ? 'transform 0.5s ease-in, background-color 0.6s ease, box-shadow 1s ease' // When hiding (moving up/idle)
        : 'transform 0.7s ease-out,  background-color 0.6s ease, box-shadow 1s ease', // When showing (moving down/active)
      transform: isIdle ? 'translateY(-5.5rem)' : 'translateY(0)',
     
      pointerEvents: isIdle ? 'none' : 'auto'
    }}>


        <div className="header-home">

          <div className="QMSiteLogo">
            
              <div className="logo-Img-div" >
       <img
        src="/HeaderBirdIconWh.png"
     /*    className={`logoImg ${
          location.pathname !== '/' || !isAtTop ? 'fade-in' : 'fade-out'
        }`} */
        className="logoImg"
        alt="White Bird"
      />

  
{/*       <img
        src="/HeaderBirdIconWh.png"
        className={`logoImg ${
          location.pathname === '/' && isAtTop ? 'fade-in' : 'fade-out'
        }`}
        alt="Black Bird"
      /> */}
         
        </div>  

        <div  className="logo-text-title">
          STORKMART

  
        </div>

          </div>


    <div  

     className="page-nav-container">
    
     <div className="page-nav">  
  
    {navElements 
  ? navElements.map(item => (
      <NavLink to={item.path} className={({isActive})=>isActive?'page-nav-item-selected':'page-nav-item'}  key={item.path}>
        {item.title}
      </NavLink>
    ))
  : <div>loading</div>
}
    </div>
     </div> 
    
         <div className='Home-Nav-Container'>
          <span onClick={()=>{toggleSwitch(true),toggleOverlay(true)}} className="searchIcon-div"><Search className="searchIcon"    style={{ strokeWidth: '1.5'}} /></span>
            {elements.map((element,index)=> <NavLink   key={index} className={({isActive})=>isActive?'navlink-selected':'navlink'} to={element.path}><div   id="header-icon">{element.logo}</div>   </NavLink>)}
         </div>

         
        
    </div>

         
    </div>
    
    
    
        
    )
}




 {/*  <Link to={`/store${location.state?location.state:'?page=1'}`} className="backToStore">←</Link> */} 


        
{/*         <div className="header-backArrow"> <Link style={{color:'white'}} to={`/store${location.state?location.state:'?page=1'}`}  >←</Link> </div> */}