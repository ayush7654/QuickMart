import React from 'react'
import MenuCancel from '../../../components/MenuCancel/MenuCancel'
import { LayoutPanelLeft } from 'lucide-react'
import { X } from 'lucide-react'
import StoreActions from '../StoreActions/StoreActions'
import OrderToggle from '../OrderToggle/OrderToggle'
import './AppliedFilters.css'

export default function AppliedFilters({appliedFilters,removeFilter,handleRemoveColor,currentSort,toggleSortOrder}) {
  return (
       <div className="Active-Filters-wrapper">
          
     <div className="applied-filter-section">
        
  
     

      
               {/* try moving floating bar here */}


             {/* 1. Check if any filters actually exist to show the container */}
{appliedFilters.filters.length > 0 || appliedFilters.colors.length > 0 || appliedFilters.price.lowRange !== null||0 ? (
  <div className="applied-filter-wrapper">
    {/* Render Categories */}
    {appliedFilters.filters.length > 0 && appliedFilters.filters.map((filter, index) => (
      <div key={`filter-${index}`} className="applied-filter">
        <span>{filter}</span>
        <X className="cancel-filter" onClick={() => removeFilter(filter)} />
      </div>
    ))}

    {/* Render Price Range */}
    {(appliedFilters.price.lowRange !== null && appliedFilters.price.highRange !== null) && (
      <div className="applied-filter">
        <span>${appliedFilters.price.lowRange===0?appliedFilters.price.lowRange+1:appliedFilters.price.lowRange} - ${appliedFilters.price.highRange}</span>
        <X className="cancel-filter"  />
      </div>
    )}

    {/* Render Colors */}
    {appliedFilters.colors.length > 0 && appliedFilters.colors.map((color, index) => (
      <div key={`color-${index}`} className="applied-filter">
        <div className="color-filter-content">
           <span className="colorBox" style={{backgroundColor:color.color}}></span>
        <span>{color.name}</span>
        </div>
       
        <X className="cancel-filter" onClick={() => handleRemoveColor(color)} />
      </div>
    ))}
  </div>
) : (
  /* 2. The Placeholder Text */
  <div className="filter-placeholder">
    Apply filters for a better experience
  </div>
)}

    {/*          <div className="applied-filter filter-placeholder">
              Fash Shipping
              <span>?</span>
             </div>

              <div className="applied-filter filter-placeholder">
              Best Sellers
              <span>?</span>
             </div> */}
             
         
          
        
             
          
          </div> 
        
           
   </div>
  )
}
