import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import './Testing.css'
export default function Testing() {





 

  return (
    <div className="testing-div">
 
 <div className="heading-div">
  <div id='head-div' className="head-1">NEW</div>
  <div id='head-div'  className="head-2">ARRIVALS</div>
    <AiOutlineClose size={20} />
    <MdClear size={20}/>
    <IoCloseCircle size={20}/>
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