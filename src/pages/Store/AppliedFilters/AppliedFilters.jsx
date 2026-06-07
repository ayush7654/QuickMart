import React from 'react'
import MenuCancel from '../../../components/MenuCancel/MenuCancel'
import { useNavigate } from 'react-router-dom'
import { LayoutPanelLeft } from 'lucide-react'
import { X } from 'lucide-react'
import StoreActions from '../StoreActions/StoreActions'
import OrderToggle from '../OrderToggle/OrderToggle'
import AnimatedUnderline from '../../../components/AnimatedUnderline/AnimatedUnderline'
import './AppliedFilters.css'
import { div } from 'framer-motion/client'

export default function AppliedFilters({appliedFilters,removeFilter,handleRemoveColor,currentSort,toggleSortOrder,currentCategory}) {



const navigate = useNavigate();

const categoryFilter =currentCategory?currentCategory.replaceAll('-', ' '):null;

  return (
       <div className="Active-Filters-wrapper">
          
     <div className="applied-filter-section">
        
  
     

      
    


             {/* 1. Check if any filters actually exist to show the container */}
 
  <div className="applied-filter-wrapper">
 
 
    {/* Render category*/}
{currentCategory &&   <div className="applied-filter">
        <span>{categoryFilter}</span>
        <X className="cancel-filter" onClick={() => navigate('/store')} />
      </div> }

    {/* Render features*/}
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




          </div> 
        
                  
        
      <AnimatedUnderline
            thickness={1}
            offset={1}
            color='rgb(0,100,255)'>
              <span className='clear-filter-btn'>Clear All</span>
            </AnimatedUnderline>

   </div>
  )
}
