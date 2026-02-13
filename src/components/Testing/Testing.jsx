import { useEffect, useRef, useState } from "react";
import "./Testing.css";
import ScrollButton from "../ScrollingButton/ScrollingButton";
import AppleVideoCard from "../../pages/Home/AppleComponent/AppleVideoCard/AppleVideoCard";

export default function Testing() {



 const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      // This combination resets the video to show the poster image
      videoRef.current.currentTime = 0; 
      videoRef.current.load(); 
    }
  };

  return (
    <div className="testing-div">

{/* <div className="apple-wrapper">
   
 <div className="applePro-wrapper">
  <div id="video-window" className="AppleProVid"
  onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}>
 <video
        ref={videoRef}
        muted
        loop
        playsInline
        poster="AppleComponentImg/Apple-MacB2.jpg"
        
        >
          <source src="/MacBookProVid.mp4" type="video/mp4" />
        </video>
  </div>

  <div className="AppleProInfo">
    <h2>Apple iPhone 17 Pro</h2>
    <span className="applePro-para">
      Introducing iPhone 17 Pro and iPhone 17 Pro Max, designed from the inside out to be the most powerful iPhone models ever made. At the core of the new design is a heat-forged aluminium unibody enclosure that maximises performance, battery capacity and durability.
    </span>
    <span className="applePro-price">From ₹134900.00* or ₹21650.00/mo. for 6 mo.</span>
    <div className="ApplePro-buy">
      <ScrollButton className="apple-buy-btn"
      text='Buy Now'/>
    </div>
  </div>
 </div>

 
</div>


 <div className="apple-wrapper">
   
 <div className="applePro-wrapper">
  <div id="video-window" className="AppleProVid"
  onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}>
 <video
        ref={videoRef}
        muted
        loop
        playsInline
        poster="AppleComponentImg/Apple-MacB2.jpg" 
        
        >
          <source src="/Apple17Vid.mp4" type="video/mp4" />
        </video>
  </div>

  <div className="AppleProInfo">
    <h2>Apple iPhone 17 Pro</h2>
    <span className="applePro-para">
      Introducing iPhone 17 Pro and iPhone 17 Pro Max, designed from the inside out to be the most powerful iPhone models ever made. At the core of the new design is a heat-forged aluminium unibody enclosure that maximises performance, battery capacity and durability.
    </span>
    <span className="applePro-price">From ₹134900.00* or ₹21650.00/mo. for 6 mo.</span>
    <div className="ApplePro-buy">
      <ScrollButton className="apple-buy-btn"
      text='Buy Now'/>
    </div>
  </div>
 </div>

 
</div>  */}


<AppleVideoCard
        videoSrc="/MacBookProVid.mp4"
        poster="AppleComponentImg/Apple-MacB2.jpg"
        title="MacBook Pro 14"
        description="With up to 3.5x more performance for AI workflows, faster storage, up to a phenomenal 24 hours of battery life, and macOS Tahoe, the 14-inch MacBook Pro gets even better."
        price="From ₹134900.00* or ₹21650.00/mo. for 6 mo."
      />
      
      <AppleVideoCard
        videoSrc="/Apple17Vid.mp4"
        poster="AppleComponentImg/Apple-MacB2.jpg"
        title="Apple iPhone 17 Pro"
        description=" iPhone 17 Pro is designed from the inside out to be our most powerful model ever. Its heat-forged unibody enclosure maximizes performance, capacity, and durability."
        price="From ₹134900.00* or ₹21650.00/mo. for 6 mo."
      />
     


    </div>
  );
};



{/* <div className="macbook-wrapper">
   <div id="video-window" className="MacbookVid"
   onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      >
     <video
        ref={videoRef}
        muted
        loop
        playsInline
        poster="AppleComponentImg/Apple-MacB2.jpg" 
        
        >
          <source src="/MacBookProVid.mp4" type="video/mp4" />
        </video>
   </div>
   <div className="macbook-info">
    <h2>MacBook Pro 14″ now supercharged by M5.
</h2>

<span>With up to 3.5x more performance for AI workflows, faster storage, up to a phenomenal 24 hours of battery life, and macOS Tahoe, the 14-inch MacBook Pro gets even better.</span>
   
     <div className="macbook-price">
      From $1599 or $133.25/mo. for 12 mo.
     </div>
     <span className="macbook-buy">
     <ScrollButton
     text='Buy Now'
     color='black'
    
     />
     </span>
   </div>

 
</div> */}