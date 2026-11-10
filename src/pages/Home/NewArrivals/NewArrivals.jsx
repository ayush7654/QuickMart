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
 
     87: { brand: 'Urban Chic', name: 'Urban Chic Check Shirt', thumbnail: 'Home-products-img/Green-shirt.jpg' },
              80: { 
      brand: 'Huawei', 
      name: "Huawei Matebook X Pro", 
      thumbnail: 'Home-products-img/laptop.jpg' 
    },
     88: { brand: 'Nike', name: 'Nike Air Jordan 1', thumbnail: 'Home-products-img/AirJordan3.jpg' },

     36:{ brand: 'Groceries', name: 'Protein Powder', thumbnail: 'Home-products-img/protienPowder.jpg' }
     /* whey protien , id :36 */
   
  };

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const idsToFetch = [87,80,88,36];
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

    <div key={homeProducts.length}  className="home-Products-container">
      
{/* <CoverflowCarousel homeProducts={homeProducts && homeProducts}/> */}

     <div className="home-products-wrapper">
       {homeProducts.map((item,index)=>
     <HomeProduct product={item}/>)}
     </div>

      </div>
    </div>
  );
}