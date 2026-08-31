import {useState} from 'react'
import MenuCancel from '../../../components/MenuCancel/MenuCancel'
import ExpandingStoreHeader from '../ExpandingStoreHeader/ExpandingStoreHeader'
import { LayoutPanelLeft } from 'lucide-react'
import { useStoreData } from '../../../components/StoreDataContext'
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2'
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import IconButton from '../../../components/IconButton/IconButton'
import ScrollButton from '../../../components/ScrollingButton/ScrollingButton'
import { Search } from 'lucide-react'
import { Filter } from 'lucide-react'
import './StoreHeader.css'
import { useSpring } from 'framer-motion';



export default function StoreHeader() {



    const {isOpen, setIsOpen,typeFilter,partialPill,setPartialPill,setSideFilterOn,storeSearch,setStoreSearch} = useStoreData()

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
    <div className={`store-Header ${isOpen || partialPill?'store-header-open':''}`}>


          {/*  <div className='store-head-menu-wrapper'>
          <div className={`store-head-menu ${isOpen || partialPill?'store-menu-open':''}`} onClick={handlePartialToggle} >
     
        </div> 
      
  
        
         </div>  */}

<div className={`store-header-btn ${partialPill?'store-btn-active':''}`} onClick={handlePartialToggle}>
     <MenuCancel  state={partialPill}  />
</div>
      

    



         <div className='store-middle-head-wrapper'>
           <div className="store-middle-head"> <span className="middle-dot"></span><ScrollButton text='Sale' /></div>
     <div className="store-middle-head"> <span className="middle-dot"></span><ScrollButton text='Memberships'/> </div>
     <div className="store-middle-head">  <span className="middle-dot"></span><ScrollButton text='Wishlist'/>  </div>
     {window.innerWidth>700 && <div className="store-middle-head"> <span className="middle-dot"></span> <ScrollButton text='About'/>   </div>} 


         </div>





  
<div className={`store-header-btn ${isOpen && !partialPill?'store-btn-active':''}`}
onClick={handleExpandedToggle}>
         <LayoutPanelLeft 
  className={`category-icon  ${isOpen && !partialPill?'category-active':''}`}
  size={20} 
  strokeWidth={1} /> 
</div>
  
 


    </div>
  )
}
