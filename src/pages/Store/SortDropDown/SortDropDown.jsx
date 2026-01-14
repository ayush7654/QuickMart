import React, { useState, useRef, useEffect } from 'react';
import AnimatedUnderline from '../../../components/AnimatedUnderline/AnimatedUnderline';
import './SortDropDown.css';

const SortDropdown = ({ currentSort, setCurrentSort, sortOrder, toggleSortOrder }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const dropdownRef = useRef(null);

  const SortArray = [
    { name: 'Price', sort: 'price' },
    { name: 'Rating', sort: 'rating' },
    { name: 'Discount', sort: 'discountPercentage' },
    { name: 'In Stock', sort: 'stock' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSortOpen(false);
        setIsOrderOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="sorting-toolbar-wrapper" ref={dropdownRef}>
      
      {/* LEFT SIDE: THE SORT TYPE DROPDOWN */}
      <div className="sort-dropdown-container">
        <div 
          className={`sort-main-box ${isSortOpen ? 'box-active' : ''}`} 
          onClick={() => { setIsSortOpen(!isSortOpen); setIsOrderOpen(false); }}
        >
          <div className="sort-text-stack">
            {/* <span className="sort-label">SORT BY</span> */}
            <span className="sort-current">{currentSort?.name || 'Sort By'}</span>
          </div>

          

          <div 
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSort(null);
               setIsSortOpen(false);
        setIsOrderOpen(false);
            }} 
            className={`clear-sort ${currentSort ? "clear-sort-active" : ""}`}
          >
            <AnimatedUnderline from="left" exit='opposite' offset={2} thickness={1}>
              Clear
            </AnimatedUnderline> 
          </div>
          <div className={`sort-chevron ${isSortOpen ? 'rotate' : ''}`}></div>
        </div>

        <div className={`sort-options-panel ${isSortOpen ? 'panel-visible' : ''}`}>
          {SortArray.map((item) => (
            <div
              key={item.name}
              className={`sort-item-row ${currentSort?.name === item.name ? 'item-selected' : ''}`}
              onClick={() => {
                setCurrentSort(item);
                setIsSortOpen(false);
              }}
            >
              <AnimatedUnderline from="left" exit="opposite" offset={2} thickness={1}>  
                {item.name}
              </AnimatedUnderline> 
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE: THE ORDER (ASC/DESC) DROPDOWN */}
      <div className={`sort-dropdown-container ${currentSort?'':'order-box-disabled'}`}>
        <div 
          className={` sort-main-box  ${isOrderOpen ? 'box-active' : ''}`} 
          onClick={() => { setIsOrderOpen(!isOrderOpen); setIsSortOpen(false); }}
        >
          <div className="sort-text-stack">
           {/*  <span className="sort-label">ORDER</span> */}
            <span className="sort-current">
        {sortOrder === 'asc'  ? 'Low → High' : sortOrder === 'desc' ? 'High → Low'  : 'Order'}
            </span>
          </div>

            
          <div 
            onClick={(e) => {
              e.stopPropagation();
              toggleSortOrder(null);
               setIsSortOpen(false);
        setIsOrderOpen(false);
            }} 
            className={`clear-sort ${sortOrder === null? "" : "clear-sort-active"}`}
          >
            <AnimatedUnderline from="left" exit='opposite' offset={2} thickness={1}>
              Clear
            </AnimatedUnderline> 
          </div>

          <div className={`sort-chevron ${isOrderOpen ? 'rotate' : ''}`}></div>
        </div>

        <div className={`sort-options-panel ${isOrderOpen ? 'panel-visible' : ''}`}>
          <div 
            className={`sort-item-row ${sortOrder === 'asc' ? 'item-selected' : ''}`}
           onClick={() => {
    toggleSortOrder('asc'); // Sends 'asc' string to your function
    setIsOrderOpen(false);
  }}
          >
            Low → High
          </div>
          <div 
            className={`sort-item-row ${sortOrder === 'desc' ? 'item-selected' : ''}`}
                    onClick={() => {
    toggleSortOrder('desc'); // Sends 'desc' string to your function
    setIsOrderOpen(false);
  }}
          >
            High → Low
          </div>
        </div>
      </div>

    </div>
  );
};

export default SortDropdown;