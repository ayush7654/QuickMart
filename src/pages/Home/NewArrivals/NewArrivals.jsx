import React from 'react'
import ProductCard from '../../../components/ProductCard'
import './NewArrivals.css'


export default function NewArrivals() {
  return (
      <div id='home-product-div' className="newArrivals-home-Products-div">
        
                  <div  className="home-head-div">
                     <div className="home-head-content">
                      <div className='home-head'>NEW ARRIVALS</div>
                      
                    </div> 

                  </div>
                  <div className="home-Products-container" >


                    <ProductCard
                              classname='home-product'
                              key={94}
                              id={94}
                              images= {['Home-products-img/ChanelPerfume.jpg']} /* https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp */
                
                              title="Modern Elegance Teal Armchair"
                              price={149.99}
                              path={location.search}
                       />
                                       <ProductCard
              classname='home-product'
              key={160}
              id={160}
              images= {['Home-products-img/SilverWatch.webp']}  /* https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/1.webp */

              title="Sleek Futuristic Electric Bicycle"
              price={599.99}
              path={location.search}
            />
                           <ProductCard
                  classname='home-product'
                  key={88}
                  id={88}
                  images= {['Home-products-img/BluePradaBag.jpg']}  /* https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp */
    
                  title="Chic Denim Espadrille Sandals"
                  price={39.99}
                  path={location.search}
                   
                />

                
                
             
    
                 </div>
                
                 </div>
  )
}
