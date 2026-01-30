import React ,{useState} from 'react'
import './StoreSorting.css'
import { SlidersHorizontal } from 'lucide-react';
import AnimatedUnderline from '../../../components/AnimatedUnderline/AnimatedUnderline';
import ScrollButton from '../../../components/ScrollingButton/ScrollingButton';
import SortDropdown from '../SortDropDown/SortDropDown';
import { HiOutlineCollection } from "react-icons/hi";
import Categories from './../../Home/Categories/Categories';
import IconButton from '../../../components/IconButton/IconButton';


export default function StoreSorting({isIdle,sortOrder,currentSort,setCurrentSort,toggleSortOrder,typeFilter,sideBartoggled, setSideBarToggled,setStoreFilters,storeFilters,setSideFilterToggled}) {
  


console.log('sort order is ' , sortOrder)

  return (
         <div style={{
              transform: window.innerWidth>500 && isIdle? 'translateY(-0%)':'translateY(0%)' /* -15% */
            
            }} 
            className="sticky-sort-container">
             <div className="current-sort-container-div">
            <div className="current-sort-container">



            


<div className='sort-dropDown-div'>
{/* 
<IconButton
text='Sort By'
width='12rem'
height='2.5rem'/> */}
 

 <div>list</div>

   <SortDropdown
    currentSort={currentSort} 
  setCurrentSort={setCurrentSort}
  AnimatedUnderline={AnimatedUnderline}
  sortOrder={sortOrder}
  toggleSortOrder={toggleSortOrder}/>


</div>

{/*   <div className='filter-wrapper'>
  {storeFilters.map((item)=>
  <div className={`filter-div ${item.state?'filter-div-selected':''}`}
   onClick={() =>
      setStoreFilters(prev =>
        prev.map(f =>
          f.filter === item.filter
            ? { ...f, state: !f.state }
            : f
        )
      )
    }
     >
    {item.name}
    </div>)}


</div>  */}
 




<div onClick={()=>setSideFilterToggled(false)}>
  <IconButton
text='Filters'
height='2.5rem'
width='12rem'

/>
</div>

<div onClick={() =>  setSideBarToggled(false)}>
  <IconButton
text='Categories'
height='2.5rem'
width='12rem'


/>


 
</div> 

      </div>
      </div>
            </div>
  )
}
