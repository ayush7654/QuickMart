import React from "react";
import "./BrandComponent.css";

const BrandCarousel = () => {
  // ✅ Move this up
  const brandLogos = [
    'QM-home-brand11.png',
    "QM-home-brand2.png",
    "QM-home-brand3.png",
    "QM-home-brand12.png",
    "QM-home-brand5.png",
    "QM-home-brand6.png",
    "QM-home-brand7.png",
    "QM-home-brand13.png"
  ];

  const logos = [...brandLogos, ...brandLogos]; // use it here AFTER declaration
  const logoWidth = 150; // px per logo
  const totalWidth = logoWidth * brandLogos.length;

  return (
    <div className="brand-carousel-container">
      <div
        className="brand-carousel"
        style={{
          width: `${totalWidth * 2}px`,
          animationDuration: "20s"
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
