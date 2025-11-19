import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo,
} from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { getItems, getFilteredItems } from "../../api";
 import { ChevronLeft,ChevronRight } from 'lucide-react'; 
import ProductCard from "../../components/ProductCard";
import StoreFilter from "./StoreFilter/StoreFilter";
import StoreFooter from "./StoreFooter/StoreFooter";
import { FaBars } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";
import { X } from 'lucide-react';
import { FiFilter } from "react-icons/fi";
import { SlidersHorizontal } from "lucide-react";
import MenuCancel from "../../components/MenuCancel/MenuCancel";
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
  const [currentCategory, setcurrentCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [sideBartoggled, sideBarsetToggled] = useState(true);

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

  const handleFilter = (category) => {
    setcurrentCategory(category);
    setSearchParams({ type: category });
  };

  const handleCancelFilter =()=>{
    setcurrentCategory('')
   navigate('/store')
  }

  const handleAllProducts =()=>{
    setcurrentCategory('');
   searchParams.delete('type'); // remove the key from the params
setSearchParams(searchParams); // update the URL
  }

  const loadBatch = async (batchNumber) => {
    if (ProductCache.current[batchNumber]) return;

    try {
      setIsLoading(true);
      const data = await getItems(batchNumber, 12);
      ProductCache.current[batchNumber] = data;
      setIsLoading(false);
      setRenderTrigger((prev) => prev + 1); // ✅ triggers re-render
    } catch (err) {
      console.error("Failed to fetch products:", err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBatch(1); // ✅ Load first batch on mount
  }, []);

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
  }, [currentCategory, typeFilter]);

  const DisplayedItems = useMemo(() => {
    return Object.values(ProductCache.current).flat();
  }, [renderTrigger]);

  const FinalItems = useMemo(() => {
    return typeFilter
      ? FilteredItemsCache.current[typeFilter]
      : DisplayedItems;
  }, [typeFilter, DisplayedItems]);

  const productElements = useMemo(() => {
    if (!FinalItems) return null;
    return FinalItems.map((product) => (
      <ProductCard
        classname="store-product"
        key={product.id}
        id={product.id}
        images={product.images}
        title={product.title}
        price={product.price}
        path={location.search}
      />
    ));
  }, [FinalItems, location.search]);

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

  return (
    <div className="Store-Page">
        

      <div style={{display:sideBartoggled?'none':'flex'}} className="storePage-overlay"></div>

      <div 
    /*   style={{
        transform: hide ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.6s ease"
      }} */ 
      className="store-page-header">
            
             <div className="store-page-heading-div">
          {/*  <div className="allProductsBtn-div-container"><div  className="allProductsBtn-div" onClick={handleAllProducts}><ChevronLeft className="allProductsBtn"  strokeWidth={1.5} absoluteStrokeWidth /></div></div>  */}  

         
          
      <div className="store-page-heading">
          The Vault  
      </div>

<div className="store-filter-button-div-container" onClick={() => sideBarsetToggled(false)}>

  <div className="category-name-div" >
  {window.innerWidth>400?'Shop by Category':'Categories'}
  </div>
  <div className="store-filter-button-div" >
  <SlidersHorizontal className="category-icon" strokeWidth={1.5} />
     </div>
  </div>

 
    
      </div>
  

 
      </div>
 

{/* <span style={{fontSize:'1.5rem'}}>*create a useEffect that should set current category by param type chnage in url*</span> */} 


      <div className="store-layout">

   
        <div className="sticky-category-container">
          { currentCategory && <div className="current-category-container-div">
        <div className="current-category-container">
       <div className="current-category-div">
      <div className="remove-category-div">
         <X strokeWidth={1.5} 
      className="remove-category" 
      onClick={(e) => {
      e.stopPropagation();   // ⛔ stops parent onClick
      handleCancelFilter();  // ✔ your original function
    }}
   />
      </div>
      <div className="current-category">{
  currentCategory
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ')}</div>
    </div>
  </div>
  </div>}
        </div>

       
        <aside className="store-sidebar"  style={{
          transform: sideBartoggled ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.5s ease-in-out',
        }}>
          <StoreFilter
            currentCategory={currentCategory}
            handleClickFilter={handleFilter}
            handleClickCategory={() => setcurrentCategory("")}
            typeFilter={typeFilter}
            sideBartoggled={()=>sideBarsetToggled(true)}
          />
        </aside>

        <main className="store-content">
          <div className="productList-wrapper" style={{ position: "relative" }}>
            <div className="productList">{productElements}</div>
          </div>

         
        </main>
      </div>
 {!typeFilter && (
            <div className="LoadMore-button-div" >
              <button className="LoadMore-button" onClick={handleLoadMore}>
                LOAD MORE
              </button>
            </div>
          )}
      <StoreFooter />
    </div>
  );
}
