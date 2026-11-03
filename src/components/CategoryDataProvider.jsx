import { useState, useEffect } from 'react';
import { useStoreData } from './StoreDataContext';



/* =========================================
   SUBGROUP CONFIG
========================================= */

const SUBGROUP_MAPPING = {

 "Clothing": {

    groupId: 0,


     
    items: [
     
      { slug: "womens-shoes" },
       { slug: "tops"},
      { slug: "mens-shirts" },    
      { slug: "womens-dresses" },
      { slug: "mens-shoes" }
     
    ]

  },
 

  "Technology": {

    groupId: 1,
     items: [
      { slug: "laptops"},
      { slug: "mobile-accessories" },
      { slug: "smartphones"},
      { slug: "tablets" }
    ]

  },



  "Wellness": {

    groupId: 2,
    
    items: [
      { slug: "beauty" },
      { slug: "fragrances"},
      { slug: "skin-care" },
       
    ]

  },
     "Outdoors": {

    groupId: 3,

    items: [
      { slug: "sports-accessories" },
      { slug: "vehicle" },
      { slug: "motorcycle" },
      { slug: "fitness" }
    ]

  },



  "Accessories": {

    groupId: 4,
  
    items: [
      { slug: "mens-watches"},
      { slug: "womens-watches" },
      { slug: "sunglasses"},
      { slug: "womens-jewellery"},
      { slug: "womens-bags" },
    ]

  },



  "Home & Living": {

    groupId: 5,

    items: [
      {slug:'kitchen-accessories'},
      { slug: "groceries" }

    ]

  },

 


 



/*   "Daily Essentials": {

    groupId: 6,

    items: [
       { slug: "groceries", img: "Grocery3.jpg" },
      { slug: "groceries", img: "Grocery7.jpg" } 
    ]

  } */
 
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