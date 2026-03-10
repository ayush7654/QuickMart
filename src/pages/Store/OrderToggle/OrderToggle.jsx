import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import './OrderToggle.css';

const OrderToggle = () => {
  const [isHigh, setIsHigh] = useState(true);

  return (
    <button
      className="order-morph-btn" 
      onClick={() => setIsHigh(!isHigh)}
    >
      <div className="btn-inner-content">
        {/* Label anchored to top left */}
{/*         <span className="btn-label-top">ORDER</span> */}
        
        <div className="value-window">
          <div className={`value-stack ${isHigh ? 'slide-up' : 'slide-down'}`}>
            <span className="value-text">Low To High</span>
            <span className="value-text">High To Low</span>
          </div>
        </div>
      </div>
    {/*   
      <div className="btn-icon-area">
        {isHigh ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </div> */}
            <span className={`sort-arrow ${isHigh? 'up' : 'down'}`}></span>
    </button>
  );
};

export default OrderToggle;