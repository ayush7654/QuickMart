import React from 'react'
import './CartLoading.css'
export default function CartLoading() {

const cartItemList =[0,1]

  return (
    <div className='cart-loading-page'>
         <div className="cart-page-title"><div className="cart-page-heading">Your Cart</div></div>
         <div className='cart-loading-div'>
            <div className='cart-item-loading-div'>
                {cartItemList.map((item)=>
                <div className='cart-item-load'></div>)}

            </div>
            <div className='order-details-loading-div'></div>
         </div>
    </div>
  )
}
