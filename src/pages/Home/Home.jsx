import {useRef} from "react";
import { useLocation, Link } from "react-router-dom";
import ImgCarousel from "./ImgCarousel/ImgCarousel";
import BrandCarousel from "./BrandComponent/BrandComponent";
import Collections from "./Collections/Collections";
import DiscountProducts from "./DiscountProducts/DiscountProducts";


import NewArrivals from "./NewArrivals/NewArrivals";
import TrendingComponent from "./TrendingComponent/TrendingComponent";



import HomeFooter from "./HomeFooter/HomeFooter";

import StackingEffect from "./Collections/StackingEffect/StackingEffect";
import ScrollingAnimation from "./ScrollingAnimation/ScrollingAnimation";
import { useStoreData } from "../../components/StoreDataContext";
import './Home.css';
import AppleScalingWindow from "./AppleScalingWindow/AppleScalingWindow";
import { Check } from 'lucide-react';
import BrandsSection from "../../components/BrandsSection/BrandsSection";
import ExploreCollection from "../../components/ExploreCollection/ExploreCollection";




export default function Home(){

const location = useLocation()

const isFirstRender = useRef(true); // track initial mount

const {isAtTop} = useStoreData();

    return(
    
  <div className="Home">
 

   <div className="scrolling-animation-wrapper"  data-header-theme="white"   >
         
 <ScrollingAnimation isAtTop={isAtTop}  /> 
 
</div>  
      <div className="Home-scroll-content"  >
       
               <NewArrivals />

  
             <DiscountProducts/>
     
        <Collections /> 
          <TrendingComponent />
         <AppleScalingWindow/>
         
              <ExploreCollection/>
               <BrandsSection/>
  

   
       


    
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