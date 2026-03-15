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
  setIsOpen} = useStoreData()

  const {selectedGroup} = CategoryDataProvider();




  const { minPrice, setMinPrice, maxPrice, setMaxPrice,storeFilters,setStoreFilters,filterLogicMap,filterActive,activeFiltersCount,appliedFilters,setAppliedFilters,setStoreFilterColors} = useStoreFilter();


   const [activeLayout, setActiveLayout] = useState(3);
    
      const gridOptions = [
        { id: 2, label: '2x2', icon: '/grid2x2.png' },
        { id: 3, label: '3x3', icon: '/grid3x3.png' },
        { id: 4, label: '4x4', icon: '/grid4x4.png' },
      ];



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
      c.name === colorName ? { ...c, active: false } : c
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



console.log('store scrollY is ',scrollY)

  
  return (
    <div className="Store-Page">

      <div className={`store-header-wrapper ${isAtTop?'':'store-header-visible'}`}>
 

<ExpandingStoreHeader />
      </div>


     <div className={`storePage-overlay ${storeOverlayActive ? 'is-visible' : ''}`} 
     onClick={() => setIsOpen(false)}>
      
      </div> 

    
{/*  <StoreBanner/>   */}



<div className="scrolling-animation-wrapper">
 <ScrollingAnimation isAtTop={isAtTop}/> 
  <h1 className="hero-title2">Refine Living</h1>
</div>



 



<div className="store-content-wrapper">

      <div className="store-layout">


        

      
       <div className="store-page-heading-wrapper">

       

      
 
<div className="store-page-title-wrapper">
  
   <div className="store-page-title">
    
    <span className="selected-group"> {currentCategory?selectedGroup: 'THE STORE'}</span>
    <span className="selected-category">
     {currentCategory?currentCategory.replace(/-/g, ' '):'Browse All '} 
    </span>
   </div>
  
</div>
  
          
            </div>

  
 


       <div className="filter-Btn-Ph">
          <SlidersHorizontal className="" strokeWidth={1.5} />
       </div>

   

        <main className="store-content">
       
         <div className="side-filter">
              <FilterSection
              storeFilters={storeFilters}
              setStoreFilters={setStoreFilters}
              setAppliedFilters={setAppliedFilters} />
            </div>

          <div className="productList-wrapper" style={{ position: "relative" }}>

            <div className="productList-head-wrapper">
                 <div className="store-page-heading">
            
                 
                    <div className='product-count-div'>
                      <div className="product-count-content">  Showing <span>{productElements.length} </span>results for '<span>{typeFilter?currentCategory:'All Products'}</span>' . </div>
 {typeFilter && <AnimatedUnderline
  thickness={1}
  offset={1}
  color='rgb(0,100,255)'>
      <span onClick={handleCancelTypeFilter} className="clear-category-btn">Clear Category</span>
  </AnimatedUnderline>}
  
    </div>

   <div className="store-grid-toggle">
   <GridToggle
   activeLayout={activeLayout}
   setActiveLayout={setActiveLayout}
   gridOptions={gridOptions}/>
   </div>
              </div>

               <div className="applied-filter-section">
            <div className="applied-filters-head">Applied Filters :</div>
           <div className="applied-filter-wrapper">
            {appliedFilters?appliedFilters.filters.map((filter,index)=>
             <div key={index} className="applied-filter">
              <span>{filter}</span>
              <X className="cancel-filter"
              onClick={() => removeFilter(filter)}/>
             </div>):
             <div className="applied-filter">None</div>} 

            
         <div className="applied-filter">
          <span>${appliedFilters.price.lowRange} - ${appliedFilters.price.highRange}</span>
          <X className="cancel-filter"/>
          </div> 

  
            
             {appliedFilters?appliedFilters.colors.map((color,index)=>
             <div key={index} className="applied-filter">
              <span>{color}</span>           
              <X className="cancel-filter"
              onClick={() => handleRemoveColor(color)}/>
             </div>):
             <div className="applied-filter">None</div>}
             
           </div>
          </div> 

          
            </div>

    

         
            
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
