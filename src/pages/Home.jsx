import React from "react";
import { useLocation, Link } from "react-router-dom";
export default function Home(){

const location = useLocation()
console.log(location)
   
    return(<>
    <div className="Home">
        <div style={{height:'88vh',border:'0px solid red',display:'flex',alignItems:'center'}}>
            
            <div className="homeContent">
                <div className="Home-text0">
                    <div style={{textShadow:"0 0 30px #00DEFF, 0 0 20px #00DEFF, 0 0 20px #00DEFF"}}>Built</div>
                    <div style={{textShadow:"0 0 30px #5500FF, 0 0 30px #5500FF, 0 0 30px #5500FF"}}>for</div>
                    <div>
                        <span style={{textShadow:"0 0 20px #C65AE6, 0 0 20px #C65AE6, 0 0 20px #C65AE6"}}>Ap</span>
                        <span style={{textShadow:"0 0 20px #E65AE2, 0 0 20px #E65AE2, 0 0 20px #E65AE2"}}>ple</span>
                    </div>
                    <div>
                        <span style={{textShadow:"0 0 20px #FF3399, 0 0 20px #FF3399, 0 0 20px #FF3399"}}>Inte</span>
                        <span style={{textShadow:"0 0 20px #EE4B6C, 0 0 20px #EE4B6C, 0 0 20px #EE4B6C"}}>llige</span>
                        <span style={{textShadow:"0 0 20px #EED950, 0 0 20px #EED950, 0 0 20px #EED950"}}>nce</span>
                    </div>
                    </div>
            <div className="Home-text1">iPhone 16  </div> 
                 <div className="home-Img">
                    <img src={"/Iphone.png"} width="700px"/>
                </div> 
                <div className="Home-text2">Coming Soon</div>

           
  
            </div>
        </div>


        <div className="Home-bottom" >
            <div className="Home-bottom-content">
                <div  className="Home-category-box">
                    
                    <div className="left-box">
                    <div className=".left-box1">
                        <Link to='/store?type=skin-care'>
                        <div className="left-box1-a">
                            <div className="left-box1-a-content"><div  style={{position:'absolute', bottom:'20px',left:'10px',fontSize:'30px',color:'white', fontWeight:600 }}>Skincare</div></div>
                        </div></Link>
                        <Link to='/store?type=groceries'>
                        <div className="left-box1-b">
                            <div className="left-box1-b-content"><div  style={{position:'absolute', bottom:'20px',left:'10px',fontSize:'30px',color:'white', fontWeight:600 }}>Essentials</div></div>
                        </div>
                        </Link>
                       
                    </div>
                    <Link to='/store?type=mens-shoes'>
                    <div className="left-box2">
                        <div className="left-box2-content" ><div style={{position:'absolute', bottom:'20px',left:'10px',fontSize:'30px',color:'white', fontWeight:600 }}>Footwear</div></div>
                    </div>
                    </Link>

                    </div>
                    
                    
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