import React from 'react'
import './AddtionalInfo.css'
import { useParams } from 'react-router-dom'
import useProductDetailsData from '../../useProductDetailsData'
export default function AddtionalInfo() {

    /* Brand , Category , realease date , return polciy ,warrenty , main color, avaiablity
    dimensions , weight
    */

    const{id} = useParams()
    const {product,currentCategory} = useProductDetailsData(id)

  const [year, month, day] = product?.meta?.createdAt?.split('T')[0]?.split('-') || [];
const formattedDate = year ? `${year}-${day}-${month}` : "N/A";

const { width, height, depth } = product?.dimensions || {};
const dimensionString = width ? `${width} * ${height} * ${depth} ` : "N/A";

    const pdArray=[
        {pdHead:'Brand', pdDetail:product?.brand},
        {pdHead:'Category', pdDetail:product?.category},
        {pdHead:'Release Date', pdDetail:formattedDate},
        {pdHead:'Return Policy', pdDetail:product?.returnPolicy},
        {pdHead:'Warrenty', pdDetail:product?.warrantyInformation},
        {pdHead:'Availability', pdDetail:product?.availabilityStatus},
        {pdHead:'Dimensions', pdDetail:dimensionString},
        {pdHead:'Weight', pdDetail:product?.weight},

    ]

   
  return (
    <div className='additional-Info'>
      
              {pdArray.map(item=>
    <div className='ai-wrapper'>
        <span className='ai-head'>{item.pdHead}</span>
         
        <span className='ai-info'>{item.pdDetail}</span>
    </div>)}
     

      
  
    </div>
  )
}
