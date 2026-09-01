import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo
} from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { getItems, getFilteredItems } from "../../api";
import StoreProductCard from "./StoreProductCard/StoreProductCard";
import StoreCategory from "./StoreSidebar/StoreCategory/StoreCategory";
import StoreFooter from "./StoreFooter/StoreFooter";
import { SlidersHorizontal } from "lucide-react";
import ScrollButton from "../../components/ScrollingButton/ScrollingButton";
import FilterSection from "./FilterSection/FilterSection";
import GridToggle from "./GridToggle/GridToggle";
import { useStoreFilter } from "../../components/StoreFilterContext";
import { X } from "lucide-react";
import ExpandingStoreHeader from "./ExpandingStoreHeader/ExpandingStoreHeader";
import { useStoreData } from "../../components/StoreDataContext";
import CategoryDataProvider from "./ExpandingStoreHeader/CategoryDataProvider";
import "./Store.css";
import AnimatedUnderline from "../../components/AnimatedUnderline/AnimatedUnderline";
import CarouselIntro from "./CarouselIntro/CarouselIntro";

import OrderToggle from "./OrderToggle/OrderToggle";
import MenuCancel from "../../components/MenuCancel/MenuCancel";
import { LayoutPanelLeft } from "lucide-react";
import { useScroll } from "../../components/ScrollData/ScrollData";
import AppliedFilters from "./AppliedFilters/AppliedFilters";

import StoreHeader from "./StoreHeader/StoreHeader";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { ListFilter } from "lucide-react";
import { Search } from 'lucide-react'
import { Funnel, Filter } from 'lucide-react';
import { FaFilter } from 'react-icons/fa';
import StoreSearch from "./StoreSearch/StoreSearch";

const getLayoutByWidth = () => {
  if (typeof window === 'undefined') return 4; // Fallback for SSR (e.g., Next.js)
  if (window.innerWidth < 700) return 2;
  if (window.innerWidth < 1100) return 3;
  return 4;
};

export default function Store() {
  const ProductCache = useRef({});
  const FilteredItemsCache = useRef({});
  const scrollPositionRef = useRef(0);

  const [batchCount, setBatchCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [renderTrigger, setRenderTrigger] = useState(0);

  const { scrollY} = useScroll();

  const location = useLocation();

  const { isAtTop,
    currentSort,
    sortOrder,
    currentCategory,
    typeFilter,
    storeOverlayActive,
    handleSort,
    toggleSortOrder,
    handleTypeFilter,
    handleCancelTypeFilter,
    sideFilterOn,
    setSideFilterOn,
    partialPill,setPartialPill,
    storeSearch,setStoreSearch,
  setIsOpen} = useStoreData()

  const {selectedGroup} = CategoryDataProvider();




  const { minPrice, setMinPrice, maxPrice, setMaxPrice,storeFilters,setStoreFilters,filterLogicMap,filterActive,activeFiltersCount,appliedFilters,setAppliedFilters,setStoreFilterColors} = useStoreFilter();


  const [activeLayout, setActiveLayout] = useState(getLayoutByWidth);


    
const loadingRef = useRef(null);




  const loadBatch = async (batchNumber) => {
    if (ProductCache.current[batchNumber]) return;

    try {
      setIsLoading(true);
      const data = await getItems(batchNumber, 12, currentSort?.sort || "",sortOrder);
      ProductCache.current[batchNumber] = data;
      setIsLoading(false);
      setRenderTrigger((prev) => prev + 1); // ✅ triggers re-render
    } catch (err) {
      console.error("Failed to fetch products:", err.message);
      setIsLoading(false);
    }
  };

  const removeFilter = (filterName) => {
  setStoreFilters(prev => 
    prev.map(item => 
      item.name === filterName ? { ...item, state: false } : item
    )
  );
};

const handleRemoveColor = (colorName) => {
  setStoreFilterColors(prev =>
    prev.map(c => 
      c.name === colorName.name ? { ...c, active: false } : c
    )
  );
};

useEffect(() => {
    const handleResize = () => {
      setActiveLayout(getLayoutByWidth());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

useEffect(() => {
  ProductCache.current = {};      // clear old pages
  setRenderTrigger(prev => prev + 1);
  loadBatch(1);                   // reload from first page
}, [currentSort,sortOrder]);

  useEffect(() => {
    async function loadFilteredItem() {
      try {
        const FilteredData = await getFilteredItems(typeFilter);
        FilteredItemsCache.current[typeFilter] = FilteredData;
        setRenderTrigger((prev) => prev + 1);
      } catch (err) {
        console.log(err.message);
      }
    }

    if (typeFilter && FilteredItemsCache.current[typeFilter] === undefined) {
      loadFilteredItem();
    }
  }, [currentCategory, typeFilter,currentSort,sortOrder]);

  const DisplayedItems = useMemo(() => {
    return Object.values(ProductCache.current).flat();
  }, [renderTrigger]);

  const FinalItems = useMemo(() => {
    return typeFilter
      ? FilteredItemsCache.current[typeFilter]
      : DisplayedItems;
  }, [typeFilter, DisplayedItems]);

const productElements = useMemo(() => {
  if (!FinalItems) return []; // Changed 0 to [] to avoid mapping errors

  let items = [...FinalItems];

  // 1. Filter by Checkboxes (Store Filters)
  items = items.filter(item =>
    storeFilters
      .filter(f => f.state)
      .every(f => filterLogicMap[f.filter]?.(item[f.filter]))
  );

  // 2. Filter by Price Range (Min/Max)
  items = items.filter(item => {
    const itemPrice = item.price;
    // Check if price is >= min and <= max. 
    // If minPrice is null or 0, we effectively ignore the floor.
    const matchesMin = minPrice === null || itemPrice >= minPrice;
    const matchesMax = maxPrice === null || itemPrice <= maxPrice;
    
    return matchesMin && matchesMax;
  });

  // 3. Sorting Logic
  if (typeFilter && currentSort?.sort) {
    items.sort((a, b) => {
      return sortOrder === "asc"
        ? a[currentSort.sort] - b[currentSort.sort]
        : b[currentSort.sort] - a[currentSort.sort];
    });
  }

  // Store Search Logic
  items = items.filter((item) =>
  item.title.toLowerCase().startsWith(storeSearch.toLowerCase())
); 

  // 5. Return the mapped components
  return items.map((product) => (
    <StoreProductCard
      key={product.id}
      product={product}
      path={location.search}
    />
  ));
  
  // Added minPrice and maxPrice to the dependency array
}, [FinalItems, currentSort, typeFilter, location.search, sortOrder, storeFilters, minPrice, maxPrice , storeSearch]);



const handleLoadMore = async () => {
  console.log("batchCount:", batchCount);

  scrollPositionRef.current = window.scrollY;

  const nextBatch = batchCount + 1;

  console.log("nextBatch:", nextBatch);

  await loadBatch(nextBatch);

  setBatchCount(nextBatch);
};

  useLayoutEffect(() => {
    if (scrollPositionRef.current) {
      window.scrollTo({ top: scrollPositionRef.current, behavior: "auto" });
    }
  }, [batchCount]);


const [isScrolledPastLimit, setIsScrolledPastLimit] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if we have crossed the 700px mark
      const passed = window.scrollY > 700;
      
      // Critical optimization: Only update state if the value actually changes
      setIsScrolledPastLimit((prev) => {
        if (prev !== passed) {
          return passed;
        }
        return prev;
      });
    };

    // Add the listener on mount
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Clean up the listener on unmount to prevent memory leaks
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const hasActiveFilters = Boolean(
  appliedFilters.filters.length ||
  appliedFilters.colors.length ||
  currentCategory ||
  appliedFilters.price.lowRange !== null ||
  appliedFilters.price.highRange !== null
);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      console.log(
        "isIntersecting:",
        entry.isIntersecting,
        "ratio:",
        entry.intersectionRatio
      );

      if (entry.isIntersecting) {
         console.log("calling handleLoadMore");
        handleLoadMore();
      }
    },
    {
      threshold: 0,
    }
  );

  if (loadingRef.current) {
    observer.observe(loadingRef.current);
  }

  return () => observer.disconnect();
}, [handleLoadMore]);



console.log(productElements && productElements)
  
  return (
    <div className="Store-Page">



    <div className={`store-sideFilter-wrapper ${sideFilterOn?'open':''}`}>
      
          <div className="store-sideFilter" style={{opacity:sideFilterOn?1:0}}>
                 <FilterSection
              storeFilters={storeFilters}
              setStoreFilters={setStoreFilters}
              setAppliedFilters={setAppliedFilters}
              setSideFilterOn={setSideFilterOn} />
          </div>
         </div>

    <div className={`storePage-overlay ${storeOverlayActive ? 'is-visible' : ''}`} 
     onClick={() => {setIsOpen(false),setPartialPill(false)}}> </div>  

    

   <CarouselIntro />   

 

  <div className='store-header-wrapper' 
  style={{ top: isScrolledPastLimit ? '1rem' : '-5rem' }}>
       <ExpandingStoreHeader/>    
      </div>  
 
  

<div className="store-content-wrapper">
   
      <div className="store-layout">


        

      
       <div className="store-page-title-wrapper">

    
 
<div className="store-page-title-content">
  
   <div className="store-page-title">


 

    <span className="selected-group"> {currentCategory?selectedGroup: 'Store'}</span>
    <span className="selected-category">
     {currentCategory?currentCategory.replace(/-/g, ' '):'Explore All '} 
    </span>
          <div className="head-dot-wrapper">
      <span className="head-dot red"></span>
      <span className="head-dot blue" ></span>
      <span className="head-dot green"></span>
    
    </div>
     
     
   </div>




  
</div>

          
            </div>

  

        <main className="store-content">



<div className="store-info-wrapper">
          
            
             <div className="store-info-section store-bar-left">

                             
   <GridToggle
   activeLayout={activeLayout}
   setActiveLayout={setActiveLayout}
   />
 

             </div>
             <div className="store-info-section  store-bar-right">
                 <StoreSearch
                 storeSearch={storeSearch}
                 setStoreSearch={setStoreSearch}
                 /> 
            
         

       
             </div>

    {/* <span className="product-length"> {productElements.length} PRODUCTS </span> */}  

    
  
     
            </div>
       

<div className="applied-filters-wrapper">
  {hasActiveFilters &&  <AppliedFilters
             appliedFilters = {appliedFilters}
                    removeFilter = {removeFilter}
                    handleRemoveColor ={handleRemoveColor}
                    currentSort ={currentSort}
                    toggleSortOrder ={toggleSortOrder}
                    currentCategory={currentCategory}
                    />   }
</div>



 <div className="productList-wrapper" style={{ position: "relative" }}>
  
            <div className="productList"
            style={{
              gridTemplateColumns: `repeat(${activeLayout}, 1fr)`
            }}>

     <div 
  className="store-filter-button"
  style={{
    opacity: isScrolledPastLimit ? 1 : 0,
    pointerEvents: isScrolledPastLimit ? 'auto' : 'none'
  }}
  onClick={() => setSideFilterOn(true)}
  aria-label="Open filter menu"
>
  <Filter size={20} strokeWidth={2} className="filter-icon" /> 
</div>
              
              {productElements}</div>
          </div>

         
        </main>
      </div>

      
 {!typeFilter && (
            <div className="LoadMore-button-div"  ref={loadingRef} >
              
<div className="lottie-animation-wrapper">
  <DotLottieReact src="bar-animation.lottie" loop autoplay />
</div>

            
            </div>
          )}


      <StoreFooter />
      </div>
    </div>
  );
}
