import React from 'react'
import { useRef } from "react";
import ScrollButton from '../../../../components/ScrollingButton/ScrollingButton';
import './AppleVideoCard.css'
export default function AppleVideoCard({ videoSrc, poster, title, description, price }) {

    const videoRef = useRef(null);

  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }
  };


  return (
   <div className="apple-wrapper" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="applePro-wrapper">
        <div id="video-window" className="AppleProVid" >
          <video ref={videoRef} muted loop playsInline poster={poster}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
        <div className="AppleProInfo">
          <h2>{title}</h2>
          <span className="applePro-para">{description}</span>
          <span className="applePro-price">{price}</span>
          <div className="ApplePro-buy">
            <ScrollButton className="apple-buy-btn" text="Buy Now" />
          </div>
        </div>
      </div>
    </div>
  )
}
