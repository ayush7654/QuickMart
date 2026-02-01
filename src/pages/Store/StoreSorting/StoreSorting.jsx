import React ,{useState,  useEffect, useRef} from 'react'
import './StoreSorting.css'
import { HiOutlineCollection } from "react-icons/hi";
import IconButton from '../../../components/IconButton/IconButton';
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { MdFilterList } from "react-icons/md";
import { MdStar, MdStarBorder } from 'react-icons/md';
import { MdAttachMoney, MdPercent } from "react-icons/md";
import { ArrowDownUp, ArrowLeftRight, Repeat2 } from 'lucide-react';
export default function StoreSorting({isIdle,sortOrder,currentSort,setCurrentSort,toggleSortOrder,typeFilter,sideBartoggled, setSideBarToggled,setStoreFilters,storeFilters,setSideFilterToggled,sideFiltertoggled,filterActive, productCount,activeFiltersCount}) {
  
  const SortArray = [
    { name: 'Price', sort: 'price' ,Icon: MdAttachMoney },
  
    { name: 'Rating', sort: 'rating' , Icon: MdStarBorder },
   
    { name: 'Discount', sort: 'discountPercentage', Icon: MdPercent }

  ];

    const [isSortOpen, setIsSortOpen] = useState(false);
  const sortPanelRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (
      isSortOpen &&
      sortPanelRef.current &&
      !sortPanelRef.current.contains(e.target)
    ) {
      setIsSortOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isSortOpen]);




  return (
         <div style={{
              transform: window.innerWidth>500 && isIdle? 'translateY(-0%)':'translateY(0%)' /* -15% */
            
            }} 
            className="sticky-sort-container">
             <div className="current-sort-container-div">
            <div className="current-sort-container">

              <div className='store-header-blur-div'></div>


<div className='store-iconBtn-wrapper'>

  <div onClick={()=>setSideFilterToggled(false)}>
  <IconButton
text={`Filters (${activeFiltersCount})`}
Icon={HiOutlineAdjustmentsHorizontal}
strokeWidth={1.5}

state = {filterActive || !sideFiltertoggled? true: false}

/>
</div>

<div onClick={() =>  setSideBarToggled(false)}>
  <IconButton
text='Categories'
Icon={ HiOutlineCollection}
strokeWidth={1.5}
state={typeFilter || !sideBartoggled?true:false}

/>


 
</div> 

<div className='sort-dropDown-div'>


<div   onClick={()=>setIsSortOpen(true)}>
   <IconButton
 
  text={currentSort? currentSort.name: 'Sort By'} 
/* text={`Sort By : ${currentSort?currentSort.name:''}` } */
  Icon={currentSort?currentSort.Icon: MdFilterList} 
  state={currentSort || isSortOpen ?true:false}
/>
</div>
 


  <div  ref={sortPanelRef} 
  className={`sorting-panel ${isSortOpen?'sort-panel-visible':''}`}>
 { SortArray.map((item,index)=>
 <div key={index}
 className={`store-sort-div ${currentSort?.name===item.name?'store-sort-selected':''}`}
 onClick={()=>
  {setCurrentSort(item);
   setIsSortOpen(false);                 
 }
 
 }
 >
 <span className='sort-Icon'><item.Icon/></span>
 <span>{item.name}</span> 
  </div>)}

  <div className='clear-store-sort-div' >
  <span onClick={(e)=>{
     e.stopPropagation();
    setCurrentSort(null)
    setIsSortOpen(false)}}>
      Clear</span>
  </div>
  </div>


</div>

</div>



<div className='store-header-info-wrapper'>
 



<div className={`order-toggle-div ${currentSort?'order-visible':''}`} onClick={toggleSortOrder}>
  
  <span>{sortOrder==='asc'?'Low':'High'}</span>
  < ArrowLeftRight className='order-icon' strokeWidth={1.3}/>
  <span>{sortOrder==='asc'?'High':'Low'}</span>

</div>

 <div className='product-count-div'>
    Showing <span>{productCount} </span>products
    </div>
</div>

  



      </div>
      </div>
            </div>
  )
}
