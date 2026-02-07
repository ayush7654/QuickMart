import React ,{useState,  useEffect, useRef} from 'react'
import './StoreSorting.css'
import { HiOutlineCollection } from "react-icons/hi";
import IconButton from '../../../components/IconButton/IconButton';
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { MdFilterList } from "react-icons/md";
import { MdStar, MdStarBorder } from 'react-icons/md';
import { MdAttachMoney, MdPercent } from "react-icons/md";
import { ArrowDownUp, ArrowLeftRight, Repeat2 ,ListFilter} from 'lucide-react';
import StoreFilter from '../StoreSidebar/StoreFilter/StoreFilter';
import AnimatedUnderline from '../../../components/AnimatedUnderline/AnimatedUnderline';

export default function StoreSorting({isIdle,sortOrder,currentSort,toggleSortOrder,typeFilter,sideBartoggled, setSideBarToggled,setSideFilterToggled,sideFiltertoggled,filterActive,activeFiltersCount,handleSort,currentCategory}) {
  
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

              <div className='store-header-info-wrapper'>
 



<div className='sort-head-title'>{typeFilter?currentCategory.replaceAll('-', ' '):'All Products'}</div>


</div>







<div className='product-sort-wrapper'>
  <div onClick={() => setSideBarToggled(false)} className={`product-sort ${typeFilter || !sideBartoggled?'sort-active':''}`} >
   <span className='product-sort-icon'><HiOutlineCollection strokeWidth={1} /></span> 
    <span>Categories</span>
    </div>

      <div onClick={()=>setSideFilterToggled(false)}  className={`product-sort ${filterActive || !sideFiltertoggled?'sort-active':''}`}>
   <span className='product-sort-icon'>< HiOutlineAdjustmentsHorizontal strokeWidth={1} /></span> 
    <span>{`Filters (${activeFiltersCount})`}</span>
    </div>

    

    <div className='sort-dropDown-div'>




  <div onClick={()=>setIsSortOpen(true)} className='product-sort'>
   <span className='product-sort-icon'><ListFilter strokeWidth={1}  /></span> 
    <span>Sort By </span>

    
    </div>
 


  <div  ref={sortPanelRef} 
  className={`sorting-panel ${isSortOpen?'sort-panel-visible':''}`}>
 { SortArray.map((item,index)=>
 <div key={index}
 className={`store-sort-div ${currentSort?.name===item.name?'store-sort-selected':''}`}
 onClick={()=>
  {handleSort(item);
   setIsSortOpen(false);                 
 }
 
 }
 >


 {item.name}

  <span className='sort-Icon'><item.Icon/></span>
  </div>)}


  </div>


</div>

<div className={`order-toggle-div ${currentSort?'order-visible':''}`} onClick={toggleSortOrder}>
  
  <span>{sortOrder==='asc'?'Low':'High'}</span>
  < ArrowLeftRight className='order-icon' strokeWidth={1.3}/>
  <span>{sortOrder==='asc'?'High':'Low'}</span>

</div>

</div>
  



      </div>
      </div>


            </div>
  )
}
