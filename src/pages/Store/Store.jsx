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
import { WinScrollContext } from "../../components/WinScrollProvider/WinScrollProvider";
import AnimatedUnderline from "../../components/AnimatedUnderline/AnimatedUnderline";
import { IoCloseCircle } from "react-icons/io5";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { ArrowUpDown } from 'lucide-react';
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import BracketButton from "../../components/BracketButton/BracketButton";
import ScrollButton from "../../components/ScrollingButton/ScrollingButton";
import StoreHeader from "./StoreHeader/StoreHeader";
import StoreSorting from "./StoreSorting/StoreSorting";
import SortDropdown from "./SortDropDown/SortDropDown";
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
  const [sideBartoggled, sideBarsetToggled] = useState(true);
  const [currentSort,setCurrentSort] = useState(null);
  const [sortOrder,setSortOrder] = useState(null)
  const { isIdle, isAtTop } = useContext(WinScrollContext);





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

  const toggleSortOrder=(order)=>{
    setSortOrder(order)
  }

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
  if (!FinalItems) return null;

  let items = [...FinalItems]; // copy to avoid mutation

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
}, [FinalItems, currentSort, typeFilter, location.search, sortOrder]);



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

 console.log('current sort is ', currentSort)
  
  return (
    <div className="Store-Page">
        

      <div style={{display:sideBartoggled?'none':'flex'}} className="storePage-overlay"></div>

    

   <div className="store-head-div">
    <div className="store-head">THE VAULT</div>
    <div className="store-head-description">
The Vault is a carefully guarded collection of premium products, chosen for those who value quality over quantity. Each item earns its place — nothing more, nothing less. 
    </div>

   </div>
   
 




      <div className="store-layout">


        
    <StoreSorting
      isIdle={isIdle}
      currentSort={currentSort}
      setCurrentSort={setCurrentSort}
      sortOrder={sortOrder}
      toggleSortOrder={toggleSortOrder}
      typeFilter={typeFilter} 
      sideBartoggled={sideBartoggled}
      sideBarsetToggled={sideBarsetToggled}/> 



      
       <div className="store-page-heading-wrapper">
          <div className="store-page-heading">
                 <div 
                 
                 className="store-all-link"
                 onClick={(e) => { e.stopPropagation();   // ⛔ stops parent onClick
                                 handleCancelFilter();  // ✔ your original function
              }}>Product Catelog</div>
        
            
                 
                   <div className='store-category-head'>{ typeFilter?typeFilter.split('-')
                       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                       .join(' '):'Home Accessories'} 
                  </div>  
              </div>
            </div>

    
 


       <div className="filter-Btn-Ph"onClick={() => sideBarsetToggled(false)}>
          <SlidersHorizontal className="" strokeWidth={1.5} />
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
            handleCancelFilter ={handleCancelFilter}
          />
        </aside>

        <main className="store-content"  /* style={{ marginTop:window.innerWidth < 400 && typeFilter? "2rem": "0"}} */>
       


          <div className="productList-wrapper" style={{ position: "relative" }}>
            
            <div className="productList">{productElements}</div>
          </div>

         
        </main>
      </div>
 {!typeFilter && (
            <div className="LoadMore-button-div" >
              
                  <div className="LoadMore-button" onClick={handleLoadMore}>
            <ScrollButton
  text='Load More'
  theme={'lightMode'}
  color="#cf7729ff"
  themeOnHover={'colorMode'}
/>
              </div> 

            
            </div>
          )}


      <StoreFooter />
    </div>
  );
}
