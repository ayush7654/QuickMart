import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo,
 useContext
} from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { getItems, getFilteredItems } from "../../api";
import ProductCard from "../../components/ProductCard";
import StoreCategory from "./StoreSidebar/StoreCategory/StoreCategory";
import StoreFooter from "./StoreFooter/StoreFooter";
import { SlidersHorizontal } from "lucide-react";
import { WinScrollContext } from "../../components/WinScrollProvider/WinScrollProvider";
import ScrollButton from "../../components/ScrollingButton/ScrollingButton";
import StoreSorting from "./StoreSorting/StoreSorting";
import PageHeader from "../../components/PageHeader/PageHeader";
import useStoreFilterData from "./useStoreFilterData";
import StoreFilter from "./StoreSidebar/StoreFilter/StoreFilter";
import "./Store.css";

export default function Store() {
  const ProductCache = useRef({});
  const FilteredItemsCache = useRef({});
  const scrollPositionRef = useRef(0);

  const [batchCount, setBatchCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [renderTrigger, setRenderTrigger] = useState(0);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentCategory, setcurrentCategory] = useState('');
  const [categoryName, setCategoryName] = useState("");
  const [sideBartoggled,   setSideBarToggled] = useState(true);
  const [sideFiltertoggled,setSideFilterToggled] =useState(true)
  const [currentSort,setCurrentSort] = useState(null);
 /*  const [currentFilter,setCurrentFilter] = useState(null) */
  const [sortOrder,setSortOrder] = useState('asc')
  const { isIdle, isAtTop } = useContext(WinScrollContext);

  const {storeFilters,setStoreFilters,filterLogicMap,filterActive,activeFiltersCount} = useStoreFilterData();


 const storeOverlayActive = !(sideBartoggled && sideFiltertoggled);

 console.log(storeOverlayActive)

const handleSort = (e) => {


  setCurrentSort(prev => prev?.name === e.name ? null : e);
};




  const typeFilter = searchParams.get("type");

  const navigate = useNavigate();

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

  const handleTypeFilter = (category) => {
    setcurrentCategory(category);
    setSearchParams({ type: category });
  };

  const handleCancelTypeFilter =()=>{
    setcurrentCategory('')
   navigate('/store')
  }

  const handleAllProducts =()=>{
    setcurrentCategory('');
   searchParams.delete('type'); // remove the key from the params
setSearchParams(searchParams); // update the URL
  }

const toggleSortOrder = () => {
  setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
};

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
  if (!FinalItems) return 0;

  let items = [...FinalItems]; // copy to avoid mutation

items = items.filter(item =>
  storeFilters
    .filter(f => f.state)
    .every(f => filterLogicMap[f.filter]?.(item[f.filter]))
);

if (typeFilter && currentSort?.sort) {
  items.sort((a, b) => {
    return sortOrder === "asc"
      ? a[currentSort.sort] - b[currentSort.sort]
      : b[currentSort.sort] - a[currentSort.sort];
  });
}



  return items.map((product) => (
    <ProductCard
      classname="store-product"
      key={product.id}
      id={product.id}
      images={product.images}
      title={product.title}
      price={product.price}
      rating={product.rating}
      path={location.search}
    />
  ));
}, [FinalItems, currentSort, typeFilter, location.search, sortOrder,storeFilters]);



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



console.log('product elements are', productElements)
console.log('final items are ' , FinalItems)

  
  return (
    <div className="Store-Page">
        

      <div style={{display:storeOverlayActive ?'flex':'none'}} className="storePage-overlay"></div>

    



   <PageHeader
   bgImage='/HomeImg.jpg'
   pageHeadText={'The Vault'}
   pageHeadPara={'The Vault is a carefully guarded collection of premium products, chosen for those who value quality over quantity. Each item earns its place — nothing more, nothing less.'}/>
   
 
 <aside className="store-sidebar"  style={{
          transform: sideBartoggled ? 'translateX(100%)' : 'translateX(0%)',
           opacity:sideBartoggled?'0':'1', 
      
          transition: 'all 0.6s ease',
        }}>
          <StoreCategory
            currentCategory={currentCategory}
            handleTypeFilter={handleTypeFilter}
            handleClickCategory={() => setcurrentCategory("")}
            typeFilter={typeFilter}
            setSideBarToggled={()=>setSideBarToggled(true)}
            handleCancelTypeFilter ={handleCancelTypeFilter}
          />
        </aside>
    
   <aside className="store-sidebar"  style={{
           transform:sideFiltertoggled ? 'translateX(100%)' : 'translateX(0%)',
            opacity:sideFiltertoggled?'0':'1', 
      
          transition: 'all 0.6s ease',
        }}>
         <StoreFilter
         sideFiltertoggled={sideFiltertoggled}
         setSideFilterToggled={()=>setSideFilterToggled(true)}
         storeFilters={storeFilters}
         setStoreFilters={setStoreFilters}
         filterActive={filterActive}/>
         
        </aside>


<div className="store-content-wrapper">

      <div className="store-layout">


        
    <StoreSorting
      isIdle={isIdle}
      currentSort={currentSort}
      setCurrentSort={setCurrentSort}
      handleSort={(e)=>handleSort(e)}
      sortOrder={sortOrder}
      toggleSortOrder={toggleSortOrder}
      typeFilter={typeFilter} 
      sideBartoggled={sideBartoggled}
       setSideBarToggled={ setSideBarToggled}
       sideFiltertoggled={sideFiltertoggled}
       setSideFilterToggled={setSideFilterToggled}
      storeFilters={storeFilters}
      setStoreFilters={setStoreFilters}
      filterActive={filterActive}
    currentCategory={currentCategory}
      productCount={productElements.length}
        activeFiltersCount={activeFiltersCount}
     /*  setCurrentFilter={setCurrentFilter} *//> 



      
       <div className="store-page-heading-wrapper">
          <div className="store-page-heading">
            <div className="store-all-link">Product Catelog</div>

        
            
                 
                  
                    <div className='product-count-div'>
    Showing <span>{productElements.length} </span>products
    </div>
              </div>
            </div>

    
 


       <div className="filter-Btn-Ph"onClick={() => setSideBarToggled(false)}>
          <SlidersHorizontal className="" strokeWidth={1.5} />
       </div>

   

     
   

       
        

        <main className="store-content">
       


          <div className="productList-wrapper" style={{ position: "relative" }}>
            
            <div className="productList">{productElements}</div>
          </div>

         
        </main>
      </div>
 {!typeFilter && (
            <div className="LoadMore-button-div" >
              
                  <div className="LoadMore-button" onClick={handleLoadMore}>
                    Load More </div> 

            
            </div>
          )}


      <StoreFooter />
      </div>
    </div>
  );
}
