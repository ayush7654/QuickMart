import React from 'react'
import './BrandsSection.css'
export default function BrandsSection() {

    const TopBrands1= [
  'BrandLogo2.webp',
  'BrandLogo3.webp',
  'BrandLogo4.webp',
  'BrandLogo5.webp',
  'BrandLogo6.webp',
  'BrandLogo7.webp',
  'BrandLogo8.webp',
  'BrandLogo9.webp',

]

  const TopBrands2 =[
  'BrandLogo10.webp',
  'BrandLogo11.webp',
  'BrandLogo12.webp',
  'BrandLogo13.webp',
  'BrandLogo14.webp',
  'BrandLogo15.webp',
  'BrandLogo16.png',
  'BrandLogo20.png',
  ]
  return (
     <div className="brands-section">
        <div className="brands-header">
            SHOP FROM THE GLOBAL BRANDS
        </div>
        <div className="brand-list-wrapper">
            {TopBrands1.map((brand,index)=>
<div key={index} className="brand-wrapper" style={{backgroundImage:`url(/BrandComponentIcons/${brand})`}}>

</div>)}
        </div>
           <div className="brand-list-wrapper">
            {TopBrands2.map((brand,index)=>
<div key={index} className="brand-wrapper" style={{backgroundImage:`url(/BrandComponentIcons/${brand})`}}>

</div>)}
        </div>

 </div>
  )
}
