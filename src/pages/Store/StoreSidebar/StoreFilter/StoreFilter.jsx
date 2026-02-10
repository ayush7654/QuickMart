import React from 'react'
import useStoreFilterData from '../../useStoreFilterData'
import { X } from 'lucide-react';
import AnimatedUnderline from '../../../../components/AnimatedUnderline/AnimatedUnderline';
import ScrollButton from '../../../../components/ScrollingButton/ScrollingButton';
import '../StoreSidebar.css'
import IconButton from '../../../../components/IconButton/IconButton';



export default function StoreFilter({setSideFilterToggled,storeFilters,setStoreFilters, filterActive}) {

 /*  const {storeFilters,setStoreFilters,filterLogicMap} = useStoreFilterData(); */

 const ClearAllFilters=()=>{
    setStoreFilters(prev =>
    prev.map(filter => ({
      ...filter,
      state: false
    }))
  )
 }
  return (
    <div
     
      className="store-Category"
    >

<div className='store-Category-head-div'>
  <div className='store-Category-head-content'>
      <span>SELECT FILTERS</span>
  <span className='store-Category-cancel'
        onClick={()=>setSideFilterToggled(true)}>

    <X size={24} strokeWidth={1.5}  />

  </span>
  </div>

  
</div>

 <div className='store-categories-wrapper'>

    <div className="store-categories" >
        
          {storeFilters.map((item, index) =>
            <div className='store-category-div'
               onClick={() =>
      setStoreFilters(prev =>
        prev.map(f =>
          f.filter === item.filter
            ? { ...f, state: !f.state }
            : f
        )
      )
    }
              key={index}
            >
              <span className={`store-category ${item.state === true ? "store-category-selected" : ""}`}>
                <AnimatedUnderline
                 from='left' 
                 exit='same' 
                 offset={8}>
                    <span className='store-category-text' >
                        {item.name}
                    </span>
                 </AnimatedUnderline>
                </span>
            </div>
          )}
        </div>
 </div>
      
        
      <div className='category-clear-div-wrapper'>
    <div
     style={{pointerEvents:filterActive?'':'none'}}
    onClick={ClearAllFilters}
      className='category-clear-div'>
       <ScrollButton
       text='Clear Filters'
       color={filterActive?'black':'rgba(65,65,65, 1)'}
        theme="buttonFilled"
        themeOnHover="buttonOutline"

       />

   </div> 
   </div>


    </div>
  )
}
