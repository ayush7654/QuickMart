import React from 'react'
import './OrderDetails.css'
export default function OrderDetails({cartElements,cartList,totalCost}) {
  return (
     <div className={  cartElements.length < 1 ? "order-summary-empty-div":"order-summary-div"}>
      <div className="order-summary-title">Order Details</div>
      <div className="order-list-section">
        <div className="order-section-item">Item x Quantity</div>
        <div className="order-section-price">Price</div>
      </div>
      <div className="order-list">
        {cartList.map(item=><div className="order-list-item">
          <div id='order-item'>{item.title} <span className="order-list-quantity">&nbsp;x &nbsp; {item.quantity}</span></div>
          <div id='order-item'>${item.price * item.quantity}</div>
   
        </div>)}
       
      </div>
        
      <div className="total-cost"><span>Total Cost</span> <span>${totalCost.toFixed(2)}</span></div>
        <button className={cartElements.length>0?"checkout-btn":"checkout-btn-out"}>Place Order</button>
    </div>
  )
}
