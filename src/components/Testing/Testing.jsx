import { useEffect, useRef, useState } from "react";
import "./Testing.css";
import IconButton from "../IconButton/IconButton";



export default function Testing() {


  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    // Calculate mouse position in percentage (0 to 100)
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setPosition({ x, y });
  };
  return (
    <div className="testing-div">

<div 
      className="zoom-container"
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      onMouseMove={handleMouseMove}
    >
      <img 
        src={'/account-stock2.jpg'} 
        alt="Product" 
        className={`zoom-image ${showZoom ? 'zoomed' : ''}`}
        style={{
          // This moves the "focus" of the zoom to where the mouse is
          transformOrigin: `${position.x}% ${position.y}%`
        }}
      />
    </div>
    </div>
  );
};
