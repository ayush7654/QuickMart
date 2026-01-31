import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'react-feather';
import { X } from 'lucide-react';
import { ArrowUpRight } from "lucide-react";
import { IoCloseCircle } from "react-icons/io5";

import './SearchBar.css';

export default function SearchBar({ currentToggle, toggleSwitch, toggleOverlay }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const[products,setProducts] = useState()
  const [suggestionBox, setSuggestionBox] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setSuggestionBox(true);
  };

  const handleCategoryClick = (name, slug) => {
    setSearchTerm(name);
    setSuggestionBox(false);
    navigate(`store?type=${slug}`);
    handleCloseSearchBar();
  };

  const handleProductClick = (id) =>{
       setSuggestionBox(false);
    navigate(`store/${id}`);
    handleCloseSearchBar();
  }

  const handleCloseSearchBar = () => {
    toggleSwitch(false);
    toggleOverlay(false);
    setSearchTerm('');
  };

function filterAndRankByTitle(list, query) {
  if (!query) return list; // return everything if query is empty

  const lowerQuery = query.toLowerCase();

  // 1️⃣ Filter objects whose title includes the query
  const filtered = list.filter(item =>
    item.title.toLowerCase().includes(lowerQuery)
  );

  // 2️⃣ Sort by how early the query appears in the title
  const ranked = filtered.sort((a, b) => {
    const indexA = a.title.toLowerCase().indexOf(lowerQuery);
    const indexB = b.title.toLowerCase().indexOf(lowerQuery);
    return indexA - indexB;
  });

  return ranked;
}

function getHighlightedText(text, highlight) {
  if (!highlight) return text;

  const lowerText = text.toLowerCase();
  const lowerHighlight = highlight.toLowerCase();
  const index = lowerText.indexOf(lowerHighlight);

  // If not found, return the plain text
  if (index === -1) return text;

  // Split into before, match, after (only the first match)
  const before = text.slice(0, index);
  const match = text.slice(index, index + highlight.length);
  const after = text.slice(index + highlight.length);

  return (
    <>
      {before}
      <span style={{ color: 'rgb(80,230,230)', fontWeight: 500 }}>{match}</span>
      {after}
    </>
  );
}






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


    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=0');
        const result = await response.json();
        setProducts(result.products);
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

const productsComp = filterAndRankByTitle(products,searchTerm)




  

  
  return (
    <div
      className='searchBar-div'
      style={{
        transform: currentToggle ? 'translateY(0)' : 'translateY(-20rem)',
        transition: 'transform 0.3s ease-in-out',
      }}
    >
        <div className='searchBar-cancel-div' onClick={handleCloseSearchBar}>
          <X strokeWidth={1.5} className='searchBar-cancel' />
        </div>
      <div className='searchBar-head-div'>
       <div className='searchBar-head' >Discover what you love.</div> 
      
      </div>

      <div className='header-searchBar-div'>
        <div className='header-searchBar'>
          <input
            className='header-search-box'
            placeholder='SEARCH'
            value={searchTerm}
            onChange={handleChange}
          />

           
            <div className='searchBar-btn-div'>

            {searchTerm &&   <div
              onClick={() => setSearchTerm('')}
              className='clearSearchBtn-div'

            >
             <IoCloseCircle  className='clearSearchBtn' />
            </div>}
               <div className='searchBar-seachIcon-div'
        
            onClick={handleCloseSearchBar}
          >
            <Link  to={`/search/${searchTerm}`}>
              <Search className='searchIcon' style={{strokeWidth: '1.5' }} />
            </Link>
          </div>

            </div>

    
        
        </div>
 {  searchTerm &&  <div className='suggestionBox'>
    <div className='category-suggestion-box'>
        {suggestionBox &&
            searchTerm &&
            suggestionComp &&
            suggestionComp.map((item) => (
           
                <div   onClick={() => handleCategoryClick(item.name, item.slug)} className='category-suggestion'>{item.name}</div>
         
            ))}
    </div>
          {suggestionBox &&
            searchTerm &&
            productsComp &&
            productsComp.slice(0,6).map((item) => (
              <div
                onClick={() => handleProductClick(item.id)}
                key={item.name}
                className='suggestion-div'
              >
                <div className='suggestion-image-div' style={{backgroundImage:`url(${item.images[0]})`}}></div>
                <div className='suggestion'>{getHighlightedText(item.title, searchTerm)}</div>
                <ArrowUpRight className='suggestion-arrow'/>
              </div>
            ))}
        </div>}
      
      </div>
     
    </div>
  );
}
