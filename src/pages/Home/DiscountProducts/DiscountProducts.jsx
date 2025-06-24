import React from 'react'
import './DiscountProduct.css'
import ProductCard from '../../../components/ProductCard'
export default function DiscountProducts() {
  return (
      <div className="discount-home-Products-div">
              <div className="home-Products-heading-div" ><div className='home-Products-heading'>Absolute Steals -<span className="Products-tagline"> &nbsp; Offers Upto 50% Off</span></div></div>
              <div className="home-Products-container" >
             <ProductCard
                  classname='home-product'
                  key={79}
                  id={79}
                  images= {["https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/1.png"]}
    
                  title="Asus Zenbook Pro Dual Screen Laptop"
                  price={1799.99}
                  path={location.search}
                  discount={15}
                />
    
               
               <ProductCard
                  classname='home-product'
                  key={94}
                  id={94}
                  images= {['https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp']}
    
                  title="Longines Master Collection"
                  price={1499.99}
                  path={location.search}
                      discount={35}
                />
               <ProductCard
                  classname='home-product'
                  key={101}
                  id={101}
                  images= {['https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Max%20Silver/1.png']}
    
                  title="Apple AirPods Max Silver"
                  price={549.99}
                  path={location.search}
                      discount={45}
                />
               <ProductCard
                  classname='home-product'
                  key={88}
                  id={88}
                  images= {['https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp']}
    
                  title="Nike Air Jordan 1 Red And Black"
                  price={149.99}
                  path={location.search}
                      discount={25}
                />
             </div>
             </div>
  )
}
