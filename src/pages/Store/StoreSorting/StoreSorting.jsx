import React ,{useState} from 'react'
import './StoreSorting.css'
import { SlidersHorizontal } from 'lucide-react';
import AnimatedUnderline from '../../../components/AnimatedUnderline/AnimatedUnderline';
import ScrollButton from '../../../components/ScrollingButton/ScrollingButton';
import SortDropdown from '../SortDropDown/SortDropDown';
export default function StoreSorting({isIdle,sortOrder,currentSort,setCurrentSort,toggleSortOrder,typeFilter,sideBartoggled,sideBarsetToggled,storeFilters,setStoreFilters}) {
  


console.log('sort order is ' , sortOrder)

  return (
         <div style={{
              transform: window.innerWidth>500 && isIdle? 'translateY(-0%)':'translateY(0%)' /* -15% */
            
            }} 
            className="sticky-sort-container">
             <div className="current-sort-container-div">
            <div className="current-sort-container">



            


<div className='sort-dropDown-div'>



   <SortDropdown
    currentSort={currentSort} 
  setCurrentSort={setCurrentSort}
  AnimatedUnderline={AnimatedUnderline}
  sortOrder={sortOrder}
  toggleSortOrder={toggleSortOrder}/>


</div>

<div className='filter-wrapper'>
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


</div>


<div className='category-div' onClick={() => sideBarsetToggled(false)}>
       <ScrollButton
  text={<div className='filter-button-content'><SlidersHorizontal className="select-category-icon" strokeWidth={1.5} />  <div className="select-category-head">Filter</div></div>}
  theme={!sideBartoggled || typeFilter ?"darkMode":'lightMode'}
  color="#cf7729ff"
  themeOnHover={typeFilter?'colorMode':'darkMode'}
/></div> 

      </div>
      </div>
            </div>
  )
}
