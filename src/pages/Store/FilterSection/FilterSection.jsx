import React from 'react'
import { Check, CheckSquare } from 'lucide-react';
import useStoreFilterData from '../useStoreFilterData';
import PriceFilter from './PriceFilter/PriceFilter';
import './FilterSection.css'



export default function FilterSection({storeFilters, setStoreFilters,setAppliedFilters}) {
    
    
    
    const storeColors = [
      {name:'Black', color:'rgb(161, 161, 161)'},
      {name:'Gtey', color:'rgb(0,0,0)'},
      {name:'Brown', color:'rgb(141, 42, 42)'},
      {name:'Green', color:'rgb(35, 122, 95)'},
      {name:'Copper', color:'rgb(55, 86, 174)'},
    ] 

  return (
    
<div className="store-side-filter">
 <h2>Filter Products</h2>

 <div className="filter-section">
<div className="filter-header">
        <span>Select Filters</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
 <div className="filter-wrapper">
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
 </div>

<PriceFilter/>

<div className="color-wrapper">
  <div className="filter-header">
        <span>Color</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
  <div className="store-color-wrapper">
  {storeColors.map((color,index)=><div key={index} className="store-color"   >
    <span style={{backgroundColor:color.color}}   className='store-color-content'></span>
  </div>)}
  </div>
</div>
</div>
    
  )
}
