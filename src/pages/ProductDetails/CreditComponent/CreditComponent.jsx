import React from 'react'
import { FaCheck, FaShieldAlt, FaTruck, FaMoneyBillAlt } from 'react-icons/fa';
import { MdCheckCircle, MdSecurity, MdLocalShipping, MdAttachMoney ,MdSync} from 'react-icons/md';
import { LuTruck,LuCheck, LuShieldCheck, LuBanknote,LuShield , LuRefreshCw } from "react-icons/lu";
import { FiCheck, FiShield, FiDollarSign } from "react-icons/fi";

import './CreditComponent.css'
export default function CreditComponent() {

const CreditArray =[{name:'Fully Authentic',img:'/PD-Img.png'},
  {name:'New & Unused',img:'/PD-Img2.png'},
  {name:' No Hidden Fees',img:'/PD-Img3.png'},
  {name:'Easy Returns',img:'/PD-Img4.png'},
]

  return (
    <div className='credits-div'>
       {CreditArray.map(item=>  <div id='credit'>
            <div id='credit-logo'> <img src={item.img}/></div>
            <div id='credit-text'>{item.name}</div>
        </div>)}
      
       
    </div>
  )
}
