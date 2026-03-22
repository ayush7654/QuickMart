import { useEffect, useRef, useState } from "react";
import './StoreBanner.css'
export default function StoreBanner() {

    const imageSets = [
  { left: '/store-img2.jpg', center: '/store-img14.jpg', right: '/store-img15.jpg' },
  { left: '/store-img11.jpg', center: '/store-img16.jpg', right: '/store-img18.jpg' },
  { left: '/store-img20.jpg', center: '/store-img19.jpg', right: '/store-img21.jpg' }
];

const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imageSets.length);
    }, 6000); // Changes set every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const currentSet = imageSets[index];

  return (
    <div className="test-store-banner">
      <h1 className="banner-typography">Originals</h1>

      {/* Changing the 'key' here is the secret. 
        It tells React "This is a brand new element", 
        triggering the CSS 'dropIn' animation again.
      */}
      <div className={`banner-product-stage set-${index + 1}`} key={index}>
        <div className="banner-img-wrapper item-left">
          <img src={currentSet.left} alt="product-left" />
        </div>
        <div className="banner-img-wrapper item-center">
          <img src={currentSet.center} alt="product-center" />
        </div>
        <div className="banner-img-wrapper item-right">
          <img src={currentSet.right} alt="product-right" />
        </div>
      </div>
    </div>
  )
}
