import { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import AnimatedUnderline from '../../../components/AnimatedUnderline/AnimatedUnderline';
import ScrollButton from '../../../components/ScrollingButton/ScrollingButton';


import { X } from 'lucide-react';

import './StoreCategory.css'
import IconButton from '../../../components/IconButton/IconButton';

export default function StoreCategory({ currentCategory, typeFilter, handleTypeFilter, handleClickCategory, setSideBarToggled,handleCancelTypeFilter }) {
  const [productCategory, setProductCategory] = useState([]);




/*   const handleCategory = (direction) => {
    setCategoryNum(prev => {
      if (direction === "left") {
        if (prev > 0) return prev - 1;
      } else {
        if (prev < 10) return prev + 1;
      }
      return prev;
    });
  }; */

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      setProductCategory(data);
    }
    fetchCategory();
  }, []);

  

 

  return (
    <div
     
      className="store-Category"
    >

<div className='store-Category-head-div'>
  <div className='store-Category-head-content'>
      <span>SELECT CATEGORY</span>
  <span className='store-Category-cancel'>

    <X size={24} strokeWidth={1.5} onClick={setSideBarToggled} />

  </span>
  </div>

  
</div> 

<div className='store-categories-wrapper'>

   <div className="store-categories" >
        
          {productCategory && productCategory.map((item, index) =>
            <div
              onClick={() => {
  handleTypeFilter(item.slug);
  /*  setSideBartoggled();  */
}}
           className='store-category-div'
              key={index}
            >
              <span className={item.slug === typeFilter ? "store-category-selected" : "store-category"}>
                <AnimatedUnderline from='left' exit='same' offset={8}><span className='store-category-text' >{item.name}</span></AnimatedUnderline>
                </span>
            </div>
          )}
        </div>
</div>
      
        
   
   <div className='category-clear-div-wrapper'>
    <div onClick={handleCancelTypeFilter}
   /*   style={{pointerEvents:typeFilter?'auto':'none'}} */
      className={`category-clear-div ${typeFilter?'category-selected':''}`}>
{/*           <ScrollButton
  text='Clear Category'
  theme={typeFilter?'darkMode':'lightMode'}
  color="#cf7729ff"
  themeOnHover={typeFilter?'colorMode':'lightMode'}

/> */}
<IconButton
text='Clear Category'
state={typeFilter?true:false}
width='100%'
  strokeWidth={1.5}
  Icon={X}

/>
   </div> 
   </div>

    </div>
  )
}
