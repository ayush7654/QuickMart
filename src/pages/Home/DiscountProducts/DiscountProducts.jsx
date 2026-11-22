import React from 'react'
import { useState, useEffect } from "react";
import './DiscountProduct.css'
import ProductCard from '../../../components/ProductCard'
import { slideUpVariants } from '../../../components/AnimationVariants';
import HomeProduct from '../HomeProduct/HomeProduct'
import { getProductById } from '../../../api'
import { motion } from 'framer-motion';
import CoverflowCarousel from '../../../components/CoverflowCarousel/CoverflowCarousel';
export default function DiscountProducts() {
  const [homeProducts, setHomeProducts] = useState([]);

  // 1. Define your hardcoded overrides
  const productOverrides = {

      173: {  brand: 'Prada',  name: "Heshe Women's Leather Bag",  thumbnail: 'BrownBag.jpg' },
  96: { brand: 'Rolex', name: 'Rolex Cellini Moonphase', thumbnail: 'MenWatch6.jpg' },

  
    101: { brand: 'Apple', name: 'AirPods Max Silver', thumbnail: 'AirPodMax5.jpg' },



    7: { 
      brand: 'Chanel', 
      name: "Chanel Coco Noir Eau De", 
      thumbnail: 'perfume.jpg' 
    },
       

  };

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const idsToFetch = [173,96,101,7];
        const loadedProducts = [];
        
        for (const id of idsToFetch) {
          const data = await getProductById(id);
          // 2. Merge dynamic data with your hardcoded data
          loadedProducts.push({
            ...data, // Keep original data
            ...productOverrides[id], // Override specific fields
            discount: data.discountPercentage.toFixed(0)
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
    <div  className='home-product-div'>


            <div  id='home-head-wrapper'>
   Absolute Steals
   <span id='home-head-tagline'>Big savings. Unbelievable prices.</span>
    </div>
      
      <div key={homeProducts.length} className="home-Products-container">
     {/*    <CoverflowCarousel homeProducts={homeProducts && homeProducts}/> */}
     <div className="home-products-wrapper">
       {homeProducts.map((item,index)=>
     <HomeProduct product={item}/>)}
     </div>
      </div>
    </div>
  );
}

