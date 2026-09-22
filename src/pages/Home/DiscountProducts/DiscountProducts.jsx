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

            
     100: { 
      brand: 'Apple', 
      name: "Apple Airpods", 
      thumbnail: 'Home-products-img/hp-airpod.jpg' 
    }
    ,    94: { brand: 'Longines', name: 'Longines Master Collection', thumbnail: 'Home-products-img/hp-watch.jpg' }
  ,

         152: { 
      brand: 'Sports Accessory', 
      name: "Tennis Racket", 
      thumbnail: 'Home-products-img/TennisRacket.jpg' 
    },
       174: {  brand: 'Prada',  name: "Prada Women Bag",  thumbnail: 'Home-products-img/BluePrada.jpg' },
      7: { 
      brand: 'Chanel', 
      name: "Coco Noir Eau De", 
      thumbnail: 'Home-products-img/hp-chanel.jpg' 
    }

  };

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const idsToFetch = [100,94,152,174,7];
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
      <div id='home-product-head'>
            
        <span>Absolute Steals</span>
         <span id='home-product-tagline'>Big savings. Unbelievable prices.</span>
         <div className="head-dot-wrapper">
      <span className="head-dot red"></span>
      <span className="head-dot blue" ></span>
      <span className="head-dot green"></span>
    
    </div>
      </div>
      
      <div key={homeProducts.length} className="home-Products-container">
        <CoverflowCarousel homeProducts={homeProducts && homeProducts}/>
      </div>
    </div>
  );
}

