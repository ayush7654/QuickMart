import React from 'react'
import './StoreHeader.css'
import { SlidersHorizontal } from 'lucide-react';
import AnimatedUnderline from '../../../components/AnimatedUnderline/AnimatedUnderline';
import ScrollButton from '../../../components/ScrollingButton/ScrollingButton';
export default function StoreHeader({handleCancelFilter,typeFilter,sideBartoggled, sideBarsetToggled}) {
  return (
      <div 

      className="store-page-header">
            
        <div className="store-page-heading-div">
  
      <div className="store-page-heading">
         <div 
         
         className="store-all-link"
         onClick={(e) => { e.stopPropagation();   // ⛔ stops parent onClick
                         handleCancelFilter();  // ✔ your original function
      }}>Product Catelog</div>

     <span style={{fontSize:'1rem',color:'rgb(150,150,150)', fontWeight:'300'}}>|</span>
         
          {/*  <div className='store-category-head'>{ typeFilter?typeFilter.split('-')
               .map(word => word.charAt(0).toUpperCase() + word.slice(1))
               .join(' '):'ALL'} 
          </div> */}  {/* COMMENT THIS OUT */}
      </div>

    <div className='store-category-head1'>
      put sort here . make filter fixed 
    { typeFilter?typeFilter.split('-')
               .map(word => word.charAt(0).toUpperCase() + word.slice(1))
               .join(' '):'ALL'} 
          </div>   {/* UNCOMMENT THIS */}
     
{/* 
    <div  className={`category-div ${
    typeFilter ? "category-div--selected" : "category-div--default"
  }`} onClick={() => sideBarsetToggled(false)}>
      <div className="select-category-head">FILTER</div>
            
             <div  className="select-category-icon-div"> <SlidersHorizontal className="select-category-icon" strokeWidth={1.5} /></div>
            </div>  */}


{/*    <div className='sorting-test'>
    <div className='test-sort'>Price</div>
    <div className='test-sort'>Rating</div>
    <div className='test-sort'>Discount</div>
    <div className='test-sort'>In Stock</div>
   </div> */}



    <div className='category-div' onClick={() => sideBarsetToggled(false)}>
       <ScrollButton
  text={<div className='filter-button-content'><SlidersHorizontal className="select-category-icon" strokeWidth={1.5} />  <div className="select-category-head">FILTER</div></div>}
  theme={!sideBartoggled ?"colorMode":'darkMode'}/* { typeFilter || !sideBartoggled ?"darkMode":'lightMode'} */
  color="#cf7729ff"
  themeOnHover={'colorMode'}/* {typeFilter?'colorMode':'darkMode'} */
/></div> 



    
      </div>
  

 
      </div>
  )
}
