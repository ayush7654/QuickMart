import React from "react";
import { useLocation, Link } from "react-router-dom";
export default function Home(){

const location = useLocation()
console.log(location)
   
    return(<>
    <div className="Home">
        <div style={{height:'95vh',border:'0px solid red',display:'flex',alignItems:'center'}}>
            <div className="homeBGImg"></div>
            <div className="homeContent">
            <div className="Home-text">
         
          <h3>SUMMER SALE | UP TO 30% OFF</h3>
         <h1> 2024 Summer Collection</h1> 
        </div>
  
            </div>
        </div>


        <div className="Home-bottom" style={{color:'red', marginTop:''}}>
            <div className="Home-bottom-content">
                <div  className="Home-category-box">
                 <div style={{display:'flex'}} className="Home-category-boxes">
                    <Link to='/store?type=furniture'><div className="box1">
                        <div className="box1-content" ><div style={{position:'absolute', bottom:'20px',left:'20px',fontSize:'30px',color:'white', fontWeight:600 }}>Live Comfortably</div></div>
                    </div>
                    </Link>
                    
                    <Link to='/store?type=womens-dresses'>
                    <div className="box2">
                        <div className="box2-content" ><div style={{position:'absolute', bottom:'20px',left:'10px',fontSize:'30px',color:'white', fontWeight:600 }}>Fashion</div></div>
                    </div>
                    </Link>
                   
                    <div className="box3">
                        <Link to='/store?type=sports-accessories'>
                        <div className="box4">
                            <div className="box4-content"><div  style={{position:'absolute', bottom:'20px',left:'10px',fontSize:'30px',color:'white', fontWeight:600 }}>Sports</div></div>
                        </div></Link>
                        <Link to='/store?type=laptops'>
                        <div className="box5">
                            <div className="box5-content"><div  style={{position:'absolute', bottom:'20px',left:'10px',fontSize:'30px',color:'white', fontWeight:600 }}>Electronics</div></div>
                        </div>
                        </Link>
                       
                    </div>
                 </div>
                </div>
            </div>
        </div>
        
    </div>
    
    
    
    </>
        
    )
}