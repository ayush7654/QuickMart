import {useRef} from "react";
import { useLocation, Link } from "react-router-dom";
import ImgCarousel from "./ImgCarousel/ImgCarousel";
import BrandCarousel from "./BrandComponent/BrandComponent";
import ExploreCategories from "./ExploreCategories/ExploreCategories"; 
import DiscountProducts from "./DiscountProducts/DiscountProducts";
import AppleComponent from "./AppleComponent/AppleComponent";
import NewArrivals from "./NewArrivals/NewArrivals";
import TrendingComponent from "./TrendingComponent/TrendingComponent";
import FeaturedCategories from "./FeaturedCategories/FeaturedCategories";
import Categories from "./Categories/Categories";
import HomeFooter from "./HomeFooter/HomeFooter";

import './Home.css';


export default function Home(){

const location = useLocation()

const isFirstRender = useRef(true); // track initial mount


    return(
    
  <div className="Home">
 
      <ImgCarousel/>
      <div className="Home-scroll-content">
      
     
             
          
              <NewArrivals/>
                      <AppleComponent/>
             <ExploreCategories/>
         
 
   
    
      <TrendingComponent />
    
         <DiscountProducts/>
{/*       <FeaturedCategories/> */}

<Categories/>

   
     
    <BrandCarousel/>
        
      <HomeFooter/>
            </div>
   
  </div>
    
 
    
   
        
    )
}




 
 /*   useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBGImg(prev => (prev + 1) % homeBGs.length);
    }, 4000);
  
    return () => clearInterval(interval);
  }, []);   */
  

/*   useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // skip transition logic on first render
    }
  
    if (currentBGImg=== 0) {
      setTransition(false);
      requestAnimationFrame(() => setTransition(true));
    }
  }, [currentBGImg]); */