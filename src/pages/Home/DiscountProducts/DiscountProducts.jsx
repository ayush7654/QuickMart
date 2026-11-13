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

            
  94: { brand: 'Longines', name: 'Longines Master Collection', thumbnail: 'Home-products-img/MensWatch3.jpg' },

    101: { brand: 'Apple', name: 'AirPods Max Silver', thumbnail: 'AirPodsMax1.jpg' },

    10: { 
      brand: 'Gucci', 
      name: "Gucci Bloom Eau de", 
      thumbnail: 'GucciPerfume3.jpg' 
    },
      174: {  brand: 'Prada',  name: "Prada Women Bag",  thumbnail: 'Home-products-img/BluePrada.jpg' }

       

  };

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const idsToFetch = [94,101,10,174];
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

