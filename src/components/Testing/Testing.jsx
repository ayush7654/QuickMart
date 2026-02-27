import { useEffect, useRef, useState } from "react";
import "./Testing.css";
import { LayoutGrid, Grid3X3, Grid2X2 } from 'lucide-react'; // Optional: icon library
export default function Testing() {

const [activeLayout, setActiveLayout] = useState(3);

  const options = [
    { id: 2, label: '2x2', icon: '/grid2x2.png' },
    { id: 3, label: '3x3', icon: '/grid3x3.png' },
    { id: 4, label: '4x4', icon: '/grid4x4.png' },
  ];

  const handleSelect = (id) => {
    setActiveLayout(id);
    if (onChange) onChange(id);
  };



  return (
    <div className="testing-div">
<div className="switcher-container">
      <div className="switcher-rail">
        {/* Sliding background for the "active" state */}
        <div 
          className="switcher-slider" 
          style={{ transform: `translateX(${(activeLayout - 2) * 100}%)` }}
        />
        
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`switcher-button ${activeLayout === option.id ? 'active' : ''}`}
            aria-label={`Switch to ${option.label} grid`}
          >
            <img width={'18rem'} src={option.icon} />
         
         
          </button>
        ))}
      </div>
    </div>
</div>
)
}