import React from "react";
import { useLocation, Link } from "react-router-dom";
import './Home.css';
export default function Home(){

const location = useLocation()
console.log(location)
   
    return(<>
    <div className="Home">
        <div className="homeContent-Container">
            
            <div className="homeContent">
                <div className="Home-upper"></div>
          
            </div>
        </div>


        <div className="Home-bottom" >
            <div className="Home-bottom-content">
                <div  className="Home-category-box">
                    
                    <div className="left-box">
                    <div className=".left-box1">
                        <Link to='/store?type=skin-care'>
                        <div className="left-box1-a">
                            <div className="left-box1-a-content"><div className="left-box1-a-content-name" id="home-category-name" >Skincare</div></div>
                        </div></Link>
                        <Link to='/store?type=groceries'>
                        <div className="left-box1-b">
                            <div className="left-box1-b-content"><div className="left-box1-b-content-name" id="home-category-name">Essentials</div></div>
                        </div>
                        </Link>
                       
                    </div>
                    <Link to='/store?type=mens-shoes'>
                    <div className="left-box2">
                        <div className="left-box2-content" ><div className="left-box2-content-name" id="home-category-name" >Footwear</div></div>
                    </div>
                    </Link>

                    </div>
                    
                    
                 <div  className="Home-category-boxes">
                    <Link to='/store?type=furniture'><div className="box1">
                        <div className="box1-content" ><div className="box1-content-name" id="home-category-name" >Live Comfortably</div></div>
                    </div>
                    </Link>
                    <div className="box2-conatiner">
                    <Link to='/store?type=womens-dresses'>
                    <div className="box2">
                        <div className="box2-content" ><div className="box2-content-name" id="home-category-name">Fashion</div></div>
                    </div>
                    </Link>
                   
                    <div className="box3">
                        <Link to='/store?type=sports-accessories'>
                        <div className="box4">
                            <div className="box4-content"><div className="box4-content-name" id="home-category-name">Sports</div></div>
                        </div></Link>
                        <Link to='/store?type=mobile-accessories'>
                        <div className="box5">
                            <div className="box5-content"><div className="box5-content-name" id="home-category-name">Electronics</div></div>
                        </div>
                        </Link>
                       
                    </div>
                    </div>
                
                 </div>
            
                </div>
            </div>
        </div>
        
    </div>
    
    
    
    </>
        
    )
}