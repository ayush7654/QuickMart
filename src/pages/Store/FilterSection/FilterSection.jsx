import React from 'react'
import { Check, CheckSquare } from 'lucide-react';
import useStoreFilterData from '../useStoreFilterData';
import PriceFilter from './PriceFilter/PriceFilter';
import './FilterSection.css'



export default function FilterSection() {
    
    const {storeFilters} = useStoreFilterData();
    
    const storeColors = [
      {name:'Black', color:'rgba(118, 118, 118, 1)'},
      {name:'Gtey', color:'rgb(0,0,0)'},
      {name:'Brown', color:'rgba(62, 15, 15, 1)'},
      {name:'Green', color:'rgba(15, 55, 42, 1)'},
      {name:'Copper', color:'rgba(66, 48, 24, 1)'},
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
  {storeFilters.map((filter,index)=>
  <div key={index} className="filter-check">
    <span className={`filter-checkbox ${filter.state?'filter-ticked':''}`}>
       <Check className='filter-checkbox-icon'/>
      </span>
    <span>{filter.name}</span>
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
  {storeColors.map((color,index)=><div key={index} className="store-color" style={{backgroundColor:color.color}}></div>)}
  </div>
</div>
</div>
    
  )
}
