import React from 'react'
import './TrendingComponent.css'
export default function TrendingComponent() {
  return (
      <div className="trending-products-div">
         <div className="trending-products-heading-div" ><div className='trending-products-heading'>TRENDS IN FASHION</div></div>
          <div className="trending-products">
            <div id='trending-product'><div  className="trending-product-1"><span className="tp-1-btn">Winter Collection</span></div></div>
            <div id='trending-product'><div  className="trending-product-2"><span className="tp-2-btn">Summer Collection</span></div></div>


          </div>
        </div>
  )
}
