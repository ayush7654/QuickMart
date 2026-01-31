import React ,{useState,  useEffect, useRef} from 'react'
import './StoreSorting.css'
import { SlidersHorizontal } from 'lucide-react';
import AnimatedUnderline from '../../../components/AnimatedUnderline/AnimatedUnderline';


import { HiOutlineCollection } from "react-icons/hi";
import Categories from './../../Home/Categories/Categories';
import IconButton from '../../../components/IconButton/IconButton';
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { MdSort, MdOutlineSwapVert } from "react-icons/md";
import { MdFilterList, MdOutlineFilterAlt, MdOutlineTune } from "react-icons/md";
import { MdStar, MdStarBorder, MdStarHalf } from 'react-icons/md';
import { MdAttachMoney, MdPercent } from "react-icons/md";
export default function StoreSorting({isIdle,sortOrder,currentSort,setCurrentSort,toggleSortOrder,typeFilter,sideBartoggled, setSideBarToggled,setStoreFilters,storeFilters,setSideFilterToggled}) {
  
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


console.log('sort is  ' , currentSort)

  return (
         <div style={{
              transform: window.innerWidth>500 && isIdle? 'translateY(-0%)':'translateY(0%)' /* -15% */
            
            }} 
            className="sticky-sort-container">
             <div className="current-sort-container-div">
            <div className="current-sort-container">


<div className='sideBar-btn-wrapper'>

  <div onClick={()=>setSideFilterToggled(false)}>
  <IconButton
text='Filters'
height='2.5rem'
width='12rem'
Icon={HiOutlineAdjustmentsHorizontal}
strokeWidth={1.5}

/>
</div>

<div onClick={() =>  setSideBarToggled(false)}>
  <IconButton
text='Categories'
height='2.5rem'
width='12rem'
Icon={ HiOutlineCollection}
strokeWidth={1.5}


/>


 
</div> 
</div>





<div className='sort-dropDown-div'>


<div   onClick={()=>setIsSortOpen(true)}>
   <IconButton
  height='2.5rem'
 width='12rem'
  text={currentSort?currentSort.name: 'Sort By'}
  Icon={currentSort?currentSort.Icon: MdFilterList} 
/>
</div>
 


  <div  ref={sortPanelRef} 
  className={`sorting-panel ${isSortOpen?'sort-panel-visible':''}`}>
 { SortArray.map((item)=>
 <div 
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
      </div>
            </div>
  )
}
