import React from 'react'
import './AppleComponent.css'
import ProductCard from '../../../components/ProductCard'
export default function CountdownProducts() {
  return (
      <div id='home-product-div' className="Apple-container">

    {/*      <div  className="home-head-div">
                <div className="home-head-content"> 
                  <div className='home-head'>Cowntdown Deals.</div>
                </div>  
              </div> */}

                <div className="Apple-bento-container">
  <div className="box box1"> <img src='AppleMacBookPro.jpg'/></div>
  <div className="box box2">
    <span className="apple-logo"></span> Experiences only Apple can deliver. </div>
  <div className="box box3"> <img src='AirPodsMax4.webp'/> </div>
  <div className="box box4"> <img src='AppleWatch6.jpg'/></div>
  <div className="box box5"><img src='AppleAirPod.webp'/></div>


</div>
         
         </div>
  )
}

