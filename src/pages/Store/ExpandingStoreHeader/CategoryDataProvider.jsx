import { useState, useEffect } from 'react';
import { useStoreData } from '../../../components/StoreDataContext';



/* =========================================
   SUBGROUP CONFIG
========================================= */

const SUBGROUP_MAPPING = {

  "Clothing & Apparel": {

    groupId: 0,

    items: [
      { slug: "tops", img: "women-tops4.jpg" },
      { slug: "womens-shoes", img: "Women-Shoes2.jpg" },
      { slug: "mens-shirts", img: "Mens-Shirts5.jpg" },
      
      { slug: '-', img: "NewCollection1.jpg" },
      { slug: "womens-dresses", img: "Women-Dress.jpg" },
      { slug: '-', img: "SalePercent.jpg" },
      { slug: "mens-shoes", img: "Men-Shoes8.webp" },
    ]

  },



  "Accessories & Jewelry": {

    groupId: 1,

    items: [
      { slug: "mens-watches", img: "Mens-Watch2.webp" },
      { slug: "womens-watches", img: "Womens-watch.jpeg" },
      { slug: "sunglasses", img: "sunglasses4.webp" },
      { slug: "womens-jewellery", img: "Jewellery.webp" },
      { slug: "womens-bags", img: "Women-Bag.webp" },
    ]

  },



  "Electronics & Tech": {

    groupId: 2,

    items: [
      { slug: "laptops", img: "laptops2.jpg" },
      { slug: "mobile-accessories", img: "MobileAccessary3.jpg" },
      { slug: "smartphones", img: "smartphones.jpg" },
      { slug: "tablets", img: "Tablet3.jpg" }
    ]

  },



  "Beauty & Wellness": {

    groupId: 3,

    items: [
      { slug: "beauty", img: "beauty.jpg" },
      { slug: "fragrances", img: "fragrance.jpg" },
      { slug: "skin-care", img: "skincare.jpg" }
    ]

  },



  "Home & Living": {

    groupId: 4,

    items: [
      { slug: "home-decoration", img: "home-decoration.jpg" },
      { slug: "furniture", img: "Furniture2.jpg" },
      { slug: "kitchen-accessories", img: "Kitchen.jpg" }
    ]

  },



  "Automotive & Outdoors": {

    groupId: 5,

    items: [
      { slug: "sports-accessories", img: "sports.jpg" },
      { slug: "vehicle", img: "Car2.avif" },
      { slug: "motorcycle", img: "Motorbike.jpg" },
      { slug: "fitness", img: "Fitness2.webp" }
    ]

  },



  "Daily Essentials": {

    groupId: 6,

    items: [
      { slug: "groceries", img: "essentials2.jpg" }
    ]

  }

};





/* =========================================
   DATA PROVIDER
========================================= */

const CategoryDataProvider = () => {

  const [categorizedData, setCategorizedData] = useState(null);

  const [loading, setLoading] = useState(true);

  const { currentCategory } = useStoreData();




  /* =========================================
     FIND SELECTED GROUP
  ========================================= */

  const selectedGroup =

    categorizedData && currentCategory

      ? Object.keys(categorizedData).find(group =>

          categorizedData[group].items.some(item =>

            item.slug.toLowerCase() ===
            currentCategory.toLowerCase()

          )

        )

      : null;





  /* =========================================
     FETCH + ORGANIZE
  ========================================= */

  useEffect(() => {

    const getOrganizedCategories = async () => {



      /* =====================================
         CACHE
      ===================================== */

      const cached =
        sessionStorage.getItem('app_categories');


      if (cached) {

        setCategorizedData(
          JSON.parse(cached)
        );

        setLoading(false);

        return;
      }




      try {



        /* =====================================
           FETCH
        ===================================== */

        let response = await fetch(
          "https://dummyjson.com/products/categories"
        );



        /* =====================================
           FALLBACK
        ===================================== */

        let rawData;


        if (!response.ok) {

          response = await fetch(

            "https://api.allorigins.win/get?url=" +

            encodeURIComponent(
              "https://dummyjson.com/products/categories"
            )

          );

          const proxyData =
            await response.json();

          rawData =
            JSON.parse(proxyData.contents);

        }

        else {

          rawData =
            await response.json();

        }




        /* =====================================
           ORGANIZE DATA
        ===================================== */

        const organized =

          Object.keys(SUBGROUP_MAPPING)
            .reduce((acc, groupName) => {

              const groupConfig =
                SUBGROUP_MAPPING[groupName];



              acc[groupName] = {

                groupId:
                  groupConfig.groupId,



                items:

                  groupConfig.items.map(mappingItem => {

                    const apiData = rawData.find(
                      cat =>
                        cat.slug ===
                        mappingItem.slug
                    );



                    return {

                      name:
                        apiData?.name ||

                        mappingItem.slug
                          .replace(/-/g, ' '),

                      slug:
                        mappingItem.slug,

                      url:
                        apiData?.url || '#',

                      backgroundImage:
                        mappingItem.img

                    };

                  })

              };



              return acc;

            }, {});





        /* =====================================
           SAVE CACHE
        ===================================== */

        sessionStorage.setItem(
          'app_categories',
          JSON.stringify(organized)
        );



        setCategorizedData(organized);

        setLoading(false);

      }


      catch (error) {

        console.error(
          "Critical Data Error:",
          error
        );

        setLoading(false);

      }

    };



    getOrganizedCategories();

  }, []);





  /* =========================================
     RETURN
  ========================================= */

  return {

    categorizedData,

    loading,

    selectedGroup,

  };

};



export default CategoryDataProvider;