import React, { useState } from 'react';
import './PriceFilter.css';
import { useStoreFilter } from '../../../../components/StoreFilterContext';
const PriceFilter = () => {
  const { minPrice, setMinPrice, maxPrice, setMaxPrice } = useStoreFilter();
  
  const minLimit = 0; // Better for math/steps
  const maxLimit = 50000;
  const minGap = 1000;

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    // Ensure we don't cross the max handle minus the gap
    const newValue = Math.min(value, maxPrice - minGap);
    setMinPrice(newValue);
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    
    // Snap to absolute end if close, otherwise maintain gap
    if (value > maxLimit - 500) {
      setMaxPrice(maxLimit);
    } else {
      const newValue = Math.max(value, minPrice + minGap);
      setMaxPrice(newValue);
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
       {/* If minPrice is 0, we show $1 for better UX */}
       {minPrice === null ? '--' : `$${(minPrice || 1).toLocaleString()}`}
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