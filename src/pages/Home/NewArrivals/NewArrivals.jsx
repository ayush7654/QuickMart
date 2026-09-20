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
     174: {  brand: 'Prada',  name: "Prada Women Bag",  thumbnail: 'Home-products-img/BluePrada.jpg' },

   
   
     87: { brand: 'Urban Chic', name: 'Urban Chic Check Shirt', thumbnail: 'Home-products-img/checked-shirt.jpg' },
      
     88: { brand: 'Nike', name: 'Nike Air Jordan 1', thumbnail: 'Home-products-img/AirJordan1.jpg' },
     101: { brand: 'Apple', name: 'AirPods Max Silver', thumbnail: 'Home-products-img/AirPodMax.jpg' },
     36:{ brand: 'Groceries', name: 'Protein Powder', thumbnail: 'Home-products-img/WheyPro.jpg' }
     /* whey protien , id :36 */
   
  };

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const idsToFetch = [174, 87, 88, 101,36];
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
    <div className='home-product-div' id="newArrivals-home-Products-div">
      <div id='home-product-head'>
        New Arrivals
   <span id='home-product-tagline'>Check out what's latest. </span>
     <div>
                <div className="head-dot-wrapper">
      <span className="head-dot red"></span>
      <span className="head-dot blue" ></span>
      <span className="head-dot green"></span>
    
    </div>
     </div>
      </div>

    <div key={homeProducts.length}  className="home-Products-container">
      
<CoverflowCarousel homeProducts={homeProducts && homeProducts}/>

      </div>
    </div>
  );
}