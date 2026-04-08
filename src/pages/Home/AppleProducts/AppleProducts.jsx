import React from 'react'
import AppleVideoCard from '../AppleComponent/AppleVideoCard/AppleVideoCard'
import './AppleProducts.css'
import { motion } from 'framer-motion';
import TextAnimation from '../../../components/TextAnimation';
export default function AppleProducts() {


  return (
    <div className='apple-Products' >

 <motion.div 
initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 'some' }}
className='ap-head-wrapper'>
  <motion.div className='ap-head-img'
  variants={{
        hidden: { scale:.3 }, 
        visible: { 
       scale:1 ,opacity:1,
          transition: { duration: 1, ease: [1, 1, 0.5, 1] }
        }
      }}
  >
    <img src='AppleProductsMedia/AppleLogo.png'/>
    </motion.div> 
   

  
 {/*  <motion.h2
        variants={expandVariants}
        initial="hidden"
        whileInView="visible"
        // amount: "some" is more forgiving than a percentage
        viewport={{ once: true, amount:'some'}} 
        style={{
          fontSize: '3rem',
          textAlign: 'center',
          whiteSpace: 'nowrap',
          display: 'block'
       
        }}
      >
      Experiences only Apple can deliver.
      </motion.h2> */}

 <TextAnimation text={'Experiences only Apple can deliver.'} delay={0.1} staggerDelay={.15}/>

    </motion.div> 






        <AppleVideoCard
        videoSrc="AppleProductsMedia/MacBookProVid.mp4"
        poster="AppleProductsMedia/MacBookImgHD.jpg"
        title="MacBook Pro 14"
        description="With up to 3.5x more performance for AI workflows, faster storage, up to a phenomenal 24 hours of battery life, and macOS Tahoe, the 14-inch MacBook Pro gets even better."
        price="From ₹169900.00* or ₹26650.00/mo. for 6 mo."
      />
      
      <AppleVideoCard
        videoSrc="AppleProductsMedia/Apple17Vid.mp4"
        poster="AppleProductsMedia/AppleProImg.jpg"
        title="Apple iPhone 17 Pro"
        description=" iPhone 17 Pro is designed from the inside out to be our most powerful model ever. Its heat-forged unibody enclosure maximizes performance, capacity, and durability."
        price="From ₹134900.00* or ₹21650.00/mo. for 6 mo."
      />

        <AppleVideoCard
        videoSrc="AppleProductsMedia/AppleWatchVid.mp4"
        poster="AppleProductsMedia/AppleWatchImg3.jpg"
        title="Apple Watch Series 10"
        description=" The world’s bestselling watch is thinner than ever, featuring the biggest, most advanced display yet; sleep apnea notifications; faster charging; and  temperature sensing."
        price="From ₹134900.00* or ₹21650.00/mo. for 6 mo."
      />



     
    </div>
  )
}
