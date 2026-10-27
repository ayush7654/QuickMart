import React, { useState } from 'react';
import './SearchPanel.css';

const SearchPanel = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-panel-container">
      {/* Top Close Button */}
      <button 
        className="search-close-btn" 
        onClick={onClose} 
        aria-label="Close search"
      >
        <span className="close-icon">&times;</span>
      </button>

      {/* Search Input Box */}
      <div className="search-input-wrapper">
        <input
          type="text"
          className="header-search-box"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
          autoFocus
        />
      </div>
    </div>
  );
};

export default SearchPanel;