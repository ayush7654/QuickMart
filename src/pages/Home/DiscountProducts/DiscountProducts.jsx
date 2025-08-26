import React from 'react'
import './DiscountProduct.css'
import ProductCard from '../../../components/ProductCard'
export default function DiscountProducts() {
  return (
      <div id='home-product-div' className="discount-home-Products-div">
        <div className='home-Products-window'></div>
       
              <div  className="home-head-div">
                <div className="home-head-content">
                  <div className='home-head'>Absolute Steals.</div>
                  
                  <div className='home-head-tagline'>Offers upto 50% off.</div>
                </div>
              <div className='home-head-frame'></div>
              </div>
              <div className="home-Products-container" >
             <ProductCard
                  classname='home-product'
                  key={80}
                  id={80}
                  images= {["https://i.imgur.com/mp3rUty.jpeg"]} /* https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/1.webp */
    
                  title="Huawei Matebook X Pro"
                  price={1399.99}
                  path={location.search}
                  discount={15}
                />
                      <ProductCard
                  classname='home-product'
                  key={155}
                  id={155}
                  images= {["https://i.imgur.com/0qQBkxX.jpg"]} /* https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/1.webp */
    
                  title="Classic Sun Glasses"
                  price={24.99}
                  path={location.search}
                  discount={35}
                />
                  <ProductCard
                              classname='home-product'
                              key={98}
                              id={98}
                              images= {['https://i.imgur.com/R3iobJA.jpeg']} /* https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/1.webp */
                
                              title="Decoration Swing"
                              price={59.99}
                              path={location.search}
                                 discount={40}
                            />

               
          
                
         

             </div>
             </div>
  )
}
