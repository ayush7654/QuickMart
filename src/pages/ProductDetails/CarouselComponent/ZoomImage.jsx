import React, { useState } from 'react';

const ZoomImage = ({ src, isZoomEnabled }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!isZoomEnabled) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div 
      className="zoom-container"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      style={{ overflow: 'hidden', width: '100%', height: '100%' }}
    >
      <img 
        src={src} 
        alt="Product" 
        className={`currentImage ${isZoomEnabled && isHovering ? 'zoomed' : ''}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transformOrigin: `${position.x}% ${position.y}%`,
          transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.3s ease'
        }}
      />
    </div>
  );
};

export default ZoomImage;