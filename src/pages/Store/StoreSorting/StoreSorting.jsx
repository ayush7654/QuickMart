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
gsap.registerPlugin(ScrollTrigger);





export default function StoreSorting({setPartialPill,partialPill}) {
  

   const{ scrollY} = useScroll();

  const {currentSort,toggleSortOrder,typeFilter,handleSort,currentCategory,handleTypeFilter,isOpen, setIsOpen} = useStoreData()





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
         <div style={{
              transform: window.innerWidth>500 && isIdle? 'translateY(-0%)':'translateY(0%)' /* -15% */
            
            }} 
            className="sticky-sort-container">
             <div className="current-sort-container-div">

            <div className={`current-sort-container ${scrollY===0?'':'current-sort-blurred'}`}>

      <div /* onClick={() => setSideBarToggled(false)}  */

 
  className='store-toggle-wrapper'
     
       >
 
<div className='partialToggle-wrapper' onClick={handlePartialToggle}>
  <MenuCancel state={partialPill}  /*   *//>
</div>

<div className='product-catelog-btn'  onClick={handleExpandedToggle}>
  <AnimatedUnderline
  offset={3}
  color='rgb(0,100,255)'
  > Catalog</AnimatedUnderline>
  </div>






    </div>

      
 



{/* <div className='sort-head-title'>{typeFilter?currentCategory.replaceAll('-', ' '):'Porduct Categlog'}</div> */}

<Link to='/store'>
<LayoutPanelLeft 
  className={`category-icon  ${typeFilter || isOpen?'category-active':''}`}
  size={25} 
  strokeWidth={1} 


    
/></Link>



   



        

  




<div className='store-button-wrapper'>






     <div className='sort-dropDown-div'
     onMouseEnter={() => {setIsSortOpen(true)}} onMouseLeave={() => {setIsSortOpen(false)}}>



<div 
 className='product-sort-wrapper'>



    <span className={`sort-toggle  ${isSortOpen?'sort-toggle-active':''} `}>
      
      <div className='sort-toggle-content'>
        
            <span>{currentSort?currentSort.name:'View by'}</span>
      
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

 <div className={`store-order ${currentSort?'order-active':''}`} onClick={toggleSortOrder}>
    <OrderToggle/>
   </div> 


</div>
  

{/* <span className="sort-label">SORT BY</span>
            <span>{currentSort?currentSort.name:'Select'}</span>   */}

      </div>
      </div>


            </div>
  )
}





/* 
    */