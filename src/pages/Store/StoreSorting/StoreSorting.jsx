import React ,{useState} from 'react'
import './StoreSorting.css'
import { SlidersHorizontal } from 'lucide-react';
import AnimatedUnderline from '../../../components/AnimatedUnderline/AnimatedUnderline';
import ScrollButton from '../../../components/ScrollingButton/ScrollingButton';
import SortDropdown from '../SortDropDown/SortDropDown';
export default function StoreSorting({isIdle,sortOrder,currentSort,setCurrentSort,toggleSortOrder,typeFilter,sideBartoggled,sideBarsetToggled}) {
  const SortArray= [{name:'Price',sort:'price'},
                    {name:'Rating',sort:'rating'},
                    {name:'Discount',sort:'discountPercentage'},
                    {name:'In Stock',sort:'stock'}];
    
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Select');

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


<div className='category-div' onClick={() => sideBarsetToggled(false)}>
       <ScrollButton
  text={<div className='filter-button-content'><SlidersHorizontal className="select-category-icon" strokeWidth={1.5} />  <div className="select-category-head">FILTER</div></div>}
  theme={!sideBartoggled ?"colorMode":'darkMode'}
  color="#cf7729ff"
  themeOnHover={'colorMode'}
/></div> 

      </div>
      </div>
            </div>
  )
}
