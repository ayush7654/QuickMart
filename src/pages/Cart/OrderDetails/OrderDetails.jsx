import React from 'react'
import './OrderDetails.css'
import FloatingInput from '../../../components/FloatingInput/FloatingInput'
import { X } from 'lucide-react'
export default function OrderDetails({cartList,totalCost}) {

  console.log('cart list is ', cartList)

  return (
     <div className="order-summary-div">
  
      <div className='order-summary-content'>
        <div className='order-list-wrapper'>
        {
          cartList.map((item)=><div className='order-item'>
            <div className='order-item-img-div'>
              <img src={item.thumbnail}/>
              <span className='item-quantity'>{item.quantity}</span>
            </div>
            <div className='order-item-info'>
              <div className='order-item-title'>
                <span>{item.title}</span>
                <span>${item.price *item.quantity}</span>
                </div>
              <span className='order-item-details'>
                 {item.returnPolicy}
                </span>
              <span className='order-item-details'>{item.shippingInformation}</span>
            </div>
            {/* <div className='order-item-price'></div> */}
            
          </div>)
        }
        </div>
       
        
 
      </div>
      <div className='checkout-box'>
        <div className='promo-code-div'>
           <FloatingInput
           name='promocode'
           label='Promo Code'/>
           <span>Apply</span>
        </div>
         
          <div className="cost-box">
            <div id='cost-div' className='subtotal-div'>
              <span >Subtotal </span>
              <span >${totalCost.toFixed(2)}</span>
            </div>
            <div id='cost-div' className='shipping-charge-div'>
              <span>Shipping Charge</span>
              <span>$15</span>
            </div>
             <div  className='total-div'>
              <span >Total </span>
              <span >${(totalCost + 15).toFixed(2)}</span>
            </div>

           
          </div>

      </div>

    
    </div>
  )
}
