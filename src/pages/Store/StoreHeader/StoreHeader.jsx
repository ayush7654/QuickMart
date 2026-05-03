import {useState} from 'react'
import MenuCancel from '../../../components/MenuCancel/MenuCancel'
import ExpandingStoreHeader from '../ExpandingStoreHeader/ExpandingStoreHeader'
import { LayoutPanelLeft } from 'lucide-react'
import { useStoreData } from '../../../components/StoreDataContext'
import './StoreHeader.css'
export default function StoreHeader() {


const [partialPill,setPartialPill] = useState(false);
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
         <div className='store-head-btn-wrapper'>
          <div className={`store-head-btn`} onClick={handlePartialToggle} >
          <MenuCancel  state={partialPill}  />
        </div>
        
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
         <div className="store-head-btn-wrapper">

  <div className='store-head-btn' onClick={handleExpandedToggle}>
<LayoutPanelLeft 
  className={`category-icon  ${typeFilter || isOpen?'category-active':''}`}
  size={20} 
  strokeWidth={1} 


    
/>
  </div>

</div>
    </div>
  )
}
