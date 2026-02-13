import React from 'react'
import AppleVideoCard from '../AppleComponent/AppleVideoCard/AppleVideoCard'
import './AppleProducts.css'
export default function AppleProducts() {
  return (
    <div className='apple-Products'>

<h2 className='ap-head' >
    <div className='ap-head-img'><img src='/AppleLogo.png'/></div>
    Experiences only Apple can deliver. </h2>
        <AppleVideoCard
        videoSrc="/MacBookProVid.mp4"
        poster="MacBookImgHD.jpg"
        title="MacBook Pro 14"
        description="With up to 3.5x more performance for AI workflows, faster storage, up to a phenomenal 24 hours of battery life, and macOS Tahoe, the 14-inch MacBook Pro gets even better."
        price="From ₹169900.00* or ₹26650.00/mo. for 6 mo."
      />
      
      <AppleVideoCard
        videoSrc="/Apple17Vid.mp4"
        poster="AppleProImg.jpg"
        title="Apple iPhone 17 Pro"
        description=" iPhone 17 Pro is designed from the inside out to be our most powerful model ever. Its heat-forged unibody enclosure maximizes performance, capacity, and durability."
        price="From ₹134900.00* or ₹21650.00/mo. for 6 mo."
      />

        <AppleVideoCard
        videoSrc="/AppleWatchVid.mp4"
        poster="AppleWatchImg3.jpg"
        title="Apple Watch Series 10"
        description=" The world’s bestselling watch is thinner than ever, featuring the biggest, most advanced display yet; sleep apnea notifications; faster charging; and  temperature sensing."
        price="From ₹134900.00* or ₹21650.00/mo. for 6 mo."
      />



     
    </div>
  )
}
