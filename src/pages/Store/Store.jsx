import { useState, useEffect, useContext, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getItems ,getFilteredItems} from "../../api";
import { BreadCrumbContext } from "../../App";
import PageNav from "../../components/Paginization/PageNav";
import ProductCard from "../../components/ProductCard";
import { ChevronLeft, ChevronRight } from 'react-feather'
import { useLocation } from "react-router-dom";
import './Store.css'
export default function Store() {

  const ProductCache=useRef({})
  const FilteredItemsCache=useRef({})
  const [isLoading,setIsLoading]= useState(false)
  const [FilteredProducts, setFilteredProducts] = useState();
  const [productCategory,setProductCategory]= useState([])

  const location= useLocation()

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
   
    setcurrentCategory(category)
    setSearchParams({type:category})
  }


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
   
  },[currentCategory,typeFilter])

  useEffect(()=>{
    setPageNavArr(prev=>prev.map(num=>num+(page.current>10?page.current-10:null)))
   
  },[])


   const DisplayedItems= ProductCache.current[Number(PageNumber)]

  const FinalItems = typeFilter ? FilteredItemsCache.current[typeFilter] : DisplayedItems;

  const productElements = FinalItems && FinalItems.map((product) => (
    <ProductCard
    classname='store-product'
      key={product.id}
      id={product.id}
      images={product.images}
      title={product.title}
     // searchParams={searchParams}
      price={product.price}
      path={location.search}
      
    
     
  />
  ))


 const getPagesStyle=(i)=>{
    return { backgroundColor: page.current === i? "rgb(163, 184, 221)" : null }
 }
  return (
    <div className="Store-Page">
      <div style={{width:'100%', backgroundColor:'white'}}>
      <div className="Store-filter">
        <div className={currentCategory?"allBtn":"allBtn-selected"} onClick={()=>setcurrentCategory('')}><Link style={{color:'black'}} to='/store?page=1'>All</Link></div>
        <div className="Store-filter-left" onClick={()=>handleCategory('left')}><ChevronLeft/></div>
        <div style={{overflow:'hidden',width:'85%'}}> <div className="store-categories"  style={{translate:`${-CategoryNum*200}px`}}>{productCategory && productCategory.map((item,index)=><div onClick={()=>handleFilter(item.slug)} className={item.slug===typeFilter?"store-category-selected" :"store-category"} key={index}>{item.name}</div>)}</div></div>
        <div className="Store-filter-right" onClick={()=>handleCategory('right')}><ChevronRight/></div>
      </div>
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
    <div className="store-footer-info" style={{padding:'1rem'}}>
      <div className="store-footer-heading">Top Stories: Brand Directory</div>
      <div className="store-footer-list">
        <div id='store-footer-subhead' className="store-footer-info-a">
          <span>MOST SEARCHED FOR ON FLIPKART:</span><span id='store-footer-products'>&nbsp;&nbsp;SAMSUNG F16 | Summer Sale | Mobile | POCO M7 | Nothing Phone 3a | iPhone 16 | SAMSUNG Galaxy S25 Ultra | SAMSUNG Galaxy S25 Plus | SAMSUNG Galaxy S25 | iPhone 16e | iPhone 16 Plus | iPhone 16 Pro | iPhone 16 Pro Max | vivo V50 | OPPO Reno13 Pro | POCO X7 | realme 14 Pro Plus | REDMI Note 14 Pro+ 5G | Whoop Band | OPPO Find X8 | Flipkart Minutes | Flipkart Exchange | Flipkart Reset | Nothing Phone 2a Plus | Sarees | CMF by Nothing Phone 1 | Pocket Bazaar | Xiaomi 14 CIVI | Infinix Note 40 Pro 5G | Infinix Note 40 5G | iPhone 15 Plus | vivo X Fold3 Pro | Motorola g04s | Vivo x 100 | OnePlus Nord CE 3 Lite 5G | Spoyl Store | SAMSUNG Flip5 | SAMSUNG Fold5 | Flipkart Axis Bank Super Elite Credit card | 5G Mobile Phones | Primebook Laptops | Moto Edge 40 | Grievance Redressal | OPPO Reno7 Pro 5G | Help Centre | Track Orders | Manage Orders | Return Orders | Gift Cards Store | Flipkart Axis Bank Credit Card | Pay Later</span>
        </div>
        <div id='store-footer-subhead' className="store-footer-info-b">
          <span>MOBILES:</span><span  id='store-footer-products'>&nbsp;&nbsp;Motorola g64 5G | OPPO Reno 12 | Motorola Edge 50 Fusion | REDMI 12 5G | REDMI Note 13 5G | Realme 12+ 5G | POCO C65 | Motorola G84 | Realme C53 | Infinix Smart 8 | Samsung Galaxy S23 5G | Samsung Galaxy S21 FE 5G Qualcomm | vivo V30 | Samsung Galaxy S24 5G | iPhone 12 64GB | iPhone 12 512GB | iPhone 12 128GB | Vivo Y15 | SAMSUNG Galaxy S21 FE 5G | Infinix HOT 30i | Realme 10 Pro 5G | MOTOROLA G62 5G | Nothing Phone | REDMI Note 12 Pro 5G | Infinix SMART 7 | Vivo Y12 | Oppo A12 | Motorola 5g Phone | Realme 5g Smartphone | Apple 5g Phone | Iqoo 5g Phones | Oneplus 5g Phones | Vivo 5g Phones | Oppo 5g Smart Phones | Oppo F15 | Oppo A31 | Samsung A71 | Samsung A31 | 4G Mobile | Nokia Mobile | Samsung Mobile | iphone | Oppo Mobile | Vivo Mobile</span>
        </div>
        <div id='store-footer-subhead' className="store-footer-info-c">
          <span>CAMERA:</span><span  id='store-footer-products'>&nbsp;&nbsp;GoPro Action Camera | Nikon Camera | Canon Camera | Sony Camera | Canon DSLR | Nikon DSLR</span>
        </div>
        <div id='store-footer-subhead' className="store-footer-info-d">
          <span>LAPTOPS:</span><span  id='store-footer-products'>&nbsp;&nbsp;Asus ROG Ally | MacBook Pro M2 | Premium Laptop | ASUS ROG Strix SCAR 16 (2023) Core i9 13th Gen | ASUS ROG Zephyrus M16 (2023) Core i9 13th Gen | ASUS Zenbook 14 OLED (2022) | Realme Book Prime Core i5 11th Gen | Microsoft Surface Go Pentium 128GB | Apple Laptops | Acer Laptops | Lenovo Laptops | Dell Laptops | Asus Laptops | HP Laptops | Gaming Laptops | 2 in 1 Laptops | Laptops | Dell latest laptops 2022 | HP latest laptops | Infinix INBook Y1 Plus | SAMSUNG Galaxy Book3 | 12th Gen Intel Core Laptops</span>
        </div>
        <div id='store-footer-subhead' className="store-footer-info-e">
          <span>LARGE APPLIANCES:</span><span  id='store-footer-products'>&nbsp;&nbsp;Television | Washing Machines | Refrigerators | Air Conditioners | Electric Cookers | Electric Jug(Heater) / Travel Kettles | Induction Cooktops | Inverters / stabilizer | Irons / Iron Box | Mixer Grinder Juicer | Wet Grinders | Chimneys | Microwave Ovens | Vacuum Cleaners | Water Purifier | Fan
</span>
        </div>
        <div id='store-footer-subhead' className="store-footer-info-f">
          <span>CLOTHING:</span><span  id='store-footer-products'>&nbsp;&nbsp;Sarees | Green bridal lehenga | Tops for Doctors | Shoes | Sunglasses | Bridal Blouse | Half saree blouse designs | Designer blouses | Blouse designs | Shirts | Cotton saree blouse designs | Groom wedding sherwani | Designer Salwar Suits | Bra | Cotton simple blouse designs | Banarasi saree blouse designs | Stylish blouse astin design | Track Pant | Blouse neck designs | Kurtas | Party Dresses | Palazzo Suits | Anarkali | Gowns | Cut out dress | Salwar Suits | Kurtis | Designer Sarees | Leggings | Shorts | Georgette Sarees | Ethnic Wear | uppada pattu sarees | Blouse back design | Jodhpur pants</span>
        </div>
        <div id='store-footer-subhead' className="store-footer-info-g">
          <span>FOOTWEAR:</span><span  id='store-footer-products'>&nbsp;&nbsp;Adidas Shoes | Reebok Shoes | Nike Shoes | Puma Shoes | Boots | Bata Shoes | Crocs | Woodland Shoes | Skechers Shoes | Asics Sports Shoes | Formal Shoes | School Shoes | Sneakers | Womens Boots | Sports Shoes | Loafers | Sandals | Lotto Sports Shoes | Casual Shoes | Womens Skechers Shoes</span>
        </div>
        <div id='store-footer-subhead' className="store-footer-info-h">
          <span>GROCERIES:</span><span  id='store-footer-products'>&nbsp;&nbsp;PhonePe Grocery Voucher | Hand Wash | Soap | Cashew Nuts | Sunflower Oil | Eggs | Toilet Cleaner | Harpic Toilet Cleaner | Dettol Soap | Mustard Oil | Biscuits | Cheese | Patanjali Atta | Fortune Oil | Aashirvaad Atta | Tea</span>
        </div>
      </div>
    </div>
    </div>
  );
}
