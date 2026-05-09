import React ,{useState} from 'react'
import './GridToggle.css'
export default function GridToggle({onChange,activeLayout,setActiveLayout}) {

       const gridOptions = [
      /*   { id: 2, label: '2x2', icon: 'StoreMedia/grid2x2.png' }, */
        { id: 3, label: '3x3', icon: 'StoreMedia/grid3x3.png' },
        { id: 4, label: '4x4', icon: 'StoreMedia/grid4x4.png' },
      ];

    
      const handleSelect = (id) => {
        setActiveLayout(id);
        if (onChange) onChange(id);
      };
  return (
    <div className="switcher-container">
      <div className="switcher-rail">
        {/* Sliding background for the "active" state */}
      {/*   <div 
          className="switcher-slider" 
          style={{ transform: `translateX(${(activeLayout - 2) * 100}%)` }}
        /> */}
        
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
