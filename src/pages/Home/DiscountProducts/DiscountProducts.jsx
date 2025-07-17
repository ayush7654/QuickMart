import React from 'react'
import './DiscountProduct.css'
import ProductCard from '../../../components/ProductCard'
export default function DiscountProducts() {
  return (
      <div className="discount-home-Products-div">
        <div className='home-Products-window'></div>
       
              <div className="discount-products-head-div">
                <div className="discount-products-head-content">
                  <div className='discount-products-head'>Absolute Steals.</div>
                  
                  <div className='explore-tagline'>Offers Upto 50% Off </div>
                </div>
              <div className='explore-category-frame'></div>
              </div>
              <div className="home-Products-container" >
             <ProductCard
                  classname='home-product'
                  key={80}
                  id={80}
                  images= {["https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/1.webp"]}
    
                  title="Huawei Matebook X Pro"
                  price={1399.99}
                  path={location.search}
                  discount={15}
                />
      <ProductCard
                  classname='home-product'
                  key={155}
                  id={155}
                  images= {["https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/1.webp"]}
    
                  title="Classic Sun Glasses"
                  price={24.99}
                  path={location.search}
                  discount={35}
                />
               
          
                  <ProductCard
                              classname='home-product'
                              key={98}
                              id={98}
                              images= {['https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/1.webp']}
                
                              title="Decoration Swing"
                              price={59.99}
                              path={location.search}
                                 discount={40}
                            />
           {/*     <ProductCard
                  classname='home-product'
                  key={101}
                  id={101}
                  images= {['https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Max%20Silver/1.png']}
    
                  title="Apple AirPods Max Silver"
                  price={549.99}
                  path={location.search}
                      discount={45}
                /> */}

             </div>
             </div>
  )
}
