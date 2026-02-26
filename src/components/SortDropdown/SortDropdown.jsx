import React, { useState } from 'react';
import './SortDropdown.css';

const SortDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Price');

  const options = ['Price', 'Rating', 'Discount'];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    // Add your sorting logic here (e.g., passing value to parent component)
    console.log(`Sorting by: ${option}`);
  };

  return (
    <div className="dropdown-container">
      <span className="sort-label">Sort by:</span>
      <div className="custom-dropdown">
        <button 
          className={`dropdown-trigger ${isOpen ? 'active' : ''}`} 
          onClick={toggleDropdown}
        >
          {selected}
          <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
        </button>

        {isOpen && (
          <ul className="dropdown-menu">
            {options.map((option) => (
              <li 
                key={option} 
                className={`dropdown-item ${selected === option ? 'selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;