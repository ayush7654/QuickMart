import { useState, useEffect, useContext, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { getItems ,getFilteredItems} from "../api";
import { BreadCrumbContext } from "../App";
import { debounce } from "lodash";
import PageNav from "../components/Paginization/PageNav";
import ProductCard from "../components/ProductCard";
export default function Store() {

  const ProductCache=useRef({})
  const FilteredItemsCache=useRef({})
  const [isLoading,setIsLoading]= useState(false)
  const [FilteredProducts, setFilteredProducts] = useState();

 const page= useRef(1)
 const [PageNavArr,setPageNavArr]= useState([1,2,3,4,5,6,7,8,9,10])


  const [searchParams, setSearchParams] = useSearchParams();

  const [inputFilter, setInputFilter] = useState("");

  const typeFilter = searchParams.get("type");
  const PageNumber = searchParams.get("page");


  const handlePage=(id)=>{
    page.current= id;
   setSearchParams({page:page.current})
    
  }
  const handleNav=(id)=>{
    if(id>PageNavArr[PageNavArr.length-1]){
      setPageNavArr(prev=>prev.map(num=>num+1))
    }else if(id<PageNavArr[0]){
      setPageNavArr(prev=>prev.map(num=>num-1))
    }
  }
  const handleInputField=(value)=>{
    setInputFilter(value)
  }
  const handleFilter=()=>{
    console.log("filter applied")
    setSearchParams({type:inputFilter})
  }

/*    const[BreadCrumbs,setbreadcrumbs]= useContext(BreadCrumbContext)
    const handleBreadCrumb=(category,title)=>{
        setbreadcrumbs(prev=>[...prev,">"+category,">"+title])

    }  */


  useEffect(() => {
   
    async function loadItems() {
      
      try {
        setIsLoading(true)
        const data = await getItems(Number(PageNumber),10);

       
        ProductCache.current[PageNumber]=data;
        setIsLoading(false)

       
      } catch (err) {
        console.log(err.message);
      }
    }
    if(PageNumber && ProductCache.current[PageNumber]===undefined){
        loadItems();
       
    }
    if(PageNumber!==null){
        page.current=Number(PageNumber)
      if (PageNumber === null) {
        setSearchParams({ page: 1 });
       
      } else {
        setSearchParams({ page:PageNumber });
      
      }
   
    }
  
  }, [PageNumber]);

  useEffect(()=>{
   async function loadFilteredItem(){
    try{
        const FilteredData= await getFilteredItems(typeFilter);
        setFilteredProducts(FilteredData)
        FilteredItemsCache.current[typeFilter]=FilteredData;
       
    }
    catch(err){
        console.log(err.message)
    }
   }
   if(typeFilter && FilteredItemsCache.current[typeFilter]===undefined){
    loadFilteredItem();
   }
   
  },[typeFilter])

  useEffect(()=>{
    setPageNavArr(prev=>prev.map(num=>num+(page.current>10?page.current-10:null)))
   
  },[])


   const DisplayedItems= ProductCache.current[Number(PageNumber)]

  const FinalItems = typeFilter ? FilteredItemsCache.current[typeFilter] : DisplayedItems;

  const productElements = FinalItems && FinalItems.map((product) => (
    <ProductCard
      key={product.id}
      id={product.id}
      images={product.images}
      title={product.title}
      searchParams={searchParams}
      price={product.price}
     
  />
  ))
 const getPagesStyle=(i)=>{
    return { backgroundColor: page.current === i? "rgb(172, 167, 167)" : null }
 }
  return (
    <div className="Store-Page">
      <div className="Store-filter">
        <input
          placeholder="What are you looking for?"
          value={inputFilter}
          onChange={(e)=>handleInputField(e.target.value)}
        />
        <div className="Filter-Button"  onClick={handleFilter}> Set Filter</div>
      </div>
       {typeFilter && FinalItems?(FinalItems.length===0?<div style={{padding:'20px',fontSize:'30px',fontWeight:500}}>No results found </div>:<div  style={{padding:'20px',fontSize:'18px'}}>{FinalItems.length} results found for {typeFilter}</div>):null}
      <div className="productList">
        {isLoading?<h2>Loading...</h2>:productElements}
      </div>

      <div className="pagination">
        {page.current>1 && <div className="nav-left" onClick={() => {handlePage(page.current-1),handleNav(page.current)}}>
          ←
        </div>}
       <PageNav
       pageArray= {PageNavArr}
        getPagesStyle={getPagesStyle}
        handlePage={handlePage}/>
        
        <div className="nav-right" onClick={() => {handlePage(page.current+1),handleNav(page.current)}}>
          →
        </div>
      </div>
    </div>
  );
}
