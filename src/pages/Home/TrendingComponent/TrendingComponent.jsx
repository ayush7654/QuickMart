import React from 'react'
import './TrendingComponent.css'
export default function TrendingComponent() {
  return (
      <div className="trending-products-div">
        <div className="home-head-div">
                <div className="home-head-content">
                  <div className='home-head'>TRENDS IN FASHION.</div>
                  
                  <div className='home-head-tagline'>Style That Speaks Today.</div>
                </div>
              <div className='home-head-frame'></div>
              </div>
          <div className="trending-products">
            <div id='trending-product'><div  className="trending-product-1"><span id ='tp-btn' className="tp-1-btn">Winter Collection</span></div></div>
            <div id='trending-product'><div  className="trending-product-2"><span id ='tp-btn' className="tp-2-btn">Summer Collection</span></div></div>


          </div>
        </div>
  )
}
