import React ,{useState,  useEffect, useRef} from 'react'
import './StoreSorting.css'
import OrderToggle from '../OrderToggle/OrderToggle';
import { MdStar, MdStarBorder } from 'react-icons/md';
import { MdAttachMoney, MdPercent } from "react-icons/md";
import { LayoutPanelLeft } from 'lucide-react';




export default function StoreSorting({isIdle,currentSort,toggleSortOrder,typeFilter,sideBartoggled, setSideBarToggled,handleSort,currentCategory}) {
  

const [isHovered, setIsHovered] = useState(false);

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
         <div style={{
              transform: window.innerWidth>500 && isIdle? 'translateY(-0%)':'translateY(0%)' /* -15% */
            
            }} 
            className="sticky-sort-container">
             <div className="current-sort-container-div">
            <div className="current-sort-container">

         

              <div className='store-header-info-wrapper'>
 



<div className='sort-head-title'>{typeFilter?currentCategory.replaceAll('-', ' '):'Porduct Categlog'}</div>


</div>

increase its width upon scroll





<div className='store-button-wrapper'>


  <div onClick={() => setSideBarToggled(false)} 
  className='store-category-toggle'
     onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} >
 


<LayoutPanelLeft 
  className={`category-icon ${isHovered || !sideBartoggled?'category-hovered':''}  ${typeFilter?'category-active':''}`}
  size={30} 
  strokeWidth={1} 


 
/>

    </div>










     <div className='sort-dropDown-div'>




  <div onClick={()=>setIsSortOpen(true)} className='product-sort-wrapper'>

    {/* <span className='sort-label'>Sort By </span> */}


    <span className={`sort-toggle  ${isSortOpen?'sort-toggle-active':''} `}>
      
      <div className='sort-toggle-content'>
        <span className="sort-label">SORT BY</span>
            <span>{currentSort?currentSort.name:'Select'}</span>  
      
      </div>


<span className={`sort-arrow ${isSortOpen? 'up' : 'down'}`}></span>
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
  



      </div>
      </div>


            </div>
  )
}





/* 
    */