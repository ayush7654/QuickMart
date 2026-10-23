import React, { useState, useRef, useEffect } from 'react';
import { useCartList } from '../CartListProvider';
import AnimatedUnderline from '../AnimatedUnderline/AnimatedUnderline';
import './SideCart.css'
import TransitionLink from '../TransitionLink';




export default function SideCart({closePanel}) {

 const { cartList, cartLoading ,totalCost,handleRemove,updateDataBase} = useCartList();



  const formatPrice = (price) =>
    `€${price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;


  return (
       <div className="side-cart">
        <div className="side-panel__header">
            <span>BAG</span>
             <span className='side-panel__close'
              onClick={closePanel}>
                <AnimatedUnderline color='black'>Close</AnimatedUnderline>
                </span>
        </div>
      <div className="side-cart__items" data-lenis-prevent>
        {cartList.map((item, index) => (
          <div className="side-cart__item" key={`${item.title}-${index}`}>
            <div className="side-cart__image">
              <img src={item.images[0]} alt={item.title} />
            </div>

            <div className="side-cart__details">
              <p className="side-cart__name">{item.title}</p>

              <p className="side-cart__price">
                {item.quantity} × <span>${(item.price*((100-item.discountPercentage)/100)).toFixed(2)*item.quantity}</span>
              </p>
            </div>

            <button
              className="side-cart__remove"
             onClick={()=>handleRemove(item.title)}
              aria-label={`Remove ${item.title}`}
              title="Remove item"
            >
              ×
            </button>
          </div>
        ))}

        {cartList.length === 0 && (
          <p className="side-cart__empty">Your cart is empty.</p>
        )}
      </div>

      <div className="side-cart__footer">

        <div className="side-cart__footerInfo">
              
        <div className="side-cart__subtotal">
          <span>Subtotal:</span>
          <span>{formatPrice(totalCost)}</span>
          
        </div>

         <div className="side-cart__savings">
            <span>Total Savings:</span>
          <span className='side-cart__discountAmt'>-$320</span>
         </div>
          <div className='side-cart__condition'>Taxes calculated at checkout.</div> 
    </div>
     


        <TransitionLink to='/cart'>
           <div to='/cart' className="side-cart__checkout">
          CHECKOUT
        </div></TransitionLink>
     
       
      </div>
    </div>
  )
}
