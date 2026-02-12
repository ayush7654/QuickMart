import React from 'react'
import './DiscountProduct.css'
import ProductCard from '../../../components/ProductCard'
import HomeProduct from '../HomeProduct/HomeProduct'
export default function DiscountProducts() {
  return (
      <div id='home-product-div' className="discount-home-Products-div">

                     <div className='home-heading'>Absolute Steals
                       <span className='view-collection-btn'>View Collection</span>
                     </div>
              <div className="home-Products-container" >

        
                                 <HomeProduct
                                     
                                      key={80}
                  id={80}
                                      thumbnail='Home-products-img/Tablet.jpg' /* https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp */
                                      name="Samsung Galaxy Tab"
                                      price={1399.99}
                                      path={location.search}
                                      discount={15}
                                      brand='Samsung'
                               />

           
                      <HomeProduct
                 
                  key={155}
                  id={155}
                  thumbnail= "Home-products-img/WhiteSofa.jpg" 
    
                  name="Annibale Colombo Sofa"
                  price={2499.99}
                  path={location.search}
                  discount={35}
                    brand='Annibale'
                />
                  <HomeProduct
                           
                              key={98}
                              id={98}
                              thumbnail= 'Home-products-img/AirJordan.jpg'
                
                              name="Decoration Swing"
                              price={59.99}
                              path={location.search}
                                 discount={40}
                                   brand='Nike'
                            />

                    <HomeProduct
                           
                              key={98}
                              id={98}
                              thumbnail= 'Home-products-img/shirt.png'
                
                              name="Urban Chic Check Shirt"
                              price={59.99}
                              path={location.search}
                                 discount={40}
                                   brand='Urban Chic'
                            />

               
          
                
         

             </div>
             </div>
  )
}
