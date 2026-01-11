import React from 'react';
import './BracketButton.css';

const BracketButton = ({ 
  height = '40px', 
  width = '140px', 
  hoverHeight = '',
  bgColor = '#111', 
  color = '#333', 
  hoverTextColor = '#fff',
  fontSize='1rem',
  textContent = 'FILTER',
  isActive = true 
}) => {
  const displayColor = isActive ? color : '#b0b0b0'; 

  const containerStyle = {
    '--normal-height': height,
    '--hover-height': hoverHeight,
    '--hover-bg': bgColor,
    '--text-color': displayColor,
    '--hover-text-color': hoverTextColor,
    '--width': width,
    '--font-size': fontSize,
  };

  return (
    <div 
      className={`bracket-card ${!isActive ? 'is-inactive' : ''}`}
      style={containerStyle}
    >
      <div className="corner top-left"></div>
      <div className="corner top-right"></div>
      <div className="corner bottom-left"></div>
      <div className="corner bottom-right"></div>
      
      <span className="text-content">
        {textContent}
      </span>
    </div>
  );
};

export default BracketButton;