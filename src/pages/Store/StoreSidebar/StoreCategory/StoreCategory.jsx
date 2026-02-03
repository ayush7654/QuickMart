import { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import AnimatedUnderline from '../../../../components/AnimatedUnderline/AnimatedUnderline';
import ScrollButton from '../../../../components/ScrollingButton/ScrollingButton';
import '../StoreSidebar.css'
import AlphabetBar from '../AlphabetBar/AlphabetBar';
import { X } from 'lucide-react';


import IconButton from '../../../../components/IconButton/IconButton';

export default function StoreCategory({ currentCategory, typeFilter, handleTypeFilter, handleClickCategory, setSideBarToggled,handleCancelTypeFilter }) {



  const [productCategory, setProductCategory] = useState([]);

 const [selected, setSelected] = useState("");



  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      setProductCategory(data);
    }
    fetchCategory();
  }, []);

  const isInitialLoading = productCategory.length === 0;
  
  const filteredCategoryList = selected 
  ? productCategory.filter(category => 
      category.name.toLowerCase().startsWith(selected.toLowerCase())
    )
  : productCategory;

 

  return (
    <div className="store-Category" >

<AlphabetBar
selected={selected}
setSelected={setSelected}/>

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
        
          {filteredCategoryList.length > 0? filteredCategoryList.map((item, index) =>
            <div
              onClick={() => {
  handleTypeFilter(item.slug);
  /*  setSideBartoggled();  */
}}
           className='store-category-div'
              key={index}
            >
              <span className={`store-category ${item.slug === typeFilter ? "store-category-selected" : ""}`}>
                <AnimatedUnderline from='left' exit='same' offset={8}><span className='store-category-text' >{item.name}</span></AnimatedUnderline>
                </span>
            </div>
          ):
          
          isInitialLoading ? (
    // SHOW A SPINNER OR NOTHING WHILE FETCHING
    <p>Loading categories...</p>
  ) : (
    // ONLY SHOW THIS IF INITIAL LOAD IS DONE AND FILTER IS EMPTY
    <p>No categories found for letter "{selected}"</p>)}
        </div>
</div>
      
        
   
   <div className='category-clear-div-wrapper'>
    <div onClick={handleCancelTypeFilter}
 
      className={`category-clear-div ${typeFilter?'category-selected':''}`}>
Clear Category
{/* <IconButton
text='Clear Category'
state={typeFilter?true:false}
width='100%'
height='3rem'
  strokeWidth={1.5}
  Icon={X}
  IconColor='black'

/> */}
   </div> 
   </div>

    </div>
  )
}
