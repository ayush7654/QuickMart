import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'react-feather';
import { X } from 'lucide-react';

import './SearchBar.css';

export default function SearchBar({ currentToggle, toggleSwitch, toggleOverlay }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionBox, setSuggestionBox] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setSuggestionBox(true);
  };

  const handleClick = (name, slug) => {
    setSearchTerm(name);
    setSuggestionBox(false);
    navigate(`store?type=${slug}`);
    handleCloseSearchBar();
  };

  const handleCloseSearchBar = () => {
    toggleSwitch(false);
    toggleOverlay(false);
    setSearchTerm('');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/categories');
        const result = await response.json();
        setSuggestions(result);
      } catch (er) {
        console.error(er);
      }
    };

    fetchData();
  }, [searchTerm, suggestionBox]);

  const suggestionComp = suggestions
    ? suggestions.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : null;

  return (
    <div
      className='searchBar-div'
      style={{
        transform: currentToggle ? 'translateY(0)' : 'translateY(-12rem)',
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      <div className='searchBar-head'>
        What are you looking for?
        <span className='searchBar-cancel' onClick={handleCloseSearchBar}>
          <X size={30} strokeWidth={1.5} />
        </span>
      </div>

      <div className='header-searchBar-div'>
        <div className='header-searchBar'>
          <input
            className='header-search-box'
            placeholder='SEARCH'
            value={searchTerm}
            onChange={handleChange}
          />
          {searchTerm && (
            <div
              onClick={() => setSearchTerm('')}
              className='clearSearchBtn'
              style={{ position: 'absolute', right: '50px' }}
            >
              Clear
            </div>
          )}
          <div
            style={{ position: 'absolute', right: '10px' }}
            onClick={handleCloseSearchBar}
          >
            <Link style={{ color: 'black' }} to={`/search/${searchTerm}`}>
              <Search size={25} style={{ color: 'grey' }} />
            </Link>
          </div>
        </div>

        <div className='suggestionBox'>
          {suggestionBox &&
            searchTerm &&
            suggestionComp &&
            suggestionComp.map((item) => (
              <div
                onClick={() => handleClick(item.name, item.slug)}
                key={item.name}
              >
                <div className='suggestion'>{item.name}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
