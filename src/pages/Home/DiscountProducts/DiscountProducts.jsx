import React from 'react'
import { useState, useEffect } from "react";
import './DiscountProduct.css'
import ProductCard from '../../../components/ProductCard'
import HomeProduct from '../HomeProduct/HomeProduct'
import { getProductById } from '../../../api'
export default function DiscountProducts() {



  const [homeProducts,setHomeProducts] = useState([])
  
  
   useEffect(() => {
      async function fetchAllProducts() {
        try {
          // The IDs you want to fetch
          const idsToFetch = [94,12, 87, 101]; 
          
          // Fetch them one-by-one and format the objects
          const loadedProducts = [];
          for (const id of idsToFetch) {
            const data = await getProductById(id);
            
            // Push only the specific properties you want
            loadedProducts.push({
              id: data.id,
              image: data.images, // Taking the first image
              discount: data.discountPercentage,
              price: data.price,
              title: data.title ,
              description :data.description// Adding title so you can see what it is!
            });
          }
  
         setHomeProducts(loadedProducts);
        } catch (err) {
          console.error("Fetch error:", err);
        }
      }
  
      fetchAllProducts();
    }, []);

  return (
      <div id='home-product-div' className="discount-home-Products-div">

                     <div id='home-product-head'>Absolute Steals
                       <span className='view-collection-btn'>View Collection →</span>
                     </div>
              <div className="home-Products-container" >

        
                          <HomeProduct
                                                    
                        
                          id={homeProducts?.[0]?.id}
                          thumbnail='Home-products-img/SilverWatch.webp' 
                          name="Longines Master Collection"
                          price={homeProducts?.[0]?.price}
                          brand='Longines'
                          path={location.search}
                          discount={homeProducts?.[0]?.discount.toFixed(0)}
                          images={homeProducts?.[0]?.images}
                          description={homeProducts?.[0]?.description}
                                              />

           
                      <HomeProduct
                 
               
                   id={homeProducts?.[1]?.id}
                  thumbnail= "Home-products-img/WhiteSofa.jpg" 
    
                  name="Annibale Colombo Sofa"
                   price={homeProducts?.[1]?.price}
                  path={location.search}
                  discount={14.4.toFixed(0)}
                  images={homeProducts?.[1]?.images}
                    brand='Annibale'
                    description={homeProducts?.[1]?.description}
                />
                

                    <HomeProduct
                           
                              
                               id={homeProducts?.[2]?.id}
                              thumbnail= 'Home-products-img/shirt.png'
                
                              name="Urban Chic Check Shirt"
                               price={homeProducts?.[2]?.price}
                              path={location.search}
                               discount={homeProducts?.[2]?.discount.toFixed(0)}
                                 images={homeProducts?.[2]?.images}
                                   brand='Urban Chic'
                                   description={homeProducts?.[2]?.description}
                            />

               
          
                  <HomeProduct
                                             
                     
                       id={homeProducts?.[3]?.id}
                      thumbnail='Home-products-img/AirPod3.jpg' 
                      name="AirPods Max Silver"
                      price={homeProducts?.[3]?.price}
                      brand='Apple'
                      path={location.search}
                      discount={13.67.toFixed(0)}
                      images={homeProducts?.[2]?.images}
                      description={homeProducts?.[3]?.description}
                                       />
         

             </div>
             </div>
  )
}
