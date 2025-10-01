import React from "react";
import "./BrandComponent.css";

const BrandCarousel = () => {
  // ✅ Move this up
  const brandLogos = [
    'BrandComponentIcons/QM-home-brand1.png',
    'BrandComponentIcons/QM-home-brand2.webp',
    'BrandComponentIcons/QM-home-brand3.png',
    'BrandComponentIcons/QM-home-brand4.png',
    'BrandComponentIcons/QM-home-brand5.png',
    'BrandComponentIcons/QM-home-brand6.png',
    'BrandComponentIcons/QM-home-brand7.png',
    'BrandComponentIcons/QM-home-brand8.png'

   
  ];



  const logos = [...brandLogos, ...brandLogos]; // use it here AFTER declaration
  const logoWidth = 200; // px per logo
  const totalWidth = logoWidth * brandLogos.length;

  return (
    <div className="brand-carousel-container">
      <div
        className="brand-carousel"
        style={{
          width: window.innerWidth>400?`${totalWidth * 2}px`:`${totalWidth * 1.5}px`,
          animationDuration: window.innerWidth>400? "20s":"30s"
        }}
      >
        {logos.map((logo, index) => (
          <div key={index} className="brand-logo">
          
            <img src={logo} alt={`Brand ${index % brandLogos.length + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandCarousel;
