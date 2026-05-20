import {useState} from 'react'
import MenuCancel from '../../../components/MenuCancel/MenuCancel'
import ExpandingStoreHeader from '../ExpandingStoreHeader/ExpandingStoreHeader'
import { LayoutPanelLeft } from 'lucide-react'
import { useStoreData } from '../../../components/StoreDataContext'
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2'
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import './StoreHeader.css'
export default function StoreHeader({partialPill,setPartialPill,setSideFilterOn}) {



    const {isOpen, setIsOpen,typeFilter} = useStoreData()

const handleExpandedToggle = () => {
  if (!isOpen) {
    // Stage 1: If it's closed, open it.
    setIsOpen(true);
  } else {
    // Stage 2: It's already open, check the partial state.
    if (partialPill) {
      // If it's in the shorter 'partial' state, expand it fully.
      setPartialPill(false);
    } else {
      // If it's already full height, close the whole thing.
      setIsOpen(false);
    }
  }
};

const handlePartialToggle = () => {
  if (!isOpen) {
    // Stage 1: If closed, open directly into partial mode
    setIsOpen(true);
    setPartialPill(true);
  } else if (isOpen && !partialPill) {
    // Stage 2: If fully open, shrink it down to partial
    setPartialPill(true);
  } else {
    // Stage 3: If already in partial, close the whole pill
    setIsOpen(false);
    setPartialPill(false);
  }
};




  return (
    <div className='store-Header'>
         <div className='store-head-menu-wrapper'>
          <div className={`store-head-menu ${isOpen || partialPill?'store-menu-open':''}`} onClick={handlePartialToggle} >
          <MenuCancel  state={partialPill}  />
        </div> 
            <div className="side-filter-btn-wrapper" onClick={()=>setSideFilterOn(true)}>
      <  HiOutlineAdjustmentsVertical size={20}/>
      Filters</div>
        
         </div>
         <div className={`store-middle-head-wrapper ${isOpen || partialPill?'middle-head-active':''}`}>
            <div className="store-middle-head">Sale</div>
     <div className="store-middle-head">Memberships</div>
     <div className="store-middle-head">Wishlist</div>
     <div className="store-middle-head">About</div>
         </div>
 <ExpandingStoreHeader 
  partialPill={partialPill}
  />   
         <div className="store-catelog-btn-wrapper">

  <div className={`store-catelog-btn ${isOpen || partialPill?'store-catelog-active':''}`} onClick={handleExpandedToggle}>

<LayoutPanelLeft 
  className={`category-icon  ${typeFilter || isOpen?'category-active':''}`}
  size={20} 
  strokeWidth={1} 


    
/>
   Product Catelog 
  </div>

</div>
    </div>
  )
}
