import React ,{useState} from 'react'
import './GridToggle.css'
export default function GridToggle({onChange,activeLayout,setActiveLayout,gridOptions}) {

   
    
      const handleSelect = (id) => {
        setActiveLayout(id);
        if (onChange) onChange(id);
      };
  return (
    <div className="switcher-container">
      <div className="switcher-rail">
        {/* Sliding background for the "active" state */}
        <div 
          className="switcher-slider" 
          style={{ transform: `translateX(${(activeLayout - 2) * 100}%)` }}
        />
        
        {gridOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`switcher-button ${activeLayout === option.id ? 'active' : ''}`}
            aria-label={`Switch to ${option.label} grid`}
          >
            <img  src={option.icon} />
         
         
          </button>
        ))}
      </div>
    </div>
  )
}
