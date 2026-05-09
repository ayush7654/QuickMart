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
import ScrollingAnimation from "../../components/ScrollingAnimation/ScrollingAnimation";
import ExpandingStoreHeader from "./ExpandingStoreHeader/ExpandingStoreHeader";
import { useStoreData } from "../../components/StoreDataContext";
import CategoryDataProvider from "./ExpandingStoreHeader/CategoryDataProvider";
import "./Store.css";
import AnimatedUnderline from "../../components/AnimatedUnderline/AnimatedUnderline";
import HomeIntro from "../Home/HomeIntro/HomeIntro";
import StoreActions from "./StoreActions/StoreActions";
import OrderToggle from "./OrderToggle/OrderToggle";
import MenuCancel from "../../components/MenuCancel/MenuCancel";
import { LayoutPanelLeft } from "lucide-react";
import AppliedFilters from "./AppliedFilters/AppliedFilters";
import StoreSorting from "./StoreSorting/StoreSorting";
import StoreHeader from "./StoreHeader/StoreHeader";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";


export default function Store() {
  const ProductCache = useRef({});
  const FilteredItemsCache = useRef({});
  const scrollPositionRef = useRef(0);

  const [batchCount, setBatchCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [renderTrigger, setRenderTrigger] = useState(0);

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
  setIsOpen} = useStoreData()

  const {selectedGroup} = CategoryDataProvider();

const [partialPill,setPartialPill] = useState(false);


  const { minPrice, setMinPrice, maxPrice, setMaxPrice,storeFilters,setStoreFilters,filterLogicMap,filterActive,activeFiltersCount,appliedFilters,setAppliedFilters,setStoreFilterColors} = useStoreFilter();


   const [activeLayout, setActiveLayout] = useState(4);
    
  


   const [hide, setHide] = useState(false);
  let lastY = 0;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      if (y > lastY) setHide(true);      // scrolling down → move up
      else setHide(false);              // scrolling up → move back

      lastY = y;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);



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

  // 4. Return the mapped components
  return items.map((product) => (
    <StoreProductCard
      key={product.id}
      product={product}
      path={location.search}
    />
  ));
  
  // Added minPrice and maxPrice to the dependency array
}, [FinalItems, currentSort, typeFilter, location.search, sortOrder, storeFilters, minPrice, maxPrice]);



  const handleLoadMore = async (e) => {
    e.target.blur();
    scrollPositionRef.current = window.scrollY;
    const nextBatch = batchCount + 1;
    await loadBatch(nextBatch);
    setBatchCount(nextBatch);
  };

  useLayoutEffect(() => {
    if (scrollPositionRef.current) {
      window.scrollTo({ top: scrollPositionRef.current, behavior: "auto" });
    }
  }, [batchCount]);



console.log('filters ',appliedFilters)

  
  return (
    <div className="Store-Page">

     
    <div className="store-sideFilter-wrapper" 
    style={{width:sideFilterOn?'30%':'0%'}}>
      
          <div className="store-sideFilter" style={{opacity:sideFilterOn?1:0}}>
                 <FilterSection
              storeFilters={storeFilters}
              setStoreFilters={setStoreFilters}
              setAppliedFilters={setAppliedFilters}
              setSideFilterOn={setSideFilterOn} />
          </div>
         </div>

    <div className={`storePage-overlay ${storeOverlayActive ? 'is-visible' : ''}`} 
     onClick={() => {setIsOpen(false),setPartialPill(false)}}>
      
      </div>  

    
{/*  <StoreBanner/>   */}




  <HomeIntro/>  

 

  <div className='store-header-wrapper'>

<StoreHeader 
partialPill={partialPill}
setPartialPill={setPartialPill}
setSideFilterOn={setSideFilterOn}/>


      </div> 

<div className="store-content-wrapper">

      <div className="store-layout">


        

      
       <div className="store-page-title-wrapper">

       

      
 
<div className="store-page-title-content">
  
   <div className="store-page-title">

{/*     <div className="side-filter-btn-wrapper" onClick={()=>setSideFilterOn(true)}>
      < HiOutlineAdjustmentsHorizontal size={20}  />
      Filters</div> */}
    
    <span className="selected-group"> {currentCategory?selectedGroup: 'STORE'}</span>
    <span className="selected-category">
     {currentCategory?currentCategory.replace(/-/g, ' '):'Explore All '} 
    </span>
     
   </div>



 <div className="store-grid-toggle">
   <GridToggle
   activeLayout={activeLayout}
   setActiveLayout={setActiveLayout}
   />
   </div>

  
</div>
  
          
            </div>

  
      {/*  <div className="filter-Btn-Ph">
          <SlidersHorizontal className="" strokeWidth={1.5} />
       </div> */}



 

        <main className="store-content">
       
         <div className="side-filter">
              <FilterSection
              storeFilters={storeFilters}
              setStoreFilters={setStoreFilters}
              setAppliedFilters={setAppliedFilters} />
            </div>

          <div className="productList-wrapper" style={{ position: "relative" }}>

            

            <div className="productList-head-wrapper">

            
                 
                    <div className='product-count-div'>
                      <div className="product-count-content">  Showing <span>{productElements.length} </span>results for '<span>{typeFilter?currentCategory:'All Products'}</span>' . </div>
 {typeFilter && <AnimatedUnderline
  thickness={1}
  offset={1}
  color='rgb(0,100,255)'>
      <span onClick={handleCancelTypeFilter} className="clear-category-btn">Clear Category</span>
  </AnimatedUnderline>}
  
    </div>

    
  

<div className="dropdown-sort-wrapper">
     <StoreSorting />  
</div>

  
          

            

          
            </div>

     <AppliedFilters
             appliedFilters = {appliedFilters}
                    removeFilter = {removeFilter}
                    handleRemoveColor ={handleRemoveColor}
                    currentSort ={currentSort}
                    toggleSortOrder ={toggleSortOrder}/>

         
            
            <div className="productList"
            style={{
              gridTemplateColumns: `repeat(${activeLayout}, 1fr)`
            }}>
              
              {productElements}</div>
          </div>

         
        </main>
      </div>
 {!typeFilter && (
            <div className="LoadMore-button-div" >
              
                  <div className="LoadMore-button" onClick={handleLoadMore}>
                    <ScrollButton
                    text='Load More'
                    theme="buttonOutline"
                    themeOnHover="buttonFilled"
                    color='black'
                    />
                     </div> 

            
            </div>
          )}


      <StoreFooter />
      </div>
    </div>
  );
}
