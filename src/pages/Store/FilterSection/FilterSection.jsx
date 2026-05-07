import React from 'react'
import { Check, CheckSquare } from 'lucide-react';
import { useStoreFilter } from '../../../components/StoreFilterContext';
import PriceFilter from './PriceFilter/PriceFilter';
import { X } from 'lucide-react';
import './FilterSection.css'
import StoreAccordion from '../StoreAccordion/StoreAccordion';




export default function FilterSection({setSideFilterOn}) {
    
    
    const {storeFilters,setStoreFilters,setAppliedFilters,storeFilterColors,setStoreFilterColors} = useStoreFilter();


    const toggleColor = (id) => {
  setStoreFilterColors(prevColors => 
    prevColors.map(color => 
      color.id === id ? { ...color, active: !color.active } : color
    )
  );
};

  return (<div className='store-side-filter-wrapper'>
    <div className="side-filter-header">
     <h2>FILTERS</h2>
     <span onClick={()=>setSideFilterOn(false)}><X /></span>

  </div>

  <div className="store-side-filter" data-lenis-prevent>
<StoreAccordion storeFilters={storeFilters}
setStoreFilters={setStoreFilters}/>

<div className='filter-section-wrapper'>
{/*    <div className="filter-section">
<div className="filter-header">
        <span>Select Filters</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
 <div className="filter-options-wrapper">
  {storeFilters.map((item,index)=>
  <div key={index} className="filter-check"
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
    <span className={`filter-checkbox ${item.state?'filter-ticked':''}`}>
       <Check className='filter-checkbox-icon'/>
      </span>
    <span>{item.name}</span>
  </div>)}
 </div>
 </div> */}

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
