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
 <h2>Products to add in home page </h2>


  <h3>Apple section</h3>
 <div>Apple macbook 14 pro</div> {/* done */}
 <div>iPhone 13 pro</div> 
  <div>Apple AirPods Max</div> {/* done */}

    <h3>New Arrival</h3>

 <div>Longines Master Watch</div>
 <div>Nike Air Jordan 1</div>
 <div>Blue prada bag</div> {/* done */}
 <div>green short frock</div>





    <h3>Absolute Steals</h3>
 
 <div>wooden-white long sofa  </div> {/* done */}
     <div>samsung galaxy tablet </div>
  <div>blue black sun glasses</div>
 <div>Amazon Echo plus</div> 


 <div>

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