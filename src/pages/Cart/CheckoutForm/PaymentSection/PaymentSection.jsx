import React from 'react'
import './PaymentSection.css'
import FloatingInput from '../../../../components/FloatingInput/FloatingInput'
import { BsQuestionCircle } from "react-icons/bs";
import { FiLock } from "react-icons/fi";


export default function PaymentSection() {
  return (
    <div className="form-section">
          <div className="section-header">
            <h2>Payment</h2>
          </div>
          <div className='payment-text'>All transactions are secure and encrypted.</div>
          
          <div className='credit-card-head'>
            <span>Credit Card</span>
      <div id="amex-logo" style={{width: '180px', height: '40px'}}>
        <img src="https://www.americanexpress.com/content/dam/amex/us/merchant/supplies-uplift/product/images/4_Card_color_horizontal.png" width="100%" height="100%" alt="American Express Accepted Here" border="0"/></div>

      
          </div>
          <div className='payment-input-wrapper'>
            <div className='input-icon-div'>
                       <FloatingInput
        label='Card Number'
        name='cartNumber'
        />
        <span className='form-icon'><FiLock strokeWidth={2}/></span>
            </div>

        <div className='payment-card-info'>
           <FloatingInput
        label='Expiration date (MM/YY)'
        name='ExpDate'
        
        />
        <div className='input-icon-div' >
         <FloatingInput
        label='Security'
        name='ExpDate'
        />
        <span className='form-icon'>< BsQuestionCircle /></span>
        </div>
        </div>

        <FloatingInput
        label='Name on card'
        name='NameCard'
        />

           <label className="checkbox-container">
          <input type="checkbox" name="shipping"  />
          <span>Use shipping address as billing address</span>
        </label>

          
          </div>
        <div className='pay-now-button'>
            Pay Now
        </div>
       
      </div>
  )
}
