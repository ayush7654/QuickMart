import React, { useEffect, useState } from "react";
import { HiOutlineUser, HiUser } from 'react-icons/hi';
import { HiShoppingCart,HiOutlineShoppingCart } from 'react-icons/hi';
import './Testing.css'
export default function Testing() {
     const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://api.escuelajs.co/api/v1/products"); // your API endpoint
        const data = await response.json();
        setProducts(data);   // update state
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);  // stop loading spinner
      }
    };

    /* fetchProducts(); */ // call the async function
  }, []); 


 

  return (
    <div className="testing-div">

     <div  className='site-logo-div' style={{marginLeft:'2rem'}}>
         
      <div id="testing-line" className="line1">ST&nbsp;&nbsp;&nbsp;&nbsp;RK</div>
      <div className="StorkLogo-div"><img src='StorkLogo.png' width='60px' className="StorkLogo"/></div> 
      <div id="testing-line" className="line2">ST&nbsp;&nbsp;&nbsp;&nbsp;RE</div>
      
      
          
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