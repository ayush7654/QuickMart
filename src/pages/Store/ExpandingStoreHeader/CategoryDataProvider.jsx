import { useState, useEffect } from 'react';
import { useStoreData } from '../../../components/StoreDataContext';


const SUBGROUP_MAPPING = {
  "Clothing & Apparel": [
      
    { slug: "tops", img: "Women-Tops.webp" },
 { slug: "womens-shoes", img: "Women-Shoes2.jpg" },
 { slug: "mens-shoes", img: "Men-Shoes6.jpg" },
    { slug: "7", img: "NewCollection1.jpg" },
     
    
   
       { slug: "womens-dresses", img: "Women-Dress.jpg" },
 { slug: "6", img: "SalePercent.jpg" },
   
     { slug: "mens-shirts", img: "Men-Shirts2.jpg" },
    
   
  
   
  ],
  "Accessories & Jewelry": [
    { slug: "mens-watches", img: "Mens-Watch2.webp" },
     { slug: "womens-watches", img: "Womens-watch.jpeg" },
    { slug: "sunglasses", img: "sunglasses4.webp" },
    { slug: "womens-jewellery", img: "Jewellery.webp" },
    { slug: "womens-bags", img: "Women-Bag.webp" },
   
    
  ],
  "Electronics & Tech": [
    { slug: "laptops", img: "laptops2.jpg" },
    { slug: "mobile-accessories", img: "MobileAccessary3.jpg" },
    { slug: "smartphones", img: "smartphones.jpg" },
    { slug: "tablets", img: "Tablet3.jpg" }
  ],
  "Beauty & Wellness": [
    
    { slug: "beauty", img: "beauty.jpg" },
     { slug: "fragrances", img: "fragrance.jpg" },
    { slug: "skin-care", img: "skincare.jpg" }
  ],
  "Home & Living": [
      { slug: "home-decoration", img: "home-decoration.jpg" },
    { slug: "furniture", img: "furniture.jpg" },
  
    { slug: "kitchen-accessories", img: "Kitchen.jpg" }
  ],
  "Automotive & Outdoors": [
       { slug: "sports-accessories", img: "sports.jpg" },
    { slug: "vehicle", img: "Car2.avif" },
    { slug: "motorcycle", img: "Motorbike.jpg" },
    { slug: "fitness", img: "Fitness2.webp" }
 
  ],
  "Daily Essentials": [
    { slug: "groceries", img: "essentials2.jpg" }
  ]
};

const CategoryDataProvider = () => {
  const [categorizedData, setCategorizedData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { currentCategory } = useStoreData();

  const selectedGroup = (categorizedData && currentCategory) 
    ? Object.keys(categorizedData).find(group => 
        categorizedData[group].some(item => 
          // Using a case-insensitive/dash-friendly check just in case
          item.slug.toLowerCase() === currentCategory.toLowerCase()
        )
      ) 
    : null;



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

  return { 
    categorizedData,
    loading ,
    selectedGroup,
    };
};

export default CategoryDataProvider;