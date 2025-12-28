import React from 'react'
import './StoreHeader.css'
import { SlidersHorizontal } from 'lucide-react';
import AnimatedUnderline from '../../../components/AnimatedUnderline/AnimatedUnderline';
export default function StoreHeader({handleCancelFilter,typeFilter, sideBarsetToggled}) {
  return (
      <div 

      className="store-page-header">
            
        <div className="store-page-heading-div">
  
      <div className="store-page-heading">
         <div 
         
         className="store-all-link"
         onClick={(e) => { e.stopPropagation();   // ⛔ stops parent onClick
                         handleCancelFilter();  // ✔ your original function
      }}>The Vault</div>
         /
         <div>{ typeFilter?typeFilter.split('-')
               .map(word => word.charAt(0).toUpperCase() + word.slice(1))
               .join(' '):'All'} 
          </div>
      </div>

      

     <div  className={`category-div ${
    typeFilter ? "category-div--selected" : "category-div--default"
  }`} onClick={() => sideBarsetToggled(false)}>
      <div className="select-category-head">FILTER</div>
            {/* <AnimatedUnderline offset={-6}><div className="select-category-head">CATEOGORY</div></AnimatedUnderline>  */}
             <div  className="select-category-icon-div"> <SlidersHorizontal className="select-category-icon" strokeWidth={1.5} /></div>
            </div>   



 
    
      </div>
  

 
      </div>
  )
}
