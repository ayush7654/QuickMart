
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Lottie } from "lottie-react";
import SiteLogoAnimation3 from "../../assets/SiteLogoAnimation3.json";
import SiteMenu from '../SiteMenu/SiteMenu';
import SiteMenuAnimation2 from "../../assets/SiteMenuAnimation2.json";
import ExpandablePanel from '../ExpandablePanel/ExpandablePanel';
 import "./Testing.css";


const sampleCart = [
  { name: "Product Carousel", price: "250", quantity: "1", img: "MockDP2.png" },
  { name: "Product Columns", price: "150", quantity: "2", img: "MockDP3.jpg" },
  { name: "Product Stacked", price: "135", quantity: "4", img: "MockDP4.avif" },
  { name: "Product Split", price: "70", quantity: "3", img: "MockDP5.jpg" },
  { name: "Product Impact", price: "350", quantity: "2", img: "MockDP2.jpg" },
];


export default function Testing({ onClose }) {


const [cart, setCart] = useState(sampleCart);

  const removeItem = (indexToRemove) => {
    setCart((currentCart) =>
      currentCart.filter((_, index) => index !== indexToRemove)
    );
  };

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  const formatPrice = (price) =>
    `€${price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;



  
  
  return (
<div className="testing-div"  >
   <div className="side-cart">
      <div className="side-cart__items">
        {cart.map((item, index) => (
          <div className="side-cart__item" key={`${item.name}-${index}`}>
            <div className="side-cart__image">
              <img src={item.img} alt={item.name} />
            </div>

            <div className="side-cart__details">
              <p className="side-cart__name">{item.name}</p>

              <p className="side-cart__price">
                {item.quantity} × {formatPrice(Number(item.price))}
              </p>
            </div>

            <button
              className="side-cart__remove"
              onClick={() => removeItem(index)}
              aria-label={`Remove ${item.name}`}
              title="Remove item"
            >
              ×
            </button>
          </div>
        ))}

        {cart.length === 0 && (
          <p className="side-cart__empty">Your cart is empty.</p>
        )}
      </div>

      <div className="side-cart__footer">
        <div className="side-cart__subtotal">
          <span>Subtotal:</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <button className="side-cart__view-cart">
          VIEW CART
        </button>

        <button className="side-cart__checkout">
          CHECKOUT
        </button>
      </div>
    </div>

{/* <ExpandablePanel/> */}

{/* <SiteMenu/>  */}


 {/*   <div >
      <Lottie
        src={SiteMenuAnimation2}
        autoplay
        loop
        style={{ width: "50%", height: "100%" }}
      />
    </div> */}  
</div>





  );

  



}
