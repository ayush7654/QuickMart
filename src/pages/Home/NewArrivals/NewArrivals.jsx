import React, { useState, useEffect } from 'react';
import HomeProduct from '../HomeProduct/HomeProduct';
import './NewArrivals.css';
import { getProductById } from '../../../api';

export default function NewArrivals() {
  const [homeProducts, setHomeProducts] = useState([]);

  // 1. Define your overrides for these specific IDs
  const arrivalOverrides = {
    7: { 
      brand: 'Chanel', 
      name: "Coco Noir Eau De", 
      thumbnail: 'Home-products-img/hp-chanel.jpg' 
    },
    100: { 
      brand: 'Apple', 
      name: "Apple Airpods", 
      thumbnail: 'Home-products-img/hp-airpod.jpg' 
    },
    13: { 
      brand: 'Annibale', 
      name: "Annibale Colombo Sofa", 
      thumbnail: "Home-products-img/hp-table.jpg" 
    },
      88: { brand: 'Nike', name: 'Nike Air Jordan 1', thumbnail: 'Home-products-img/hp-AJ1.jpg' }
   
  };

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const idsToFetch = [7, 100, 13, 88];
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
    <div id='home-product-div' className="newArrivals-home-Products-div">
      <div id='home-product-head'>
        New Arrivals
        <span className='view-collection-btn'>View Collection →</span>
      </div>

      <div className="home-Products-container">
        {/* 3. Map through the products cleanly */}
        {homeProducts.map((product) => (
          <HomeProduct
     key={product.id}
    product={product} // Passing the whole object
    path={window.location.search}
          />
        ))}
      </div>
    </div>
  );
}