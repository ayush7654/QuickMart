import React, { useState } from 'react';
import './PriceFilter.css';

const PriceFilter = () => {
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(500);
  const minLimit = 0;
  const maxLimit = 1000;

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 50);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 50);
    setMaxPrice(value);
  };

  return (
    <div className="price-filter-container">
      <div className="filter-header">
        <span>Price</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>

      <div className="slider-wrapper">
        <div className="slider-track" />
        {/* Dynamic colored bar between handles */}
        <div 
          className="slider-range" 
          style={{ 
            left: `${(minPrice / maxLimit) * 100}%`, 
            right: `${100 - (maxPrice / maxLimit) * 100}%` 
          }} 
        />
        
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={minPrice}
          onChange={handleMinChange}
          className="thumb thumb-left"
        />
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={maxPrice}
          onChange={handleMaxChange}
          className="thumb thumb-right"
        />
      </div>

      <div className="price-input-row">
        <div className="input-group">
          <label>From</label>
          <div className="price-box">${minPrice}</div>
        </div>
        <div className="input-group">
          <label>To</label>
          <div className="price-box">${maxPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;