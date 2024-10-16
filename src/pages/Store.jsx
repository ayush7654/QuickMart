import { useState, useEffect, useContext, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getItems ,getFilteredItems} from "../api";
import { BreadCrumbContext } from "../App";
import PageNav from "../components/Paginization/PageNav";
import ProductCard from "../components/ProductCard";
import { ChevronLeft, ChevronRight } from 'react-feather'
import ProductDetails from './ProductDetails';
export default function Store() {

  const ProductCache=useRef({})
  const FilteredItemsCache=useRef({})
  const [isLoading,setIsLoading]= useState(false)
  const [FilteredProducts, setFilteredProducts] = useState();
  const [productCategory,setProductCategory]= useState([])

 const page= useRef(1)
 const [PageNavArr,setPageNavArr]= useState([1,2,3,4,5,6,7,8,9,10])


  const [searchParams, setSearchParams] = useSearchParams();

  const [currentCategory, setcurrentCategory] = useState('');
  const [CategoryNum, setCategoryNum]= useState(0) 

  const typeFilter = searchParams.get("type");
  const PageNumber = searchParams.get("page");

  const handleCategory=(direction)=>{
    setCategoryNum(prev=>{
      if(direction==="left"){
        if(prev>0){
          return prev-1
        }
      
      }else{
        if(prev<10){
          return prev+1;
        }
      }
    })
  }

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
 
  const handleFilter=(category)=>{
    console.log("current Categoryis ", category)
    setcurrentCategory(category)
    setSearchParams({type:category})
  }

/*    const[BreadCrumbs,setbreadcrumbs]= useContext(BreadCrumbContext)
    const handleBreadCrumb=(category,title)=>{
        setbreadcrumbs(prev=>[...prev,">"+category,">"+title])

    }  */

 useEffect(()=>{
 const fetchCategory= async()=>{
 const response= await fetch("https://dummyjson.com/products/categories")
 const data = await response.json()
 setProductCategory(data)
 }
 fetchCategory();
 },[])

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
   
  },[currentCategory])

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
     // searchParams={searchParams}
      price={product.price}
     
  />
  ))
 const getPagesStyle=(i)=>{
    return { backgroundColor: page.current === i? "rgb(172, 167, 167)" : null }
 }
  return (
    <div className="Store-Page">
      <div className="Store-filter">
        <div className={currentCategory?"allBtn":"allBtn-selected"} onClick={()=>setcurrentCategory('')}><Link style={{color:currentCategory?'black':'white'}} to='/store?page=1'>All</Link></div>
        <div className="Store-filter-left" onClick={()=>handleCategory('left')}><ChevronLeft/></div>
        <div style={{overflow:'hidden',width:'85%'}}> <div className="store-categories"  style={{translate:`${-CategoryNum*200}px`}}>{productCategory && productCategory.map((item,index)=><div onClick={()=>handleFilter(item.slug)} className={item.slug===typeFilter?"store-category-selected" :"store-category"} key={index}>{item.name}</div>)}</div></div>
        <div className="Store-filter-right" onClick={()=>handleCategory('right')}><ChevronRight/></div>
      </div>
        
      <div className="productList">
        {isLoading?<h2>Loading...</h2>:productElements}
      </div>

    {!typeFilter &&  <div className="pagination">
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
      </div>} 
    </div>
  );
}
