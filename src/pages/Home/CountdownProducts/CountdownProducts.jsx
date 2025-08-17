import React from 'react'
import './CountdownProducts.css'
import ProductCard from '../../../components/ProductCard'
export default function CountdownProducts() {
  return (
      <div id='home-product-div' className="Countdown-home-Products-div">
       <div className='home-Products-window'></div>
         <div  className="home-head-div">
                <div className="home-head-content">
                     
                  <div className='home-head'>Cowntdown Deals.</div>
                 
                  
               
                </div>
              <div className='home-head-frame'></div>
              </div>
          <div className="home-Products-container" >
                 <ProductCard
                              classname='home-product'
                              key={94}
                              id={94}
                              images= {['https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp']}
                
                              title="Longines Master Collection"
                              price={1499.99}
                              path={location.search}
                                  
                            />
       

           
         
           <ProductCard
              classname='home-product'
              key={160}
              id={160}
              images= {['https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/1.webp']}

              title="Samsung Galaxy Tab S8 Plus Grey"
              price={599.99}
              path={location.search}
            />
                           <ProductCard
                  classname='home-product'
                  key={88}
                  id={88}
                  images= {['https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp']}
    
                  title="Nike Air Jordan 1 Red And Black"
                  price={149.99}
                  path={location.search}
                   
                />
     {/*       <ProductCard
              classname='home-product'
              key={165}
              id={165}
              images= {['https://cdn.dummyjson.com/product-images/tops/short-frock/1.webp']}

              title="Short Frock"
              price={24.99}
              path={location.search}
            /> */}
         </div>
         </div>
  )
}
