import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { SortAsc,SortDesc} from 'lucide-react';
import './OrderToggle.css';

const OrderToggle = () => {
  const [isHigh, setIsHigh] = useState(true);

  return (
    <div
      className="order-morph-btn" 
      onClick={() => setIsHigh(!isHigh)}
    >
      <div className="btn-inner-content">
  
        
        <div className="value-window">
          <div className={`value-stack ${isHigh ? 'slide-up' : 'slide-down'}`}>
            <span className="value-text"><SortDesc strokeWidth={1.2}/></span>
            <span className="value-text"><SortAsc strokeWidth={1.2}/></span>
          </div>
        </div>
      </div>

      
         
    </div>
  );
};

export default OrderToggle;