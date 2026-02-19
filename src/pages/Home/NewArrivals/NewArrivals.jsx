import React from 'react'
import { useState, useEffect } from "react";
import ProductCard from '../../../components/ProductCard'
import ScrollButton from '../../../components/ScrollingButton/ScrollingButton'
import HomeProduct from '../HomeProduct/HomeProduct'
import './NewArrivals.css'
import { getProductById } from '../../../api'

export default function NewArrivals() {

 const [homeProducts,setHomeProducts] = useState([])


 useEffect(() => {
    async function fetchAllProducts() {
      try {
        // The IDs you want to fetch
        const idsToFetch = [7, 160, 174, 88]; 
        
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
            title: data.title,
            description :data.description // Adding title so you can see what it is!
          });
        }

       setHomeProducts(loadedProducts);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    fetchAllProducts();
  }, []);


  console.log(homeProducts)

  return (
      <div id='home-product-div' className="newArrivals-home-Products-div">
        
                  <div id='home-product-head'>New Arrivals
                    <span className='view-collection-btn'>View Collection →</span>
                     </div>
                  <div className="home-Products-container" >


                    <HomeProduct
                             
                              
                             id={homeProducts?.[0]?.id}
                              thumbnail='Home-products-img/ChanelPerfume.jpg' 
                              name="Coco Noir Eau De"
                                price={homeProducts?.[0]?.price}
                              brand='Chanel'
                               images={homeProducts?.[0]?.images}
                              path={location.search}
                              description={homeProducts?.[0]?.description}

                       />

                     
                              <HomeProduct
                                                            
                               
                               id={homeProducts?.[1]?.id}
                                thumbnail='Home-products-img/Tablet.jpg' 
                                name="Samsung Galaxy Tab"
                                 price={homeProducts?.[1]?.price}
                                path={location.search}
                               description={homeProducts?.[1]?.description}
                                 images={homeProducts?.[1]?.images}
                                brand='Samsung'
                                                      />

                        <HomeProduct
                             
                              
                            id={homeProducts?.[2]?.id}
                              thumbnail='Home-products-img/BluePradaBag.jpg' 
                              name="Prada Women Bag" 
                               price={homeProducts?.[2]?.price}
                              brand='Prada'
                              images={homeProducts?.[2]?.images}
                              path={location.search}
                              description={homeProducts?.[2]?.description}
                       />

                       

                         <HomeProduct
                                                  
                        
                          id={homeProducts?.[3]?.id}
                         thumbnail= 'Home-products-img/AirJordan.jpg'
                           images={homeProducts?.[3]?.images}
                         name="Nike Air Jordan 1"
                          price={homeProducts?.[3]?.price}
                         path={location.search}
                         description={homeProducts?.[3]?.description}
                                                
                          brand='Nike'
                                                   />

             

                
                
             
    
                 </div>
          

    
                 </div>
  )
}
