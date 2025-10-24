import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import './Testing.css'
export default function Testing() {





 

  return (
    <div className="testing-div">
  {/*   <div className="trend-div-heading">
      Closet Update
    </div>  */}
   <div className="trend-container">
   
    <div id='trend-div' className="trend-div1">
      <div className="trend-img1-div"></div>
    <div id="trend-name-div">
        <div id='trend-name'>MEN</div>
        <div id='trend-button'>Shop Now</div>
       </div> 
    </div>
    <div id='trend-div' className="trend-div2">
      <div className="trend-img2-div"></div>
    <div id="trend-name-div">
        <div id='trend-name'>WOMEN</div>
        <div id='trend-button'>Shop Now</div>
       </div> 
    </div>

   </div>

  
 </div>



  






  );
}


  {/* <h2>Products</h2>
      <HiOutlineShoppingCart/>
      <ul>
        {products.map((item) => (
          <li key={item.id}>
           <img src={item.images[0]}   width="200"  />
            {item.title} - ${item.price}-{item.id}
          </li>
        ))}
      </ul> */}