import React from "react";
import { useLocation } from "react-router-dom";
export default function Home(){

const location = useLocation()
console.log(location)
   
    return(<>
    <div className="Home">
        <div>
            <div className="homeBGImg"></div>
            <div className="homeContent">
            <div className="Home-text">
         
          <h3>SUMMER SALE | UP TO 50% OFF</h3>
         <h1> 2024 Summer Collection</h1> 
        </div>
  
            </div>
        </div>
        
    </div>
    
    
    
    </>
        
    )
}