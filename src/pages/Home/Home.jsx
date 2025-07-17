import {useRef} from "react";
import { useLocation, Link } from "react-router-dom";
import ImgCrousel from "./ImgCrousel/ImgCrousel";
import BrandCarousel from "./BrandComponent/BrandComponent";
import ExploreCategories from "./ExploreCategories/ExploreCategories"; 
import DiscountProducts from "./DiscountProducts/DiscountProducts";
import CountdownProducts from "./CountdownProducts/CountdownProducts";
import TrendingComponent from "./TrendingComponent/TrendingComponent";
import BentoComponent from "./BentoComponent/BentoComponent";
import HomeFooter from "./HomeFooter/HomeFooter";

import './Home.css';


export default function Home(){

const location = useLocation()

const isFirstRender = useRef(true); // track initial mount


    return(<>
    
  <div className="Home">
 
      <ImgCrousel/>
      <BrandCarousel/>
       <CountdownProducts/>
      <ExploreCategories/>
    
      <TrendingComponent />
    
         <DiscountProducts/>
      <BentoComponent/>
      <HomeFooter/>
   
  </div>
    
 
    
    </>
        
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