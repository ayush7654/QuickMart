import React from 'react'
import './SolarImgMain.css'
import {motion} from 'framer-motion';
export default function SolarImgMain({opacityDesc,opacityIncr}) {

const solarImagesLeft = [
  {
    className: 'solar-base-Img',
    src: 'solarMainImg1-2X3.png',
    opacity: opacityIncr.current,
  },
  {
    className: 'solar-overlay-Img',
    src: 'solarOverlayImg1-2X3.png',
    opacity: opacityDesc.current,
  },
  {
    className: 'solar-blur-Img',
    src: 'solarBlurImg1-2X3.png',
    opacity: opacityDesc.current,
  },
];

const solarImagesRight = [
  {
    className: 'solar-base-Img',
    src: 'solarMainImg2-2X3.png',
    style: {
      opacity: opacityIncr.current,
      zIndex: -1,
    },
  },
  {
    className: 'solar-overlay-Img',
    src: 'solarOverlayImg2-2X3.png',
    style: {
      opacity: opacityDesc.current,
    },
  },
  {
    className: 'solar-blur-Img',
    src: 'solarBlurImg2-2X3.png',
    style: {
      opacity: opacityDesc.current,
    },
  },
];

  return (
    <div className='solar-Img-main'>
   <div className='solar-Img-wrapper-left'>
    <div className="solar-Img-container">
           {solarImagesLeft.map((image, index) => (
  <motion.img
    key={index}
    className={image.className}
    id='solar-img-left'
    src={`HomeCollections/SolarPackImages/solarImgLeft/${image.src}`}
    style={{ opacity: image.opacity }}
  />
))}
    </div>


   </div>
    <div className='solar-Img-wrapper-right'>
      <div className="solar-Img-container">
        {solarImagesRight.map((image, index) => (
  <motion.img
    key={index}
    className={image.className}
    id='solar-img-right'
    src={`HomeCollections/SolarPackImages/solarImgRight/${image.src}`}
    style={image.style}
  />
))}
      </div>

   </div>
    </div>
  )
}