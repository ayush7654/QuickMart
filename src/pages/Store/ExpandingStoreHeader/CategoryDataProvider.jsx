import { useState, useEffect } from 'react';

const SUBGROUP_MAPPING = {
  "Clothing & Apparel": [
      { slug: "womens-dresses", img: "women-dresses.jpg" },
    { slug: "mens-shirts", img: "mens-shirt.jpg" },

    { slug: "tops", img: "women-top.jpg" },
    { slug: "mens-shoes", img: "men-shoes2.jpg" },
    { slug: "womens-shoes", img: "women-shoes.jpg" }
  ],
  "Accessories & Jewelry": [
    { slug: "mens-watches", img: "men-watch3.jpg" },
     { slug: "sunglasses", img: "sunglasses2.jpg" },
    { slug: "womens-watches", img: "women-watch4.jpg" },
    { slug: "womens-jewellery", img: "women-jewellery3.jpg" },
    { slug: "womens-bags", img: "women-bags2.jpg" },
   
    
  ],
  "Electronics & Tech": [
    { slug: "laptops", img: "laptops2.jpg" },
    { slug: "mobile-accessories", img: "moblie-accessories5.jpg" },
    { slug: "smartphones", img: "smartphones3.jpg" },
    { slug: "tablets", img: "tablets3.avif" }
  ],
  "Beauty & Wellness": [
     { slug: "fragrances", img: "fragrance.jpg" },
    { slug: "beauty", img: "beauty.jpg" },
    { slug: "skin-care", img: "skincare.jpg" }
  ],
  "Home & Living": [
      { slug: "home-decoration", img: "home-decoration.jpg" },
    { slug: "furniture", img: "furniture.jpg" },
  
    { slug: "kitchen-accessories", img: "kitchen-accessories2.jpg" }
  ],
  "Automotive & Outdoors": [
       { slug: "sports-accessories", img: "sports.jpg" },
    { slug: "motorcycle", img: "motocycle3.jpg" },
    { slug: "vehicle", img: "car.jpg" }
 
  ],
  "Daily Essentials": [
    { slug: "groceries", img: "essentials2.jpg" }
  ]
};

const CategoryDataProvider = () => {
  const [categorizedData, setCategorizedData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrganizedCategories = async () => {
      // 1. Check Cache first to prevent inconsistent CORS/Network errors on refresh
      const cached = sessionStorage.getItem('app_categories');
      if (cached) {
        setCategorizedData(JSON.parse(cached));
        setLoading(false);
        return;
      }

      try {
        // 2. Primary Fetch
        let response = await fetch("https://dummyjson.com/products/categories");
        
        // 3. Simple Proxy Fallback if the first attempt hits a CORS wall
        if (!response.ok) {
          response = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://dummyjson.com/products/categories"));
          const proxyData = await response.json();
          var rawData = JSON.parse(proxyData.contents);
        } else {
          var rawData = await response.json();
        }

        const organized = Object.keys(SUBGROUP_MAPPING).reduce((acc, groupName) => {
          const mappingItems = SUBGROUP_MAPPING[groupName];
          
          acc[groupName] = mappingItems.map(mappingItem => {
            const apiData = rawData.find(cat => cat.slug === mappingItem.slug);
            return {
              name: apiData?.name || mappingItem.slug.replace(/-/g, ' '),
              slug: mappingItem.slug,
              url: apiData?.url || `#`,
              backgroundImage: mappingItem.img 
            };
          });

          return acc;
        }, {});

        // 4. Save successful result to cache
        sessionStorage.setItem('app_categories', JSON.stringify(organized));
        setCategorizedData(organized);
        setLoading(false);
      } catch (error) {
        console.error("Critical Data Error:", error);
        setLoading(false);
      }
    };

    getOrganizedCategories();
  }, []);

  return { categorizedData, loading };
};

export default CategoryDataProvider;