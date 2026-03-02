import React, { createContext, useContext, useState, useMemo ,useEffect} from 'react';

const StoreFilterContext = createContext();

export const StoreFilterProvider = ({ children }) => {



 const [appliedFilters,setAppliedFilters] = useState({
      filters:[],
      price:{lowRange:'',highRange:''},
      colors:[]
    });


  // --- Price Logic ---
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(25000);

  // --- Your Existing Filter Logic ---
  const [storeFilters, setStoreFilters] = useState([
    { name: "In Stock", filter: "availabilityStatus", state: false },
    { name: "Warranty", filter: "warrantyInformation", state: false },
    { name: "Return Policy", filter: "returnPolicy", state: false },
    { name: "Fast Shipping", filter: "shippingInformation", state: false },
    { name: "Limited Stock", filter: "stock", state: false },
    { name: "Latest Offers", filter: "discountPercentage", state: false },
    { name: "Best Sellers", filter: "rating", state: false },
    { name: "COD Available", filter: "minimumOrderQuantity", state: false },
  ]);

  const activeFiltersCount = useMemo(() => {
    return storeFilters.reduce((count, f) => (f.state ? count + 1 : count), 0);
  }, [storeFilters]);

  const filterActive = activeFiltersCount > 0;

  const filterLogicMap = {
    availabilityStatus: value => value === "In Stock",
    warrantyInformation: value => /\d/.test(value),
    returnPolicy: value => /\d/.test(value),
    shippingInformation: value => typeof value === "string" && value.toLowerCase().includes("days"),
    stock: value => typeof value === "number" && value < 50,
    discountPercentage: value => typeof value === "number" && value < 20,
    rating: value => typeof value === "number" && value > 3.5,
    minimumOrderQuantity: value => typeof value === "number" && value > 20,
  };

  
  const [storeFilterColors,setStoreFilterColors] = useState([
    {id:0,name:'Black', color:'rgb(0, 0, 0)',active:false},
      {id:1,name:'Grey', color:'rgb(161, 161, 161)',active:false},
      {id:2,name:'Brown', color:'rgb(141, 42, 42)',active:false},
      {id:3,name:'Green', color:'rgb(35, 122, 95)',active:false},
      {id:4,name:'Copper', color:'rgb(55, 86, 174)',active:false}
  ])

    
   
   

  
 useEffect(() => {
  // 1. Instantly update filters and colors (snappy checkboxes/circles)
  const activeFilterNames = storeFilters.filter(f => f.state).map(f => f.name);
  const activeColorNames = storeFilterColors.filter(c => c.active).map(c => c.name);

  setAppliedFilters(prev => ({
    ...prev,
    filters: activeFilterNames,
    colors: activeColorNames
  }));
}, [storeFilters, storeFilterColors]);

useEffect(() => {
  // 2. DEBOUNCED update for Price only
  const handler = setTimeout(() => {
    setAppliedFilters(prev => ({
      ...prev,
      price: { lowRange: minPrice, highRange: maxPrice }
    }));
  }, 400); // 400ms delay after the last slider movement

  return () => clearTimeout(handler); // Cleanup: stops multiple calls while sliding
}, [minPrice, maxPrice]);
// ^ All dependencies must be here to trigger the update

  // Combine everything into one shared value
  const value = {
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    storeFilters, setStoreFilters,
    appliedFilters,setAppliedFilters,
    storeFilterColors,setStoreFilterColors,
    filterLogicMap,
    filterActive,
    activeFiltersCount
  };

  return (
    <StoreFilterContext.Provider value={value}>
      {children}
    </StoreFilterContext.Provider>
  );
};

// Custom hook to use the shared data
export const useStoreFilter = () => {
  const context = useContext(StoreFilterContext);
  if (!context) throw new Error("useStoreFilter must be used within StoreFilterProvider");
  return context;
};