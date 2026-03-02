import React, { useState } from 'react';
import './PriceFilter.css';

const PriceFilter = () => {
  // 1. Initialized to null as requested
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  
  // 2. Updated limits to 1 - 50,000
  const minLimit = 1;
  const maxLimit = 50000;

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    // If max is still null, we compare against maxLimit
    const currentMax = maxPrice || maxLimit;
    setMinPrice(Math.min(value, currentMax - 1000));
  };

  const handleMaxChange = (e) => {
  const value = Number(e.target.value);
  const currentMin = minPrice || minLimit;
  const minGap = 1000;

  // 1. If we are within one 'step' of the max limit, force it to 50000
  if (value > maxLimit - 500) {
    setMaxPrice(maxLimit);
  } 
  // 2. Otherwise, enforce the gap logic
  else {
    const allowedValue = Math.max(value, currentMin + minGap);
    setMaxPrice(allowedValue);
  }
};

  return (
    <div className="price-filter-container">
      <div className="filter-header">
        <span>Price</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>

      <div className="slider-wrapper">
        <div className="slider-track" />
  <div 
  className="slider-range" 
  style={{ 
    left: `${((minPrice || minLimit) / maxLimit) * 100}%`, 
    right: `${100 - ((maxPrice || maxLimit) / maxLimit) * 100}%` 
  }} 
/>
        
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          step={500} // Logical increment for 50k scale
          value={minPrice || minLimit}
          onChange={handleMinChange}
          className="thumb thumb-left"
        />
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          step={500}
          value={maxPrice || maxLimit}
          onChange={handleMaxChange}
          className="thumb thumb-right"
        />
      </div>

      <div className="price-input-row">
        <div className="input-group">
          <label>From</label>
          <div className="price-box">
            {/* Renders -- if null */}
            {minPrice === null ? '--' : `$${minPrice.toLocaleString()}`}
          </div>
        </div>
        <div className="input-group">
          <label>To</label>
          <div className="price-box">
            {maxPrice === null ? '--' : `$${maxPrice.toLocaleString()}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;