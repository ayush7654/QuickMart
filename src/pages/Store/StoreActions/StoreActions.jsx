import React ,{useState,  useEffect, useRef,useContext} from 'react'
import { useStoreData } from '../../../components/StoreDataContext';
import { ChevronUp, ChevronDown } from 'lucide-react';
import OrderToggle from '../OrderToggle/OrderToggle';
import './StoreActions.css'
export default function StoreActions() {

     const SortArray = [
        { name: 'Price', sort: 'price'  },
      
        { name: 'Rating', sort: 'rating'  },
       
        { name: 'Discount', sort: 'discountPercentage' }
    
      ];

        const [isSortOpen, setIsSortOpen] = useState(false);
      const {currentSort,toggleSortOrder,typeFilter,handleSort,currentCategory,handleTypeFilter,isOpen, setIsOpen} = useStoreData()

const sortPanelRef = useRef(null);


useEffect(() => {
  const handleClickOutside = (e) => {
    if (
      isSortOpen &&
      sortPanelRef.current &&
      !sortPanelRef.current.contains(e.target)
    ) {
      setIsSortOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isSortOpen]);
  return (
    <div className='store-button-wrapper'>


{/*  <div className={`store-order ${currentSort?'order-active':''}`} onClick={toggleSortOrder}>
    <OrderToggle/>
   </div>  */}



     <div className='sort-dropDown-div'
     onMouseEnter={() => {setIsSortOpen(true)}} onMouseLeave={() => {setIsSortOpen(false)}}>



<div 
 className='product-sort-wrapper'>



    <span className={`sort-toggle  ${isSortOpen?'sort-toggle-active':''} `}>
      
      <div className='sort-toggle-content'>
        
            <span>{currentSort?currentSort.name:'Sort By '}</span>
      
      </div>



<span className={`dropdownIcon ${isSortOpen? 'up' : 'down'}`}>< ChevronDown size={20}/></span>
    </span>

    
    </div>
  
 
 





  <div  ref={sortPanelRef} 
  className={`sorting-panel ${isSortOpen?'sort-panel-visible':''}`}>
 { SortArray.map((item,index)=>
 <div key={index}
 className={`store-sort-div ${currentSort?.name===item.name?'store-sort-selected':''}`}
 onClick={()=>
  {handleSort(item);
   setIsSortOpen(false); 
             
 }
 
 }
 >


 {item.name}


  </div>)}


  </div>



</div>




</div>
  )
}
