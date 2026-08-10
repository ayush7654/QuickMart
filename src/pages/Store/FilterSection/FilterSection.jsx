import React from 'react'
import { Check, CheckSquare } from 'lucide-react';
import { useStoreFilter } from '../../../components/StoreFilterContext';
import PriceFilter from './PriceFilter/PriceFilter';
import { X } from 'lucide-react';
import './FilterSection.css'
import StoreAccordion from '../StoreAccordion/StoreAccordion';
import { div } from 'framer-motion/client';
import { useStoreData } from '../../../components/StoreDataContext';

     const SortArray = [
        { name: 'Price , High to Low', sort: 'price' , order:'desc'  },
        { name: 'Price , Low to High', sort: 'price' , order:'asc' },
      
        { name: 'Highest Rated', sort: 'rating' , order:'desc' },
     
       
        { name: 'Biggest Savings', sort: 'discountPercentage' , order:'desc'},
        
    
      ];

          


export default function FilterSection({setSideFilterOn}) {
    
    
    const {storeFilters,setStoreFilters,setAppliedFilters,storeFilterColors,setStoreFilterColors} = useStoreFilter();

      const {currentSort,toggleSortOrder,typeFilter,handleSort,currentCategory,handleTypeFilter,isOpen, setIsOpen} = useStoreData()

    const toggleColor = (id) => {
  setStoreFilterColors(prevColors => 
    prevColors.map(color => 
      color.id === id ? { ...color, active: !color.active } : color
    )
  );
};

  return (<div className='store-side-filter-wrapper'>




    <div className="side-filter-header">
     <div>SORT & FILTERS</div>
     <span onClick={()=>setSideFilterOn(false)}><X /></span>

  </div>

  <div className="store-side-filter" data-lenis-prevent>
<div className="sort-selector-wrapper">
 {SortArray.map((sort)=>
      <div className="filter-check"
      onClick={()=>
  {handleSort(sort);
   toggleSortOrder(sort.order)
             
 }
 
 }

  >
    <span className={`filter-checkbox ${currentSort?.name===sort.name?'filter-ticked':''}`}>
       <Check className='filter-checkbox-icon'/>
      </span>
    <span>{sort.name}</span>
  </div>
)}
</div>

<StoreAccordion 
storeFilters={storeFilters}
setStoreFilters={setStoreFilters}/>

<div className='filter-section-wrapper'>

<PriceFilter/>

<div className="color-wrapper">
  <div className="filter-header">
        <span>Color</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
  <div className="store-color-wrapper">
  {storeFilterColors.map((color) => (
  <div 
    key={color.id} 
    className={`store-color ${color.active ? 'store-color-active' : ''}`}
    onClick={() => toggleColor(color.id)}
  >
    <span 
      style={{ backgroundColor: color.color }} 
      className='store-color-content'
    ></span>
  </div>
))}
  </div>
</div>
</div>

</div>


  </div>
    

    
  )
}
