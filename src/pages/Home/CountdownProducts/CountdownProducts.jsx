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
                      key={80}
                      id={80}
                      images= {["https://i.imgur.com/R2PN9Wq.jpeg"]}
        
                      title="Classic Grey Hooded Sweatshirt"
                      price={40}
                      path={location.search}
                      discount={15}
                    />
                     <ProductCard
                      classname='home-product'
                      key={155}
                      id={155}
                      images= {["https://i.imgur.com/keVCVIa.jpeg"]}
        
                      title="Efficient 2-Slice Toaster"
                      price={89.99}
                      path={location.search}
                      discount={35}
                    />
                     <ProductCard
                                  classname='home-product'
                                  key={98}
                                  id={98}
                                  images= {['https://i.imgur.com/YaSqa06.jpeg']}
                    
                                  title="Red & Silver Over-Ear Headphones"
                                  price={34.99}
                                  path={location.search}
                                     discount={40}
                                />
         
                   
              
                     
   
         </div>
         </div>
  )
}
