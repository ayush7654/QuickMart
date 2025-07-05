import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo,
} from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { getItems, getFilteredItems } from "../../api";

import ProductCard from "../../components/ProductCard";
import StoreFilter from "./StoreFilter/StoreFilter";
import StoreFooter from "./StoreFooter/StoreFooter";

import "./Store.css";

export default function Store() {
  const ProductCache = useRef({});
  const FilteredItemsCache = useRef({});
  const scrollPositionRef = useRef(0);

  const [batchCount, setBatchCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [renderTrigger, setRenderTrigger] = useState(0);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentCategory, setcurrentCategory] = useState("");

  const typeFilter = searchParams.get("type");

  const handleFilter = (category) => {
    setcurrentCategory(category);
    setSearchParams({ type: category });
  };

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
      <div className="store-page-heading-div">
        <div className="store-page-heading">{currentCategory?  <div >
  {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
</div>:<div>Store.<span style={{color:'rgb(100,100,100)',fontSize:'2rem'}} > The best way to buy the products you love.</span></div>}</div>
      </div>
      <div className="store-layout">
        <aside className="store-sidebar">
          <StoreFilter
            currentCategory={currentCategory}
            handleClickFilter={handleFilter}
            handleClickCategory={() => setcurrentCategory("")}
            typeFilter={typeFilter}
          />
        </aside>

        <main className="store-content">
          <div className="productList-wrapper" style={{ position: "relative" }}>
            <div className="productList">{productElements}</div>

            {isLoading && (
              <div className="Loading-Overlay">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="Loading-Product"></div>
                ))}
              </div>
            )}
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
