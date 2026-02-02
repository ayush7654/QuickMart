import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Optional: remove if not using React Router
import './DotNav.css';

const DotNav = ({ 
  sections = [], 
  textColor = '#666', 
  textColorHover = '#000', 
  dotColor = '#007bff',
  handleClick,
  syncWithUrl = false 
}) => {
  // Use location hook to listen for URL changes if syncing is enabled
  const location = useLocation(); 

  // Initialize state
  const [activeIndex, setActiveIndex] = useState(() => {
    if (syncWithUrl) {
      const currentPath = window.location.pathname;
      const initialIndex = sections.findIndex(s => s.function === currentPath);
      return initialIndex !== -1 ? initialIndex : 0;
    }
    return 0;
  });

  // Effect: Syncs the dot when the URL changes (Back button, manual typing, etc.)
  useEffect(() => {
    if (syncWithUrl) {
      const currentPath = location.pathname;
      const matchIndex = sections.findIndex(s => s.function === currentPath);
      if (matchIndex !== -1 && matchIndex !== activeIndex) {
        setActiveIndex(matchIndex);
      }
    }
  }, [location.pathname, sections, syncWithUrl, activeIndex]);

  const handleInternalClick = (index, section) => {
    setActiveIndex(index);
    if (handleClick) {
      // Passes the string path or the function back to the parent
      handleClick(section.function);
    }
  };

  if (!sections.length) return null;

  return (
    <div 
      className="dot-nav-container"
      style={{
        '--text-color': textColor,
        '--text-hover': textColorHover,
        '--dot-color': dotColor,
      }}
    >
      <div className="dot-nav-wrapper">
        {sections.map((section, index) => (
          <button
            key={index}
            className={`dot-nav-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleInternalClick(index, section)}
          >
            {section.title}
          </button>
        ))}
        
        {/* The Track with End-only Inertia */}
        <div 
          className="dot-track" 
          style={{ 
            width: `${100 / sections.length}%`, 
            transform: `translateX(${activeIndex * 100}%)` 
          }}
        >
          <div className="dot" />
        </div>
      </div>
    </div>
  );
};

export default DotNav;