import React, { useState, useEffect } from 'react';
import HomeProduct from '../HomeProduct/HomeProduct';
import { motion } from 'framer-motion';
import { slideUpVariants } from '../../../components/AnimationVariants';

import './NewArrivals.css';
import { getProductById } from '../../../api';
import CoverflowCarousel from '../../../components/CoverflowCarousel/CoverflowCarousel';

export default function NewArrivals() {
  const [homeProducts, setHomeProducts] = useState([]);

  // 1. Define your overrides for these specific IDs
  const arrivalOverrides = {
              12: { 
      brand: 'Annibale Colombo', 
      name: "Annibale Colombo Sofa", 
      thumbnail: 'whiteSofa2.jpg' 
    },
         86: { brand: 'Casual Comfort', name: 'Man Short Sleeve Shirt', thumbnail: 'BeachShirt3.jpg' },

   
  
 89: { brand: 'Nike', name: 'Nike Baseball Cleats', thumbnail: 'NikeCleats.jpg' },
     66:{ brand: 'Kitchen Accessories', name: 'Microwave Oven', thumbnail: 'microwave.jpg' },
    

   
  };

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const idsToFetch = [12,86,89,66];
        const loadedProducts = [];

        for (const id of idsToFetch) {
          const data = await getProductById(id);
          
          // 2. Merge API data with your hardcoded metadata
          loadedProducts.push({
            ...data,
            ...arrivalOverrides[id] // This applies your local thumbnail/brand/name
          });
        }

        setHomeProducts(loadedProducts);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    fetchAllProducts();
  }, []);

  console.log('product is',homeProducts)

  return (
    <div className='home-product-div'
     id="newArrivals-home-Products-div"
      
        
     
    >
  
      <div id='home-head-wrapper'>
      Fresh Drops
   <span id='home-head-tagline'>Check out what's latest. </span>
     <div>
     
     </div>
      </div>

    <div key={homeProducts.length}  
    className="home-Products-container"

    >
      
{/* <CoverflowCarousel homeProducts={homeProducts && homeProducts}/> */}

     <div className="home-products-wrapper" >
       {homeProducts.map((item,index)=>
     <HomeProduct product={item}/>)}
     </div>

      </div>
    </div>
  );
}