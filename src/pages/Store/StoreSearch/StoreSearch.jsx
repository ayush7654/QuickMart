import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import './StoreSearch.css';

export default function StoreSearch({storeSearch,setStoreSearch}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        if (!storeSearch.trim()) {
          setIsOpen(false);
        }
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !storeSearch.trim()) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [storeSearch]);

  const handleIconClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setStoreSearch('');
    inputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (storeSearch.trim()) {
      console.log('Search submitted:', storeSearch);
    }
  };

  return (
    <div className="search-container" ref={containerRef}>
      <form onSubmit={handleSubmit} className="minimal-search">
        {/* Input Wrapper positioned absolutely to the LEFT of the icon */}
        <div className={`input-wrapper ${isOpen ? 'is-open' : ''}`}>
          <input
            ref={inputRef}
            type="text"
             value={storeSearch}
              onChange={(e) => setStoreSearch(e.target.value)}
            placeholder="Search..."
            tabIndex={isOpen ? 0 : -1}
            className="minimal-input"
          />

          {isOpen && storeSearch && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-btn"
              aria-label="Clear input"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Search Icon (Anchored completely in place) */}
        <button
          type={isOpen ? 'submit' : 'button'}
          onClick={handleIconClick}
          className="icon-btn"
          aria-label={isOpen ? 'Submit search' : 'Open search'}
        >
          <Search size={18} strokeWidth={2.2} />
        </button>
      </form>
    </div>
  );
}