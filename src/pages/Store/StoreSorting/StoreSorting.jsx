import React ,{useState,  useEffect, useRef,useContext} from 'react'
import './StoreSorting.css'
import OrderToggle from '../OrderToggle/OrderToggle';
import { MdStar, MdStarBorder } from 'react-icons/md';
import { MdAttachMoney, MdPercent } from "react-icons/md";
import { LayoutPanelLeft } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll } from '../../../components/ScrollData/ScrollData';
import { WinScrollContext } from '../../../components/WinScrollProvider/WinScrollProvider';
gsap.registerPlugin(ScrollTrigger);





export default function StoreSorting({currentSort,toggleSortOrder,typeFilter,handleSort,currentCategory,setIsOpen,isOpen}) {
  

   const{ scrollY} = useScroll();

  console.log(scrollY)

// useEffect(() => {
//   const ctx = gsap.context(() => {
//     gsap.to(".current-sortcontainer", {  /* .current-sort-container - correct one*/
//       scrollTrigger: {
//         trigger: ".scroll-section", 
//         start: "top top",      
//         end: "+=700",           
//         // Changing scrub to a small number (like 0.5) adds "weight" or inertia.
//         // It still starts instantly but follows the scroll with a soft follow-through.
//         scrub: 0.8,            
//         immediateRender: false,
//       },
//       width:'65%',    /* typeFilter?"100%": "65%" */
//       // 'power2.out' creates the inertia effect (fast start, slow finish)
//       ease: "power2.out",    
//     });
//   });

//   return () => ctx.revert();
// }, []);   /* typeFilter */

const [isHovered, setIsHovered] = useState(false);

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
         <div style={{
              transform: window.innerWidth>500 && isIdle? 'translateY(-0%)':'translateY(0%)' /* -15% */
            
            }} 
            className="sticky-sort-container">
             <div className="current-sort-container-div">

            <div className={`current-sort-container ${scrollY===0?'':'current-sort-blurred'}`}>

    

      <div className='store-header-info-wrapper'>
 



<div className='sort-head-title'>{typeFilter?currentCategory.replaceAll('-', ' '):'Porduct Categlog'}</div>


</div>


   



        





<div className='store-button-wrapper'>


    <div /* onClick={() => setSideBarToggled(false)}  */

    onClick={()=>setIsOpen(prev=>!prev)}
  className='store-category-toggle'
     onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} >
 


<LayoutPanelLeft 
  className={`category-icon ${isHovered ?'category-hovered':''}  ${typeFilter || isOpen?'category-active':''}`}
  size={30} 
  strokeWidth={1} 


 
/>

    </div>






{/* 
<div className='store-header-btn'>
  <span>Sort By</span>
  <span>Order</span>
</div>
 */}

     <div className='sort-dropDown-div'>




  <div onClick={() => {
  // This prevents the floating-pill's onClick from firing
    setIsSortOpen(true);
  }} className='product-sort-wrapper'>

    {/* <span className='sort-label'>Sort By </span> */}


    <span className={`sort-toggle  ${isSortOpen?'sort-toggle-active':''} `}>
      
      <div className='sort-toggle-content'>
        
            <span>{currentSort?currentSort.name:'Sort By'}</span>
      
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
   console.log('clicked')                
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