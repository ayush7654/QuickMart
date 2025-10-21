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
        
 {/*    { !typeFilter && <div  className="storePage-Offer-div">
        <div style={{fontSize:'2rem',fontWeight:'700'}}>FLAT 40% OFF | END OF SEASON SALE</div>
        <div style={{fontSize:'1.2rem'}}>+Extra 10% off on orders of ₹4999 or more*</div>
      </div>} */}
      <div style={{display:sideBartoggled?'none':'flex'}} className="storePage-overlay"></div>

      <div className="store-page-header">
              {window.innerWidth< 400 && <div className="store-page-headingPh"> THE VAULT</div>  }
             <div className="store-page-heading-div">
          {/*  <div className="allProductsBtn-div-container"><div  className="allProductsBtn-div" onClick={handleAllProducts}><ChevronLeft className="allProductsBtn"  strokeWidth={1.5} absoluteStrokeWidth /></div></div>  */}  

         
          
        {window.innerWidth>400 && <div className="store-page-heading">
          THE VAULT
         {/*   {window.innerWidth>400?'Store':
            <div  className="category-name-divPh">
   <X strokeWidth={1.5} className="remove-category" onClick={handleCancelFilter}  style={{display:currentCategory?'flex':'none'}}/> 
    {currentCategory? 
  currentCategory
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' '):"All"}
 
  </div> } */}
        
</div>}

<div className="store-filter-button-div-container">

  <div className="category-name-div">
   <X strokeWidth={1.5} className="remove-category" onClick={handleCancelFilter}  style={{display:currentCategory?'flex':'none'}}/> 
    {currentCategory? 
  currentCategory
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' '):"Browse All"}
 
  </div>
  <div className="store-filter-button-div" onClick={() => sideBarsetToggled(false)}>
     <RxHamburgerMenu  className="store-filter-button"  />
     </div>
  </div>

      </div>
  
      </div>
 




      <div className="store-layout">

       
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

{/*             {isLoading && (
              <div className="Loading-Overlay">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="Loading-Product"></div>
                ))}
              </div>
            )} */}
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
