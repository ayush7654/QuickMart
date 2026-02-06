import React from 'react'
import './ShippingDetails.css'
import CornerImgWrapper from '../../CornerImgWrapper/CornerImgWrapper'
import { LuTruck ,LuPackage } from "react-icons/lu";
import useProductDetailsData from '../../useProductDetailsData';
import { useParams } from 'react-router-dom';

export default function ShippingDetails() {

       const{id} = useParams()


    const {product,currentCategory} = useProductDetailsData(id)

    

  return (
   <div className='extra-pd-info'>

  <div className='pd-delivery-wrapper'>
 <span className='pd-delivery-icon-wrapper'>
  <CornerImgWrapper/>
<span className='pd-delivery-icon'><LuTruck strokeWidth={1}/></span>
</span>
 <div className='pd-delivery-info'>
  <span id='pd-extra-head'>Estimated Arrival</span>
  <span id='pd-extra-head-info'> {product?.shippingInformation}.</span>
 </div>
</div>

  <div className='pd-delivery-wrapper'>
 <span className='pd-delivery-icon-wrapper'>
  <CornerImgWrapper/>

  <span className='pd-delivery-icon'><LuPackage strokeWidth={1} /></span>
  </span>
 <div className='pd-delivery-info'>
  <span id='pd-extra-head'>Prefer to collect?</span>
  <span id='pd-extra-head-info'>Select at the checkout</span>
 </div>
</div>



</div>
  )
}
