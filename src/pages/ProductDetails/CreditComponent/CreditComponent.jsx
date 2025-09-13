import React from 'react'
import { FaCheck, FaShieldAlt, FaTruck, FaMoneyBillAlt } from 'react-icons/fa';
import { MdCheckCircle, MdSecurity, MdLocalShipping, MdAttachMoney } from 'react-icons/md';
import './CreditComponent.css'
export default function CreditComponent() {
  return (
    <div className='credits-div'>
       
        <div id='credit'>
            <div id='credit-logo'> <MdCheckCircle   /></div>
            <div id='credit-text'>Check Check Authenticated</div>
        </div>
         <div id='credit'>
            <div id='credit-logo'> <MdLocalShipping  /></div>
            <div id='credit-text'>Express Dilivery</div>
        </div>
         <div id='credit'>
            <div id='credit-logo'><MdSecurity/></div>
            <div id='credit-text'>Our Promise</div>
        </div>
         <div id='credit'>
            <div id='credit-logo'><FaMoneyBillAlt  /></div>
            <div id='credit-text'>Money Back Guarantee</div>
        </div>
    </div>
  )
}
