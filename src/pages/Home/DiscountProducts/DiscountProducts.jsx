import React from 'react'
import { useState, useEffect } from "react";
import './DiscountProduct.css'
import ProductCard from '../../../components/ProductCard'
import { slideUpVariants } from '../../../components/AnimationVariants';
import HomeProduct from '../HomeProduct/HomeProduct'
import { getProductById } from '../../../api'
import { motion } from 'framer-motion';

export default function DiscountProducts() {
  const [homeProducts, setHomeProducts] = useState([]);

  // 1. Define your hardcoded overrides
  const productOverrides = {
    94: { brand: 'Longines', name: 'Longines Master Collection', thumbnail: 'hp-watch.jpg' },
    13: { 
      brand: 'Annibale', 
      name: "African Cherry Table", 
      thumbnail: "Home-products-img/hp-table.jpg" 
    },
   174: {  brand: 'Prada',  name: "Prada Women Bag",  thumbnail: 'Home-products-img/blue-prada.jpg' },
    101: { brand: 'Apple', name: 'AirPods Max Silver', thumbnail: 'Home-products-img/hp-airmax.jpg' }
  };

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const idsToFetch = [94, 13, 174, 101];
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
    <div  id='home-product-div' className="discount-home-Products-div">
      <div id='home-product-head'>
        Absolute Steals
        <span className='view-collection-btn'>View Collection →</span>
      </div>
      
      <div className="home-Products-container">
        {/* 3. Map directly over the merged array */}
        {homeProducts.map((product,index) => (
           <motion.div
            key={product.id}
          variants={slideUpVariants}
           custom={index * 0.1} // Car
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <HomeProduct
              product={product}
              path={window.location.search}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

