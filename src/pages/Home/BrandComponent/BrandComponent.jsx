import {useState, useEffect} from "react";
import "./BrandComponent.css";
import BrandSM from "./BrandSM/BrandSM";
import FlipCard from "./FlipCard/FlipCard";
const BrandCarousel = () => {
  // ✅ Move this up
 
  
 const [Brands,setBrands] = useState(
    [
    {id:1,front:'BrandComponentIcons/QM-home-brand10.png', back:'BrandComponentIcons/Sony-product.jpeg', flipped:false},
    {id:2,front:'BrandComponentIcons/QM-home-brand2.webp', back:'BrandComponentIcons/Vans-product.jpg', flipped:false},
    {id:3,front:'BrandComponentIcons/QM-home-brand3.png', back:'BrandComponentIcons/Adidas-product3.webp', flipped:false},
    {id:4,front:'BrandComponentIcons/QM-home-brand5.png', back:'BrandComponentIcons/Asus-product.jpg', flipped:false},
    {id:5,front:'BrandComponentIcons/Brand15.png', back:'BrandComponentIcons/furniture3.jpg', flipped:false},
    {id:6,front:'BrandComponentIcons/QM-home-brand6.png', back:'BrandComponentIcons/Chanel-product2.jpg', flipped:false},
    {id:7,front:'BrandComponentIcons/QM-home-brand7.png', back:'BrandComponentIcons/samsung-product2.jpg', flipped:false},
    {id:8,front:'BrandComponentIcons/QM-home-brand8.png', back:'BrandComponentIcons/Rolex-product2.jpg', flipped:false},
    {id:9,front:'BrandComponentIcons/QM-home-brand9.png', back:'BrandComponentIcons/Decathlon-product.avif', flipped:false}
  ]
 );




   


  const logos = [...Brands, ...Brands]; // use it here AFTER declaration
  const logoWidth = 200; // px per logo
  const totalWidth = logoWidth * Brands.length;



  useEffect(() => {
  const intervalId = setInterval(() => {
    setBrands(prev =>
      prev.map(item => ({
        ...item,
        flipped: !item.flipped,
      }))
    );
  }, 3500);

  return () => clearInterval(intervalId);
}, []);


  return (
    <div className="brand-carousel-container">

      <div className="brand-carousel-heading">
        <div className="brand-head-line1">SHOP FROM THE</div>
        <div className="brand-head-line2">Global Brands at the Lowest Prices</div>
        
      </div>

      <div
        className="brand-carousel"
        style={{
          width: window.innerWidth>400?`${totalWidth * 2}px`:`${totalWidth * 1.5}px`,
          animationDuration: window.innerWidth>400? "20s":"30s"
        }}
      >
        


 {logos.map((logo, index) => (
              <FlipCard
    key={index}
    frontImage={logo.front}
    backImage={logo.back}
    isFlipped={logo.flipped}
   propClass={'brand-logo'}
    
     
  />
        ))}
 
     
      </div>
  {window.innerWidth<450 &&  <BrandSM/>}

      
    </div>
  );
};

export default BrandCarousel;



{/* 
    {logos.map((logo, index) => (
              <FlipCard
    key={index}
    frontImage={logo.front}
    backImage={logo.back}
    isFlipped={logo.flipped}
   propClass={'brand-logo-sm'}
    
     
  />
        ))} */}


        {/*  {logos.map((logo, index) => (
          <div key={index} className="brand-logo">
          
            <img src={logo.front} alt={`Brand ${index % Brands.length + 1}`} />
          </div>
        ))} 
 */}