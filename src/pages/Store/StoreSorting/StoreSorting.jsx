import React ,{useState,  useEffect, useRef,useContext} from 'react'
import './StoreSorting.css'
import { Link } from 'react-router-dom';
import OrderToggle from '../OrderToggle/OrderToggle';
import { MdStar, MdStarBorder } from 'react-icons/md';
import { MdAttachMoney, MdPercent } from "react-icons/md";
import { LayoutPanelLeft } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from '../../../components/ScrollData/ScrollData';
import { WinScrollContext } from '../../../components/WinScrollProvider/WinScrollProvider';
import MenuCancel from './../../../components/MenuCancel/MenuCancel';
import { useStoreData } from '../../../components/StoreDataContext';
import { ChevronUp, ChevronDown } from 'lucide-react';
import AnimatedUnderline from '../../../components/AnimatedUnderline/AnimatedUnderline';
import AppliedFilters from '../AppliedFilters/AppliedFilters';
import { useStoreFilter } from '../../../components/StoreFilterContext';
import StoreActions from '../StoreActions/StoreActions';

gsap.registerPlugin(ScrollTrigger);





export default function StoreSorting() {
  

   const{ scrollY} = useScroll();

  const {currentSort,toggleSortOrder,typeFilter,handleSort,currentCategory,handleTypeFilter,isOpen, setIsOpen} = useStoreData()
  
  const { minPrice, setMinPrice, maxPrice, setMaxPrice,storeFilters,setStoreFilters,filterLogicMap,filterActive,activeFiltersCount,appliedFilters,setAppliedFilters,setStoreFilterColors} = useStoreFilter();

  const removeFilter = (filterName) => {
  setStoreFilters(prev => 
    prev.map(item => 
      item.name === filterName ? { ...item, state: false } : item
    )
  );
};

const handleRemoveColor = (colorName) => {
  setStoreFilterColors(prev =>
    prev.map(c => 
      c.name === colorName.name ? { ...c, active: false } : c
    )
  );
};




  const { isIdle } = useContext(WinScrollContext);

  const SortArray = [
    { name: 'Price', sort: 'price' ,Icon: MdAttachMoney },
  
    { name: 'Rating', sort: 'rating' , Icon: MdStarBorder },
   
    { name: 'Discount', sort: 'discountPercentage', Icon: MdPercent }

  ];


    const [isSortOpen, setIsSortOpen] = useState(false);

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
         <div 
            className="store-middle-header">
             

            <div className='store-head-wrapper'>  

     {/* <div className="store-middle-head">Sale</div>
     <div className="store-middle-head">Memberships</div>
     <div className="store-middle-head">Wishlist</div>
     <div className="store-middle-head">About</div> */}





    
{/*    <div className="store-filter-btn-wrapper">
          <div className="store-filter-btn clear-filter-btn">Clear All</div>
           <div className="store-filter-btn">
             <StoreActions/>
           </div>
           <div className={`sort-order-btn ${currentSort?'sort-order-active':''}`} onClick={toggleSortOrder}>
             <OrderToggle/>
           </div>
          

   </div>  */}







      
 



{/* <div className='sort-head-title'>{typeFilter?currentCategory.replaceAll('-', ' '):'Porduct Categlog'}</div> */}

{/* <Link to='/store' className='catgegory-icon-wrapper'>
<LayoutPanelLeft 
  className={`category-icon  ${typeFilter || isOpen?'category-active':''}`}
  size={25} 
  strokeWidth={1} 


    
/></Link> */}



      </div>
  

            </div>
  )
}





/* 
    */