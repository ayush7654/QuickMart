import React from 'react'
import './TrendingComponent.css'
export default function TrendingComponent() {
  return (
      <div className="trending-products-div">
              <div  className="home-head-div">
                <div className="home-head-content"> 
                  <div className='home-head'>TRENDS IN FASHION</div>
                </div>  
              </div>
          <div className="trending-products">
            <div id='trending-product-div'> <div id='trending-product'  className="trending-product-1"><span id ='tp-btn' className="tp-1-btn">SUMMER COLLECTION</span></div></div>
            <div id='trending-product-div'><div id='trending-product' className="trending-product-2"><span id ='tp-btn' className="tp-2-btn">WINTER COLLECTION</span></div></div>


          </div>
        </div>
  )
}
