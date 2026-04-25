import React from 'react'
import './SolarImgMain.css'
import {motion} from 'framer-motion';
export default function SolarImgMain({opacityDesc,opacityIncr}) {
  return (
    <div className='solar-Img-main'>
   <div className='solar-Img-wrapper-left'>
     <motion.img className='solar-base-Img' src='HomeCollections/SolarPackImages/solarMainImg1.webp' style={{opacity:opacityIncr.current}}/> 
<motion.img className='solar-overlay-Img' src='HomeCollections/SolarPackImages/solarOverlayImg1.webp' style={{opacity:opacityDesc.current}} /> 
 <motion.img className='solar-blur-Img' src='HomeCollections/SolarPackImages/solarBlurImg1.webp'  style={{opacity:opacityDesc.current}} />

   </div>
    <div className='solar-Img-wrapper-right'>
         <motion.img className='solar-base-Img' src='HomeCollections/SolarPackImages/solarMainImg2.webp' style={{opacity:opacityIncr.current,zIndex:-1}}/> 
<motion.img className='solar-overlay-Img' src='HomeCollections/SolarPackImages/solarOverlayImg2.webp' style={{opacity:opacityDesc.current}} /> 
 <motion.img className='solar-blur-Img' src='HomeCollections/SolarPackImages/solarBlurImg2.webp'  style={{opacity:opacityDesc.current}} />
   </div>
    </div>
  )
}
