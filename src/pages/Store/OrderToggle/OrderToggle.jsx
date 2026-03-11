import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import './OrderToggle.css';

const OrderToggle = () => {
  const [isHigh, setIsHigh] = useState(true);

  return (
    <div
      className="order-morph-btn" 
      onClick={() => setIsHigh(!isHigh)}
    >
      <div className="btn-inner-content">
        {/* Label anchored to top left */}
{/*         <span className="btn-label-top">ORDER</span> */}
        
        <div className="value-window">
          <div className={`value-stack ${isHigh ? 'slide-up' : 'slide-down'}`}>
            <span className="value-text">A → Z</span>
            <span className="value-text">Z → A</span>
          </div>
        </div>
      </div>

      
         
    </div>
  );
};

export default OrderToggle;